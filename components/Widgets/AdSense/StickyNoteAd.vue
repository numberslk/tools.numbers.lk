<template>
  <!-- <div class="sticky hidden md:block"> -->
  <div class="mt-8">
    <ins
      class="m-1 bg-transparent rounded shadow-sm adsbygoogle"
      style="display:block; text-align:center; min-width:300px"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9851193750585592"
      :data-ad-slot="adSlot"
    />
  </div>
</template>

<script>
export default {
  name: 'StickyNoteAd',
  components: {},
  props: {
    adSlot: {
      type: String,
      default: '9546706089',
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
@import url(https://fonts.googleapis.com/css?family=Permanent+Marker);

.sticky {
  background: linear-gradient(#fefcaf, #fffeda);
  padding: 5px 20px 10px 20px;
  width: 300px;
  height: auto;
  margin: 30px auto;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 2% / 50%;
  position: relative;
  font: 13px 'Lucida Grande', Serif;
}

.sticky h1 {
  font-family: 'Permanent Marker', cursive;
  color: #eb2626;
}

.sticky:before,
.sticky:after {
  content: '';
  z-index: -1;
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 70%;
  max-width: 300px;
  max-height: 100px;
  height: 55%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: skew(-15deg) rotate(-6deg);
}

.sticky:after {
  left: auto;
  right: 20px;
  transform: skew(15deg) rotate(6deg);
}
</style>

