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
      <canvas
        id="exrate_sparkline"
        class="items-center mx-auto"
      />
      <div class="flex flex-row justify-around py-2 mx-auto my-auto">
        <div class="flex flex-col items-center px-2 mx-auto md:px-3 lg:px-4">
          <div class="flex flex-col items-center text-center">
            <span class="text-xs text-gray-600">Buying Rate</span>
            <span :class="`text-sm font-medium text-gray-700`">{{ exchangeRate.buying.rate }}</span>
          </div>
        </div>
        <div class="flex flex-col items-center px-2 mx-auto border-l-2 md:px-3 lg:px-4">
          <div class="flex flex-col items-center text-center">
            <span class="text-xs text-gray-600">Indicative Rate</span>
            <span :class="`text-sm font-medium text-${exchangeRate.indicative.textColor}-700`">{{ exchangeRate.indicative.rate }}</span>
            <p class="text-xs font-semibold text-gray-500">
              <span :class="`mr-2 text-${exchangeRate.indicative.textColor}-500`">
                <font-awesome-icon
                  :icon="{ prefix: 'fas', iconName: `arrow-${exchangeRate.indicative.arrowDirection}` }"
                />
                {{ exchangeRate.indicative.change }}%
              </span>
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center px-1 border-l-2 md:px-2 lg:px-3">
          <div class="flex flex-col items-center text-center">
            <span class="text-xs text-gray-600">Selling Rate</span>
            <span :class="`text-sm font-medium text-gray-700`">{{ exchangeRate.selling.rate }}</span>
          </div>
        </div>
      </div>

      <div class="py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100 align-self-end">
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
  name: 'ExchangeRates',
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

    const formatedData = oneMonthData.map((item) => {
      return {
        date: format(new Date(Number(item.date) / 1000), 'MMM dd'),
        rate: item.indicative_rate,
      }
    })

    this.setWidget(report)

    //TODO: lets figure outsomething middlewhere
    //https://nuxtjs.org/faq/http-proxy/
    //https://dev.to/jeremywynn/a-crazy-adventure-with-cors-nuxt-and-webmentions-5fhl

    this.$nextTick(function () {
      if (process.client) {
        let canvas = document.getElementById('exrate_sparkline')
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
              labels: formatedData.map((item) => item.date),
              datasets: [
                {
                  lineTension: 0.2,
                  label: 'Indicative Rate',
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                  pointRadius: '1',
                  data: formatedData.map((item) => item.rate),
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
                        color: arrowDirection == 'up' ? '#38a169' : '#e53e3e',
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
                display: false,
              },
              responsive: false,
              aspectRatio: 3.5,
              bezierCurve: true,
              animation: {
                onComplete: 'done',
              },
              elements: {
                line: {
                  borderColor: 'blue',
                  borderWidth: 2,
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
                    display: false,
                  },
                  // {
                  //   ticks: {
                  //     autoSkip: true,
                  //     fontSize: 9
                  //   }
                  // }
                ],
                yAxes: [
                  {
                    ticks: {
                      stepSize: 5,
                      // fontSize: 10
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

    setWidget(report) {
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

      this.exchangeRate = {
        buying: {
          rate: Number(report.buying_rate).toFixed(2),
          change: '1.2',
          arrowDirection: arrowDirection,
        },

        indicative: {
          rate: Number(report.indicative_rate).toFixed(2),
          change: Number(report.percentage_change).toFixed(2),
          arrowDirection: arrowDirection,
          textColor: arrowDirection == 'up' ? 'green' : 'red',
          arrowColor: arrowDirection == 'up' ? '#68d391' : '#f56565',
        },

        selling: {
          rate: Number(report.selling_rate).toFixed(2),
          change: '0',
          arrowDirection: 'up',
          arrowColor: 'green',
        },
        date: format(new Date(report.date), 'cccc | MMMM dd, yyyy'),
      }
    },
  },
}
</script>

<style scoped>
#exrate_sparkline {
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
