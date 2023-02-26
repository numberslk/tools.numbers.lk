import axios from "axios";
// import store from "./../store";
// import "./../mixins";

const BASE_URL = "http://localhost:9090/";

class SiteAPI {
  async get({ baseUrl, resource, query }) {
    let url = baseUrl;
    if (url == null) {
      url = BASE_URL;
    }
    return axios.get(`${resource}`, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      baseURL: url,
      params: query
    });
  }

  async post({ url, data }) {

    console.log(url)
    return axios.post({
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "accept": "application/json, text/plain, */*",
      },
      url: "/",
      baseURL: url,
      data: data,
    });
  }
}

export default new SiteAPI();
