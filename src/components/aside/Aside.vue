<template>
  <div class="aside">
    <el-menu
      :default-active="page.asideIndex"
      class="el-menu-vertical-demo"
      @select="menuChange"
    >
      <el-menu-item index="1">
        <el-icon><document /></el-icon>
        <span>{{ t('aside.text') }}</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Files /></el-icon>
        <span>{{ t('aside.batch') }}</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><Setting /></el-icon>
        <span>{{ t('aside.settings') }}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Notebook /></el-icon>
        <span>{{ t('aside.documents') }}</span>
      </el-menu-item>
    </el-menu>
    <Version />
  </div>
</template>

<script setup lang="ts">
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n';
import Version from "./Version.vue";

const { t } = useI18n();
const ttsStore = useTtsStore();
const { page, config } = storeToRefs(ttsStore);

const menuChange = (index: number) => {
  if (index === 4) return;
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
.el-menu-item {
  box-sizing: border-box;
  border-color: var(--el-menu-active-color);
}
.is-active {
  border-left: 2px solid;
}
</style>
