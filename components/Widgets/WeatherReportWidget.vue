<template>
  <!-- w-full lg:w-1/2 xl:w-1/3 -->
  <div
    class="flex flex-1 m-1"
  >
    <div class="flex flex-col w-full text-sm bg-white rounded shadow-sm px-auto">
      <div class="flex items-center justify-between p-2 text-xs font-medium text-gray-800">
        <div class="text-gray-800">
          <span class="inline-block w-3 h-3 mr-1 rounded-full live dot" />
          <span class="inline-block">Weather Report | Last 24 Hours</span>
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
        <div class="flex flex-col items-center w-1/3 px-2 mx-auto md:px-3 lg:px-4">
          <span class="text-xs text-gray-600">Max</span>
          <span class="text-xs text-gray-600">Rainfall</span>
          <div class="flex flex-col items-center text-center">
            <img
              class="w-12 h-12 mx-auto align-middle"
              src="../../assets/img/weather/rain.svg"
              alt="Rain"
            >
            <span class="text-sm font-medium text-gray-700">{{ weatherReport.maxRainFall.value }}</span>
            <span
              class="text-xs font-medium text-gray-700 break-all"
            >{{ weatherReport.maxRainFall.place }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center w-1/3 px-2 mx-auto border-l-2 md:px-3 lg:px-4">
          <div class="flex flex-col items-center text-center">
            <span class="text-xs text-gray-600">Max Temperature</span>
            <img
              class="w-12 h-12 mx-auto align-middle"
              src="../../assets/img/weather/clear-day.svg"
              alt="Rain"
            >
            <span class="text-sm font-medium text-gray-700">{{ weatherReport.maxTemp.value }}</span>
            <span class="text-xs font-medium text-gray-700">{{ weatherReport.maxTemp.place }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center w-1/3 px-2 border-l-2 md:px-3 lg:px-4">
          <div class="flex flex-col items-center text-center">
            <span class="text-xs text-gray-600">Min Temperature</span>
            <img
              class="w-12 h-12 mx-auto align-middle"
              src="../../assets/img/weather/partly-cloudy-day-snow.svg"
              alt="Rain"
            >
            <span class="text-sm font-medium text-gray-700">{{ weatherReport.minTemp.value }}</span>
            <span class="text-xs font-medium text-gray-700">{{ weatherReport.minTemp.place }}</span>
          </div>
        </div>
      </div>
      <div class="py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100 align-self-end">
        {{ weatherReport.reportDate }}
      </div>
    </div>
  </div>
</template>

<script>
import SiteAPI from '@/service/siteAPI'
import Util from '@/util/util'
import format from 'date-fns/format'

export default {
  name: 'WeatherReport',
  components: {},

  data() {
    return {
      weatherReport: {
        minTemp: {
          value: 0,
          place: '',
        },
        maxTemp: {
          value: 0,
          place: '',
        },
        maxRainFall: {
          value: 0,
          place: '',
        },
        reportDate: format(new Date(), 'cccc MMMM dd, yyyy'),
      },
    }
  },

  async mounted() {
    const report = await this.getWeatherLast24Hours()
    // console.log(weatherReport)

    this.weatherReport = {
      minTemp: {
        value: report.Min_Temperature,
        place: report.Min_Temperature_Location,
      },
      maxTemp: {
        value: report.Max_Temperature,
        place: report.Max_Temperature_Location,
      },
      maxRainFall: {
        value: report.Max_Rainfall,
        place: report.Max_Rainfall_Location,
      },
      reportDate: format(new Date(report.date), 'cccc | MMMM dd, yyyy'),
    }

    // set out the data first
  },

  methods: {
    async getWeatherLast24Hours() {
      // const base1Url = process.env.BACKEND_BASE_URL;

      const baseUrl = process.env.BACKEND_URL
      const resource = 'stat/weatherLast24Hours'

      // console.log(base1Url);
      // eslint-disable-next-line prefer-const
      let allData = []
      try {
        allData = await SiteAPI.get({
          baseUrl,
          resource,
        })
        return allData.data
      } catch (e) {
        return allData
      }
    },

    setWidget(report) {},
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
