<template>
  <!-- w-full lg:w-1/2 xl:w-1/3 -->
  <div
    id="exchangeRateWidget"
    class="flex flex-1 m-1"
  >
    <div class="flex flex-col w-full text-sm bg-white rounded shadow-sm">
      <div class="flex items-center justify-between p-2 text-xs font-medium text-gray-800">
        <div class="text-gray-800">
          <span class="inline-block w-3 h-3 mr-1 rounded-full live dot" />
          <span class="inline-block">Exchange Rates | USD/LKR</span>
        </div>
        <div>
          <a
            title="https://www.cbsl.gov.lk/en/rates-and-indicators/exchange-rates"
            class="text-xs font-semibold text-gray-700 hover:underline hover:text-indigo-600"
            href="https://www.cbsl.gov.lk/en/rates-and-indicators/exchange-rates"
            target="_blank"
          ><font-awesome-icon
            class="mr-1 text-xs tracking-tight"
            :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"
          /></a>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div
          class="w-full overflow-hidden md:flex"
          style="max-width:900px"
        >
          <div :class="`flex items-center w-full px-1 sm:px-5 pt-8 pb-4 text-white bg-${exchangeRate.selling.textColor}-500 md:w-1/2`">
            <canvas
              id="exchange_rate_chart"
              class="items-center w-full mx-auto"
            />
          </div>
          <div class="flex items-center w-full p-8 text-gray-600 md:w-1/2">
            <div class="w-full">
              <h3
                class="text-lg font-semibold leading-tight text-gray-800"
              >
                Exchange Rate (USD/LKR)
              </h3>
              <h6 class="mb-4 text-sm leading-tight">
                {{ exchangeRate.date }} 2:30pm IST
              </h6>

              <div class="flex items-end w-full mb-6">
                <div class="w-1/2">
                  <div class="font-normal text-left">
                    Buying Rate
                  </div>
                  <span
                    class="block text-3xl leading-none text-gray-800"
                  > {{ exchangeRate.buying.rate }}</span>

                  <p class="block ml-2 text-sm leading-5 text-green-500">
                    <span :class="`mr-2 text-${exchangeRate.buying.textColor}-500`">
                      <font-awesome-icon
                        :icon="{ prefix: 'fas', iconName: `arrow-${exchangeRate.buying.arrowDirection}` }"
                      />
                      {{ exchangeRate.buying.change }}%
                    </span>
                  </p>
                </div>
                <div class="w-1/2">
                  <div class="font-normal text-left ">
                    Selling Rate
                  </div>
                  <span
                    class="block text-3xl leading-none text-gray-800"
                  > {{ exchangeRate.selling.rate }}</span>

                  <p class="block ml-2 text-sm leading-5 text-green-500">
                    <span :class="`mr-2 text-${exchangeRate.selling.textColor}-500`">
                      <font-awesome-icon
                        :icon="{ prefix: 'fas', iconName: `arrow-${exchangeRate.selling.arrowDirection}` }"
                      />
                      {{ exchangeRate.selling.change }}%
                    </span>
                  </p>
                </div>
              </div>

              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Buying Rate
                  </div>
                  <div
                    class="flex-1 px-3 text-right"
                  >
                    {{ exchangeRate.buying.rate }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Indicative Rate
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ exchangeRate.indicative.rate }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Selling Rate
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ exchangeRate.selling.rate }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100 align-self-end">
        {{ exchangeRate.date }}
      </div>
    </div>
  </div>
</template>

