<template>
  <div class="footer">
    <div class="play-bar">

      <div class="format-bar-options">
        <span style="color:#1677ff;font-size: 14px;white-space: nowrap;">{{t('footer.format')}}:&nbsp&nbsp;</span>
        <el-select
          v-model="config.formatType"
          style="width: 120px;"
          @change="setFormatType"
        >
          <el-option
            v-for="format in formatOptions"
            :key="format.value"
            :label="format.label"
            :value="format.value"
          ></el-option>
        </el-select>
      </div>

      <div class="paly-bar-options">
        <el-button
          type="success"
          circle
          @click="download"
          :disabled="currMp3Url == ''"
          :loading="isLoading"
          :icon="Download"
          :title="t('footer.downloadAudio')"
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
import { useI18n } from 'vue-i18n';
const { t } = useI18n();  

const ttsStore = useTtsStore();
const { config, currMp3Url, isLoading, audioPlayer } = storeToRefs(ttsStore);

const formatOptions = [
  { label: 'MP3', value: '.mp3' },
  { label: 'WAV', value: '.wav' },
  { label: 'WMA', value: '.wma' },
  { label: 'AIFF', value: '.aiff' },
  // Agrega más formatos según sea necesario
];

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
  display: inline-flex;
  margin-right: 5px;
}
.paly-bar-options {
  width: 70px;
}
.paly-bar-process {
  width: 60%;
}
</style>
