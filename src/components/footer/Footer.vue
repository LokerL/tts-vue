<template>
  <div class="footer">
    <div class="play-bar">

      <div class="format-bar-options">
      <span style="color:blue;font-size: 14px;">下载格式:&nbsp&nbsp;</span>
      <el-input v-model="config.formatType" style="width: 60px; " class="input-path" @change="setFormatType" />
      </div>

      <div class="paly-bar-options">
        <el-button
          type="success"
          circle
          @click="download"
          :disabled="currMp3Url == ''"
          :loading="isLoading"
          :icon="Download"
          title="下载音频"
        />
      </div>
      <div class="paly-bar-process">
        <audio
          ref="audioPlayer"
          :src="currMp3Url"
          :autoplay="config.autoplay"
          controls
          controlslist="nodownload"
          style="width: 100%"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { Download } from "@element-plus/icons-vue";

const ttsStore = useTtsStore();
const { config, currMp3Url, isLoading, audioPlayer } = storeToRefs(ttsStore);

const download = () => {
  ttsStore.writeFileSync();
};
const setFormatType = () => {
  ttsStore.setFormatType(); 
};
</script>

<style scoped>
.footer {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 5px;
  height: 58px;
  align-items: center;
}
.play-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.format-bar-options {
  width: 150px;
  justify-content: center;
  align-items:center;
}
.paly-bar-options {
  width: 70px;
}
.paly-bar-process {
  width: 60%;
}
</style>
