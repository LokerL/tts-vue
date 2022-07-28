<template>
  <div class="footer">
    <div class="play-bar">
      <div class="paly-bar-options">
        <!-- <el-button type="primary" circle>
          <el-icon @click="test"><CaretRight /></el-icon>
        </el-button> -->
        <!-- <el-button
          type="warning"
          circle
          style="font-size: 10px; font-weight: 900; width: 32px"
        >
          | |
        </el-button> -->
        <el-button
          type="success"
          circle
          @click="download"
          :disabled="src == ''"
          :loading="isLoading"
        >
          <el-icon><Download /></el-icon>
        </el-button>
      </div>
      <div class="paly-bar-process">
        <audio :src="src" autoplay controls style="width: 100%"></audio>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount, onMounted } from "vue";
import getTTSData from "./play";

const src = ref("");
const isLoading = ref(false);
let currBuffer: any = null;
async function tts(
  val: any,
  voice: string,
  express: string,
  role: string,
  rate: number,
  pitch: number
) {
  const mp3buffer: any = await getTTSData(
    val,
    voice,
    express,
    role,
    rate,
    pitch
  );
  if (mp3buffer) {
    currBuffer = mp3buffer;
    var svlob = new Blob([mp3buffer]);
    src.value = URL.createObjectURL(svlob);
    appContext.config.globalProperties.$mitt.emit("endLoanding", false);
    isLoading.value = false;
  }
}

const process = ref(0);
const { appContext } = getCurrentInstance() as any;
onMounted(() => {
  appContext.config.globalProperties.$mitt.on("start", (res: any) => {
    isLoading.value = true;
    tts(
      res.inputValues,
      res.form.voiceSelect,
      res.form.voiceStyleSelect,
      res.form.role,
      (res.form.speed - 1) * 100,
      (res.form.pitch - 1) * 50
    );
  });
});

const download = () => {
  let fs = require("fs");

  fs.writeFileSync(new Date().getTime() + ".mp3", currBuffer);
};

onBeforeMount(() => {
  appContext.config.globalProperties.$mitt.off("start");
});
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
.paly-bar-options {
  width: 70px;
}
.paly-bar-process {
  width: 60%;
}
</style>
