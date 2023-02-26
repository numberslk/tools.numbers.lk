<template>
  <div
    style="min-width:300px; width:300px"
    class="my-8 md:my-12"
  >
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-format="fluid"
      data-ad-layout-key="+3r+p6-1g-33+t3"
      :data-ad-client="googleAdId"
      data-ad-slot="8540590644"
    />
  </div>
</template>

<script>
export default {
  name: 'NewsFeedAd',
  components: {},

  data() {
    return {
      googleInit: null,
      googleAdId: 'ca-pub-9851193750585592',
    }
  },

  mounted() {
    let timeout = 200
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
</style>
