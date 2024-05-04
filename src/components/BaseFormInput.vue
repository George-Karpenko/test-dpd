<script setup lang="ts">
const value = defineModel<string>({ required: true });
</script>

<template>
  <input v-model="value" />
</template>

<style scoped>
input {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
}
</style>
