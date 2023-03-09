import UnpluginComponentsVite from "unplugin-vue-components/vite"
import IconsResolver from "unplugin-icons/resolver"
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config

export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true
  },

  // css
  css: [
    "~/assets/sass/vendor.scss",
    "~/assets/sass/app.scss",
    "~/assets/css/main.css"
  ],

  // plugins
  plugins: ["~/plugins/navbar.ts"],

  // build
  build: {
    transpile: ["@headlessui/vue"]
  },
  // modules
  modules: [
    "unplugin-icons/nuxt",
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@nuxt/content",
    "@vueuse/nuxt",
    "nuxt-windicss",
    "@nuxt/image-edge",
    ["@storyblok/nuxt", { accessToken: process.env.STORYBLOK_PREVIEW_TOKEN }]
  ],

  runtimeConfig: {
    // STORYBLOK_AUTH_TOKRN: process.env.STORYBLOK_AUTH_TOKRN,
    STORYBLOK_PUBLIC_TOKEN: process.env.STORYBLOK_PUBLIC_TOKEN,
    STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    NEWSORG_API_KEY: process.env.NEWSORG_API_KEY,

    public: {
      DISQUS_SHORT_NAME: process.env.DISQUS_SHORT_NAME,
      BASE_URL: process.env.BASE_URL,
      BACKEND_URL: process.env.BACKEND_URL
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // experimental features
  experimental: {
    reactivityTransform: false
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: "Icon"
          })
        ]
      })
    ]
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" }
  },

  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "si"]
    }
  },

  // vueuse
  vueuse: {
    ssrHandlers: true
  },

  // windicss
  windicss: {
    // analyze: {
    //   analysis: {
    //     interpretUtilities: false,
    //   },
    //   server: {
    //     port: 4000,
    //     open: false,
    //   },
    // },
    scan: true
  },

  // content
  content: {
    documentDriven: true,
    markdown: {
      mdc: true
    },
    highlight: {
      theme: "github-dark"
    }
  }
})
