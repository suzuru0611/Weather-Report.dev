<template>
  <div class="h-screen">
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">加載中...</div>
    <div v-else class="relative flex flex-col overflow-hidden p-5 xl:h-[100vh]">
      <Location
        class="relative flex h-[7vh] flex-row border border-indigo-600 xl:h-[15vh]"
      >
        <div class="flex w-[10rem] items-center justify-center xl:w-[10rem]">
          <img class="m-3" src="../assets/weather_icon.svg" alt="logo" />
        </div>
        <div
          class="flex h-full w-[10rem] items-center justify-center border-x border-indigo-600 font-bold text-indigo-600 xl:w-[15rem] xl:text-[2rem]"
        >
          <div class="text-indigo-600e">
            {{ city }}
          </div>
        </div>
        <div
          class="hidden w-[10rem] items-center border-r border-indigo-600 xl:flex xl:w-[25rem] xl:text-[1.2rem]"
        >
          <div class="ml-5 text-indigo-600">{{ currentTime }}</div>
        </div>
        <div
          class="flex w-[10rem] items-center justify-center border-indigo-600 md:border-r xl:w-[13rem] xl:text-[2rem]"
        >
          <div class="text-indigo-600">{{ currentTem }}°C</div>
        </div>
        <div class="flex w-full flex-row items-center justify-center">
          <div class="hidden md:flex md:w-4/6">
            <p>After reading it, Go wash and sleepp></p>
          </div>
          <div
            class="flex h-full w-full flex-row items-center justify-center border-l border-indigo-600 md:w-2/6"
          >
            <a href="" class="flex text-2xl font-extrabold text-indigo-600">
              其餘作品
            </a>
          </div>
        </div>
      </Location>
      <inner-box class="flex h-[40vh] flex-row xl:h-[80vh]">
        <bubble
          class="xl::w-4/6 relative flex w-full items-center justify-center border-x border-indigo-600 bg-teal-200 xl:border-r-0 xl:border-l"
        >
          <img class="z-10 flex w-3/6" :src="whatToBring" alt="whatToBring" />
        </bubble>
        <information class="hidden w-3/6 flex-col xl:flex">
          <div
            class="relative flex h-3/6 flex-row items-center justify-center border-x border-indigo-600"
          >
            <div class="absolute top-3 left-3">
              <video
                class="w-[5rem] xl:w-[10rem]"
                :src="bubbleGif"
                autoplay
                loop
                muted
              ></video>
            </div>
            <video
              class="h-full w-screen"
              :src="weatherGif"
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
            <div>
              <div
                class="flex items-center font-mono text-indigo-600 xl:flex-row"
              >
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
      <information class="relative flex h-auto w-full flex-col xl:hidden">
        <div
          class="flex h-4/6 flex-col items-center justify-center border border-indigo-600 py-6"
        >
          <div
            class="float-left text-3xl font-extrabold text-indigo-600 xl:text-4xl"
          >
            明日預報
          </div>
          <div class="items-start justify-start pt-10">
            <div
              class="flex w-full flex-col items-center font-mono text-indigo-600"
            >
              <div class="pr-3 text-2xl font-semibold">-9A.M-</div>
              <div class="py-3 text-xl">
                溫度：{{ temperature9am }}°C,天氣狀態：{{ description9am }}
              </div>
            </div>
            <div
              class="flex flex-col items-center font-mono text-indigo-600 xl:flex-row"
            >
              <div class="pr-3 text-2xl font-semibold">-6P.M-</div>
              <div class="py-3 text-xl">
                溫度：{{ temperature6pm }}°C,天氣狀態：{{ description6pm }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="boede flex h-2/6 flex-row items-center justify-center border-x border-indigo-600 py-6 text-indigo-600"
        >
          <div class="text-xl font-extrabold xl:text-4xl">
            降雨機率：{{ chanceOfRain }}%
          </div>
        </div>
      </information>
      <UpdateTime class="relative flex h-[4vh] h-auto flex-row xl:h-[5vh]">
        <div
          class="flex w-3/12 items-center justify-center bg-indigo-600 py-2 font-mono text-sm text-white xl:w-1/12"
        >
          更新時間
        </div>
        <div
          class="flex w-9/12 items-center justify-center border border-indigo-600 pt-2 pb-2 font-mono text-sm text-indigo-600 xl:w-11/12"
        >
          {{ updateTime }}
        </div>
      </UpdateTime>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const API_KEY = "CWB-B11B778A-92F5-43CD-BBF4-D97FBBDE608D";
const LOCATION_NAME = "大安區";

const city = ref(null);
const temperature9am = ref(null);
const temperature6pm = ref(null);
const description9am = ref(null);
const description6pm = ref(null);
const currentTem = ref(null);
const chanceOfRain = ref(null);
const updateTime = ref(null);
const loading = ref(false);
const error = ref(null);

// 使用Vue的ref创建响应式数据
const currentTime = ref(new Date().toLocaleString());

// 在组件被挂载时开始更新时间
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
});

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
      data.weatherElement[1].time[12].elementValue[0].value;
    temperature9am.value = data.weatherElement[2].time[9].elementValue[0].value;
    temperature6pm.value =
      data.weatherElement[2].time[10].elementValue[0].value;
    currentTem.value = data.weatherElement[2].time[5].elementValue[0].value;
    chanceOfRain.value = data.weatherElement[0].time[1].elementValue[0].value;
    updateTime.value = data.weatherElement[0].time[0].startTime;
  } catch (err) {
    error.value = "獲取天氣資料失敗";
  } finally {
    loading.value = false;
  }
};

const bubbleGif = computed(() => {
  if (chanceOfRain.value > 60) {
    return "./src/assets/bubble_rain.gif";
  } else {
    return "./src/assets/bubble_sun.gif";
  }
});

const whatToBring = computed(() => {
  if (chanceOfRain.value > 60) {
    return "./src/assets/umbrella.gif";
  } else {
    return "./src/assets/skateboard.gif";
  }
});
const weatherGif = computed(() => {
  if (chanceOfRain.value > 60) {
    return "./src/assets/rain.webm";
  } else {
    return "./src/assets/sun.webm";
  }
});
onMounted(fetchData);
setInterval(fetchData, 600000); // 每隔 10 分鐘重新載入一次資料
</script>
