<template>
  <div class="config-page">
    <div class="config-side">
      <el-form :model="config" label-position="top">
        <el-form-item label="下载路径">
          <el-input v-model="config.savePath" size="small" class="input-path">
            <template #append>
              <el-button type="primary" @click="savePathConfig">确认</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="自动播放(仅单文本模式)">
          <el-switch
            v-model="config.autoplay"
            active-text="是"
            inactive-text="否"
            inline-prompt
            @change="switchChange"
          />
        </el-form-item>
        <el-form-item label="版本更新弹窗提醒">
          <el-switch
            v-model="config.updateNotification"
            active-text="是"
            inactive-text="否"
            inline-prompt
            @change="updateNotificationChange"
          />
        </el-form-item>
        <el-form-item label="模板编辑">
          <el-table
            :data="config.formConfigList"
            style="width: 100%"
            height="calc(100vh - 450px)"
          >
            <el-table-column prop="tagName" label="名字">
              <template #default="scope">
                <el-popover
                  effect="light"
                  trigger="hover"
                  placement="top"
                  width="auto"
                >
                  <template #default>
                    <div>语言: {{ scope.row.content.languageSelect }}</div>
                    <div>语音: {{ scope.row.content.voiceSelect }}</div>
                    <div>风格: {{ scope.row.content.voiceStyleSelect }}</div>
                    <div>角色: {{ scope.row.content.role }}</div>
                    <div>语速: {{ scope.row.content.speed }}</div>
                    <div>音调: {{ scope.row.content.pitch }}</div>
                  </template>
                  <template #reference>
                    <el-tag>{{ scope.row.tagName }}</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-button type="primary" @click="ipcRenderer.send('reload')"
          ><el-icon><Refresh /></el-icon>刷新配置</el-button
        >
        <el-button type="warning" @click="openConfigFile"
          ><el-icon><Document /></el-icon>打开配置文件</el-button
        >
      </el-form>
    </div>
    <div class="donate">
      <h3>如果你觉得这个项目帮助到了你，你可以请作者喝杯咖啡表示鼓励 ☕️</h3>
      <div class="er-code">
        <img src="../../assets/zfb.jpg" />
        <img src="../../assets/wx.jpg" />
      </div>
      <div class="btns"><GiteeBtn></GiteeBtn> <GithubBtn></GithubBtn></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import BiliBtn from "./BiliBtn.vue";
import GiteeBtn from "./GiteeBtn.vue";
import GithubBtn from "./GithubBtn.vue";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
const { ipcRenderer, shell } = require("electron");

const Store = require("electron-store");
const store = new Store();

const ttsStore = useTtsStore();
const { config } = storeToRefs(ttsStore);

const handleDelete = (index: any, row: any) => {
  delete config.value.formConfigJson[row.tagName];
  store.set("FormConfig", config.value.formConfigJson);
  ttsStore.genFormConfig();

  ElMessage({
    message: "删除成功，请点击“刷新配置”立即应用。",
    type: "success",
    duration: 2000,
  });
};

const openConfigFile = () => {
  shell.openPath(store.path);
};

const savePathConfig = () => {
  ttsStore.setSavePath();
  ElMessage({
    message: "保存成功，请点击“刷新配置”立即应用。",
    type: "success",
    duration: 2000,
  });
};
const switchChange = () => {
  ttsStore.setAutoPlay();
  ElMessage({
    message: "保存成功，请点击“刷新配置”立即应用。。",
    type: "success",
    duration: 2000,
  });
};
const updateNotificationChange = () => {
  ttsStore.updateNotificationChange();
  ElMessage({
    message: "保存成功，请点击“刷新配置”立即应用。。",
    type: "success",
    duration: 2000,
  });
};
</script>

<style scoped>
.config-page {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  height: 97%;
}
.config-side {
  width: 35vw;
}
h3 {
  margin-left: 10px;
}
.el-form {
  margin-top: 7px;
  border-right: 1px solid #dcdfe6;
  width: 30vw;
  padding-left: 10px;
}
.er-code {
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
:deep(.input-path .el-input-group__append) {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  background-color: #409eff;
  /* border: 1px solid #dcdfe6; */
  border-color: #409eff;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}
:deep(.el-table .el-table__cell) {
  padding: 3px 0 !important;
}
.el-form-item {
  width: 230px;
  margin-bottom: 8px;
}
img {
  width: 245px;
  height: 280px;
}
.btns {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
