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
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
const store = useTtsStore();
const { page } = storeToRefs(store);

const menuChange = (index: number) => {
  page.value.asideIndex = index.toString();
  console.log(page.value);
};
</script>

<style scoped>
.aside {
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 5px;
}
.el-menu {
  border-right: unset !important;
}
</style>
