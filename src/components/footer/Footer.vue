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
        <audio
          :src="src"
          :autoplay="autoplay"
          controls
          style="width: 100%"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onBeforeMount, onMounted } from "vue";
import { ElMessage } from "element-plus";
import getTTSData from "./play";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";

const path = require("path");
const Store = require("electron-store");
const store = new Store();
const autoplay = store.get("autoplay");
const savePath = store.get("savePath");

const ttsStore = useTtsStore();
const { inputs, formConfig, page, tableData, isLoading, getSSML } =
  storeToRefs(ttsStore);

const fs = require("fs");
const src = ref("");
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
    const svlob = new Blob([mp3buffer]);
    src.value = URL.createObjectURL(svlob);
    const msg = autoplay ? "成功，正在试听~" : "成功，请手动播放。";
    appContext.config.globalProperties.$mitt.emit("endLoanding", {
      type: false,
      msg: msg,
    });
    isLoading.value = false;
  }
}

async function ttsBatch(
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
  // path.join(savePath, val.tableValue.fileName)
  // await writeMp3(mp3buffer, val.tableValue.filePath.split(".txt")[0] + ".mp3");
  await writeMp3(
    mp3buffer,
    path.join(savePath, val.tableValue.fileName.split(".")[0] + ".mp3")
  );
  ttsStore.setDoneStatus(val.tableValue.filePath);
  // appContext.config.globalProperties.$mitt.emit("doneTrans", val);
}

function writeMp3(mp3buffer: any, path: string) {
  fs.writeFileSync(path, mp3buffer);
  appContext.config.globalProperties.$mitt.emit("endLoanding", {
    type: false,
    msg: "成功，正在写入" + path,
  });
}

const process = ref(0);
const { appContext } = getCurrentInstance() as any;
onMounted(() => {
  appContext.config.globalProperties.$mitt.on("start", () => {
    const value = {
      activeIndex: page.value.tabIndex,
      inputValue:
        page.value.tabIndex == "1"
          ? inputs.value.inputValue
          : inputs.value.ssmlValue,
    };
    tts(
      value,
      formConfig.value.voiceSelect,
      formConfig.value.voiceStyleSelect,
      formConfig.value.role,
      (formConfig.value.speed - 1) * 100,
      (formConfig.value.pitch - 1) * 50
    );
  });

  appContext.config.globalProperties.$mitt.on("startBatch", () => {
    tableData.value.forEach((item: any) => {
      const inps = {
        activeIndex: 1, // 值转换普通文本
        inputValue: "",
        tableValue: item,
      };
      fs.readFile(item.filePath, "utf8", (err: any, datastr: any) => {
        if (err) console.log(err);
        inps.inputValue = datastr;
        ttsBatch(
          inps,
          formConfig.value.voiceSelect,
          formConfig.value.voiceStyleSelect,
          formConfig.value.role,
          (formConfig.value.speed - 1) * 100,
          (formConfig.value.pitch - 1) * 50
        );
      });
    });
  });
});

const download = () => {
  const currTime = new Date().getTime().toString();
  fs.writeFileSync(
    path.resolve(path.join(savePath, currTime + ".mp3")),
    currBuffer
  );
  ElMessage({
    message:
      "下载成功：" + path.resolve(path.join(savePath, currTime + ".mp3")),
    type: "success",
    duration: 2000,
  });
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
