<template>
  <div class="main">
    <div class="input-area">
      <el-input
        v-model="inputValue"
        type="textarea"
        placeholder="Please input2"
      />
    </div>
    <MainOptions></MainOptions>
  </div>
</template>

<script setup lang="ts">
import MainOptions from "./MainOptions.vue";
import { ref } from "vue";
const inputValue = ref("");
</script>

<style scoped>
.main {
  background-color: #fff;
  margin-bottom: 5px;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  display: flex;
}
.input-area {
  width: 500px !important;
}
:deep(.el-textarea__inner) {
  min-height: 500px !important;
  resize: none;
}
:deep(textarea::-webkit-scrollbar) {
  width: 5px;
}
:deep(textarea::-webkit-scrollbar-thumb) {
  width: 5px;
  position: relative;
  display: block;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgb(183, 192, 201);
  transition: 0.3 background-color;
  opacity: 0.3;
}
</style>
