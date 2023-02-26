<template>
  <!-- Row Ad 360 - 90 -->

  <div>
    <ins
      class="w-full pt-2 adsbygoogle min-w-ads"
      style="display:inline-block;height:60px; text-align:center;"
      :data-ad-client="googleAdId"
      data-ad-slot="9841828285"
    />
  </div>
</template>
<script>
export default {
  name: 'RowAd',
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
