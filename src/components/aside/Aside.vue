<template>
  <div class="aside">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <el-icon><document /></el-icon>
        <span>操作1</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><setting /></el-icon>
        <span>操作2</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.aside {
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  border-bottom-left-radius: 10px;
}
.el-menu {
  border-right: unset !important;
}
</style>
