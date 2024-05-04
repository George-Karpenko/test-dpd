import { Item } from "./@types";

export function debounce(callback: Function, delay = 1000) {
  var time: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function filterItems(arr: Item[], searchKey: string) {
  return arr.filter(function (obj) {
    return Object.keys(obj).some(function (key) {
      if (key !== "picture") {
        return obj[key].includes(searchKey);
      }
    });
  });
}

export function sortBy({
  items,
  prop,
  desc = false,
  parse = (x: string) => x,
}: {
  items: Item[];
  prop: string;
  desc?: boolean;
  parse?: Function;
}) {
  const sortOrder = desc ? -1 : 1;
  return items.sort((a, b) => {
    let result = 0;
    if (parse(a[prop]) < parse(b[prop])) {
      result = -1;
    }
    if (parse(a[prop]) > parse(b[prop])) {
      result = 1;
    }
    return result * sortOrder;
  });
}
