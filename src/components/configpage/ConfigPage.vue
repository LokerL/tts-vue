<template>
  <div class="config-page">
    <div class="config-side">
      <el-form :model="form" label-position="top">
        <el-form-item label="下载路径">
          <el-input v-model="form.savePath" />
        </el-form-item>
        <el-form-item label="自动播放(仅单文本模式)">
          <el-switch v-model="form.autoplay" />
        </el-form-item>
        <el-form-item label="模板编辑">
          <el-table :data="tableData" style="width: 100%" height="200">
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
        <el-button type="primary" @click="saveConfig">确认</el-button>
      </el-form>
    </div>
    <div class="donate">
      <h3>如果你觉得这个项目帮助到了你，你可以请作者喝杯咖啡表示鼓励 ☕️</h3>
      <div class="er-code">
        <img src="../../assets/zfb.jpg" />
        <img src="../../assets/wx.jpg" />
      </div>
      <div class="btns"><BiliBtn></BiliBtn> <GithubBtn></GithubBtn></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import BiliBtn from "./BiliBtn.vue";
import GithubBtn from "./GithubBtn.vue";
const homeDir = require("os").homedir();
const desktopDir = `${homeDir}\\Desktop\\`;

const Store = require("electron-store");
const store = new Store();

if (!store.has("savePath")) {
  store.set("savePath", desktopDir);
}
if (!store.has("autoplay")) {
  store.set("autoplay", true);
}
if (!store.has("FormConfig.默认")) {
  store.set("FormConfig.默认", {
    languageSelect: "Chinese (Mandarin, Simplified)",
    voiceSelect: "zh-CN-XiaoxiaoNeural",
    voiceStyleSelect: "General",
    role: "Default",
    speed: 1.0,
    pitch: 1.0,
  });
}
let FormConfig = store.get("FormConfig");
const handleDelete = (index: any, row: any) => {
  delete FormConfig[row.tagName];
  store.set("FormConfig", FormConfig);
  tableData.value = Object.keys(FormConfig).map((item) => ({
    tagName: item,
    content: FormConfig[item],
  }));
  ElMessage({
    message: "删除成功",
    type: "success",
    duration: 2000,
  });
};
// do not use same name with ref
const form = reactive({
  autoplay: store.get("autoplay"),
  savePath: store.get("savePath"),
});

const saveConfig = () => {
  store.set("autoplay", form.autoplay);
  store.set("savePath", form.savePath);
  ElMessage({
    message: "保存成功，下次打开软件即可应用配置",
    type: "success",
    duration: 2000,
  });
};

const tableData: any = ref(
  Object.keys(FormConfig).map((item) => ({
    tagName: item,
    content: FormConfig[item],
  }))
);
</script>

<style scoped>
.config-page {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
}
h3 {
  margin-left: 10px;
}
.el-form {
  margin-top: 7px;
  border-right: 1px solid #dcdfe6;
  width: 270px;
}
.el-form-item {
  width: 230px;
}
img {
  width: 250px;
  height: 280px;
}
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
