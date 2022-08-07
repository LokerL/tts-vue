<template>
  <div class="aside">
    <el-menu
      :default-active="page.asideIndex"
      class="el-menu-vertical-demo"
      @select="menuChange"
    >
      <el-menu-item index="1">
        <el-icon><document /></el-icon>
        <span>文本</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Files /></el-icon>
        <span>批量</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
    <Version />
  </div>
</template>

<script setup lang="ts">
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import Version from "./Version.vue";

const Store = require("electron-store");
const store = new Store();
const ttsStore = useTtsStore();
const { page, config } = storeToRefs(ttsStore);

const menuChange = (index: number) => {
  page.value.asideIndex = index.toString();
};
</script>

<style scoped>
.aside {
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 5px;
}
.el-menu {
  border-right: unset !important;
}
</style>
