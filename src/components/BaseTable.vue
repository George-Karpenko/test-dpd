<script setup lang="ts">
import { Item, Field } from "@/@types";
import { PropType, computed } from "vue";
import BaseButton from "./BaseButton.vue";

defineProps({
  items: {
    type: Object as PropType<Item[]>,
    required: true,
  },
  fields: {
    type: Object as PropType<Field[]>,
    required: true,
  },
  keyItemName: {
    type: String,
    required: true,
  },
  textWithEmptyItems: {
    type: String,
    required: true,
  },
});

const sortBy = defineModel("sortBy", { type: String, required: true });
const sortDesc = defineModel("sortDesc", { type: Boolean, required: true });

function sort(key: string) {
  if (sortBy.value !== key) {
    sortBy.value = key;
    sortDesc.value = false;
    return;
  }
  if (sortDesc.value && sortBy.value === key) {
    sortBy.value = "";
    sortDesc.value = false;
    return;
  }
  sortDesc.value = true;
}

const classes = computed(() => {
  if (sortBy.value) {
    return {
      sortBy: true,
      sortDesc: sortDesc.value,
      sortAsc: !sortDesc.value,
    };
  }
});
</script>

<template>
  <table class="table">
    <thead>
      <tr class="table__row table__row--header">
        <template v-for="field in fields">
          <th
            v-if="field.sortable"
            @click="sort(field.key)"
            :class="sortBy === field.key && classes"
            class="table__cell table__cell--header"
          >
            <BaseButton>
              {{ field.label }}
              <span>
                <i class="icon-up-arrow"></i>
                <i class="icon-down-arrow"></i>
              </span>
            </BaseButton>
          </th>
          <th v-else class="table__cell table__cell--header">
            <p>
              {{ field.label }}
            </p>
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length">
        <tr v-for="item in items" :key="item[keyItemName]" class="table__row">
          <td v-for="field in fields" class="table__cell">
            <slot :name="field.key" :value="item[field.key]">
              {{ item[field.key] }}
            </slot>
          </td>
        </tr>
      </template>
      <tr v-else class="table__row">
        <td :colspan="fields.length" class="table__cell">
          {{ textWithEmptyItems }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  border-collapse: collapse;
  height: 100%;
}

.table__cell {
  padding: 0.5rem 1rem;
  text-align: center;
}

.table__row {
  display: table-row;
  background: #423f3f;
}

.table__row:nth-of-type(odd) {
  background: #1f1e1e;
}
.table__row.table__row--header {
  background: #1f6618;
  color: #fff;
}
.table__cell--header {
  padding: 0;
}
.table__cell--header > * {
  border-radius: 0;
  height: 100%;
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;
  margin: 0;
  font-size: 1em;
}

.table__cell--header span {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

i {
  --height: 0.5rem;
  height: 0;
  width: 0;
}

.sortBy.sortDesc .icon-down-arrow {
  border-top: var(--height) solid rgb(255, 255, 255);
}

.sortBy.sortAsc .icon-up-arrow {
  border-bottom: var(--height) solid rgb(255, 255, 255);
}

.icon-up-arrow {
  border-left: calc(var(--height) / 2) solid transparent;
  border-right: calc(var(--height) / 2) solid transparent;
  border-bottom: var(--height) solid rgba(255, 255, 255, 0.57);
}

.icon-down-arrow {
  border-left: calc(var(--height) / 2) solid transparent;
  border-right: calc(var(--height) / 2) solid transparent;
  border-top: var(--height) solid rgba(255, 255, 255, 0.57);
}
</style>
