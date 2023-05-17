<template>  <div>
    <div class="button">
      <div class="box" :class="{ 'winStyle-1': winStyle }">T</div>
      <div class="box">T</div>
      <div class="box">S</div>
      <div class="box">-</div>
      <div class="box">V</div>
      <div class="box">U</div>
      <div class="box" :class="{ 'winStyle-7': !winStyle }">E</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { winStyle } = defineProps(["winStyle"]);
</script>

<style scoped>
/* From uiverse.io by @mrhyddenn */
.button {
  -webkit-app-region: no-drag;
  display: flex;
  border-radius: 10px;
}

.box {
  width: 20px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  transition: all 0.8s;
  cursor: pointer;
  position: relative;
  background: rgb(58, 165, 253);
  overflow: hidden;
}

.box:before {
  content: "52";
  position: absolute;
  top: 0;
  background: #67c23a;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(100%);
  transition: transform 0.4s;
}

.box:nth-child(2)::before {
  transform: translateY(-100%);
  content: "PJ";
}

.box:nth-child(3)::before {
  content: "L";
}

.box:nth-child(4)::before {
  transform: translateY(-100%);
  content: "O";
}

.box:nth-child(5)::before {
  content: "K";
}
.box:nth-child(6)::before {
  transform: translateY(-100%);
  content: "E";
}
.box:nth-child(7)::before {
  content: "R";
}
.winStyle-7 {
  border-top-right-radius: 10px;
}
.winStyle-1 {
  border-top-left-radius: 10px;
}
.button:hover .box:before {
  transform: translateY(0);
}
</style>
