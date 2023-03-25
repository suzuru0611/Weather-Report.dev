<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">加載中...</div>
    <div v-else>
      <div>城市：{{ city }}</div>
      <div>9A.M溫度：{{ temperature9am }}°C</div>
      <div>6P.M溫度：{{ temperature6pm }}°C</div>
      <div>天氣狀態：{{ description }}</div>
      <div>9A.M降雨機率：{{ chanceOfRain9am }}</div>
      <div>6P.M降雨機率：{{ chanceOfRain6pm }}</div>
      <div>更新時間：{{ updateTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_KEY = "CWB-B11B778A-92F5-43CD-BBF4-D97FBBDE608D";
const LOCATION_NAME = "大安區";
const LOCATION_CODE = "63000080";

const city = ref(null);
const temperature9am = ref(null);
const temperature6pm = ref(null);
const description = ref(null);
const chanceOfRain9am = ref(null);
const chanceOfRain6pm = ref(null);
const updateTime = ref(null);

const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;

  try {
    const res = await axios.get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=${API_KEY}&locationName=${LOCATION_NAME}&elementName=Wx,T,PoP12h`
    );
    const data = res.data.records.locations[0].location[0];
    city.value = data.locationName;
    chanceOfRain9am.value =
      data.weatherElement[1].time[7].elementValue[0].value;
    chanceOfRain6pm.value =
      data.weatherElement[1].time[10].elementValue[0].value;
    temperature9am.value = data.weatherElement[2].time[7].elementValue[0].value;
    temperature6pm.value =
      data.weatherElement[2].time[10].elementValue[0].value;
    description.value = data.weatherElement[0].time[0].elementValue[0].value;
    updateTime.value = data.weatherElement[0].time[0].startTime;
  } catch (err) {
    error.value = "獲取天氣資料失敗";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
setInterval(fetchData, 600000); // 每隔 10 分鐘重新載入一次資料
</script>
