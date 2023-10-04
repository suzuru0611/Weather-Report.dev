<template>
  <div class="marquee text-bold text-[15rem] text-white 2xl:text-[18rem]">
    <span>ALL CREATIONS SHOULD START FROM THE HEART</span>
    <span>ALL CREATIONS SHOULD START FROM THE HEART</span>
    <span>ALL CREATIONS SHOULD START FROM THE HEART</span>
  </div>
</template>
<style>
.marquee {
  white-space: nowrap;
}

.marquee span {
  display: inline-block;
  width: 100%;
  padding-right: 330rem;
  animation: marquee 50s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
