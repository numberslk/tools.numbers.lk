<template>
  <nuxt-link class="flex items-center justify-center" :to="`${articleType}/${id}`">
    <div
      class="flex flex-col w-full mx-2 mt-4 overflow-hidden bg-gray-100 rounded-lg shadow xl:flex-row hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <!-- media -->
      <div class="w-full h-60 xl:w-2/5">
        <NuxtImg provider="storyblok" preload quality="80" :src="thumbnailImage" class="object-cover w-full h-full">
        </NuxtImg>
      </div>
      <!-- content -->
      <div class="flex flex-col justify-between w-full px-6 py-4 text-gray-800 xl:w-3/5">


        <!--tag list-->
        <div class="flex flex-wrap items-center text-sm text-grey-dark">
          <div v-for="tag in tagList" :key="tag">
            <span
              class="inline-flex justify-end float-right px-3 py-1 m-1 ml-0 font-semibold text-gray-800 bg-gray-300">{{
                tag
              }}</span>
          </div>
        </div>


        <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
          {{ title }}
        </h5>


        <p class="mb-3 font-normal text-gray-900 dark:text-gray-300">
          {{ $wordLimit(excerpt, 180) }}
        </p>


        <div class="justify-start float-left">
          <NuxtImg v-if="publication.content.logo != ''" provider="storyblok" preload loading="lazy"
            class="justify-start float-left object-contain h-6 mt-4 lazyload blur-up" :src="publication.content.logo" />
          <small class="float-right pt-4 font-normal text-gray-700 align-middle dark:text-gray-400">{{ date }}</small>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  transition: 'slide-left',
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
    tagList: {
      type: Array,
      required: true,
      default: () => []
    },
    publication: {
      type: Object,
      required: true,
      default: () => ({
        name: ''
      })
    },
    articleType: {
      type: String,
      default: 'news',
      required: true
    }
  }
}
</script>

<style scoped></style>
