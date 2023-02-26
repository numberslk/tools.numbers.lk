<template>
  <div>
    <section
      class="pt-12"
    >
      <div
        class="w-full"
      >
        <div class="flex flex-wrap items-center text-sm text-grey-dark">
          <div
            v-for="tag in article.tagList"
            :key="tag"
          >
            <span class="inline-flex justify-end float-right px-3 py-1 m-1 mb-4 ml-0 font-semibold text-gray-800 bg-gray-300">{{ tag }}</span>
          </div>
        </div>
        <h2
          style="font-family:'Georgia'"
          class="text-3xl leading-tight text-left text-gray-800 md:text-4xl xl:text-4xl font-heading"
        >
          {{ article.title }} - {{ article.publication.name }}
        </h2>

        <p class="pt-2 pb-4 text-lg italic font-normal text-left text-gray-700">
          {{ article.excerpt }}
        </p>
        <div class="mt-4">
          <img
            :data-src="article.image"
            class="lazyload"
            alt="Alternate text for the image"
          >
          <div class="pt-2 text-sm font-semibold text-left text-gray-600 heading">
            {{ article.thumbnailTitle }}
          </div>
          <div class="text-xs font-semibold leading-tight tracking-tight text-left text-gray-600">
            {{ article.thumbnailDesc }}
          </div>
          <div class="w-6 mt-1 text-gray-400 border-b-2 border-gray-700" />
        </div>
        <SocialShare />
        <div>
          <p class="mt-8 text-sm font-semibold text-left text-gray-600 md:text-sm">
            {{ article.date }}
          </p>
          <p class="text-sm font-semibold text-left text-blue-700 md:text-base">
            {{ article.author }}
          </p>
        </div>
        <p
          class="mt-8 mb-4 text-lg text-left text-gray-500 markdown"
          v-html="article.content"
        />

        <div
          v-for="listItem in article.list"
          :key="listItem.number"
        >
          <AdvancedImageListItem
            v-if="listItem.component=='list_item_advance_image'"
            :item="listItem"
          />
          <AdvancedVideoListItem
            v-if="listItem.component=='list_item_advance_video'"
            :item="listItem"
          />
          <ListAd
            v-if="listItem.component=='list_item_google_ad' || listItem.component=='list_item_google_ad_02' || listItem.component=='list_item_google_ad_03'"
            :item="listItem"
          />
        </div>
        <p
          class="mt-4 mb-4 text-lg text-left text-gray-500 markdown"
          v-html="article.conclusion"
        />
        <p class="pb-16 font-sans text-gray-200">
          -
        </p>
        <Disqus
          class="pt-2"
          shortname="numbers-lk"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus'
import AdvancedImageListItem from '../Core/AdvancedImageListItem'
import AdvancedVideoListItem from '../Core/AdvancedVideoListItem'
import ListAd from '../Widgets/AdSense/ListAd'
import SocialShare from '../Core/SocialShare'

export default {
  name: 'ListArticle',
  components: {
    AdvancedImageListItem,
    AdvancedVideoListItem,
    ListAd,
    SocialShare,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },

  head: {
    script: [
      {
        src: 'https://platform.twitter.com/widgets.js',
        async: true,
        defer: true,
      },
    ],
  },
}
</script>

<style scoped>
</style>
