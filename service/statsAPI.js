import { format, subDays } from 'date-fns'
import SiteAPI from '../service/siteAPI'

class StatsAPI {
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
  }

  async getExchangeRateStats() {
    // const base1Url = process.env.BACKEND_BASE_URL;

    const baseUrl = process.env.BACKEND_URL
    const resource = 'stat/exchangeRateStats'

    const query = {
      date: format(subDays(new Date(), 30), 'dd-MM-yyyy')
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
  }

  async getStockMarketRates() {
    // const base1Url = process.env.BACKEND_BASE_URL;

    const baseUrl = process.env.BACKEND_URL
    const resource = '/stat/dailyStockMarket'

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
  }

  async getStockMarketStats() {
    // const base1Url = process.env.BACKEND_BASE_URL;

    const baseUrl = process.env.BACKEND_URL
    const resource = 'stat/stockMarketStats'

    const query = {
      date: format(subDays(new Date(), 30), 'dd-MM-yyyy')
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
  }
}

export default new StatsAPI()
