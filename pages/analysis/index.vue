<template>
  <NuxtLayout name="page">
    <div class="font-sans text-gray-700 quicksand">
      <MobileTopFixAd class="items-center justify-center block mt-4 text-center md:hidden" />
      <PageTopAd class="items-center justify-center hidden mt-4 text-center md:block" />
      <div class="pt-8">
        <h1 class="text-3xl text-center md:text-4xl">
          Numbers.lk <span class="text-green-500">Opinions and Analysis</span>
        </h1>
        <h2 class="text-sm text-center text-gray-700 dark:text-gray-400 md:text-base">
          Opinions and Analysis by Numbers.lk
        </h2>
      </div>
      <div class="flex flex-wrap p-4 text-gray-700 dark:text-gray-300 sm:p-4 md:p-4">
        <div class="order-3 w-full md:w-4/12 md:pr-12 md:order-1">
          <div
            class="hidden max-w-md pl-4 font-thin leading-loose tracking-tight lg:min-w-ads sm:block md:float-right md:text-right md:sticky md:top-0 md:pt-2">
            <div>
              <p class="my-4 font-bold text-md md:my-6">
                Useful Links
              </p>
              <ul class="flex flex-col flex-wrap justify-between text-sm">
                <li>
                  <a href="/covid19_dashboard" class="text-base font-semibold hover:underline">COVID19 Dashboard</a>
                </li>
                <li>
                  <a href="/rankings" class="text-base font-semibold hover:underline">Numbers Nine's</a>
                </li>
                <li>
                  <a href="/news" class="text-base font-semibold hover:underline">News</a>
                </li>
                <li>
                  <a href="/video" class="text-base font-semibold hover:underline">Video</a>
                </li>
                <li>
                  <a href="/" class="text-base font-semibold hover:underline">Home</a>
                </li>
              </ul>
              <!-- <a
              href="#"
              class="font-bold normal hover:font-bold"
            >more...</a> -->
            </div>
            <div class="hidden py-4 xl:block">
              <SideBarAd />
            </div>
          </div>
        </div>
        <div class="order-1 w-full pt-4 md:w-8/12 md:order-2">
          <div class="tracking-tight">
            <ArticlePreview v-for="post in posts" :id="post.id" :key="post.id" article-type="analysis"
              :title="post.title" :date="post.date" :tag-list="post.tagList" :excerpt="post.previewText"
              :publication="post.publication" :thumbnail-image="post.thumbnailUrl" />
          </div>

          <div v-if="showLoadMore" class="py-6 text-center">
            <a class="inline-block px-8 py-4 font-semibold leading-none text-gray-600 bg-white rounded shadow-2xl shadow-inner cursor-pointer hover:shadow-outline hover:bg-gray-100"
              @click="appendStories()">
              Load More
              <font-awesome-icon class="mr-1 text-base tracking-tight"
                :icon="{ prefix: 'fas', iconName: 'arrow-down' }" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<style scoped>

</style>
<script setup>
import axios from 'axios'
import format from 'date-fns/format'

import ArticlePreview from '@/components/News/ArticlePreview'
import MobileTopFixAd from '@/components/Widgets/AdSense/MobileTopFixAd.vue'
import PageTopAd from '@/components/Widgets/AdSense/PageTopAd'
import SideBarAd from '@/components/Widgets/AdSense/SideBarAd'
import { ref } from "vue";

const showLoadMore = ref(false);
const page = ref(1);

// const story = await useAsyncStoryblok('analysis/', { version: 'published' })

// console.log(story)

defineProps({ blok: Object })

const posts = ref(null)
const rels = ref(null)

const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories', {
  version: 'published',
  starts_with: 'analysis/',
  is_startpage: false,
  resolve_relations: ["publication"]
})

rels.value = data.rels;

