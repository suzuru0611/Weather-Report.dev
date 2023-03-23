import axios from "axios";

const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherService = {
  getWeatherByCityName: async (cityName) => {
    const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response;
  },
};

export default WeatherService;
