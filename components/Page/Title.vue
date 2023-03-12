<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <h1 class="px-1 text-2xl font-bold md:text-3xl">
    <slot>{{ text }}</slot>
  </h1>
</template>
