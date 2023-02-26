<template>
  <div>
    <section
      class="pt-12"
    >
      <div
        class="w-full max-w-2xl"
      >
        <div class="flex flex-wrap text-sm text-grey-dark">
          <!-- TODO: tags need a component -->
          <div
            v-for="tag in article.tagList"
            :key="tag"
          >
            <span class="inline-flex justify-end float-right px-3 py-1 m-1 mb-4 ml-0 font-semibold text-gray-800 bg-gray-300">{{ tag }}</span>
          </div>
        </div>
        <div
          style="font-family:'Trebuchet MS'"
          class="pb-4 text-base font-semibold text-left text-blue-700"
        >
          {{ article.date }}
        </div>
        <!-- style="font-family:cheltenham-italic-500" -->

        <h2
          style="font-family:'Georgia'"
          class="text-2xl leading-tight text-left text-gray-800 md:text-3xl xl:text-4xl font-heading"
        >
          {{ article.title }} - {{ article.publication.name }}
        </h2>

        <p class="pt-2 pb-4 text-lg italic font-normal text-left text-gray-700">
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
        <div class="mt-4 rounded shadow-md wrapper">
          <div class="tout-box-reveal">
            <div class="overlay-gradient" />
            <figure class="picture image-hover">
              <picture>
                <source
                  :data-srcset="`${article.image}?webp`"
                  type="image/webp"
                  class="lazyload blur-up"
                >
                <source
                  :data-srcset="article.image"
                  type="image/png"
                  class="lazyload blur-up"
                >
                <img
                  :data-src="article.image"
                  class="lazyload blur-up"
                  alt="Alternate text for the image"
                >
              </picture>
            </figure>
            <figure class="picture image">
              <picture>
                <source
                  :data-srcset="`${article.image}?webp`"
                  type="image/webp"
                >
                <source
                  :data-srcset="article.image"
                  type="image/png"
                >
                <img
                  :data-src="article.image"
                  class="lazyload"
                  :alt="article.thumbnailTitle"
                >
              </picture>
              <!-- <figcaption>{{ article.thumbnailTitle }}</figcaption> -->
            </figure>

            <div class="content-wrapper">
              <div class="content">
                <!-- TODO: add and discribe the image for us add a section to storyblock -->
                <!-- <span class="heading">{{ article.thumbnailTitle }}</span> -->
              </div>
            </div>
            <div class="leading-tight tracking-tighter text-left md:tracking-normal content-hover">
              <div class="content">
                <span class="font-semibold text-left appearance-none heading image-head">{{ article.thumbnailTitle }}</span>
                <span class="leading-tight tracking-tight text-left md:tracking-normal image-subhead">{{ article.thumbnailDesc | wordLimit(200) }}</span>
              </div>
            </div>
          </div>
        </div>
        <RowAd />
        <!-- style="font-family:'cheltenham-normal-500'" -->
        <SocialShare />
        <p
          style="font-family:'Georgia'"
          class="mt-6 mb-8 text-lg leading-normal text-justify text-gray-500 markdown"
          v-html="
            article.content"
        />

        <div class="justify-center mb-2 text-center">
          <a
            v-if="article.originalLink!=''"
            class="justify-between inline-block px-8 py-4 leading-none text-gray-700 bg-white rounded shadow-2xl shadow-inner hover:shadow-outline hover:bg-gray-100"
            :href="article.originalLink"
            target="_blank"
          >
            <font-awesome-icon
              class="mr-1 text-base tracking-tight"
              :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"
            />
            Read the full Article</a>
        </div>
        <SearchEngineAd />
      </div>
    </section>
  </div>
</template>

<script>
import RowAd from '../Widgets/AdSense/RowAd'
import SearchEngineAd from '@/components/Widgets/AdSense/SearchEngineAd'
import SocialShare from '../Core/SocialShare'

export default {
  name: 'ExternalNewsArticle',
  components: {
    RowAd,
    SearchEngineAd,
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
body,
html {
  height: 100vh;
  width: 100vw;
  background: #fff;
  color: #fff;
  display: flex;
  font-size: 1em;
  line-height: 1.5;
  background: #18181b;
}

.wrapper {
  /* max-width: 600px; */
}

.lead {
  font-style: italic;
}

.tout-box-reveal {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
}
.tout-box-reveal .overlay-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  background-image: linear-gradient(
    to top,
    #ad1f23,
    rgba(255, 255, 255, 0) 75%
  );
  transition-duration: 2s, 0.6s;
  transition-property: opacity, transform;
  transform-timing-function: ease-in-out;
  transform: translateY(100%);
}
.tout-box-reveal img {
  min-width: 100%;
  width: 100%;
  height: auto;
  opacity: 1;
  transition-duration: 0.6s;
  transition-property: opacity, transform;
  transform: scale3d(1.1, 1.1, 1);
}
.tout-box-reveal figure.image {
  opacity: 1;
  transition-duration: 0.6s;
  transition-property: opacity, transform;
  transform: scale3d(1.1, 1.1, 1);
}
.tout-box-reveal figure.image-hover {
  position: absolute;
  transition-duration: 0.4s;
  transition-property: transform;
  transform-timing-function: ease-in-out;
  transform: scale3d(1.1, 1.1, 1);
}
.tout-box-reveal .content-wrapper {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  z-index: 2;
  opacity: 1;
  transition: opacity 1s;
  transform-timing-function: ease-in-out;
  transform: translateY(0%);
}
.tout-box-reveal .content-wrapper .content {
  opacity: 1;
  transition-duration: 0.2s, 0.4s;
  transition-property: opacity, transform;
  transform-timing-function: ease-in-out;
  padding: 2.1em;
}
.tout-box-reveal:hover .image-hover,
.tout-box-reveal:hover .image {
  transform: scale3d(1.2, 1.2, 1);
}
.tout-box-reveal:hover .image {
  opacity: 0;
}
.tout-box-reveal:hover .content-wrapper .content {
  transform: translateY(100%);
  opacity: 0;
}
.tout-box-reveal:hover .content-hover {
  opacity: 1;
}
.tout-box-reveal:hover .content-hover .content {
  opacity: 1;
  transform: translateY(0%);
}
.tout-box-reveal:hover .overlay-gradient {
  opacity: 1;
  transform: translateY(11%);
}
.tout-box-reveal .content-hover {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(to top, black, rgba(255, 255, 255, 0) 100%);
  transition: opacity 1s;
  transform-timing-function: ease-in-out;
  transform: translateY(0%);
}
.tout-box-reveal .content-hover .content {
  padding: 2.1em;
  transition-duration: 0.3s, 0.5s;
  transition-property: opacity, transform;
  transform-timing-function: ease-in-out;
  transform: translateY(100%);
}
.tout-box-reveal .content-hover .content .heading {
  opacity: 1;
  display: block;
  margin-bottom: 0.375em;
}

.tout-box-reveal .content-hover .content .heading {
}
.image-head {
  @apply text-sm !important;
  @screen md {
    @apply text-base !important;
  }
}

.image-subhead {
  @apply text-xs !important;
  @screen md {
    @apply text-sm !important;
  }
}
</style>
