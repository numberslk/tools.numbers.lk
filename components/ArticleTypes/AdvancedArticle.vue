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
          <CreditedImage
            :src="article.image"
            :caption=" article.thumbnailTitle"
            :sub-caption="article.thumbnailDesc"
            :alt-text="article.thumbnailDesc"
          />
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
          class="mt-4 mb-4 text-lg text-left text-gray-500 markdown"
          style="font-family:'Georgia'"
          v-html="article.content"
        />
        <div
          v-for="(block, index) in article.list"
          :key="index"
        >
          <CreditedImage
            v-if="block.component=='credited_image'"
            class="py-4"
            :src="block.thumbnail.image"
            :caption="block.thumbnail.caption"
            :alt-text="block.thumbnail.alt_tag"
            :credits="block.thumbnail.copyright_info"
          />
          <CreditedVideo
            v-if="block.component=='credited_video'"
            :src="block.video.url"
            :caption="block.video_description"
          />
          <ListAd
            v-if="block.component=='list_item_google_ad' || block.component=='list_item_google_ad_2' || block.component=='list_item_google_ad_3'"
            :item="block"
          />
          <MarkdownSection
            v-if="block.component=='markdown_section'"
            style="font-family:'Georgia'"
            :item="block"
          />
        </div>
        <p
          style="font-family:'Georgia'"
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
import CreditedImage from '../Core/CreditedImage'
import CreditedVideo from '../Core/CreditedVideo'
import MarkdownSection from '../Core/MarkdownSection'
import SocialShare from '../Core/SocialShare.vue'
import ListAd from '../Widgets/AdSense/ListAd'

export default {
  name: 'AdvancedArticle',
  components: {
    CreditedImage,
    CreditedVideo,
    MarkdownSection,
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
