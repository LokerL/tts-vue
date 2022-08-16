<template>
  <div class="header" @click="test">
    <div class="win-tools">
      <el-button
        type="danger"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('close')"
      >
      </el-button>
      <el-button
        type="warning"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('window-maximize')"
      >
      </el-button>
      <el-button
        type="success"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('min')"
      >
      </el-button>
    </div>
    <Logo />
  </div>
</template>

<script lang="ts" setup>
import Logo from "./Logo.vue";
const { ipcRenderer } = require("electron");
const test = () => {
  console.log("object");
};
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
  margin-left: 10px;
}
.circle-btn {
  width: 15px !important;
  height: 15px !important;
}
</style>
