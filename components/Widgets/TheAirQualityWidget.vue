<template>
  <div
    class="flex flex-1 m-1"
  >
    <div class="flex flex-col w-full text-sm bg-white rounded shadow-sm px-auto">
      <div class="flex items-center justify-between p-2 text-xs font-medium text-gray-800">
        <div class="text-gray-800">
          <span class="inline-block w-3 h-3 mr-1 rounded-full live dot" />
          <span class="inline-block">Air Quality</span>
        </div>
        <div>
          <a
            title="http://www.meteo.gov.lk/index.php?lang=en"
            class="text-xs font-semibold text-gray-700 hover:underline hover:text-indigo-600"
            href="http://www.meteo.gov.lk/index.php?lang=en"
          ><font-awesome-icon
            class="mr-1 text-xs tracking-tight"
            :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"
          /></a>
        </div>
      </div>
      <div class="flex flex-row justify-around py-2 mx-auto my-auto">
        <span id="city-aqi-container" />
      </div>
      <div class="py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100 align-self-end">
        sakjka
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheAirQualityWidget',
  components: {},

  beforeMount() {},
  mounted() {
    let aqicnScript = document.createElement('script')
    aqicnScript.setAttribute('src', '../../scripts/aqicn.js')
    document.head.appendChild(aqicnScript)
  },
}
</script>
<style scoped>
.live.dot {
  background-color: #7ed321;
  /* height: 14px;
  width: 14px;
  border-radius: 50px; */
  -webkit-animation: pulsate 2.5s ease-out;
  -webkit-animation-iteration-count: infinite;
}

@keyframes pulsate {
  0% {
    -webkit-transform: scale(0.4, 0.4);
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1, 1);
    opacity: 0;
  }
}
</style>

