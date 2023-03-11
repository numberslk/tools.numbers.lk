<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'

// state
const app = useAppConfig() as AppConfigInput
const navbar = ref(null)
const showDrawer = useState<boolean>('navbar.showDrawer', () => false)
const showOptions = useState<boolean>('navbar.showOptions', () => false)

// lifecycle
let timer: NodeJS.Timer
onMounted(() => {
  if (!navbar.value) return

  // scroll
  const { onScroll } = useSticky(navbar.value, 0)
  setTimeout(() => onScroll(), 50)

  // on show on mobile
  setInterval(() => {
    // must in mobile
    const minW = 1024
    if (window.innerWidth < minW) {
      updateDrawerOptions()
    }
  }, 100)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

// methods
const updateDrawerOptions = () => {
  // drawer
  if (showDrawer.value || showOptions.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}
const toggleDrawer = () => (showDrawer.value = !showDrawer.value)
const toggleOptions = (show?: boolean) => {
  if (show) {
    showOptions.value = show
  } else {
    showOptions.value = !showOptions.value
  }
}
</script>

<template>
  <div ref="navbar"
    class="font-atkinson backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 dark:border-gray-50/[0.2] bg-white/[0.5] dark:bg-slate-900/[0.5]">
    <div id="navbar-banner" class="banner">
      <!-- <slot name="banner" /> -->
    </div>
    <div class="w-full mx-auto max-w-8xl">
      <div class="py-3 mx-4 lg:px-8 lg:mx-0">
        <div class="relative flex items-center">
          <!-- drawer:toggle -->
          <div v-if="$slots['drawer']" class="flex items-center self-center justify-center mr-2 lg:hidden">
            <button class="flex items-center focus:outline-none" aria-label="Toggle Drawer Menu" @click="toggleDrawer()">
              <span class="flex items-center text-lg text-gray-600 dark:text-gray-300" aria-hidden="true">
                <IconUil:bars v-if="!showDrawer" />
                <IconUil:times v-else />
              </span>
            </button>
          </div>
          <!-- title -->
          <slot name="title">
            <NuxtLink tag="a"
              class="flex-none mr-3 overflow-hidden font-bold text-gray-900 md:w-auto text-md dark:text-gray-200"
              :to="{ name: 'index' }">
              <span class="sr-only">home</span>
              <span class="flex items-center">

                <img loading="lazy" alt="numbers.lk logo" src="../../assets/icons/icon.png"
                  class="inline-block w-8 h-8 mr-1.5 font-atkinson text-lg text-primary-500" />
                {{ app.name }}
                <span class="inline-block ml-1 text-lg font-semibold text-green-600"> tools.</span>
              </span>

            </NuxtLink>
          </slot>
          <!-- menu -->
          <slot name="menu" />
          <!-- options:toggle -->
          <div v-if="$slots['options']" class="flex justify-end flex-1 lg:hidden">
            <div class="flex space-x-4 border-r mr-4 pr-4 border-gray-900/10 dark:border-gray-50/[0.2]">
              <LanguageSwitcher />
            </div>
            <button class="flex items-center focus:outline-none" aria-label="Toggle Options Menu"
              @click="toggleOptions()">
              <span class="flex items-center text-sm text-gray-600 dark:text-gray-300" aria-hidden="true">
                <icon-fa-solid:ellipsis-v />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Teleport to="#app-after">
        <!-- drawer -->
        <Transition name="slide-fade-from-up" mode="out-in">
          <div v-if="showDrawer && $slots['drawer']"
            class="fixed top-0 left-0 z-30 flex flex-col w-screen h-screen pt-12 bg-gray-100 lg:hidden dark:bg-slate-800">
            <div class="relative flex flex-col flex-1 overflow-y-auto">
              <slot name="drawer" :toggle-drawer="toggleDrawer" />
            </div>
          </div>
        </Transition>

        <!-- options -->
        <div v-if="showOptions && $slots['options']">
          <slot name="options" :toggle-options="toggleOptions" :show-options="showOptions" />
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

a.router-link-active {
  font-weight: bold;
}

a.router-link-exact-active {
  color: theme('colors.slate.900');
}

html.dark {
  a.router-link-exact-active {
    color: theme('colors.white');
  }
}
</style>
