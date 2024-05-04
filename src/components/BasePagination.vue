<script setup lang="ts">
import BasePaginationItem from "./BasePaginationItem.vue";

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    default: 20,
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateCurrentPage(value: number) {
  emit("update:modelValue", value);
}
</script>

<template>
  <nav v-if="lastPage !== 1" aria-label="Page navigation example">
    <ul>
      <BasePaginationItem
        :value="modelValue - 1"
        :disabled="modelValue === 1"
        @click="updateCurrentPage(modelValue - 1)"
      >
        <i class="icon-nav-left"></i>
      </BasePaginationItem>
      <BasePaginationItem
        v-for="index in lastPage"
        :active="index === modelValue"
        :key="index"
        :value="index"
        @click="updateCurrentPage(index)"
      />

      <BasePaginationItem
        :value="modelValue + 1"
        :disabled="lastPage === modelValue"
        @click="updateCurrentPage(modelValue + 1)"
      >
        <i class="icon-nav-right"></i>
      </BasePaginationItem>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
}
nav > ul {
  display: flex;
  list-style: none;
  gap: 10px;
  margin: 15px auto;
  padding-left: 0;
}
i {
  font-size: 1rem;
}

.icon-nav-left:before {
  content: "\276e";
}
.icon-nav-right:before {
  content: "\276f";
}
</style>
