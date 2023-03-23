const BASE_URL =
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-B11B778A-92F5-43CD-BBF4-D97FBBDE608D";
const API_KEY = "CWB-B11B778A-92F5-43CD-BBF4-D97FBBDE608D";

export default {
  async getWeather(cityName) {
    const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  },
};
