<template>
  <div>
    <section
      class="pt-12"
    >
      <div
        class="w-full"
      >
        <div class="flex flex-wrap items-center text-sm text-grey-dark">
          <!-- TODO: tags need a component -->
          <div
            v-for="tag in article.tagList"
            :key="tag"
          >
            <span class="inline-flex justify-end float-right px-3 py-1 m-1 mb-4 ml-0 font-semibold text-gray-800 bg-gray-300">{{ tag }}</span>
          </div>
        </div>
        <!-- style="font-family:'Trebuchet MS'" -->

        <!-- style="font-family:cheltenham-italic-500" -->

        <h2
          style="font-family:'Georgia'"
          class="text-3xl leading-tight text-left text-gray-800 md:text-4xl xl:text-4xl font-heading"
        >
          {{ article.title }} - {{ article.publication.name }}
        </h2>

        <p class="pt-2 pb-4 pr-2 text-base italic font-normal text-left text-gray-700">
          {{ article.excerpt }}
        </p>
        <!-- style="font-family:cheltenham-normal-500" -->
        <!-- style="font-family:franklin-small-normal-500" -->
        <!-- style="font-family:graphik-normal-500" -->
        <!-- style="font-family:imperial-normal-500" Good-->
        <!-- style="font-family:karnak-cursive-normal-400" -->
        <!-- style="font-family:karnak-normal-500" good -->
        <!-- style="font-family:karnak-normal-500" -->
        <!-- style="font-family:schnyder-s-normal-600" -->
        <!-- style="font-family:'Trebuchet MS'" -->

        <CreditedImage
          :src="article.image"
          :caption=" article.thumbnailTitle"
          :sub-caption="article.thumbnailDesc"
          :alt-text="article.thumbnailDesc"
        />
        <SocialShare />
        <RowAd />
        <div>
          <p class="mt-8 text-sm font-semibold text-left text-gray-600 md:text-sm">
            {{ article.date }}
          </p>
          <p class="text-sm font-semibold text-left text-blue-700 md:text-base">
            {{ article.author }}
          </p>
        </div>

        <p
          class="mt-8 mb-8 text-lg leading-relaxed tracking-normal text-left markdown"
          style="font-family:'Georgia'"
          v-html="
            article.content"
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
import RowAd from '../Widgets/AdSense/RowAd'
import SocialShare from '../Core/SocialShare.vue'

export default {
  name: 'OriginalNewsArticle',
  components: {
    CreditedImage,
    RowAd,
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
