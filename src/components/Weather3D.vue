<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">加載中...</div>
    <div v-else>
      <div>城市：{{ weather.name }}</div>
      <div>溫度：{{ weather.main.temp }}°C</div>
      <div>天氣：{{ weather.weather[0].description }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WeatherService from "../services/WeatherService";

const weather = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const data = await WeatherService.getWeather("Taipei");
    weather.value = data;
  } catch (err) {
    error.value = "獲取天氣資料失敗";
  } finally {
    loading.value = false;
  }
});
</script>
