<template>
  <div class="aside">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.aside {
  height: 90vh;
  background-color: #fff;
  overflow: hidden;
}
</style>
