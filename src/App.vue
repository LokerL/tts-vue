<script setup lang="ts">
import { useTtsStore } from "@/store/store";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "./components/header/Header.vue";
import Aside from "./components/aside/Aside.vue";
import Main from "./components/main/Main.vue";
import Footer from "./components/footer/Footer.vue";
const ttsStore = useTtsStore();
ttsStore.genFormConfig();
ttsStore.setSSMLValue();
ttsStore.showDisclaimers();
</script>

<template>
  <div class="app">
    <el-container>
      <el-header><Header /></el-header>
      <el-container class="container">
        <el-aside><Aside /></el-aside>
        <el-container class="main-footer">
          <el-main><Main /></el-main>
          <el-footer><Footer /></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
  /* height: 570px; */
}
.app {
  background-color: #f2f3f5;
  border-radius: 10px;
  border:1px solid gray;
}
.el-header {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto !important;
  -webkit-app-region: drag;
}
.el-aside {
  width: auto !important;
  overflow: hidden !important;
}
.container {
  margin-top: 5px;
  height: calc(100vh - 40px);
}
.el-main,
.el-footer {
  border: 0 !important;
  padding: 0 !important;
  margin-left: 5px;
}
.main-footer {
  height: 100%;
  display: flex;
}
.el-button {
  -webkit-app-region: no-drag;
}
</style>
