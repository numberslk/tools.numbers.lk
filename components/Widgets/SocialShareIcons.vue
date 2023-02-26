<template>
  <div class="flex flex-col">
    <!-- <a
      class="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-400 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
      href="https://twitter.com/numberslka"
      target="_blank"
      type="button"
    >
      <font-awesome-icon
        class="mt-3 ml-3"
        :icon="{ prefix: 'fab', iconName: 'twitter' }"
      />
    </a>
    <a
      class="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-600 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
      href=""
      target="_blank"
      type="button"
    >
      <font-awesome-icon
        class="mt-3 ml-3"
        :icon="{ prefix: 'fab', iconName: 'facebook' }"
      />
    </a>
    <a
      class="items-center justify-center w-10 h-10 mr-2 font-normal text-pink-600 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
      href="http://instragram.com/numbers.lk"
      target="_blank"
      type="button"
    >
      <font-awesome-icon
        class="mt-3 ml-3"
        :icon="{ prefix: 'fab', iconName: 'instagram' }"
      />
    </a> -->
    <section id="ContactUs" class="scrolling-auto transform scale-80 md:scale-100">
      <div>
        <div class="social-overlap process-scetion">
          <div class="container">
            <div class="justify-center">
              <div>
                <div class="items-center justify-center social-bar">
                  <div class="text-center social-icons">
                    <a :href="`//www.facebook.com/sharer.php?u=${shareUrl}`" target="_blank"
                      class="slider-nav-item"><font-awesome-icon class="mt-3 ml-3 text-blue-400 awesome-icon"
                        :icon="{ prefix: 'fab', iconName: 'facebook' }" /></a>
                    <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}`" target="_blank"
                      class="slider-nav-item"><font-awesome-icon class="mt-3 ml-3 text-blue-600 awesome-icon"
                        :icon="{ prefix: 'fab', iconName: 'twitter' }" /></a>
                    <a :href="`whatsapp://send?text=${encodeURIComponent(shareUrl)}`" data-action="share/whatsapp/share"
                      target="_blank" class="slider-nav-item"><font-awesome-icon
                        class="mt-3 ml-3 text-green-600 awesome-icon"
                        :icon="{ prefix: 'fab', iconName: 'whatsapp' }" /></a>
                    <!-- <a
                      :href="`https://www.instagram.com/?url=${shareUrl}`"
                      target="_blank"
                      class="slider-nav-item"
                    ><font-awesome-icon
                      class="mt-3 ml-3 text-pink-600 awesome-icon"
                      :icon="{ prefix: 'fab', iconName: 'instagram' }"
                    /></a> -->
                    <a :href="`https://www.linkedin.com/cws/share?url=${shareUrl}`" target="_blank"
                      class="slider-nav-item"><font-awesome-icon class="mt-3 ml-3 text-blue-400 awesome-icon"
                        :icon="{ prefix: 'fab', iconName: 'linkedin' }" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'SocialShareIcons',
  data() {
    return {
      shareUrl: '',
    }
  },

  mounted() {
    // console.log(this.$route)
    this.shareUrl = window.location.href
  },
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat Alternates', sans-serif;
}

* {
  padding: 0;
  margin: 0;
}

.social-overlap {
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
}

.social-bar {
  display: flex;
  border-radius: 10px;
  /* background: #fff; */
  /* box-shadow: 0 0 60px rgba(93, 70, 232, 0.15); */
  border: 1px solid#ebe9e9;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.process-scetion .slider-nav-item {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  text-align: center;
  background: #fff;
  cursor: pointer;
  transition: all 0.4s ease;
}

.social-icons a {
  border-radius: 50px;
  color: #3f345f;
  display: inline-block;
  line-height: 52px;
  height: 50px;
  width: 50px;
  box-shadow: 0 5px 25px rgba(93, 70, 232, 0.15);
  margin: 15px 15px;
  font-size: 22px;
}

a {
  text-decoration: none !important;
  color: #3f345f;
  transition: all 0.3s ease 0s;
}

.slider-nav-item:before {
  position: absolute;
  content: '';
  height: calc(100% + 16px);
  width: calc(100% + 16px);
  top: -8px;
  left: -8px;
  border-radius: 50%;
  border: 1px solid rgba(132, 132, 164, 0.35);
  animation: 1.5s linear 0s normal none infinite focuse;
}

/*socil*/
.slider-nav {
  display: flex;
}

.process-scetion .slider-nav-item {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  text-align: center;
  background: #fff;
  cursor: pointer;
  transition: all 0.4s ease;
}

.slider-nav-item:before {
  position: absolute;
  content: '';
  height: calc(100% + 16px);
  width: calc(100% + 16px);
  top: -8px;
  left: -8px;
  border-radius: 50%;
  border: 1px solid rgba(132, 132, 164, 0.35);
  animation: 1.5s linear 0s normal none infinite focuse;
}

/* .process-scetion .slider-nav-item:nth-child(2) {
  color: #40beff;
}
.process-scetion .slider-nav-item:nth-child(3) {
  color: #311f9b;
}
.process-scetion .slider-nav-item:nth-child(4) {
  color: #ff9259;
}
.process-scetion .slider-nav-item:nth-child(5) {
  color: #38385f;
} */

.process-scetion .slider-nav-item:after {
  position: absolute;
  top: 50%;
  left: 100%;
  height: 2px;
  content: '';
  width: 100%;
  background: url(/line.png) repeat 0 0;
  z-index: 0;
  animation: slide 1s linear infinite;
}

.process-scetion .slider-nav-item:last-child:after {
  /* display: none; */
}

.process-scetion .slider-nav-item:last-child:after {
  @apply hidden;
}

@screen md {
  .process-scetion .slider-nav-item:last-child:after {
    @apply block;
  }
}

.process-scetion .slider-nav-item .ikon {
  font-size: 50px;
  line-height: 80px;
}

.process-scetion .slider-nav-item.active:before {
  position: absolute;
  content: '';
  height: calc(100% + 16px);
  width: calc(100% + 16px);
  top: -8px;
  left: -8px;
  border-radius: 50%;
  border: 1px solid rgba(132, 132, 164, 0.35);
  animation: 1.5s linear 0s normal none infinite focuse;
}

@keyframes focuse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }

  75% {
    transform: scale(1.2);
    opacity: 0;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes slide {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 40px 0;
  }
}

.slider-nav-item:after {
  position: absolute;
  top: 50%;
  left: 100%;
  height: 2px;
  content: '';
  width: 100%;
  background: url(https://1bp.blogspot.com/--Btu5p654jU/XYmrVd5IcYI/AAAAAAAATQ0/4bX8aZyFBgApbJUf90KrpCfO6RvAaZ6LgCLcBGAsYHQ/s1600/line.png) repeat 0 0;
  z-index: 0;
  animation: slide 1s linear infinite;
}

@-webkit-keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.jello-horizontal {
  -webkit-animation: jello-horizontal 0.9s both;
  animation: jello-horizontal 0.9s both;
}

.social-bar a:hover .awesome-icon {
  -webkit-animation: jello-horizontal 0.9s both;
  animation: jello-horizontal 0.9s both;
}
</style>
