
<template>
  <div
    style="min-width:300px"
    class="my-8 :md:my-12"
  >
    <ins
      class="adsbygoogle"
      style="display:block; text-align:center;"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9851193750585592"
      :data-ad-slot="item.ad_slot_id"
    />
  </div>
</template>

<script>
export default {
  name: 'ListAd',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      googleInit: null,
    }
  },

  mounted() {
    //only include adsense js for first google list ad only
    if (this.item.component == 'list_item_google_ad') {
      let timeout = 200
      if (this.timeout) timeout = this.timeout
      this.googleInit = setTimeout(() => {
        if (typeof window !== 'undefined')
          (window.adsbygoogle = window.adsbygoogle || []).push({})
      }, timeout)
    }
  },

  destroyed() {
    if (this.googleInit) clearTimeout(this.googleInit)
  },
}
</script>
<style scoped>
</style>
