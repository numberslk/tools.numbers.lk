<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import p from './../../package.json'
const app = useAppConfig() as AppConfigInput

const date = ref(new Date().getFullYear())

</script>

<template>
  <footer
    class="relative bottom-0 pt-16 pb-6 bg-slate-100 text-slate-800 dark:text-slate-100 dark:bg-slate-800 font-atkinson">
    <div class="container px-4 mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full px-4 lg:w-6/12">
          <h4 class="text-3xl font-semibold">
            Let's keep in touch!
          </h4>
          <h5 class="mt-0 mb-2 text-lg text-gray-600 dark:text-gray-200">
            Find us on any of these platforms,
          </h5>
          <div class="flex mt-6">
            <a class="flex items-center justify-center w-10 h-10 mr-2 font-normal text-blue-400 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
              href="https://twitter.com/numberslka" target="_blank" type="button">
              <IconSimpleIcons:twitter class="" />
            </a>
            <a class="flex items-center justify-center w-10 h-10 mr-2 font-normal text-blue-600 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
              href="https://facebook.com/numbers.lk" target="_blank" type="button">
              <IconSimpleIcons:facebook class="" />
            </a>
            <a class="flex items-center justify-center w-10 h-10 mr-2 font-normal text-pink-600 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
              href="http://instragram.com/numbers.lk" target="_blank" type="button">
              <IconSimpleIcons:instagram class="" />
            </a>
          <a class="flex items-center justify-center w-10 h-10 mr-2 font-normal text-green-600 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
            href="http://go.numbers.lk/whatsApp" target="_blank" type="button">
            <IconSimpleIcons:whatsapp class="" />
          </a>
          <a class="flex items-center justify-center w-10 h-10 mr-2 font-normal text-blue-400 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
            href="http://t.me/numbers.lk" target="_blank" type="button">
            <IconSimpleIcons:telegram class="" />
          </a>
          <!-- <a
              class="items-center justify-center w-10 h-10 mr-2 font-normal text-gray-900 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
                              href="https://github.com/numbers.lk"
                              target="_blank"
                              type="button"
                            >
                              <font-awesome-icon
                                class="mt-3 ml-3"
                                :icon="{ prefix: 'fab', iconName: 'github' }"
                              />
                            </a> -->
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-400">
      <div class="flex flex-wrap items-center justify-center md:justify-between">
        <div class="w-full px-4 mx-auto text-center md:w-4/12">
          <div class="py-1 text-sm font-semibold text-gray-600 dark:text-gray-200">
            Copyright © {{ date }}
            <a href="https://www.numbers.lk" class="text-gray-600 dark:text-gray-200 hover:text-gray-900">Numbers.lk</a>.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
