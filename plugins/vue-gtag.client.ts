import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  nuxtApp.vueApp.use(
    VueGtag,
    {
      config: {
        id: "G-X1XL4BCTE4",
      },
    },
    router
  );
});
