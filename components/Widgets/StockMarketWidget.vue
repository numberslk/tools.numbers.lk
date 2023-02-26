<template>
  <!-- w-full lg:w-1/2 xl:w-1/3 -->
  <div
    id="stockMarketWidget"
    class="flex flex-1 m-1"
  >
    <div class="flex flex-col w-full text-sm bg-white rounded shadow-sm">
      <div class="flex items-center justify-between p-2 text-xs font-medium text-gray-800">
        <div class="text-gray-800">
          <span class="inline-block w-3 h-3 mr-1 rounded-full live dot" />
          <span class="inline-block">Colombo Stock Exchange | ASPI & S&P SL20</span>
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
        >
          <div :class="`flex items-center w-full px-1 sm:px-5 pt-8 pb-4 text-white bg-blue-500 md:w-6/12`">
            <canvas
              id="stockMarketChart"
              class="items-center w-full mx-auto"
            />
          </div>
          <div class="flex items-center w-full p-8 text-gray-600 md:w-6/12">
            <div class="w-full">
              <h3
                class="text-lg font-semibold leading-tight text-gray-800"
              >
                Colombo Stock Exchange
              </h3>
              <h6 class="mb-2 text-sm leading-tight">
                {{ date }} 2:30pm IST
              </h6>
              <div class="mb-0 text-base font-semibold uppercase">
                ASPI
              </div>
              <div class="flex items-end w-full mb-6">
                <span
                  class="block text-3xl leading-none text-gray-800"
                > {{ stockMarketReport.aspi_value }}</span>

                <p class="block ml-2 text-sm leading-5 text-green-500">
                  <span
                    v-if="stockMarketReport.aspi_change<0"
                    class="mr-2 text-red-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-down` }"
                    />
                    <span class="font-semibold">{{ stockMarketReport.aspi_change }}</span>
                    ({{ stockMarketReport.aspi_percentage_change | round(2) }}%)
                  </span>

                  <span
                    v-if="stockMarketReport.aspi_change>=0"
                    class="mr-2 text-green-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-up` }"
                    />
                    <span class="font-semibold">{{ stockMarketReport.aspi_change }}</span>
                    ({{ stockMarketReport.aspi_percentage_change | round(2) }}%)
                  </span>
                </p>
              </div>

              <div class="mb-0 text-base font-semibold uppercase">
                S&P SL20
              </div>
              <div class="flex items-end w-full mb-6">
                <span
                  class="block text-3xl leading-none text-gray-800"
                > {{ stockMarketReport.snp_value }}</span>

                <p class="block ml-2 text-sm leading-5 text-green-500">
                  <span
                    v-if="stockMarketReport.snp_change<0"
                    class="mr-2 text-red-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-down` }"
                    />
                    <span class="font-semibold">{{ stockMarketReport.snp_change }}</span>
                    ({{ stockMarketReport.snp_percentage_change | round(2) }}%)
                  </span>

                  <span
                    v-if="stockMarketReport.snp_change>=0"
                    class="mr-2 text-green-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-up` }"
                    />
                    <span class="font-semibold">{{ stockMarketReport.snp_change }}</span>
                    ({{ stockMarketReport.snp_percentage_change | round(2) }}%)
                  </span>
                </p>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Turnover
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockMarketReport.trade_volume | formatNumber }}
                  </div>
                </div>
              </div>

              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Share Volume
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockMarketReport.share_volume | formatNumber }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="py-2 pl-3 text-xs font-medium text-left text-gray-600 bg-gray-100 align-self-end">
        {{ date }} 2:30pm IST
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
  name: 'StockMarketWidget',
  components: {},

  props: {
    stockMarketReport: {
      type: Object,
      default: () => {},
    },

    stockMarketOneMonthData: {
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
      date: format(new Date(), 'cccc | MMMM dd, yyyy'),
    }
  },

  async mounted() {
    let report = this.stockMarketReport
    let oneMonthData = this.stockMarketOneMonthData

    this.date = format(new Date(this.stockMarketReport.date), 'cccc | MMMM dd')

    //TODO: remove this fix
    if (report == undefined) {
      // report = await this.getExchangeRates()
      // oneMonthData = await this.getExchangeRateStats()
    }

    const formatedData = oneMonthData.map((item) => {
      return {
        date: format(new Date(Number(item.date) / 1000), 'MMM dd'),
        aspi: item.aspi_value,
        snp: item.snp_value,
      }
    })

    //console.log(formatedData)

    //TODO: lets figure outsomething middlewhere
    //https://nuxtjs.org/faq/http-proxy/
    //https://dev.to/jeremywynn/a-crazy-adventure-with-cors-nuxt-and-webmentions-5fhl

    this.$nextTick(function () {
      if (process.client) {
        let canvas = document.getElementById('stockMarketChart')
        if (canvas) {
          const ctx = canvas.getContext('2d')
          // let gradientStroke = ctx.createLinearGradient(0, 0, 0, 150)
          // let graphColor = this.exchangeRate.indicative.arrowColor
          // let arrowDirection = this.exchangeRate.indicative.arrowDirection

          // gradientStroke.addColorStop(0, graphColor)
          // gradientStroke.addColorStop(1, '#ffffff')
          // ctx.height = 70
          const config = {
            plugins: [ChartDataLabels],
            type: 'line',
            data: {
              labels: formatedData.map((item) => item.date),
              datasets: [
                {
                  lineTension: 0.2,
                  label: 'ASPI',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 1)',
                  pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                  // fill: true,
                  // backgroundColor: gradientStroke,
                  // borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                  // pointRadius: '1',
                  data: formatedData.map((item) => item.aspi),
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
                // {
                //   lineTension: 0.2,
                //   label: 'S&P SL20',
                //   backgroundColor: 'rgba(255, 255, 255, 0.1)',
                //   borderColor: 'rgba(255, 255, 255, 1)',
                //   pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                //   // fill: true,
                //   // backgroundColor: gradientStroke,
                //   // borderColor: arrowDirection == 'up' ? '#48bb78' : '#f56565',
                //   // pointRadius: '1',
                //   data: formatedData.map((item) => item.snp),
                //   datalabels: {
                //     formatter: (value) => Number(value).toFixed(2),
                //     display: function(context) {
                //       // your logic here, return true to show a label, else false to hide
                //       // for example: display 1 label every 3 data

                //       const indexOfMaxValue = context.dataset.data.reduce(
                //         (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
                //         0
                //       )

                //       const numberOfDataItems = context.dataset.data.length

                //       if (indexOfMaxValue == context.dataIndex) {
                //         return true
                //       } else if (context.dataIndex == numberOfDataItems - 1) {
                //         return true
                //       } else {
                //         return false
                //       }
                //     },
                //     labels: {
                //       title: {
                //         font: {
                //           weight: 'bold'
                //         },
                //         // color: arrowDirection == 'up' ? '#38a169' : '#e53e3e'
                //         color: '#FFF'
                //       }
                //     },
                //     clamp: true,
                //     align: 'end',
                //     anchor: 'end',
                //     offset: -4,
                //     clip: false
                //   }
                // }
              ],
            },
            options: {
              layout: {
                padding: {
                  left: -5,
                  right: 25,
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
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              responsive: true,
              // aspectRatio: 0.9,
              animation: {
                onComplete: 'done',
              },
              // elements: {
              //   line: {
              //     borderColor: 'blue',
              //     borderWidth: 2
              //   }
              // },
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

  methods: {},
}
</script>

<style scoped>
#stockMarketChart {
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
