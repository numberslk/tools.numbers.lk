<template>
  <div>
    <AdBar class="items-center justify-center hidden mt-4 text-center md:block" />
    <MobileTopFixAd ad-slot="2371757799" class="items-center justify-center block mt-4 text-center md:hidden" />
    <div id="post" v-editable="article.blok" class="px-2 mx-auto">
      <div class="flex flex-wrap">
        <div class="top-0 order-2 w-full pt-12 my-auto xl:pt-56 xl:pb-40 xl:sticky xl:w-1/12">
          <SocialShareIcons />
        </div>
        <div class="order-1 w-full px-2 border-gray-300 lg:px-2 xl:w-7/12 xl:order-2">
          <ExternalNewsArticle v-if="article.type == 'Article'" :article="article" />
          <OriginalNewsArticle v-if="article.type == 'Original_Article'" :article="article" />
          <AdvancedArticle v-if="article.type == 'Advanced_Article'" :article="article" />
          <TweetArticle v-if="article.type == 'Tweet_Article'" :article="article" />
          <ListArticle v-if="article.type == 'List_Article'" :article="article" />
        </div>
        <div class="order-3 w-full px-2 mt-8 bg-gray-200 xl:mt-20 xl:w-4/12">
          <!-- <Covid19SituationWidget /> -->
          <ColumnAd ad-slot="2806910057" class="hidden my-2 shadow-sm lg:block" />
          <WeatherReportWidget class="hidden my-2 shadow-sm lg:block" />
          <ColumnAd ad-slot="4822413892" class="hidden my-2 shadow-sm lg:block" />
          <ColumnAd ad-slot="8570087211" class="my-2 shadow-sm lg:block" />
        </div>
      </div>
      <MobileTopFixAd ad-slot="5669318054" class="items-center justify-center block mt-4 text-center md:hidden" />
      <section class="px-4 pt-32">
        <h2 class="mb-8 text-3xl text-center font-heading">
          <!-- style="font-family:'Georgia'" -->
          Latest Articles
        </h2>
        <div class="flex flex-wrap -mx-4">
          <RecentArticle v-for="recentArticle in recentArticles" :id="recentArticle.id" :key="recentArticle.id"
            class="flex w-full px-4 mb-8 lg:w-1/3 lg:mb-0" :title="recentArticle.title"
            :excerpt="recentArticle.previewText" article-type="analysis" :thumbnail-image="recentArticle.thumbnailUrl"
            :publication="recentArticle.publication" :date="recentArticle.date" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format"
import marked from "marked"
import RecentArticle from "@/components/News/RecentArticle"
import SiteAPI from "@/service/siteAPI"
import AdBar from "@/components/Widgets/AdSense/AdBar"
import MobileTopFixAd from "@/components/Widgets/AdSense/MobileTopFixAd"
import SocialShareIcons from "@/components/Widgets/SocialShareIcons"
import Covid19SituationWidget from "@/components/Widgets/Covid19SituationWidget"
import WeatherReportWidget from "@/components/Widgets/WeatherReportWidget"
import ColumnAd from "@/components/Widgets/AdSense/ColumnAd"

import ExternalNewsArticle from "@/components/ArticleTypes/ExternalNewsArticle"
import OriginalNewsArticle from "@/components/ArticleTypes/OriginalNewsArticle"
import AdvancedArticle from "@/components/ArticleTypes/AdvancedArticle"

import TweetArticle from "@/components/ArticleTypes/TweetArticle"
import ListArticle from "@/components/ArticleTypes/ListArticle"

export default {
  components: {
    RecentArticle,
    SocialShareIcons,
    AdBar,
    MobileTopFixAd,
    ColumnAd,
    // Covid19SituationWidget,
    WeatherReportWidget,
    ExternalNewsArticle,
    OriginalNewsArticle,
    AdvancedArticle,
    TweetArticle,
    ListArticle
  },

  async asyncData(context) {
    const ra = await context.app.$storyapi.get("cdn/stories", {
      version: "published",
      resolve_relations: "publication",
      starts_with: "analysis/",
      page: "1",
      per_page: "3"
    })

    const article = await context.app.$storyapi.get(
      "cdn/stories/analysis/" + context.params.postId,
      {
        version: "published",
        resolve_relations: "publication"
      }
    )

    const recentArticles = ra.data.stories.map((bp) => {
      return {
        id: bp.slug,
        title: bp.content.title,
        previewText: bp.content.summary,
        thumbnailUrl: bp.content.thumbnail.url,
        publication: bp.content.publication,
        date: format(new Date(bp.published_at), "dd MMMM, yyyy")
        // date: format(new Date(), 'dd MMMM, yyyy')
      }
    })

    async function parseMarkdown(markdown) {
      // marked.setOptions({
      //   renderer: new marked.Renderer(),
      //   breaks: true
      // })

      if (markdown != undefined) {
        return marked(markdown)
      } else {
        return ""
      }
    }

    // const indate = await getExchangeRateVariationOneMonth()

    return {
      recentArticles,
      article: {
        blok: article.data.story.content,
        type: article.data.story.content.component,
        list: article.data.story.content.list,
        author: article.data.story.content.author,
        image: article.data.story.content.thumbnail.url,
        thumbnailTitle: article.data.story.content.thumbnail_title,
        thumbnailDesc: article.data.story.content.thumbnail_description,
        tagList: article.data.story.tag_list,
        title: article.data.story.content.title,
        fullSlug: article.data.story.full_slug,
        excerpt: article.data.story.content.summary,
        tweet: await parseMarkdown(article.data.story.content.tweet),
        publication: article.data.story.content.publication,
        date: format(
          new Date(article.data.story.published_at),
          "dd MMMM, yyyy | HH:mm aaaa"
        ),
        // date: format(new Date(), 'dd MMMM, yyyy | HH:mm aaaa'),
        originalLink:
          article.data.story.content.link != undefined
            ? article.data.story.content.link.url
            : "",
        content: await parseMarkdown(article.data.story.content.content),
        conclusion: await parseMarkdown(article.data.story.content.conclusion)
      }
    }
  },

  head() {
    return {
      title: this.article.title,

      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.article.title
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.article.excerpt
        },
        {
          hid: "description",
          name: "description",
          content: this.article.excerpt
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.article.image
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "numbers.lk"
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://numbers.lk/${this.article.fullSlug}`
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "numbers.lk"
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "article"
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "article"
        },

        {
          hid: "og:url",
          name: "og:url",
          content: `https://numbers.lk/${this.article.fullSlug}`
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@numberslka"
        },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@numberslka"
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.article.thumbnailTitle
        }
      ],
      htmlAttrs: {
        lang: "en",
        amp: true
      }
    }
  },
  mounted() {
    // this.$storyblok.init()
    // this.$storyblok.on('change', () => {
    //   location.reload(true)
    // })
  }
}
</script>
