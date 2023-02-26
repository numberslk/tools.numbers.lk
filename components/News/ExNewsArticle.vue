<template>
  <a
    target="_blank"
    :href="`${newsArticle.link}`"
  >
    <div
      class="w-full cursor-pointer"
    >
      <div class="relative hover:opacity-75">
        <div class="flex items-center justify-around w-full h-full">
          <img
            :data-src="`${newsArticle.thumbnailUrl}`"
            class="object-cover mx-auto rounded-lg lazyload"
            alt="image thumbnail"
            @error="setFallbackImageUrl"
          >
        </div>
      </div>

      <div class="justify-start my-4 text-left">
        <small class="font-semibold text-left text-gray-600">{{ newsArticle.date }} | {{ newsArticle.publication }}</small>
        <div class="text-sm font-semibold text-left hover:underline hover:text-indigo-700">
          {{ newsArticle.title | wordLimit(150) }}
        </div>
        <div
          class="pt-2 text-xs text-left"
        >
          {{ newsArticle.description | wordLimit(300) }}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import noImage from '../../assets/img/noimage.jpg?webp'

export default {
  transition: 'slide-left',
  props: {
    newsArticle: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    setFallbackImageUrl(event) {
      // event.target.src = 'https://via.placeholder.com/272x151'
      event.target.src = noImage
    }
  }
}
</script>

<style scoped>
img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}
</style>
