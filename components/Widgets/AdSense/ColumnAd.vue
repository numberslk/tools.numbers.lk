<template>
  <div style="min-width:300px;">
    <ins
      style="display:block"
      class="m-1 text-center align-middle adsbygoogle"
      :data-ad-client="googleAdId"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script>
export default {
  name: 'NewsFeedAd',
  components: {},
  props: {
    adSlot: {
      type: String,
      default: '2806910057',
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
