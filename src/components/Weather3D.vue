<template>
  <div>
    <h1>天氣預報</h1>
    <form @submit.prevent="getWeather">
      <input type="text" v-model="city" placeholder="請輸入城市名稱" />
      <button type="submit">查詢</button>
    </form>
    <div v-if="error">{{ error }}</div>
    <div v-if="loading">載入中...</div>
    <div v-if="weather">
      <h2>{{ weather.name }}</h2>
      <div>{{ weather.weather[0].description }}</div>
      <div>溫度：{{ weather.main.temp }} 度</div>
      <div>體感溫度：{{ weather.main.feels_like }} 度</div>
      <div>最高溫度：{{ weather.main.temp_max }} 度</div>
      <div>最低溫度：{{ weather.main.temp_min }} 度</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import WeatherService from "../services/WeatherService";

const city = ref("");
const weather = ref(null);
const error = ref(null);
const loading = ref(false);

const getWeather = async () => {
  loading.value = true;
  try {
    const response = await WeatherService.getWeatherByCityName(city.value);
    weather.value = response.data;
    error.value = null;
  } catch (error) {
    weather.value = null;
    error.value = "無法取得天氣資料";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
