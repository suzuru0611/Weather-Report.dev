<template>
  <div class="h-screen">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">加載中...</div>
    <div v-else class="flex flex-col">
      <Location class="h-[10vh] border border-indigo-600">
        <div
          class="flex flex-row items-center font-mono text-3xl text-indigo-600"
        >
          {{ city }}
        </div>
      </Location>
      <inner-box class="flex h-[85vh] w-full flex-row">
        <bubble class="w-4/6">
          <gif />
        </bubble>
        <information class="w-2/6 flex-col">
          <div
            class="flex h-3/6 flex-row items-center justify-center border border-indigo-600"
          ></div>
          <div
            class="flex h-2/6 flex-col items-center justify-center border border-indigo-600"
          >
            <div class="float-left text-4xl font-extrabold text-indigo-600">
              明日預報
            </div>
            <div class="flex flex-row items-center font-mono text-indigo-600">
              <div class="pr-3 text-4xl">9A.M-</div>
              <div class="text-xl">
                溫度：{{ temperature9am }}°C,天氣狀態：{{ description9am }}
              </div>
            </div>
            <div class="flex flex-row items-center font-mono text-indigo-600">
              <div class="pr-3 text-4xl">6P.M-</div>
              <div class="text-xl">
                溫度：{{ temperature6pm }}°C,天氣狀態：{{ description6pm }}
              </div>
            </div>
          </div>
          <div
            class="flex h-1/6 flex-row items-center justify-center border border-indigo-600 text-indigo-600"
          >
            <div class="text-4xl font-extrabold">
              降雨機率：{{ chanceOfRain }}%
            </div>
          </div>
        </information>
      </inner-box>
      <UpdateTime class="flex h-[5vh] flex-row">
        <div
          class="flex w-1/12 justify-center bg-indigo-600 pt-2 pb-2 font-mono text-white"
        >
          更新時間
        </div>
        <div
          class="flex w-11/12 justify-center border border-indigo-600 pt-2 pb-2 font-mono text-indigo-600"
        >
          {{ updateTime }}
        </div>
      </UpdateTime>
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
const description9am = ref(null);
const description6pm = ref(null);
const chanceOfRain = ref(null);
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
    description9am.value = data.weatherElement[1].time[7].elementValue[0].value;
    description6pm.value =
      data.weatherElement[1].time[10].elementValue[0].value;
    temperature9am.value = data.weatherElement[2].time[7].elementValue[0].value;
    temperature6pm.value =
      data.weatherElement[2].time[10].elementValue[0].value;
    chanceOfRain.value = data.weatherElement[0].time[1].elementValue[0].value;
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
