<template>
  <!-- <div class="z-10 flex flex-wrap w-full h-32 my-auto bg-gray-200 rounded-lg lg:h-48"> -->
  <div
    class="items-center justify-center text-center"
    style="height:280px"
  >
    <!-- ad bar ad -->
    <ins
      style="display:block; margin: 4px auto"
      class="adsbygoogle adslot_1"
      :data-ad-client="googleAdId"
      data-ad-slot="6834582767"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>
<script>
export default {
  name: 'AdBar',
  components: {},

  data() {
    return {
      googleInit: null,
      googleAdId: 'ca-pub-9851193750585592',
    }
  },

  mounted() {
    let timeout = 500
    if (this.timeout) timeout = this.timeout
    this.googleInit = setTimeout(() => {
      if (typeof window !== 'undefined')
        (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, timeout)
  },

  destroyed() {
    if (this.googleInit) clearTimeout(this.googleInit)
  },
}
</script>
<style scoped>
.adslot_1 {
  height: 100px;
}
@media (min-width: 500px) {
  .adslot_1 {
    height: 60px;
  }
}
@media (min-width: 800px) {
  .adslot_1 {
    height: 90px;
  }
}
</style>
