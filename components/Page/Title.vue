<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="px-1 text-2xl font-bold md:text-3xl">
    <slot>{{ text }}</slot>
  </div>
</template>
