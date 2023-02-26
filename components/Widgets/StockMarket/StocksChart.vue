<template>
  <div>
    <StockPriceWidget
      v-if="!item.is_index"
      class="w-full mb-8"
      :symbol="item.code"
    />
    <MarketIndexWidget
      v-if="item.is_index"
      class="w-full mb-8"
      :symbol="item.code"
    />
  </div>
</template>

<script>
import StockPriceWidget from '@/components/Widgets/StockMarket/StockPriceWidget'
import MarketIndexWidget from '@/components/Widgets/StockMarket/MarketIndexWidget'

export default {
  name: 'StocksChart',
  components: {
    StockPriceWidget,
    MarketIndexWidget,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {},
}
</script>
<style scoped>
</style>