<script>
import SiteAPI from '@/service/siteAPI'
import Util from '@/util/util'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import fromUnixTime from 'date-fns/fromUnixTime'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: 'ExchangeRateWidget',
  components: {},

  props: {
    exRateReport: {
      type: Array,
      default: () => {},
    },

    exRateOneMonthData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      title: 'COVID-19',
      iconBackgroundColor: 'orange',
      statIcon: 'chart-pie',
      mainStat: '0',
      subStat: '0',
      trend: [1, 2, 3, 4, 5, 6, 7],
      autoDraw: true,
      dataLoaded: false,
      exchangeRate: {
        buying: {
          rate: '0.00',
          change: '0.0',
          arrowDirection: 'up',
          arrowColor: 'green',
        },

        indicative: {
          rate: '0.00',
          change: '0.0',
          arrowDirection: 'up',
          arrowColor: 'green',
        },

        selling: {
          rate: '0.00',
          change: '0.0',
          arrowDirection: 'up',
          arrowColor: 'green',
        },
        date: format(new Date(), 'cccc | MMMM dd, yyyy'),
      },
    }
  },

  async mounted() {
    let report = this.exRateReport
    let oneMonthData = this.exRateOneMonthData
    //TODO: remove this fix
    if (report == undefined) {
      report = await this.getExchangeRates()
      oneMonthData = await this.getExchangeRateStats()
    }

    const formatedDataIndicative = oneMonthData.map((item) => {
      return {
        date: format(new Date(Number(item.date) / 1000), 'MMM dd'),
        rate: item.indicative_rate,
      }
    })

    const formatedDataBuying = oneMonthData.map((item) => {
      return {
        date: format(new Date(Number(item.date) / 1000), 'MMM dd'),
        rate: item.buying_rate,
      }
    })

    const formatedDataSelling = oneMonthData.map((item) => {
      return {
        date: format(new Date(Number(item.date) / 1000), 'MMM dd'),
        rate: item.selling_rate,
      }
    })

    this.setWidget(report, oneMonthData)

    //TODO: lets figure outsomething middlewhere
    //https://nuxtjs.org/faq/http-proxy/
    //https://dev.to/jeremywynn/a-crazy-adventure-with-cors-nuxt-and-webmentions-5fhl

    this.$nextTick(function () {
      if (process.client) {
        let canvas = document.getElementById('exchange_rate_chart')
        if (canvas) {
          const ctx = canvas.getContext('2d')
          let gradientStroke = ctx.createLinearGradient(0, 0, 0, 150)
          let graphColor = this.exchangeRate.indicative.arrowColor
          let arrowDirection = this.exchangeRate.indicative.arrowDirection

          gradientStroke.addColorStop(0, graphColor)
          gradientStroke.addColorStop(1, '#ffffff')
          // ctx.height = 70
          const config = {
            plugins: [ChartDataLabels],
            type: 'line',
            data: {
              labels: formatedDataBuying.map((item) => item.date),
              datasets: [
                //Buying Rate
                {
                  lineTension: 0.2,
                  label: 'Buying Rate',
                  pointStyle: 'rectRounded',
                  pointRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  pointBackgroundColor: 'rgba(255, 255, 255, 0.7)',
                  // fill: true,
                  // backgroundColor: gradientStroke,
                  // borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                  // pointRadius: '1',
                  data: formatedDataBuying.map((item) => item.rate),
                  datalabels: {
                    formatter: (value) => Number(value).toFixed(2),
                    display: function (context) {
                      // your logic here, return true to show a label, else false to hide
                      // for example: display 1 label every 3 data

                      const indexOfMaxValue = context.dataset.data.reduce(
                        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
                        0
                      )

                      const numberOfDataItems = context.dataset.data.length

                      if (indexOfMaxValue == context.dataIndex) {
                        return true
                      } else if (context.dataIndex == numberOfDataItems - 1) {
                        return true
                      } else {
                        return false
                      }
                    },
                    labels: {
                      title: {
                        font: {
                          weight: 'bold',
                        },
                        // color: arrowDirection == 'up' ? '#38a169' : '#e53e3e'
                        color: '#FFF',
                      },
                    },
                    clamp: true,
                    align: 'end',
                    anchor: 'end',
                    offset: -4,
                    clip: false,
                  },
                },
                //Indicative Rate
                {
                  lineTension: 0.2,
                  label: 'Indicative Rate',
                  pointRadius: 0,
                  borderDash: [1, 1],
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  pointBackgroundColor: 'rgba(255, 255, 255, 0.7)',
                  // fill: true,
                  // backgroundColor: gradientStroke,
                  // borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                  // pointRadius: '1',
                  data: formatedDataIndicative.map((item) => item.rate),
                  datalabels: {
                    formatter: (value) => Number(value).toFixed(2),
                    display: false,
                    labels: {
                      title: {
                        font: {
                          weight: 'bold',
                        },
                        // color: arrowDirection == 'up' ? '#38a169' : '#e53e3e'
                        color: '#DED',
                      },
                    },
                    clamp: true,
                    align: 'end',
                    anchor: 'end',
                    offset: -4,
                    clip: false,
                  },
                },
                //Selling Rate
                {
                  lineTension: 0.1,
                  label: 'Selling Rate',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  pointBackgroundColor: 'rgba(255, 255, 255, 0.7)',
                  pointRadius: 2,
                  pointStyle: 'rectRot',

                  // borderDash: [5, 5],

                  // fill: true,
                  // backgroundColor: gradientStroke,
                  // borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                  // pointRadius: '1',
                  data: formatedDataSelling.map((item) => item.rate),
                  datalabels: {
                    formatter: (value) => Number(value).toFixed(2),
                    display: function (context) {
                      // your logic here, return true to show a label, else false to hide
                      // for example: display 1 label every 3 data

                      const indexOfMaxValue = context.dataset.data.reduce(
                        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
                        0
                      )

                      const numberOfDataItems = context.dataset.data.length

                      if (indexOfMaxValue == context.dataIndex) {
                        return true
                      } else if (context.dataIndex == numberOfDataItems - 1) {
                        return true
                      } else {
                        return false
                      }
                    },
                    labels: {
                      title: {
                        font: {
                          weight: 'bold',
                        },
                        // color: arrowDirection == 'up' ? '#38a169' : '#e53e3e'
                        color: '#FFF',
                      },
                    },
                    clamp: true,
                    align: 'end',
                    anchor: 'end',
                    offset: -4,
                    clip: false,
                  },
                },
              ],
            },
            options: {
              plugins: {
                datalabels: {
                  backgroundColor: function (context) {
                    return context.dataset.backgroundColor
                  },
                  borderRadius: 4,
                  color: 'white',
                  font: {
                    weight: 'bold',
                  },
                  formatter: Math.round,
                  padding: 4,
                },
              },
              layout: {
                padding: {
                  left: -5,
                  right: 20,
                  top: 16,
                  bottom: 0,
                },
                margin: {
                  left: 0,
                  right: -20,
                  top: 0,
                  bottom: 0,
                },
              },
              // maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'bottom',
                // maxWidth: 100,

                labels: {
                  filter: function (legendItem, chartData) {
                    if (
                      legendItem.datasetIndex === 0 ||
                      legendItem.datasetIndex === 2
                    ) {
                      return true
                    }
                    return false
                  },

                  fontColor: '#fff',
                  fontSize: 11,
                  usePointStyle: true,
                },
              },
              responsive: true,
              aspectRatio: 1.3,
              animation: {
                onComplete: 'done',
              },
              elements: {
                line: {
                  // borderColor: 'blue',
                  borderWidth: 1,
                  fill: false,
                },
              },
              tooltips: {
                mode: 'index',
                intersect: false,
                position: 'nearest',
              },
              pointLabels: {
                display: true,
              },
              hover: {
                mode: 'nearest',
                intersect: true,
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontColor: 'rgba(255, 255, 255, 1)',
                    },
                    gridLines: {
                      color: 'rgba(255, 255, 255, .2)',
                      borderDash: [5, 5],
                      zeroLineColor: 'rgba(255, 255, 255, .2)',
                      zeroLineBorderDash: [5, 5],
                    },
                  },
                ],
                yAxes: [
                  {
                    stepSize: 20,
                    ticks: {
                      fontColor: 'rgba(255, 255, 255, 1)',
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
              },
            },
          }
          new Chart(ctx, config)
        }
      }
    })

    // set out the data first
  },

  methods: {
    async getExchangeRates() {
      // const base1Url = process.env.BACKEND_BASE_URL;

      const baseUrl = process.env.BACKEND_URL
      const resource = 'stat/exchangeRate'

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

    async getExchangeRateStats() {
      // const base1Url = process.env.BACKEND_BASE_URL;

      const baseUrl = process.env.BACKEND_URL
      const resource = 'stat/exchangeRateStats'

      const query = {
        date: format(subDays(new Date(), 30), 'dd-MM-yyyy'),
      }
      let allData = []
      try {
        allData = await SiteAPI.get({
          baseUrl,
          resource,
          query,
        })
        return allData.data
      } catch (e) {
        return allData
      }
    },

    setWidget(report, thisWeekRates) {
      let arrowDirection = 'up'
      if (report.percentage_change < -0.009) {
        report.percentage_change = report.percentage_change * -1
        arrowDirection = 'up'
      } else if (
        report.percentage_change > -0.009 &&
        report.percentage_change < 0.01
      ) {
        arrowDirection = 'up'
        report.percentage_change = 0.0
      } else {
        arrowDirection = 'down'
      }

      let yesterdayRate = 0
      let yesterdayRateBuying = 0
      let yesterdayRateSelling = 0

      const thisWeekDaysLength = thisWeekRates.length

      if (thisWeekDaysLength > 2) {
        yesterdayRateBuying = thisWeekRates[thisWeekDaysLength - 2].buying_rate
        yesterdayRateSelling =
          thisWeekRates[thisWeekDaysLength - 2].selling_rate
      } else {
        yesterdayRateBuying = thisWeekRates[thisWeekDaysLength - 1].buying_rate
        yesterdayRateSelling =
          thisWeekRates[thisWeekDaysLength - 1].selling_rate
      }

      const changePercentage = (
        ((report.indicative_rate - yesterdayRate) / report.indicative_rate) *
        100
      ).toFixed(2)

      const changePercentageBuying = (
        ((report.buying_rate - yesterdayRateBuying) / report.buying_rate) *
        100
      ).toFixed(2)

      const changePercentageSelling = (
        ((report.selling_rate - yesterdayRateSelling) / report.selling_rate) *
        100
      ).toFixed(2)

      this.exchangeRate = {
        buying: {
          rate: Number(report.buying_rate).toFixed(2),
          change:
            changePercentageBuying > 0
              ? changePercentageBuying
              : changePercentageBuying * -1,
          arrowDirection: changePercentageBuying > 0 ? 'up' : 'down',
          textColor: changePercentageBuying < 0 ? 'green' : 'red',
          arrowColor: changePercentageBuying < 0 ? '#68d391' : '#f56565',
        },

        indicative: {
          rate: Number(report.indicative_rate).toFixed(2),
          change: Number(report.percentage_change).toFixed(2),
          arrowDirection: changePercentage > 0 ? 'up' : 'down',
          textColor: changePercentage < 0 ? 'green' : 'red',
          arrowColor: changePercentage < 0 ? '#68d391' : '#f56565',
        },

        selling: {
          rate: Number(report.selling_rate).toFixed(2),
          change:
            changePercentageSelling > 0
              ? changePercentageSelling
              : changePercentageSelling * -1,
          arrowDirection: changePercentageSelling > 0 ? 'up' : 'down',
          textColor: changePercentageSelling < 0 ? 'green' : 'red',
          arrowColor: changePercentageSelling < 0 ? '#68d391' : '#f56565',
        },
        date: format(new Date(report.date), 'cccc | MMMM dd, yyyy'),
      }
    },
  },
}
</script>

<style scoped>
#exchange_rate_chart {
  /* height: 100px; */
  width: auto;
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
