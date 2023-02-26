<template>
  <!-- w-full lg:w-1/2 xl:w-1/3 -->
  <div class="flex flex-1 w-full m-1">
    <div class="flex flex-col w-full text-sm bg-white rounded shadow-sm">
      <div class="flex items-center justify-between p-2 text-xs font-medium text-gray-800">
        <div class="text-gray-800">
          <span class="inline-block w-3 h-3 mr-1 rounded-full live dot" />
          <span class="inline-block">COVID-19 Situation |  Sri Lanka</span>
        </div>
        <div>
          <a
            class="text-xs text-gray-700 hover:underline hover:text-indigo-600"
            href="/covid19_dashboard"
          ><font-awesome-icon
            class="mr-1 text-xs tracking-tight"
            :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"
          /></a>
        </div>
      </div>
      <div class="flex justify-around py-2 mx-auto my-auto">
        <div class="flex flex-col items-center px-2 md:px-3 lg:px-2">
          <span class="pb-3 text-xs text-center text-gray-600 whitespace-no-wrap">Total</span>
          <div
            :class="
              `inline-flex mb-2 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-3 text-center text-white bg-yellow-500 rounded-full shadow-lg`
            "
          >
            <font-awesome-icon
              class="text-xs sm:text-sm"
              :icon="{ prefix: 'fas', iconName: 'clinic-medical' }"
            />
          </div>
          <div class="w-10 xs:w-12 sm:w-20 md:w-16 lg:w-12 xl:w-20 trend">
            <trend
              :data="coronaDailySummery.map(
                (item) => item.local_total_cases
              )"
              :gradient="[`#d69e2e`]"
              :auto-draw="autoDraw"
              :auto-draw-duration="3000"
              stroke-width="6px"
              stroke-opacity="0.6"
            />
          </div>
          <div class="flex flex-col items-center text-center">
            <span class="text-base font-medium text-yellow-700 md:text-xl">{{ coronaData.localTotalCases || 0 }}</span>
            <!-- <span class="text-xs text-gray-600">Total cases</span> -->
          </div>
        </div>
        <div class="flex flex-col items-center px-2 mx-auto border-l-2 border-gray-200 md:px-3 lg:px-2">
          <span class="pb-3 text-xs text-center text-gray-600 whitespace-no-wrap">Active</span>
          <div
            :class="
              `inline-flex mb-2 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-3 text-center text-white bg-orange-400 rounded-full shadow-lg`
            "
          >
            <font-awesome-icon
              class="text-xs sm:text-sm"
              :icon="{ prefix: 'fas', iconName: 'procedures' }"
            />
          </div>
          <div class="w-10 xs:w-12 sm:w-20 md:w-16 lg:w-12 xl:w-20 trend">
            <trend
              :data="coronaDailySummery.map(
                (item) => (item.local_total_cases - item.local_deaths - item.local_recovered)
              )"
              :gradient="[`#dd6b20`]"
              :auto-draw="autoDraw"
              :auto-draw-duration="3000"
              stroke-width="6px"
              stroke-opacity="0.6"
              smooth
            />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-base font-medium text-orange-700 md:text-xl">{{ coronaData.localActiveCases || 0 }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center px-2 mx-auto border-l-2 border-gray-200 md:px-3 lg:px-2">
          <span class="pb-3 text-xs text-center text-gray-600">Recoveries</span>
          <div
            :class="
              `inline-flex mb-2 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-3 text-center text-white bg-green-400 rounded-full shadow-lg`
            "
          >
            <font-awesome-icon
              class="text-xs sm:text-sm"
              :icon="{ prefix: 'fas', iconName: 'running' }"
            />
          </div>
          <div class="w-10 xs:w-12 sm:w-20 md:w-16 lg:w-12 xl:w-20 trend">
            <trend
              :data="coronaDailySummery.map(
                (item) => item.local_recovered
              )"
              :gradient="['green']"
              :auto-draw="autoDraw"
              :auto-draw-duration="3000"
              stroke-width="6px"
              stroke-opacity="0.6"
              smooth
            />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-base font-medium text-green-700 md:text-xl">{{ coronaData.localRecovered || 0 }}</span>
            <!-- <span class="text-xs text-center text-gray-600 ">Recoveries</span> -->
          </div>
        </div>
        <div class="flex flex-col items-center px-2 mx-auto border-l-2 border-gray-200 md:px-3 lg:px-2">
          <span class="pb-3 text-xs text-center text-gray-600">Deaths</span>
          <div
            :class="
              `inline-flex mb-2 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-3 text-center text-white bg-red-400 rounded-full shadow-lg`
            "
          >
            <font-awesome-icon
              class="text-xs sm:text-sm"
              :icon="{ prefix: 'fas', iconName: 'bed' }"
            />
          </div>
          <div class="w-10 xs:w-12 sm:w-20 md:w-16 lg:w-12 xl:w-20 trend">
            <trend
              :data="coronaDailySummery.map(
                (item) => item.local_deaths
              )"
              :gradient="['red']"
              :auto-draw="autoDraw"
              :auto-draw-duration="3000"
              stroke-width="6px"
              stroke-opacity="0.6"
              smooth
            />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-base font-medium text-red-700 md:text-xl">{{ coronaData.localDeaths || 0 }}</span>
            <!-- <span class="text-xs text-center text-gray-600 ">Deaths</span> -->
          </div>
        </div>
        <div class="flex flex-col items-center px-2 mx-auto border-l-2 border-gray-200 md:px-3 lg:px-2">
          <span class="pb-3 text-xs text-center text-gray-600 whitespace-no-wrap">New</span>
          <div
            :class="
              `inline-flex mb-2 items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-3 text-center text-white bg-blue-400 rounded-full shadow-lg`
            "
          >
            <font-awesome-icon
              class="text-xs sm:text-sm"
              :icon="{ prefix: 'fas', iconName: 'ambulance' }"
            />
          </div>
          <div class="w-10 xs:w-12 sm:w-20 md:w-16 lg:w-12 xl:w-20 trend">
            <trend
              :data="coronaDailySummery.map(
                (item) => item.local_new_cases
              )"
              :gradient="['#3182ce']"
              :auto-draw="autoDraw"
              :auto-draw-duration="3000"
              stroke-width="6px"
              stroke-opacity="0.6"
              smooth
            />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-base font-medium text-blue-700 md:text-xl">{{ coronaData.localNewCases || 0 }}</span>
            <!-- <span class="text-xs text-center text-gray-600 ">New cases</span> -->
          </div>
        </div>
      </div>
      <div class="py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100">
        last updated at: {{ coronaData.lastUpdatedTime }}
      </div>
    </div>
  </div>
