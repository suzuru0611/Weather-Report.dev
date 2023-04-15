<template>
  <div class="h-screen">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">加載中...</div>
    <div v-else class="flex flex-col border border-indigo-600 p-5 xl:h-[100vh]">
      <Location
        class="relative flex h-[10vh] flex-row border border-indigo-600 xl:h-[10vh]"
      >
        <div class="w-[5rem]">
          <img src="../assets/logo.png" alt="logo" />
        </div>
        <div
          class="flex h-full w-[10rem] items-center justify-center bg-indigo-600 font-mono text-3xl text-indigo-600"
        >
          <div class="text-white">
            {{ city }}
          </div>
        </div>
        <div
          class="flex w-[10rem] items-center justify-center border-r border-indigo-600"
        >
          <div class="text-indigo-600">time</div>
        </div>
        <div
          class="flex w-[5rem] items-center justify-center border-r border-indigo-600"
        >
          <div class="text-indigo-600">temp</div>
        </div>
        <div class=""></div>
        <div
          class="absolute right-0 flex h-full w-[10rem] flex-row items-center justify-center border-l border-indigo-600"
        >
          <div class="flex text-2xl font-extrabold text-indigo-600">
            其餘作品
          </div>
        </div>
      </Location>
      <inner-box class="flex h-[80vh] w-full flex-row">
        <bubble class="w-full bg-rose-600 xl:w-4/6"> </bubble>
        <information class="hidden w-2/6 flex-col xl:flex">
          <div
            class="relative flex h-3/6 flex-row items-center justify-center border-x border-indigo-600"
          >
            <div class="absolute top-5 left-5">
              <p class="font-mono text-base text-indigo-600 xl:text-4xl">123</p>
            </div>
            <video
              class="h-full w-screen"
              src="../assets/rain.webm"
              autoplay
              loop
              muted
            ></video>
          </div>
          <div
            class="flex h-2/6 flex-col items-center justify-center border border-indigo-600"
          >
            <div
              class="xt-2xl fontte-extrabold float-left text-indigo-600 xl:text-4xl"
            >
              明日預報
            </div>
            <div class="flex flex-row items-center font-mono text-indigo-600">
              <div class="pr-3 text-xl xl:text-4xl">9A.M:</div>
              <div class="text-base xl:text-xl">
                溫度：{{ temperature9am }}°C,天氣狀態：{{ description9am }}
              </div>
            </div>
            <div class="flex flex-row items-center font-mono text-indigo-600">
              <div class="pr-3 text-xl xl:text-4xl">6P.M:</div>
              <div class="text-base xl:text-xl">
                溫度：{{ temperature6pm }}°C,天氣狀態：{{ description6pm }}
              </div>
            </div>
          </div>
          <div
            class="flex h-1/6 flex-row items-center justify-center border-x border-indigo-600 text-indigo-600"
          >
            <div class="text-xl font-extrabold xl:text-4xl">
              降雨機率：{{ chanceOfRain }}%
            </div>
          </div>
        </information>
      </inner-box>
      <information class="flex w-full flex-col xl:hidden">
        <div
          class="flex h-3/6 flex-row items-center justify-center border border-indigo-600"
        >
          <video
            class="h-full w-screen"
            src="../assets/rain.webm"
            autoplay
            loop
            muted
          ></video>
        </div>
        <div
          class="flex h-2/6 flex-col items-center justify-center border border-indigo-600"
        >
          <div
            class="float-left text-2xl font-extrabold text-indigo-600 xl:text-4xl"
          >
            明日預報
          </div>
          <div class="flex flex-row items-center font-mono text-indigo-600">
            <div class="pr-3 text-xl xl:text-4xl">9A.M-</div>
            <div class="text-base xl:text-xl">
              溫度：{{ temperature9am }}°C,天氣狀態：{{ description9am }}
            </div>
          </div>
          <div class="flex flex-row items-center font-mono text-indigo-600">
            <div class="pr-3 text-xl xl:text-4xl">6P.M-</div>
            <div class="text-base xl:text-4xl">
              溫度：{{ temperature6pm }}°C,天氣狀態：{{ description6pm }}
            </div>
          </div>
        </div>
        <div
          class="flex h-1/6 flex-row items-center justify-center border-indigo-600 text-indigo-600"
        >
          <div class="text-xl font-extrabold xl:text-4xl">
            降雨機率：{{ chanceOfRain }}%
          </div>
        </div>
      </information>
      <UpdateTime class="flex h-[8bh] flex-row xl:h-[5vh]">
        <div
          class="flex w-2/12 justify-center bg-indigo-600 pt-2 pb-2 font-mono text-sm text-white xl:w-1/12"
        >
          更新時間
        </div>
        <div
          class="flex w-10/12 justify-center border border-indigo-600 pt-2 pb-2 font-mono text-sm text-indigo-600 xl:w-11/12"
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
