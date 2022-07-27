<template>
  <div class="options">
    <el-form :model="form" label-width="120px" label-position="top">
      <el-form-item label="语言">
        <el-select
          v-model="form.languageSelect"
          placeholder="选择语言"
          filterable
        >
          <el-option
            v-for="item in oc.languageSelect"
            :key="item.Locale"
            :label="item.LocaleName"
            :value="item.LocaleName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语音">
        <el-select v-model="form.voiceSelect" placeholder="选择语音">
          <el-option
            v-for="item in voiceSelectList"
            :key="item.ShortName"
            :label="item.DisplayName + '-' + item.LocalName"
            :value="item.ShortName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="说话风格">
        <el-select
          v-model="form.voiceStyleSelect"
          placeholder="选择说话风格"
          :disable="typeof voiceStyleSelectList?.value == 'undefined'"
        >
          <el-option
            v-for="item in voiceStyleSelectList"
            :key="item"
            :label="item"
            :value="item"
          />
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
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { optionsConfig as oc } from "./options-config";
const form = reactive({
  languageSelect: "Chinese (Mandarin, Simplified)",
  voiceSelect: "zh-CN-XiaoxiaoNeural",
  voiceStyleSelect: "General",
  speed: 1.0,
  pitch: 1.0,
});
watch(form, (newValue) => {
  console.log(newValue);
});
const voiceSelectList = ref(oc.findVoicesByLocaleName(form.languageSelect));
watch(
  () => form.languageSelect,
  (newValue) => {
    form.voiceSelect = "";
    form.voiceStyleSelect = "";
    voiceSelectList.value = oc.findVoicesByLocaleName(newValue);
  }
);
const voiceStyleSelectListInit = voiceSelectList.value.find(
  (item: any) => item.ShortName == form.voiceSelect
)?.StyleList;
let voiceStyleSelectList: any = ref(voiceStyleSelectListInit);
watch(
  () => form.voiceSelect,
  (newValue) => {
    form.voiceStyleSelect = "";
    const voice = voiceSelectList.value.find(
      (item: any) => item.ShortName == form.voiceSelect
    );
    voiceStyleSelectList.value = voice?.StyleList;
  }
);
</script>

<style scoped>
.options {
  background-color: #fff;
  margin-left: 5px;
  padding: 5px 12px !important;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.el-form-item {
  width: 270px;
}
.el-slider {
  margin-left: 5px;
}
.el-select {
  width: 100% !important;
}
:deep(.el-slider__runway.show-input) {
  margin-right: 10px;
}
:deep(.el-slider > .el-input-number) {
  width: 40px;
}
:deep(.el-slider .el-input__wrapper) {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
