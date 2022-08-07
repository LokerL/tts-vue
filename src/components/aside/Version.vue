<template>
  <div class="version">
    <span>Version:{{ version }}</span>
    <el-icon @click="checkUpdate" :color="hasUpdate ? '#e6a23c' : '#67c23a'"
      ><RefreshRight
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import pkg from "../../../package.json";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { reduce } from "lodash";

const axios = require("axios");
const version = pkg.version;
const getLatestVsersion = async () => {
  const latestVsersion_Gitee = await axios.get(
    "https://gitee.com/api/v5/repos/LGW_space/tts-vue/releases/latest"
  );
  // const latestVsersion_GitHub = await axios.get(
  //   "https://api.github.com/repos/LokerL/tts-vue/releases/latest"
  // );
  return {
    gitee: latestVsersion_Gitee.data,
    // github: latestVsersion_GitHub.data,
  };
};
let hasUpdate = ref(false);
getLatestVsersion().then(({ gitee }) => {
  if (version != gitee.tag_name) {
    hasUpdate.value = true;
  }
});

const checkUpdate = async () => {
  getLatestVsersion().then(({ gitee }) => {
    let versionInfo = "";
    if (version == gitee.tag_name) {
      versionInfo = `<p class="version-info version-info-success">当前为最新版本，无需更新。</p>`;
    } else {
      versionInfo = `<p class="version-info version-info-warning">发现新版本，请手动更新。</p>`;
    }
    const htmlMsg = `
      <div>
      ${versionInfo}
        <p>当前版本：<span>${version}</span></p>
        <p>最新版本：<span>${gitee.tag_name}</span></p>
        <p>下载地址：
          <ul style="margin: 0;">
            <li><a href="https://github.com/LokerL/tts-vue/releases/latest" target="_blank">GitHub</a></li>
            <li><a href="https://gitee.com/LGW_space/tts-vue/releases/latest" target="_blank">Gitee</a></li>
            <li><a href="https://wwn.lanzoul.com/b0f3ype9g" target="_blank">lanzou云</a> 密码：em1n</li>
          </ul>
        </p>
      </div>
    `;

    ElMessageBox.alert(htmlMsg, "版本信息", {
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true,
      callback: (action: Action) => {
        console.log(`action: ${action}`);
      },
    });
  });
};
</script>

<style scoped>
.version {
  color: #909399;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1px;
}
.el-icon {
  margin: auto;
  cursor: pointer;
}
.el-icon:hover {
  animation: loading-rotate 2s linear infinite;
}
</style>
<style>
.version-info {
  --el-alert-padding: 8px 16px;
  --el-alert-border-radius-base: 4px;
  --el-alert-title-font-size: 13px;
  --el-alert-description-font-size: 12px;
  --el-alert-close-font-size: 12px;
  --el-alert-close-customed-font-size: 13px;
  --el-alert-icon-size: 16px;
  --el-alert-icon-large-size: 28px;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  color: #fff;
}
.version-info-success {
  background-color: #67c23a;
}
.version-info-warning {
  background-color: #e6a23c;
}
</style>
