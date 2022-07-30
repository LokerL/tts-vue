<template>
  <div class="main">
    <div class="input-area" v-show="asideIndex == 1">
      <div class="menu">
        <el-menu mode="horizontal" @select="menuChange" default-active="1">
          <el-menu-item index="1">文本</el-menu-item>
          <el-menu-item index="2">SSML</el-menu-item>
        </el-menu>
      </div>
      <div class="text-area" v-show="activeIndex == 1">
        <el-input
          v-model="inputValue"
          type="textarea"
          placeholder="Please input"
        />
      </div>
      <div class="text-area2" v-show="activeIndex == 2">
        <el-input v-model="ssmlValue" type="textarea" />
      </div>
    </div>
    <div class="input-area" v-show="asideIndex == 2">
      <el-table :data="tableData" height="430" style="width: 100%">
        <el-table-column
          prop="fileName"
          label="文件名"
          show-overflow-tooltip="true"
        />
        <el-table-column
          prop="filePath"
          label="文件路径"
          show-overflow-tooltip="true"
        />
        <el-table-column prop="fileSize" label="字符数" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <div>
              <el-tag
                class="ml-2"
                :type="scope.row.status == 'ready' ? 'info' : 'success'"
                >{{ scope.row.status }}</el-tag
              >
            </div>
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
      <div class="table-tool">
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :on-change="fileChange"
          :on-remove="fileRemove"
          show-file-list="false"
          accept=".txt"
          multiple
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">文本格式为： *.txt</div>
          </template>
        </el-upload>
      </div>
    </div>
    <MainOptions
      v-show="asideIndex != 3"
      :inputValue="inputValue"
      :ssmlValue="ssmlValue"
      :activeIndex="activeIndex"
      :tableData="tableData"
      :asideIndex="asideIndex"
      @change="configChange"
    ></MainOptions>
    <div class="main-config-page" v-if="asideIndex == 3">
      <ConfigPage></ConfigPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainOptions from "./MainOptions.vue";
import ConfigPage from "../configpage/ConfigPage.vue";
import { ref, watch, onMounted, getCurrentInstance } from "vue";
import type { UploadInstance, UploadProps, UploadUserFile } from "element-plus";
const inputValue = ref("你好啊\n今天天气怎么样?");
const ssmlValue = ref("");
const activeIndex = ref(1);
const menuChange = (index: any) => {
  activeIndex.value = index;
  console.log(activeIndex.value);
};
const { appContext } = getCurrentInstance() as any;
const asideIndex = ref(1);
onMounted(() => {
  appContext.config.globalProperties.$mitt.on("sideChange", (res: any) => {
    asideIndex.value = parseInt(res);
    activeIndex.value = 1;
  });

  appContext.config.globalProperties.$mitt.on("doneTrans", (res: any) => {
    for (const item of tableData.value) {
      if (item.filePath == res.tableValue.filePath) {
        item.status = "done";
        return;
      }
    }
  });
});

const ssml = (
  text: string,
  voice: string,
  express: string,
  role: string,
  rate = 0,
  pitch = 0
) => {
  return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <mstts:express-as  ${
              express != "General" ? 'style="' + express + '"' : ""
            } ${role != "Default" ? 'role="' + role + '"' : ""}>
                <prosody rate="${rate}%" pitch="${pitch}%">
                ${text}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `;
};
const configChange = (form: any) => {
  ssmlValue.value = ssml(
    form.inputValue,
    form.voiceSelect,
    form.voiceStyleSelect,
    form.role,
    (form.speed - 1) * 100,
    (form.pitch - 1) * 50
  );
};
const uploadRef = ref<UploadInstance>();
const tableData = ref(<any>[]);

const handleDelete = (index: any, row: any) => {
  uploadRef.value!.handleRemove(row.file);
};

const fileChange = (uploadFile: any, uploadFiles: any) => {
  tableData.value = uploadFiles.map((item: any) => {
    return {
      fileName: item.name,
      filePath: item.raw.path,
      fileSize: item.size,
      status: item.status,
      file: item,
    };
  });
};
const fileRemove = (uploadFile: any, uploadFiles: any) => {
  tableData.value = uploadFiles.map((item: any) => {
    return {
      fileName: item.name,
      filePath: item.raw.path,
      fileSize: item.size,
      status: item.status,
      file: item,
    };
  });
};
</script>

<style scoped>
.main {
  background-color: #f2f3f5;
  margin-bottom: 5px;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  display: flex;
  justify-content: space-between;
}
.input-area {
  width: 500px !important;
  border-radius: 5px !important;
}
.main-config-page {
  width: 100%;
  height: 498px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
.table-tool {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu .el-menu {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  height: 30px;
}
:deep(.el-upload-list) {
  display: none;
}
:deep(.el-textarea__inner) {
  min-height: 470px !important;
  resize: none;
  border-radius: 5px !important;
}
:deep(textarea::-webkit-scrollbar) {
  width: 5px;
}
:deep(textarea::-webkit-scrollbar-thumb) {
  width: 5px;
  position: relative;
  display: block;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgb(183, 192, 201);
  transition: 0.3 background-color;
  opacity: 0.3;
}
</style>
