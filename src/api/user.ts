import { Filters, Item } from "@/@types";
import { filterItems, sortBy } from "@/helpers";
import api from "@/api/api.json";

const sortedParses = {
  dob: (date: string) => {
    const [getDate, getMonth, getYear]: string[] = date.split(".");
    return new Date(`${getMonth}.${getDate}.${getYear}`);
  },
};

export function getUsers(): Item[] {
  const users = api.results.map((user) => {
    return {
      picture: user.picture.medium,
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      gender: user.gender === "male" ? "М" : "Ж",
      country: user.location.country,
      dob: new Date(user.dob.date).toLocaleDateString("ru"),
      email: user.email,
      phone: user.phone,
    };
  });
  return users;
}

export function initialPaginationUsers() {
  const USERS = getUsers();
  return ({
    currentPage = 1,
    perPage = 20,
    filters,
  }: {
    currentPage?: number;
    perPage?: number;
    filters: Filters;
  }) => {
    let users = USERS;
    if (filters.search) {
      users = filterItems(users, filters.search);
    }

    if (filters.sortBy) {
      users = sortBy({
        items: users,
        prop: filters.sortBy,
        desc: filters.sortDesc,
        ...(filters.sortBy in sortedParses && {
          parse: sortedParses[filters.sortBy as keyof typeof sortedParses],
        }),
      });
    }

    return {
      total: users.length,
      lastPage: Math.ceil(users.length / perPage),
      data: users.slice(perPage * (currentPage - 1), perPage * currentPage),
    };
  };
}
