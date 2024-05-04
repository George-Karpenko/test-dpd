import { nextTick, onBeforeUnmount, watch } from "vue";

export default function useRouter({
  pagination,
  filters,
  load,
}: {
  pagination: any;
  filters: { [s: string]: unknown };
  load: Function;
}) {
  let isUpdateSearch = true;

  const baseSyncSearch = async ({
    pageValue,
    filtersValue,
  }: {
    pageValue: number;
    filtersValue: { [s: string]: string };
  }) => {
    isUpdateSearch = false;
    if (pageValue) {
      pagination.currentPage = pageValue;
    }

    Object.entries(filtersValue).forEach(([key, value]) => {
      switch (typeof filters[key]) {
        case "boolean":
          filters[key] = value === "true";
          break;
        case "number":
          filters[key] = Number(value);
          break;

        default:
          filters[key] = value;
          break;
      }
    });
    await nextTick();
    isUpdateSearch = true;
  };

  const syncSearch = () => {
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const { page: pageValue, ...filtersValue } = Object.fromEntries(
      urlParams.entries()
    );

    baseSyncSearch({ pageValue: Number(pageValue), filtersValue });
  };
  const popstateSyncSearch = (e: Event) => {
    const { page: pageValue, ...filtersValue } = (<PopStateEvent>e).state;
    baseSyncSearch({ pageValue: Number(pageValue), filtersValue });
  };

  window.addEventListener("popstate", (e) => popstateSyncSearch(e));
  onBeforeUnmount(() => {
    window.removeEventListener("popstate", (e) => popstateSyncSearch(e));
  });

  const updateSearch = () => {
    const urlParams = new URLSearchParams();
    if (pagination.currentPage !== 1) {
      urlParams.append("page", String(pagination.currentPage));
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        urlParams.append(key, String(value));
      }
    });

    const state = {
      page: pagination.currentPage,
      ...filters,
    };

    history.pushState(
      state,
      `page ${pagination.currentPage}`,
      window.location.pathname + "?" + urlParams.toString()
    );
  };

  syncSearch();

  watch(
    () => pagination.currentPage,
    () => {
      if (isUpdateSearch) {
        updateSearch();
      }
      load();
    }
  );

  watch(
    () => filters,
    () => {
      if (isUpdateSearch) {
        pagination.currentPage = 1;
        updateSearch();
      }
      load();
    },
    {
      deep: true,
    }
  );
}
