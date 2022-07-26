<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "./components/header/Header.vue";
import Aside from "./components/aside/Aside.vue";
</script>

<template>
  <div class="app">
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside width="200px"><Aside /></el-aside>
        <el-container class="container">
          <el-main>Main</el-main>
          <el-footer>Foo23ter</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
}
.app {
  background-color: #f2f3f5;
  border-radius: 10px;
  height: 95vh;
}
.el-header {
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto !important;
  -webkit-app-region: drag;
}
.el-aside {
  overflow: hidden !important;
}
.container {
  margin-top: 5px;
}
.el-button {
  -webkit-app-region: no-drag;
}
</style>
