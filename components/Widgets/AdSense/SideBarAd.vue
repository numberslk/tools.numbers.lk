<template>
  <div>
    <ins
      class="rounded shadow-sm adsbygoogle"
      style="display:block; text-align:center; min-width:300px; width:300px"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      :data-ad-client="googleAdId"
      data-ad-slot="4328673073"
    />
  </div>
</template>
<script>
export default {
  name: 'SideBarAd',
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
