<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: transparent;
  border: 0;
  padding: 0;
  font-weight: inherit;
  cursor: pointer;
}

button:disabled {
  cursor: default;
}
</style>
