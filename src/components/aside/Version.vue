<template>
  <div class="version" @click="checkUpdate">
    <span>Version:{{ version }}</span>
    <el-icon :color="hasUpdate ? '#e6a23c' : '#67c23a'"
      ><RefreshRight
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import pkg from "../../../package.json";
import { ref, h } from "vue";
import { ElNotification, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();  

const Store = require("electron-store");
const store = new Store();
const axios = require("axios");

const updateNotification = store.get("updateNotification");
const version = pkg.version;
const getLatestVsersion = async () => {
  let data = {};
  let latestVsersion = await axios
    .get("https://gitee.com/api/v5/repos/LGW_space/tts-vue/releases/latest")
    .catch((e: any) => {
      console.log(e);
    });
  if (typeof latestVsersion == "undefined") {
    latestVsersion = await axios.get(
      "https://api.github.com/repos/LokerL/tts-vue/releases/latest"
    );
  }
  return {
    latestVsersion: latestVsersion.data,
    // github: latestVsersion_GitHub.data,
  };
};
let hasUpdate = ref(false);
getLatestVsersion().then(({ latestVsersion }) => {
  if (version != latestVsersion.tag_name) {
    hasUpdate.value = true;
    if (updateNotification) {
      ElNotification({
        title: t('version.updateAvailable'),
        message: h("strong", [
          h("div", [
            t('version.updateAvailable') + ": ",
            h(
              "i",
              { style: "color: teal;margin-right: 5px;" },
              latestVsersion.tag_name
            ),
            h(
              "a",
              {
                href: "https://gitee.com/LGW_space/tts-vue/releases/latest",
                target: "_blank",
                style: "margin-bottom: 20px;",
              },
              t('version.goToView')
            ),
          ]),
          h("div", latestVsersion.body),
        ]),
        type: "success",
      });
    }
  }
});


const checkUpdate = async () => {
  getLatestVsersion().then(({ latestVsersion }) => {
    let versionInfo = "";
    if (version == latestVsersion.tag_name) {
      versionInfo = `<p class="version-info version-info-success">${t('version.noUpdate')}</p>`;
    } else {
      versionInfo = `<p class="version-info version-info-warning">${t('version.updateAvailable')}</p>`;
    }
    const htmlMsg = `
      <div>
        ${versionInfo}
        <p>${t('version.currentVersion')}<span>${version}</span></p>
        <p>${t('version.latestVersion')}<span>${latestVsersion.tag_name}</span></p>
        <p>${t('version.downloadLinks')}:
          <ul style="margin: 0;">
            <li><a href="https://github.com/LokerL/tts-vue/releases/latest" target="_blank">GitHub</a></li>
            <li><a href="https://gitee.com/LGW_space/tts-vue/releases/latest" target="_blank">Gitee</a></li>
            <li><a href="https://wwn.lanzoul.com/b0f3ype9g" target="_blank">lanzou云</a> 密码：em1n</li>
          </ul>
        </p>
        <p style="margin-top:5px;">
            <div>
      <a href="https://github.com/LokerL/tts-vue/stargazers" target="_blank"
        ><img
          alt="GitHub stars"
          src="https://img.shields.io/github/stars/LokerL/tts-vue?color=success"
      /></a>
      <a href="https://github.com/LokerL/tts-vue/network" target="_blank"
        ><img
          alt="GitHub forks"
          src="https://img.shields.io/github/forks/LokerL/tts-vue"
      /></a>
      <a href="https://github.com/LokerL/tts-vue/issues" target="_blank"
        ><img
          alt="GitHub issues"
          src="https://img.shields.io/github/issues/LokerL/tts-vue"
      /></a>
    </div>
        </p>
      </div>
    `;

    ElMessageBox.alert(htmlMsg, t('version.updateInfo'), {
      confirmButtonText: t('version.confirm'),
      closeOnClickModal: true,
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
  cursor: pointer;
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
