<script setup lang="ts">
import useFilterable from "@/composables/useFilterable";
import { initialPaginationUsers } from "@/api/user.ts";
import BaseFormInput from "@/components/BaseFormInput.vue";
import BaseTable from "@/components/BaseTable.vue";
import BasePagination from "@/components/BasePagination.vue";
import { Field } from "@/@types";
import { reactive } from "vue";
import useRouter from "./composables/useRouter";
import BaseFormGroup from "./components/BaseFormGroup.vue";
import { debounce } from "./helpers";

const users = reactive(
  useFilterable({
    loadItems: initialPaginationUsers(),
    initialFilters: { search: "", sortBy: "", sortDesc: false },
  })
);
useRouter(users);

const fields: Field[] = [
  {
    key: "picture",
    label: "Аватар",
  },
  {
    key: "name",
    label: "ФИО",
    sortable: true,
  },
  {
    key: "gender",
    label: "Пол",
    sortable: true,
  },
  {
    key: "country",
    label: "Страна",
    sortable: true,
  },
  {
    key: "dob",
    label: "Дата рождения",
    sortable: true,
  },
  {
    key: "email",
    label: "Адрес электронной почты",
    sortable: true,
  },
  {
    key: "phone",
    label: "Телефон",
    sortable: true,
  },
];

const search = debounce((value: string) => {
  users.filters.search = value;
  console.log(users.filters.search);
}, 500);
</script>

<template>
  <BaseFormGroup label="Поиск:">
    <BaseFormInput
      type="text"
      :modelValue="users.filters.search"
      @input="search($event.target.value)"
    />
  </BaseFormGroup>
  <div class="overflow-x-auto">
    <BaseTable
      v-model:sort-by="users.filters.sortBy"
      v-model:sort-desc="users.filters.sortDesc"
      :items="users.pagination.items"
      keyItemName="id"
      :fields="fields"
      textWithEmptyItems="Данные загружаются"
    >
      <template #picture="data">
        <img :src="data.value" />
      </template>
    </BaseTable>
    <BasePagination
      v-model="users.pagination.currentPage"
      :lastPage="users.pagination.lastPage"
      :perPage="users.pagination.perPage"
    ></BasePagination>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
