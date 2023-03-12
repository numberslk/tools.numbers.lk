<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'

export interface IMenuItem {
  type: 'link' | 'button'
  text: string
  href?: any
  route?: any
}

const { t } = useLang()
const app = useAppConfig() as AppConfigInput
const menus = computed((): IMenuItem[] => [
  // {
  //   type: 'link',
  //   text: t('pages.getting-started.nav'),
  //   route: { name: 'getting-started' },
  // },
  // { type: 'link', text: t('pages.about.nav'), route: { name: 'about' } },
  // { type: 'link', text: t('pages.blank.nav'), route: { name: 'blank' } },
  // { type: 'link', text: t('pages.test.nav'), route: { name: 'test' } },
  // { type: 'link', text: t('pages.post.nav'), route: { name: 'post' } },
  // { type: 'link', text: t('pages.setting.nav'), route: { name: 'setting' } },
  { type: 'link', text: t('pages.home.nav'), route: { name: 'index' } },
  { type: 'link', text: t('pages.electricity-bill-calculator.nav'), route: { name: 'eleccal' } },
  { type: 'link', text: t('pages.water-bill-calculator.nav'), route: { name: 'watercal' } },
  // { type: 'link', text: t('pages.opinions-and-analysis.nav'), route: { name: 'analysis' } },
  // {
  //   type: 'button',
  //   text: t('pages.dashboard.nav'),
  //   route: { name: 'dashboard' },
  // },
])
</script>

<template>
  <BuilderNavbar>
    <template #banner>
      <div class="px-4 py-1 text-xs text-center text-white capitalize lg:px-8 bg-primary-500">
        <span class="mr-1">
          {{ $t('banners.welcome', { app_name: app.name }) }}
          <Anchor class="font-bold underline" :text="$t('others.learn_more')" href="https://numbers.lk" />
        </span>
      </div>
    </template>
    <template #menu>
      <div class="relative items-center hidden ml-auto lg:flex">
        <nav class="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300" role="navigation">
          <ul class="flex items-center space-x-8">
            <li v-for="(item, i) in menus" :key="i">
              <Anchor v-if="item.type === 'link'" :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
                class="capitalize hover:no-underline hover:text-slate-900 hover:dark:text-white">{{ item.text }}
              </Anchor>
              <Button v-else-if="item.type === 'button'" :text="item.text" size="xs" class="font-extrabold capitalize"
                :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" />
            </li>
          </ul>
        </nav>
        <div class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </template>

    <template #options="{ toggleOptions }">
      <ActionSheet @on-close="toggleOptions(false)">
        <ActionSheetBody>
          <ActionSheetHeader text="Menu" />
          <nav class="font-semibold leading-6 text-gray-600 dark:text-gray-300">
            <ul class="flex flex-col">
              <li v-for="(item, i) in menus" :key="i" class="flex w-full" :class="{
                'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/[0.2]':
                  item.type === 'link',
              }">
                <Anchor v-if="item.type === 'link'" :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined" class="flex-1 capitalize hover:no-underline">{{ item.text }}
                </Anchor>
                <Button v-else-if="item.type === 'button'" :text="item.text" size="xs"
                  class="flex-1 font-extrabold capitalize" :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined" />
              </li>
            </ul>
          </nav>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.theme_switcher.change_theme') }}
          </div>
          <div class="mt-2">
            <ThemeSwitcher type="select-box" />
          </div>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.language_switcher.change_language') }}
          </div>
          <div class="mt-2">
            <LanguageSwitcher type="select-box" />
          </div>
        </ActionSheetBody>
      </ActionSheet>
    </template>
  </BuilderNavbar>
</template>
