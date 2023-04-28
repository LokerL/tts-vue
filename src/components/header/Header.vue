<template>
  <div class="header" :class="{ 'win-style': winStyle }">
    <div class="win-tools" :class="{ 'win-style': winStyle }">
      <el-button
        type="danger"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('close')"
        @mouseenter="currShow = 1"
        @mouseleave="currShow = 0"
      >
        <el-icon v-show="currShow == 1"><Close /></el-icon>
      </el-button>
      <el-button
        type="warning"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('min')"
        @mouseenter="currShow = 2"
        @mouseleave="currShow = 0"
      >
        <el-icon v-show="currShow == 2"><Minus /></el-icon>
      </el-button>
      <el-button
        type="success"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('window-maximize')"
        @mouseenter="currShow = 3"
        @mouseleave="currShow = 0"
      >
        <el-icon v-show="currShow == 3"><FullScreen /></el-icon>
      </el-button>
      <el-button
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('openDevTools')"
      >
        <el-icon><Monitor /></el-icon>
      </el-button>
    </div>
    <Logo :winStyle="winStyle" />
  </div>
</template>

<script lang="ts" setup>
import Logo from "./Logo.vue";
import { ref, watch } from "vue";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";

const ttsStore = useTtsStore();
const { config } = storeToRefs(ttsStore);

watch(
  () => config.value.titleStyle,
  (newValue) => {
    winStyle.value = !newValue;
  }
);

const { ipcRenderer } = require("electron");
const currShow = ref(0);
const winStyle = ref(!config.value.titleStyle);
</script>

<style scoped>
.header {
  height: 30px;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-items: auto;
  justify-content: space-between;
}
.win-tools {
  display: flex;
  transform: scale(0.8);
}
.win-tools .el-button {
  margin-left: 8px;
}
.win-style {
  flex-direction: row-reverse;
}
</style>
