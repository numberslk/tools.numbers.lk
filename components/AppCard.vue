

<template>
  <!-- <div class="grid grid-cols-1 gap-6 mt-12 lg:mt-16 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3"> -->
  <router-link :to="path">
    <div class="overflow-hidden bg-white rounded shadow">
      <div class="p-8">
        <div class="flex items-center">
          <img class="flex-shrink-0 w-12 h-auto" :src="image" alt="" />
          <div class="ml-5 mr-auto">
            <p class="text-xl font-semibold text-black">{{ title }}</p>
            <p class="mt-px text-sm text-gray-600">{{ type }}</p>
          </div>
          <svg class="hidden w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <p class="text-base leading-relaxed text-gray-600 mt-7">{{ description }}</p>
      </div>
    </div>
  </router-link>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'AppCard',
  components: {},
  props: {
    description: {
      type: String,
      default: "The decription of app"
    },
    type: {
      type: String,
      default: "Calculator"
    },
    title: {
      type: String,
      default: "This is a paa"
    },
    path: {
      type: String,
      default: "/"
    },
    image: {
      type: String,
      default: "https://cdn.rareblocks.xyz/collection/celebration/images/integration/3/gmail-logo.png"
    }


  },

  data() {
    return {

    }
  }
}
</script>