</template>

<script>
import SiteAPI from '@/service/siteAPI'
import Util from '@/util/util'
import format from 'date-fns/format'

export default {
  name: 'COVID19Situation',
  components: {},

  data() {
    return {
      title: 'COVID-19',
      iconBackgroundColor: 'orange',
      statIcon: 'chart-pie',
      mainStat: '0',
      subStat: '0',
      trend: [1, 2, 3, 4, 5, 6, 7],
      autoDraw: true,
      date: new Date().getFullYear(),
      dataLoaded: false,
      coronaDailySummery: [],
      coronaData: {
        lastUpdatedTime: null,
        globalTotalCases: null,
        globalNewCases: null,
        globalDeaths: null,
        globalRecovered: null,
        globalNewDeaths: null,
        localTotalCases: null,
        localHospitalized: null,
        localDeaths: null,
        localNewCases: null,
        localNewDeaths: null,
        localRecovered: null,
      },

      coronaStats: {
        globalTotalCasesIncrease: 0,
        globalNewCasesIncrease: 0,
        globalDeathIncrease: 0,
        globalRecoveriesIncrease: 0,
        globalNewDeathsIncrease: 0,
        localTotalCasesIncrease: 0,
        localHospitalizedIncrease: 0,
        localDeathsIncrease: 0,
        localNewCasesIncrease: 0,
        localNewDeathsIncrease: 0,
        localRecoveredIncrease: 0,
        localRecoveriesToday: 0,
      },
    }
  },

  async mounted() {
    // set out the data first
    this.coronaDailySummery = await this.getAllCoronaDailyData()
    this.$nextTick(async function () {
      this.$nuxt.$loading.start()
      await this.getLatestCoronaStats()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },

  methods: {
    async getLatestCoronaStats() {
      const baseUrl = process.env.BACKEND_URL
      // const baseUrl = process.env.BACKEND_BASE_URL;
      // const baseUrl = "https://test-dot-twitter-dot-numbers-lk.appspot.com";
      const resource = 'corona/getStats'

      // eslint-disable-next-line prefer-const
      let allData = await SiteAPI.get({
        baseUrl,
        resource,
      })

      const dayByesterDayData = allData.data[0]
      let yesterdayData = allData.data[1]
      let todayData = allData.data[2]

      // since data was not updated today data sometimes comes empty
      if (todayData == null) {
        todayData = yesterdayData
        yesterdayData = dayByesterDayData
      }

      const todayDataFull = {
        lastUpdatedTime: format(
          new Date(todayData.updated_time),
          'h:mm a | MMMM dd, yyyy'
        ),
        globalTotalCases: Util.numberWithCommas(todayData.global_total_cases),
        globalNewCases: Util.numberWithCommas(todayData.global_new_cases),
        globalDeaths: Util.numberWithCommas(todayData.global_deaths),
        globalRecovered: Util.numberWithCommas(todayData.global_recovered),
        globalNewDeaths: Util.numberWithCommas(todayData.global_new_deaths),
        localTotalCases: Util.numberWithCommas(todayData.local_total_cases),
        localActiveCases: Util.numberWithCommas(
          todayData.local_total_cases -
            todayData.local_deaths -
            todayData.local_recovered
        ),
        localHospitalized: Util.numberWithCommas(
          todayData.local_total_number_of_individuals_in_hospitals
        ),
        localDeaths: Util.numberWithCommas(todayData.local_deaths),
        localNewCases: Util.numberWithCommas(todayData.local_new_cases),
        localNewDeaths: Util.numberWithCommas(todayData.local_new_deaths),
        localRecovered: Util.numberWithCommas(todayData.local_recovered),
      }

      const coronaStats = {
        globalTotalCasesIncrease: Util.getPresentageIncrease(
          yesterdayData.global_total_cases,
          todayData.global_total_cases
        ),
        globalNewCasesIncrease: Util.getPresentageIncrease(
          yesterdayData.global_new_cases,
          todayData.global_new_cases
        ),
        globalDeathIncrease: Util.getPresentageIncrease(
          yesterdayData.global_deaths,
          todayData.global_deaths
        ),
        globalRecoveriesIncrease: Util.getPresentageIncrease(
          yesterdayData.global_recovered,
          todayData.global_recovered
        ),
        globalNewDeathsIncrease: Util.getPresentageIncrease(
          yesterdayData.global_new_deaths,
          todayData.global_new_deaths
        ),
        localTotalCasesIncrease: Util.getPresentageIncrease(
          yesterdayData.local_total_cases,
          todayData.local_total_cases
        ),
        localHospitalizedIncrease: Util.getPresentageIncrease(
          yesterdayData.local_total_number_of_individuals_in_hospitals,
          todayData.local_total_number_of_individuals_in_hospitals
        ),
        localDeathsIncrease: Util.getPresentageIncrease(
          yesterdayData.local_deaths,
          todayData.local_deaths
        ),
        localNewCasesIncrease: Util.getPresentageIncrease(
          yesterdayData.local_new_cases,
          todayData.local_new_cases
        ),
        localNewDeathsIncrease: Util.getPresentageIncrease(
          yesterdayData.local_new_deaths,
          todayData.local_new_deaths
        ),

        localRecoveredIncrease: Util.getPresentageIncrease(
          yesterdayData.local_recovered,
          todayData.local_recovered
        ),
        localRecoveriesToday:
          todayData.local_recovered - yesterdayData.local_recovered,
        localsDischargedToday: this.hopsitalizedOrCleared(
          yesterdayData,
          todayData
        ),
      }

      this.coronaData = todayDataFull
      this.coronaStats = coronaStats
      this.dataLoaded = true
    },

    async getAllCoronaDailyData() {
      // const base1Url = process.env.BACKEND_BASE_URL;

      const baseUrl = process.env.BACKEND_URL
      const resource = 'corona/getAllDailyStats'

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
    // add this method since people in the hospitals go up and down
    hopsitalizedOrCleared(yesterdayData, todayData) {
      const data = { difference: '', clearedOrHospitalized: '' }
      const total =
        yesterdayData.local_total_number_of_individuals_in_hospitals -
        todayData.local_total_number_of_individuals_in_hospitals

      data.difference = Math.abs(total)
      if (total > 0) {
        data.clearedOrHospitalized = 'cleared'
      } else {
        data.clearedOrHospitalized = 'hospitalized'
      }

      return data
    },
  },
}
</script>

<style scoped>
.trend svg {
  height: 80%;
}
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
    -webkit-transform: scale(1.2, 1.2);
    opacity: 0;
  }
}
</style>
