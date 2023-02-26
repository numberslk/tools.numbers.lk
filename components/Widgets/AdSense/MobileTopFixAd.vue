<template>
  <div>
    <!-- mobile.fixed.top ad -->
    <ins
      class="adsbygoogle"
      style="display:inline-block;width:280px;height:60px !important"
      data-ad-client="ca-pub-9851193750585592"
      :data-ad-slot="adSlot"
    />
  </div>
</template>

<script>
export default {
  name: 'MobileTopFixAd',
  components: {},

  props: {
    adSlot: {
      type: String,
      default: '2371757799',
    },
  },
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
