<template>
  <div class="footer">
    <div class="play-bar">
      <div class="paly-bar-options">
        <el-button type="primary" circle>
          <el-icon @click="test"><CaretRight /></el-icon>
        </el-button>
        <el-button
          type="warning"
          circle
          style="font-size: 10px; font-weight: 900; width: 32px"
        >
          | |
        </el-button>
        <el-button type="success" circle>
          <el-icon><Download /></el-icon>
        </el-button>
      </div>
      <div class="paly-bar-process">
        <audio :src="src" autoplay controls ref="audio"></audio>
        <!-- <el-slider v-model="process" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import getTTSData from "./play";
const src = ref("");
async function test() {
  const mp3buffer: any = await getTTSData("你好啊");
  if (mp3buffer) {
    var svlob = new Blob([mp3buffer]);
    src.value = URL.createObjectURL(svlob);
    console.log("svlob:", URL.createObjectURL(svlob));
  }
}
const process = ref(0);
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
  justify-content: space-around;
  align-items: center;
}
.paly-bar-options {
  width: 150px;
}
.paly-bar-process {
  width: 500px;
}
</style>
