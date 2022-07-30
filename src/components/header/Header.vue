<template>
  <div class="header">
    <div class="win-tools">
      <el-button
        type="danger"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('close')"
      >
      </el-button>
      <!-- <el-button type="warning" size="small" circle class="circle-btn">
      </el-button> -->
      <el-button
        type="success"
        size="small"
        circle
        class="circle-btn"
        @click="ipcRenderer.send('min')"
      >
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { ipcRenderer } = require("electron");
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
}
.win-tools {
  margin-left: 10px;
}
.circle-btn {
  width: 15px !important;
  height: 15px !important;
}
</style>
