<template>
  <div>
    <!-- Tall Ad -->
    <ins
      class="m-1 adsbygoogle"
      style="display:inline-block;width:120px;height:768px"
      data-ad-client="ca-pub-9851193750585592"
      :data-ad-slot="adSlot"
    />
  </div>
</template>

<script>
export default {
  name: 'TallAd',
  components: {},

  props: {
    adSlot: {
      type: String,
      default: '6866354814',
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
