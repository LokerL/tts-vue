<template>
  <div class="aside">
    <el-menu
      :default-active="currIndex"
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

  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
const currIndex = ref("1");
const dialogVisible = ref(false);
const { appContext } = getCurrentInstance() as any;
const menuChange = (index: number) => {
  currIndex.value = index.toString();
  appContext.config.globalProperties.$mitt.emit("sideChange", index);
};
const setting = () => {
  // dialogVisible.value = true;
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
