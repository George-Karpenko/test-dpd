export type Item = Record<string, any>;
export type Field = {
  key: string;
  label: string;
  sortable?: boolean;
};
export type Filters = {
  search: string;
  sortBy: string;
  sortDesc: boolean;
};
