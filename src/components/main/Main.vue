<template>
  <div class="main">
    <div class="input-area" v-show="page.asideIndex == '1'">
      <div class="menu">
        <el-menu
          mode="horizontal"
          @select="tabChange"
          default-active="1"
          :ellipsis="false"
        >
          <el-button @click="dialogVisible = true"><el-icon><MagicStick /></el-icon></el-button>
          <el-menu-item index="1">{{ t('main.textTab') }}</el-menu-item>
          <el-menu-item index="2">{{ t('main.ssmlTab') }}</el-menu-item>
        </el-menu>
      </div>
      <div class="text-area" v-show="page.tabIndex == '1'">
        <el-input
          v-model="inputs.inputValue"
          type="textarea"
          :placeholder="t('main.placeholder')"
        />
      </div>
      <div class="text-area2" v-show="page.tabIndex == '2'">
        <el-input v-model="inputs.ssmlValue" type="textarea" />
      </div>
      
    </div>
    
    <!-- <el-dialog title="Enviar a ChatGPT" :visible.sync="showModal">
      <el-input v-model="modalInput" placeholder="Escribe algo aquí"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModal = false">Cancelar</el-button>
        <el-button type="primary" @click="sendToChatGPT">Enviar</el-button>
      </span>
    </el-dialog> -->
  
    <el-dialog v-model="dialogVisible" :title="t('main.titleGenerateTextGPT')" width="30%" draggable style="padding: 0px !important;">
      <span>{{ t('main.descriptionGenerateTextGPT') }}</span>
      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 10px;">
        <el-input v-model="modalInput" :placeholder="t('main.placeholderGPT')"></el-input>
        <el-button type="primary" @click="sendToChatGPT"><el-icon><ChatLineSquare /></el-icon></el-button>
      </div>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>

    <div class="input-area" v-show="page.asideIndex == '2'">
      <el-table
        :data="tableData"
        height="calc(100vh - 170px)"
        style="width: 100%"
      >
        <el-table-column
          prop="fileName"
          :label="t('main.fileName')"
          show-overflow-tooltip="true"
        />
        <el-table-column
          prop="filePath"
          :label="t('main.filePath')"
          show-overflow-tooltip="true"
        />
        <el-table-column
          prop="fileSize"
          :label="t('main.fileSize')"
          width="80"
          show-overflow-tooltip="true"
        />
        <el-table-column prop="status" :label="t('main.status')"
        width="70">
          <template #default="scope">
            <div>
              <el-tag
                class="ml-2"
                :type="scope.row.status == 'ready' ? t('main.ready') : t('main.play')"
                >{{ scope.row.status }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="t('main.action')">
          <template #default="scope">
            <template v-if="scope.row.status == 'ready'">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >{{t('main.remove')}}</el-button
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
            <el-button type="primary">{{ t('main.selectFiles') }}</el-button>
          </template>

          <template #tip>
            <div class="el-upload__tip">{{ t('main.fileFormatTip') }}</div>
          </template>
        </el-upload>
        <el-button type="warning" @click="clearAll"
          ><el-icon><DeleteFilled /></el-icon>{{ t('main.clearAll') }}</el-button
        >
      </div>
    </div>
    <!-- <MainOptions v-show="page.asideIndex != '3'"></MainOptions> -->
    <MainOptions v-show="['1', '2'].includes(page.asideIndex)"></MainOptions>
    <div class="main-config-page" v-if="page.asideIndex == '3'">
      <ConfigPage></ConfigPage>
    </div>
    <div class="main-config-page" v-if="page.asideIndex == '4'">
      <iframe class="doc-frame" src="https://loker-page.lgwawork.com/home.html">
      </iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import i18n from '@/assets/i18n/i18n';
import MainOptions from "./MainOptions.vue";
import ConfigPage from "../configpage/ConfigPage.vue";
import { ElButton, ElDialog } from 'element-plus'

import { ref, watch } from "vue";
import type { UploadInstance, UploadProps, UploadUserFile } from "element-plus";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
const { shell } = require("electron");
var path = require("path");
const { t } = useI18n();  
const store = useTtsStore();
const { inputs, page, tableData, currMp3Url, config, formConfig, audioPlayer } =
  storeToRefs(store);
// SSML内容和文本框内容同步

i18n.global.locale.value = config.value.language;
watch(
  () => inputs.value.inputValue,
  (newValue) => {
    store.setSSMLValue(newValue);
  }
);

const showModal = ref(false);
const modalInput = ref('');

const sendToChatGPT = async () => {
  if (!modalInput.value) return;
  // const response = await chatGPTFunction(modalInput.value); // Reemplaza 'chatGPTFunction' con la función real
  // inputs.value.inputValue = response; // Asumiendo que 'inputs.value.inputValue' es tu textarea principal
  showModal.value = false;
  store.startChatGPT(modalInput.value);
};

const dialogVisible = ref(false)

const visible = ref(false)

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
  uploadRef.value!.clearFiles();
};

const play = (val: any) => {
  if (audioPlayer.value) {
    (audioPlayer.value as any).src = path.join(
      config.value.savePath,
      val.fileName.split(path.extname(val.fileName))[0] + ".mp3"
    );
    (audioPlayer.value as any).play();
  } else {
    currMp3Url.value = path.join(
      config.value.savePath,
      val.fileName.split(path.extname(val.fileName))[0] + ".mp3"
    );
  }
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
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  display: flex;
  justify-content: space-between;
}
.input-area {
  width: 100% !important;
  border-radius: 5px !important;
}
.main-config-page {
  width: 100%;
  height: calc(100vh - 102px);
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
  overflow: hidden;
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
  height: calc(100vh - 130px);
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
.doc-frame {
  width: 100%;
  height: 100%;
  border: medium none;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
