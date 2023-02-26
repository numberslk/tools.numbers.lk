<template>
  <div>
    <section
      class="pt-12"
    >
      <div
        class="w-full max-w-2xl"
      >
        <div class="flex flex-wrap items-center text-sm text-grey-dark">
          <!-- TODO: tags need a component -->
          <div
            v-for="tag in article.tagList"
            :key="tag"
          >
            <span class="inline-flex justify-end float-right px-3 py-1 m-1 ml-0 font-semibold text-gray-800 bg-gray-300">{{ tag }}</span>
          </div>
        </div>
        <!-- style="font-family:cheltenham-italic-500" -->
        <div class="justify-center mt-4 rounded shadow-md wrapper">
          <div class="video-responsive">
            <iframe
              width="560"
              height="315"
              :src="article.link"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>

        <div>
          <p class="mt-8 text-sm font-semibold text-left text-gray-600 md:text-sm">
            {{ article.date }}
          </p>
          <p class="text-sm font-semibold text-left text-blue-700 md:text-base">
            {{ article.publication.content.name }}
          </p>
        </div>
        <RowAd />
        <h2
          style="font-family:'Georgia'"
          class="text-2xl leading-tight text-left text-gray-800 md:text-3xl xl:text-4xl font-heading"
        >
          {{ article.title }}
        </h2>

        <p class="pt-2 pb-4 text-lg italic font-normal text-left text-gray-700">
          {{ article.excerpt }}
        </p>
        <SocialShare />
        <!-- style="font-family:'cheltenham-normal-500'" -->
        <p
          class="mt-6 mb-8 text-lg leading-normal text-justify text-gray-500 md: markdown"
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
import RowAd from '../Widgets/AdSense/RowAd'
import SocialShare from '../Core/SocialShare'

export default {
  name: 'VideoArticle',
  components: {
    Disqus,
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
/* TODO: get rid of these crazy css with tailwind when you have tiem p-4*/
.video-responsive {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}
.video-responsive iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
