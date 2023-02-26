<template>
  <nuxt-link :to="`/${articleType}/${id}`">
    <div class="flex flex-col pb-8 rounded shadow-md">
      <div class="h-64 overflow-hidden">
        <img class="justify-center object-cover w-full h-full mb-4 lazyload blur-up hover:scale-x-125" loading="lazy"
          src="https://cdn-images-1.medium.com/freeze/max/27/1*sg-uLNm73whmdOgKlrQdZA.jpeg?q=20"
          :data-src="thumbnailImage" alt="">
      </div>
      <!-- style="font-family:'Georgia'" -->
      <div class="flex flex-col flex-1 px-6 mt-3">
        <div class="flex-1">
          <small class="font-semibold text-gray-700">{{ date }} | {{ publication.name }}</small>
          <!-- style="font-family:karnak-normal-500" -->
          <h3 class="mt-1 mb-1 text-lg font-semibold leading-tight">
            {{ title }}
          </h3>

          <p class="text-gray-900">
            {{ excerpt | wordLimit(300) }}
          </p>
        </div>
        <div class="flex">
          <img v-if="publication.content.logo != ''" loading="lazy" class="bottom-0 h-6 mt-4 align-bottom lazyload"
            :data-src="publication.content.logo">
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  transition: 'slide-left',
  name: "RecentArticle",
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    thumbnailImage: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    articleType: {
      type: String,
      default: 'news',
      required: true
    },
    publication: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        content: {
          logo: ''
        }
      })
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