posts.value = data.stories.filter((story) => story.content.component == 'Original_Article' || story.content.component == 'Advanced_Article')
  .map((bp) => {
    return {
      id: bp.slug,
      title: bp.content.title,
      fullSlug: bp.full_slug,
      date: format(
        new Date(bp.published_at),
        'dd MMMM, yyyy | HH:mm aaaa'
      ),
      tagList: bp.tag_list,
      publication: rels.value.filter(rel => rel.uuid == bp.content.publication)[0],
      previewText: bp.content.summary,
      thumbnailUrl: bp.content.thumbnail.url,
    }
  });


// let title = "";


onMounted(() => {
  // title = story.value.content.title;
});

// asyncData(context) {
//   return context.app.$storyapi
//     .get('cdn/stories', {
//       version: 'published',
//       starts_with: 'analysis/',
//       resolve_relations: 'publication',
//     })
//     .then((res) => {
//       return {
//         posts: res.data.stories
//           // .filter((story) => story.content.component == 'Original_Article')
//           .map((bp) => {
//             return {
//               id: bp.slug,
//               title: bp.content.title,
//               fullSlug: bp.full_slug,
//               date: format(
//                 new Date(bp.published_at),
//                 'dd MMMM, yyyy | HH:mm aaaa'
//               ),
//               tagList: bp.tag_list,
//               publication: bp.content.publication,
//               previewText: bp.content.summary,
//               thumbnailUrl: bp.content.thumbnail.url,
//             }
//           }),
//       }
//     })
//     .catch((res) => {
//       if (!res.response) {
//         return this.$nuxt.error({
//           statusCode: 404,
//           message: 'Failed to receive content form api',
//         })
//         // context.error({
//         //   statusCode: 404,
//         //   message: 'Failed to receive content form api'
//         // })
//       } else {
//         // context.error({
//         //   statusCode: res.response.status,
//         //   message: res.response.data
//         // })
//         return this.$nuxt.error({
//           statusCode: res.response.status,
//           message: res.response.data,
//         })
//       }
//     })
// },



  // async mounted() {
  // use the bridge to listen to events
  // this.$storybridge.on(['input', 'published', 'change'], (event) => {
  //   if (event.action == 'input') {
  //     if (event.story.id === this.story.id) {
  //       this.story.content = event.story.content
  //     }
  //   } else {
  //     // window.location.reload()
  //     this.$nuxt.$router.go({
  //       path: this.$nuxt.$router.currentRoute,
  //       force: true,
  //     })
  //   }
  // })

  // const story = await useAsyncStoryblok("analysis", { version: "published" })

// },

// methods: {
//     async getNextSetOfStories(page) {
//     //TODO: get this from .env
//     let preview_token = process.env.STORYBLOK_PREVIEW_TOKEN

//     let stories = []
//     let tags = []

//     try {
//       let res = await axios.get('stories', {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         baseURL: 'https://api.storyblok.com/v1/cdn/',
//         params: {
//           version: 'published',
//           starts_with: 'analysis/',
//           resolve_relations: 'publication',
//           per_page: 25,
//           page: page,
//           token: preview_token,
//         },
//       })

//       stories = res.data.stories
//     } catch (e) {
//       console.log(e)
//     }

//     const posts = stories
//       .filter((story) => story.content.component == 'Original_Article')
//       .map((story) => {
//         return {
//           id: story.slug,
//           title: story.content.title,
//           fullSlug: story.full_slug,
//           date: format(
//             new Date(story.published_at),
//             'dd MMMM, yyyy | HH:mm aaaa'
//           ),
//           tagList: story.tag_list,
//           publication: story.content.publication,
//           previewText: story.content.summary,
//           thumbnailUrl: story.content.thumbnail.url,
//         }
//       })
//     return posts
//   },

//     async appendStories() {
//     this.page = this.page + 1

//     //since we are fething 25 stories at a time
//     //TODO: handle edge cases 50,75 100

//     let posts = await this.getNextSetOfStories(this.page)
//     if (posts.length < 25) {
//       this.showLoadMore = false
//     }
//     this.posts = [...this.posts, ...posts]
//   },
// },
</script>

<style scoped>

</style>
