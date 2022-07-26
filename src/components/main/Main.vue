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
          <el-slider
            v-model="form.speed"
            show-input
            size="small"
            :show-input-controls="false"
            :max="3"
            :step="0.01"
          />
        </el-form-item>
        <el-form-item label="音调">
          <el-slider
            v-model="form.pitch"
            show-input
            size="small"
            :show-input-controls="false"
            :max="2"
            :step="0.01"
          />
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
.input-area {
  width: 500px !important;
}
.options {
  border-left: 5px solid #f2f3f5;
  padding: 5px 12px !important;
}
.el-form-item {
  width: 250px;
}
.el-slider {
  margin-left: 5px;
}
:deep(.el-slider__runway.show-input) {
  margin-right: 10px;
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

:deep(.el-input-number) {
  width: 40px;
}
:deep(.el-input__wrapper) {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
