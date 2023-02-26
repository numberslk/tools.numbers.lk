<template>
  <div class="mb-32">
    <!--  <h1>StickyNoteTiltedAd</h1> -->
    <!-- <textarea
      name="note"
      spellcheck="false"
    >The meaning of life is to find your gift. The purpose of life is to give it away.  -Anonymous
    </textarea> -->
    <ins
      class="m-1 bg-transparent rounded shadow-sm min-w-ads adsbygoogle"
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
  name: 'StickyNoteTiltedAd',
  components: {},

  props: {
    adSlot: {
      type: String,
      default: '5757287273',
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

.note {
  width: 20em;
  min-height: 18em;
  background: #f8de59;
  position: relative;
  filter: drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.8));
  /* transform: rotate(7deg) translateX(-50%); */
  top: 50px;
  /* left: 50%; */
}
.note:before {
  content: '';
  position: absolute;
  right: 2em;
  bottom: -2em;
  left: 0;
  border: 1em solid #f8de59;
  z-index: -1;
}
.note:after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -2em;
  border-width: 2em 2em 0 0;
  border-style: solid;
  border-color: #d69722 transparent;
  filter: drop-shadow(-4px 5px 9px rgba(0, 0, 0, 0.5));
}

textarea {
  font: italic 1.2em Georgia, Times, serif;
  background: transparent;
  width: 14.4em;
  height: 5.8em;
  margin: 20% 0.8em 0 0.8em;
  padding: 0;
  border: 0;
  overflow: hidden;
  outline-style: none;
  resize: none;
}
</style>

