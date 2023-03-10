<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="my-1 text-lg font-semibold md:text-xl">
    <slot>{{ text }}</slot>
  </div>
</template>
