<template>
  <div id="container">
    <div class="paper">
      <div class="tape" />
      <div class="red-line first" />
      <div class="red-line" />
      <ins
        class="m-1 bg-transparent rounded shadow-sm adsbygoogle"
        style="display:block; text-align:center; min-width:300px"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9851193750585592"
        data-ad-slot="2469613101"
      />
      <!-- <ul id="lines">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul> -->
      <div class="left-shadow" />
      <div class="right-shadow" />
    </div><!--end paper-->
  </div>
</template>

<script>
export default {
  name: 'StickyNoteCopyPaperAd',
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
@import url(https://fonts.googleapis.com/css?family=Permanent+Marker);

.sticky {
  background: linear-gradient(#fefcaf, #fffeda);
  padding: 5px 20px 10px 20px;
  width: 250px;
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

html,
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
font,
img,
ul,
li {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}
body {
  line-height: 1;
}
ul {
  list-style-type: none;
}

#container {
  width: 320px;
  margin: 0 auto;
}
.paper {
  position: relative;
  width: 300px;
  height: 250px;
  background-color: #faf8e5;
  border: 1px solid #e3e3e3;
}
.red-line {
  height: 250px;
  width: 1px;
  background-color: #ef8b8b;
  float: left;
  margin-left: 4px;
}
.first {
  margin-left: 40px;
}
ul#lines {
  margin-top: 40px;
}
ul#lines li {
  height: 28px;
  line-height: 28px;
  color: #4d84c8;
  font-family: Georgia;
  font-style: italic;
  font-size: 16px;
  width: 225px;
  border-top: 1px solid #f2f0df;
  padding-left: 75px;
}

.tape {
  position: absolute;
  top: -15px;
  right: 80px;
  width: 130px;
  height: 35px;
  background-color: #fff;
  opacity: 0.6;
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
  border-right: 1px dashed rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 1px 0px #cccccc;
  -moz-box-shadow: 0px 0px 1px 0px #cccccc;
  box-shadow: 0px 0px 1px 0px #cccccc;
  -webkit-transform: rotate(-2deg) skew(0, 0) translate(0%, -5px);
  -moz-transform: rotate(-2deg) skew(0, 0) translate(0%, -5px);
  -o-transform: rotate(-2deg) skew(0, 0) translate(0%, -5px);
  transform: rotate(-2deg) skew(0, 0) translate(0%, -5px);
}

.left-shadow {
  width: 140px;
  height: 140px;
  bottom: -5px;
  left: -12px;
  position: absolute;
  z-index: -6;
  display: inline-block;
  -webkit-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  -moz-transform: scale(1) rotate(274deg) translate(20px, 25px) skew(9deg, 0deg);
  -webkit-transform: scale(1) rotate(274deg) translate(20px, 25px)
    skew(9deg, 0deg);
  -o-transform: scale(1) rotate(274deg) translate(20px, 25px) skew(9deg, 0deg);
  -ms-transform: scale(1) rotate(274deg) translate(20px, 25px) skew(9deg, 0deg);
  transform: scale(1) rotate(274deg) translate(20px, 25px) skew(9deg, 0deg);
}
.right-shadow {
  width: 140px;
  height: 140px;
  bottom: -13px;
  right: -4px;
  position: absolute;
  z-index: -6;
  display: inline-block;
  -webkit-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  box-shadow: -10px -10px 10px rgba(0, 0, 0, 0.4);
  -moz-transform: scale(1) rotate(184deg) translate(20px, 25px) skew(9deg, 0deg);
  -webkit-transform: scale(1) rotate(184deg) translate(20px, 25px)
    skew(9deg, 0deg);
  -o-transform: scale(1) rotate(184deg) translate(20px, 25px) skew(9deg, 0deg);
  -ms-transform: scale(1) rotate(184deg) translate(20px, 25px) skew(9deg, 0deg);
  transform: scale(1) rotate(184deg) translate(20px, 25px) skew(9deg, 0deg);
}
</style>

