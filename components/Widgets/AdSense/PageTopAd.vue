

<template>
  <div style="min-width:300px;">
    <ins
      class="rounded shadow-sm adsbygoogle"
      style="display:inline-block;width:740px;height:60px; text-align:center;"
      :data-ad-client="googleAdId"
      data-ad-slot="1320731703"
    />
  </div>
</template>
<script>
export default {
  name: 'HomeTopAd',
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
