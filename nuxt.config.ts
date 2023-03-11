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
  plugins: ["~/plugins/navbar.ts", "~/plugins/vue-gtag.client.ts"],

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
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-9851193750585592'
    }]
  ],
  runtimeConfig: {
    public: {
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
