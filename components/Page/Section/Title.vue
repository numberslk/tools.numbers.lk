<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="mb-2 text-2xl font-semibold md:text-3xl">
    <slot>{{ text }}</slot>
  </div>
</template>
