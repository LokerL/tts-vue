<template>
  <div class="main">
    <div class="input-area" v-show="page.asideIndex == '1'">
      <div class="menu">
        <el-menu
          mode="horizontal"
          @select="tabChange"
          default-active="1"
          ellipsis="false"
          collapse-transition="false"
        >
          <el-menu-item index="1">文本</el-menu-item>
          <el-menu-item index="2">SSML</el-menu-item>
        </el-menu>
      </div>
      <div class="text-area" v-show="page.tabIndex == '1'">
        <el-input
          v-model="inputs.inputValue"
          type="textarea"
          placeholder="Please input"
        />
      </div>
      <div class="text-area2" v-show="page.tabIndex == '2'">
        <el-input v-model="inputs.ssmlValue" type="textarea" />
      </div>
    </div>
    <div class="input-area" v-show="page.asideIndex == '2'">
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
        <el-table-column
          prop="fileSize"
          label="字数"
          width="60"
          show-overflow-tooltip="true"
        />
        <el-table-column prop="status" label="状态" width="60">
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
            <template v-if="scope.row.status == 'ready'">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >移除</el-button
              >
            </template>
            <template v-else>
              <el-button
                size="small"
                type="warning"
                @click="play(scope.row)"
                circle
                ><el-icon><CaretRight /></el-icon
              ></el-button>
              <el-button size="small" @click="openInFolder(scope.row)" circle
                ><el-icon><FolderOpened /></el-icon
              ></el-button>
            </template>
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
        <el-button type="warning" @click="clearAll"
          ><el-icon><DeleteFilled /></el-icon>清空</el-button
        >
      </div>
    </div>
    <MainOptions v-show="page.asideIndex != '3'"></MainOptions>
    <div class="main-config-page" v-if="page.asideIndex == '3'">
      <ConfigPage></ConfigPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainOptions from "./MainOptions.vue";
import ConfigPage from "../configpage/ConfigPage.vue";

import { ref, watch } from "vue";
import type { UploadInstance, UploadProps, UploadUserFile } from "element-plus";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
const { shell } = require("electron");
var path = require("path");
const store = useTtsStore();
const { inputs, page, tableData, currMp3Url, config } = storeToRefs(store);

// SSML内容和文本框内容同步
watch(
  () => inputs.value.inputValue,
  (newValue) => {
    store.setSSMLValue(newValue);
  }
);

const tabChange = (index: number) => {
  page.value.tabIndex = index.toString();
};
const uploadRef = ref<UploadInstance>();

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

const clearAll = () => {
  tableData.value = [];
};

const play = (val: any) => {
  currMp3Url.value = path.join(
    config.value.savePath,
    val.fileName.split(path.extname(val.fileName))[0] + ".mp3"
  );
};
const openInFolder = (val: any) => {
  shell.showItemInFolder(
    path.join(
      config.value.savePath,
      val.fileName.split(path.extname(val.fileName))[0] + ".mp3"
    )
  );
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
  justify-content: space-around;
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
