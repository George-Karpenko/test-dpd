<script setup lang="ts">
import BaseLabel from "./BaseLabel.vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <BaseLabel>{{ label }}</BaseLabel>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 0.5rem;
}
</style>
