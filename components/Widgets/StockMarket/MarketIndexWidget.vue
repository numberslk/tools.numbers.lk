<template>
  <!-- w-full lg:w-1/2 xl:w-1/3 -->
  <div
    id="marketIndexWidget"
    class="flex flex-1 m-1"
  >
    <div class="flex flex-col w-full text-sm bg-white rounded">
      <div class="flex items-center justify-center">
        <div
          class="w-full overflow-hidden md:flex"
        >
          <div class="flex items-center w-full px-5 pt-4 pb-4 my-2 text-white sm:my-2 md:w-7/12">
            <div
              id="stockPriceChart"
              ref="stockPriceChart"
              class="items-center w-full mx-auto"
            />
          </div>
          <div class="flex items-center w-full p-4 text-gray-600 md:w-5/12">
            <div class="w-full">
              <h6 class="mb-2 text-sm leading-tight">
                {{ date }}
              </h6>
              <span
                v-if="marketData.status=='Market Closed'"
                :class="{'market-status-closed-badge': marketData.status=='Market Closed'}"
              >{{ marketData.status }}</span>
              <span
                v-else-if="marketData.status=='Market Open'"
                :class="{'market-status-open-badge': marketData.status=='Market Open'}"
              >{{ marketData.status }}</span>
              <span
                v-else
                class="market-status-intermidiate-badge"
              >{{ marketData.status }}</span>
              <h3
                class="text-base font-semibold leading-tight text-gray-800"
              >
                {{ symbolData.name }}
              </h3>
              <div class="mb-0 text-base font-semibold uppercase">
                {{ symbolData.code }}
              </div>
              <div class="flex items-end w-full mb-4">
                <span
                  class="block text-3xl leading-none text-gray-800 pa-8"
                  :class="{'bg-green-500 text-green-100':stateOfThePrice=='up', 'bg-red-500 text-red-100':stateOfThePrice=='down', 'bg-gray-500 text-gray-100': stateOfThePrice=='same' }"
                > {{ stockData.ltp }}</span>

                <p class="block ml-2 text-base leading-5 text-green-500">
                  <span
                    v-if="stockData.chg<0"
                    class="mr-2 font-semibold text-red-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-down` }"
                    />
                    <span class="font-semibold">{{ stockData.chg }}</span>
                    ({{ stockData.pctChg | round(2) }}%)
                  </span>

                  <span
                    v-if="stockData.chg>=0"
                    class="mr-2 text-green-500"
                  >
                    <font-awesome-icon
                      :icon="{ prefix: 'fas', iconName: `arrow-up` }"
                    />
                    <span class="font-semibold">{{ stockData.chg }}</span>
                    ({{ stockData.pctChg | round(2) }}%)
                  </span>
                </p>
              </div>

              <div class="flex w-full mb-1 text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Previous Close
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockData.prvCls | formatNumber }}
                  </div>
                </div>
              </div>

              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Open
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockData.open | formatNumber }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Low
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockData.low | formatNumber }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    High
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockData.high | formatNumber }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Last Traded Price
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ stockData.ltp | formatNumber }}
                  </div>
                </div>
              </div>

              <div class="flex w-full pt-2 text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Share Volume
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ marketData.shareVolume | formatNumber }}
                  </div>
                </div>
              </div>
              <div class="flex w-full text-xs">
                <div class="flex w-full">
                  <div class="flex-1 pr-3 font-semibold text-left">
                    Turnover
                  </div>
                  <div
                    class="px-3 text-right"
                  >
                    {{ marketData.tradeVolume | formatNumber }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteAPI from '@/service/siteAPI'
import Util from '@/util/util'
import StockUtil from '@/util/stockUtil'
import format from 'date-fns/format'
import subDays from 'date-fns/subDays'
import fromUnixTime from 'date-fns/fromUnixTime'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import OutsideAPI from '../../../service/outsideAPI'

export default {
  name: 'MarketIndexWidget',
  components: {},

  props: {
    symbol: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      connection: null,
      stockData: {
        ltp: 0,
        chg: 0,
        prvCls: 0,
        pctChg: 0,
        high: 0,
        low: 0,
        open: 0,
      },
      marketData: {
        status: 'Market Closed',
        shareVolume: 0,
        tradeVolume: 0,
      },
      symbolData: { code: '', name: '' },
      //up down same
      stateOfThePrice: undefined,
      areaSeries: null,
      autoDraw: true,
      dataLoaded: false,
      date: format(new Date(), 'h:mm:ss a | MMMM dd, yyyy'),
      time: new Date(),
    }
  },

  watch: {
    stateOfThePrice: function (val) {
      if (val == undefined) {
        //do Nothing
      } else {
        setTimeout(() => (this.stateOfThePrice = undefined), 1000)
      }
    },
  },

  mounted: async function () {
    const self = this

    const marketStatus = await this.getCSEMarketStatus()
    const marketSummery = await this.getCSEMarketSummery()

    self.marketData.status = marketStatus.status
    self.marketData.shareVolume = marketSummery.shareVolume
    self.marketData.tradeVolume = marketSummery.tradeVolume

    this.$nextTick(async function () {
      let { LightWeightCharts } = this.$lwcCore()
      self.symbolData = self.changeSymbols(this.symbol)

      const initialWidth = self.$refs.stockPriceChart.offsetWidth
      const initialHeight = 250

      var chart = LightWeightCharts.createChart(self.$refs.stockPriceChart, {
        width: initialWidth,
        height: initialHeight,

        localization: {
          timeFormatter: (businessDayOrTimestamp) => {
            return format(businessDayOrTimestamp, 'h:mm:ss a | MMMM dd, yyyy')
            // return Date(businessDayOrTimestamp) //or whatever JS formatting you want here
          },
        },

        timeScale: {
          fixLeftEdge: true,
          fixRightEdge: true,
          lockVisibleTimeRangeOnResize: true,
          timeVisible: true,
          tickMarkFormatter: (time, tickMarkType, locale) => {
            return format(time, 'h:mm:ss')
            // console.log(time, tickMarkType, locale)
            // const year = LightWeightCharts.isBusinessDay(time)
            //   ? time.year
            //   : new Date(time * 1000).getUTCFullYear()
            // return String(year)
          },
        },

        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.2,
          },
        },
        watermark: {
          visible: true,
          fontSize: 12,
          horzAlign: 'center',
          vertAlign: 'center',
          color: 'rgba(171, 71, 188, 0.5)',
          text: `numbers.lk | ${self.symbolData.code}`,
        },
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#333',
        },
        grid: {
          horzLines: {
            color: '#eee',
          },
          vertLines: {
            color: '#ffffff',
          },
        },
      })

      var timerID
      document.body.onresize = function () {
        if (timerID) clearTimeout(timerID)
        timerID = setTimeout(function () {
          chart.resize(
            self.$refs.stockPriceChart.offsetHeight,
            self.$refs.stockPriceChart.offsetWidth
          )
        }, 200)
      }

      self.areaSeries = chart.addAreaSeries({
        topColor: 'rgba(171, 71, 188, 0.56)',
        bottomColor: 'rgba(171, 71, 188, 0.04)',
        lineColor: 'rgba(171, 71, 188, 1)',
        lineWidth: 2,
      })

      // self.areaSeries = chart.addCandlestickSeries({
      //   upColor: '#48bb78',
      //   downColor: '#f56565',
      //   borderVisible: true,
      //   wickVisible: true,
      //   borderColor: '#001000',
      //   wickColor: '#001000',
      //   borderUpColor: '#276749',
      //   borderDownColor: '#c53030',
      //   wickUpColor: '#276749',
      //   wickDownColor: '#c53030',
      // })

      const aspiData = await self.getASPIData()
      // console.log(StockUtil.getCandleStickDataFromSeries(aspiData, 5))
      self.areaSeries.setData(aspiData)
      // self.areaSeries.setData(
      //   StockUtil.getCandleStickDataFromSeries(aspiData, 15)
      // )
      // chart.timeScale().scrollToRealTime()
      chart.timeScale().fitContent()
    })
    // set out the data first
  },

  beforeDestroy() {
    this.connection.close()
  },

  created: function () {
    // console.log('Starting connection to WebSocket Server')
    const self = this

    if (process.client) {
      this.connection = new WebSocket('wss://lkcentralprice.directfn.com/price')

      this.connection.onopen = function (event) {
        console.log('Successfully connected to the echo websocket server...')
        const authRequest = self.generateAuthRequest()
        self.sendMessage(authRequest)
        self.getStockData(self.symbol)
      }

      this.connection.onmessage = function (event) {
        const stockDetails = StockUtil.toJsonObject(event.data)

        if (stockDetails.data.sym == self.symbol) {
          //set last updated time
          self.date = format(new Date(), 'h:mm:ss a | MMMM dd, yyyy')

          const previousStockData = self.stockData

          if (stockDetails.data.ltp == undefined) {
            self.stockData = previousStockData
          } else {
            //296 request has all the params
            if (stockDetails.number == 296 || stockDetails.number == 299) {
              self.stockData.open = stockDetails.data.open
              self.stockData.high = stockDetails.data.high
              self.stockData.prvCls = stockDetails.data.prvCls
              self.stockData.chg = stockDetails.data.chg
              self.stockData.low = stockDetails.data.low
              self.stockData.ltp = stockDetails.data.ltp
              self.stockData.pctChg = stockDetails.data.pctChg
            } else if (stockDetails.number == 127) {
              self.stockData.ltp = stockDetails.data.ltp
              self.stockData.chg = stockDetails.data.chg
              self.stockData.pctChg = stockDetails.data.pctChg
            } else {
              //120
            }

            if (stockDetails.data.ltp > previousStockData.ltp) {
              self.stateOfThePrice = 'up'
            } else if (stockDetails.data.ltp < previousStockData.ltp) {
              self.stateOfThePrice = 'down'
            } else {
              self.stateOfThePrice = 'same'
            }
          }
          if (StockUtil.isABusinessHour()) {
            // console.log(self.stockData)
            self.updateChart(self.stockData)
          }
        }
      }
    }
  },

  methods: {
    sendMessage: function (message) {
      if (this.connection.readyState == 1) {
        this.connection.send(message)
      }
    },

    getStockData: function (code) {
      const stockprice = this.generateStockPriceRequest('LKCSE', code, 7)
      this.sendMessage(stockprice)
      if (StockUtil.isABusinessHour()) {
        setInterval(() => {
          this.sendMessage(stockprice)
        }, 20000)
      }
    },

    generateStockPriceRequest: function (exchange, symbol, messagetype) {
      var reqElements = [
        '{"80":"',
        messagetype,
        '","E":"',
        exchange,
        '","S":"',
        symbol,
        '"}\n',
      ]
      var req = reqElements.join('')
      req = req.length + req

      return req
    },

    generateAuthRequest: function () {
      var reqElements = [
        '{"AUTHVER":"10",',
        '"LOGINIP":"',
        '',
        '","CLVER":"',
        '1.0.0',
        '","PDM":"',
        '56',
        '","LAN":"',
        'EN',
        '","METAVER":"',
        '0',
        '",',
      ]

      reqElements[reqElements.length] = '"SSOTOK":"'
      reqElements[reqElements.length] = 'DEMO1UNI'
      reqElements[reqElements.length] = '","SSOTYPE":"'
      reqElements[reqElements.length] = 2
      reqElements[reqElements.length] = '"}\n'

      let req = reqElements.join('')
      req = req.length + req
      return req
    },

    updateChart: function (stockData) {
      this.areaSeries.update({
        time: StockUtil.getTimeStampFromLTT(stockData.ltt),
        value: stockData.ltp,
      })
    },

    changeSymbols(symbol) {
      if (symbol == 'ASI') {
        return { code: 'CSE: ASPI', name: 'All Share Price Index' }
      } else {
        return { code: symbol, name: 'Colombo Stock Exchange' }
      }
    },

    async getASPIData() {
      try {
        const aspiData = await OutsideAPI.getASPIChartData()

        const chartData = aspiData.map((minuteData) => ({
          time: minuteData.d,
          value: minuteData.v,
        }))

        return chartData
      } catch (e) {
        console.log(e)
      }
    },

    async getCSEMarketStatus() {
      try {
        const marketStatus = await OutsideAPI.getCSEMarketStatus()
        return marketStatus
      } catch (e) {
        console.log(e)
      }
    },

    async getCSEMarketSummery() {
      try {
        const marketSummery = await OutsideAPI.getCSEMarketSummery()
        return marketSummery
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.chart {
  max-height: 300px;
}

/* .up {
  @apply bg-green-500 text-white;
} */

#marketIndexWidget {
  /* height: 100px; */
  width: auto;
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
