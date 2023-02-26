

import axios from "axios";

const cseAxios = axios.create({
  baseURL: 'https://www.cse.lk',
  timeout: 1000,
  headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "accept": "application/json, text/plain, */*",
  },
});

class OutsideAPI {

  async getASPIData() {
    // const base1Url = process.env.BACKEND_BASE_URL;
    let allData = []
    let data = '{\"headers\":{\"normalizedNames\":{},\"lazyUpdate\":null}}'

    try {
      allData = await cseAxios
        .post('/api/aspiData', data);

      return allData.data
    } catch (e) {
      return allData
    }
  }
  async getASPIChartData() {
    // const base1Url = process.env.BACKEND_BASE_URL;
    let allData = []
    let data = 'chartId=1&period=1'

    try {
      allData = await cseAxios
        .post('/api/chartData', data);

      return allData.data
    } catch (e) {
      return allData
    }
  }


  async getCompanyChartData(companyCode, period) {
    // ? Company code should have last 4 digit 0s;
    let allData = []
    let dayData = []

    let data = "";

    try {

      dayData = await cseAxios.post('/api/homeCompanyData', `symbol=${companyCode}`)

      let id = dayData.data.id;

      data = `stockId=${id}&period=${period}`

      allData = await cseAxios
        .post('/api/companyChartDataByStock', data);

      return allData.data
    } catch (e) {
      return allData
    }
  }

  async getCSEMarketStatus() {
    // const base1Url = process.env.BACKEND_BASE_URL;
    let allData = []
    let data = ''

    try {
      allData = await cseAxios
        .post('/api/marketStatus', data);

      return allData.data
    } catch (e) {
      return allData
    }
  }

  async getCSEMarketSummery() {
    // const base1Url = process.env.BACKEND_BASE_URL;
    let allData = []
    let data = ''

    try {
      allData = await cseAxios
        .post('api/marketSummery', data);

      return allData.data
    } catch (e) {
      return allData
    }
  }
}

export default new OutsideAPI();
