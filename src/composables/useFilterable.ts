import { Filters } from "@/@types";
import { reactive } from "vue";

export default function useFilterable({
  loadItems,
  initialFilters,
  perPage = 20,
}: {
  loadItems: Function;
  initialFilters: Filters;
  perPage?: number;
}) {
  const pagination = reactive({
    currentPage: 1,
    lastPage: 1,
    perPage: perPage,
    items: [],
  });

  const filters = reactive({
    ...initialFilters,
  });

  const load = () => {
    const { lastPage, data } = loadItems({
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
      filters,
    });
    pagination.lastPage = lastPage;
    pagination.items = data;
  };

  load();

  return {
    pagination,
    filters,
    load,
  };
}
