<template>
  <NuxtLayout name="page">
    <div class="px-4 pt-4 mx-auto text-gray-900 dark:text-gray-300 font-atkinson">
      <section class="px-4 py-8">
        <div class="w-full max-w-2xl mx-auto">
          <h1 class="text-3xl text-center md:text-4xl">
            {{ title }} <span class="text-green-500">Numbers.lk</span>
          </h1>
          <article class="mt-6 mb-8 leading-relaxed prose lg:prose-lg dark:prose-invert" v-html="articleContent" />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { marked } from 'marked'
import { ref } from 'vue'
import { reactive, computed, onMounted } from "vue";

// let content = ref(null);
// const { slug } = useRoute().params;
const story = await useAsyncStoryblok("about", { version: "published" });

let title = ref("");

onMounted(() => {
  title.value = story.value.content.title;
});

const articleContent = computed(() => marked(story.value.content.content))


</script>

<style scoped>

</style>
