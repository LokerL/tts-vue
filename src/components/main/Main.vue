<template>
  <div class="main">
    <div class="input-area">
      <el-input
        v-model="inputValue"
        type="textarea"
        placeholder="Please input2"
      />
    </div>
    <div class="options">
      <el-form :model="form" label-width="120px" label-position="top">
        <el-form-item label="语言">
          <el-select
            v-model="form.languageselect"
            placeholder="please select your zone"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="语音">
          <el-select
            v-model="form.voiceselect"
            placeholder="please select your zone"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="说话风格">
          <el-select
            v-model="form.voicestyleselect"
            placeholder="please select your zone"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="语速">
          <el-slider v-model="form.speed" show-input size="small" />
        </el-form-item>
        <el-form-item label="音调">
          <el-slider v-model="form.pitch" show-input size="small" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const inputValue = ref("");

// do not use same name with ref
const form = reactive({
  languageselect: "",
  voiceselect: "",
  voicestyleselect: "",
  speed: 1.0,
  pitch: 1.0,
});
</script>

<style scoped>
.main {
  background-color: #fff;
  margin-bottom: 5px;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  display: flex;
}
.options {
  border-left: 5px solid #f2f3f5;
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
