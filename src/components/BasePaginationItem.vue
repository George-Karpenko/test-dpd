<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "./BaseButton.vue";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Number,
  },
  text: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});

const classes = computed(() => {
  return {
    active: props.active,
    normal: !props.active,
    disabled: props.disabled,
  };
});
</script>

<template>
  <li>
    <BaseButton :disabled="disabled" :class="classes" class="page-link">
      <p>
        <slot>{{ text || value }}</slot>
      </p>
    </BaseButton>
  </li>
</template>

<style scoped>
li {
  height: 40px;
  width: 40px;
  border-radius: 3px;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}

.page-link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.page-link.normal:hover {
  background-color: #0066b3;
  color: #f0f4fc;
}
.page-link.normal:active {
  box-shadow: inset 0px 3px 4px rgba(0, 0, 0, 0.2);
}
.page-link.active {
  color: #ffffff;
  background-color: #4c5a79;
}
.page-link.normal {
  color: #0066b3;
  background-color: #f0f4fc;
}

.page-link:disabled,
.page-link:disabled:hover {
  color: #9db0bf;
  background-color: #e2e8f3;
}
.page-link:disabled:active {
  box-shadow: none;
}

.active:hover {
  cursor: default;
}
</style>
