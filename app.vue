<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
AppSetup()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')
const app = useAppConfig() as AppConfigInput

useHead({
  title: app.name,
  titleTemplate: '%s - Numbers.lk',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Numbers.lk Tools',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Numbers.lk Tools',
    },
    {
      hid: 'twitter:image',
      property: 'twitter:image',
      content: './assets/images/numberslktools.png',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'summary_large_image',
    }

  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

// const nestedShowed = ref(true);
// const router = useRouter();
// router.beforeEach((to, from) => {
//   if (to.fullPath.split("/")[1] !== from.fullPath.split("/")[1]) {
//     nestedShowed.value = false;
//   }
// });


</script>

<template>
  <div>
    <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">

    <Body class="antialiased text-gray-800 transition-colors duration-300 bg-white dark:text-gray-200 dark:bg-gray-900">
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>

    </Html>
  </div>
</template>
