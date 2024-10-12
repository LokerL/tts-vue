<template>
  <div class="config-page">
    <div class="config-side" label-position="right">
      <el-form :model="config" >
        <el-form-item :label="t('configPage.language')">
          <el-select
            v-model="config.language"
            size="small"
            class="input-path"
            @change="saveLanguageConfig"
          >
            <el-option
              v-for="lang in languages"
              :key="lang.value"
              :label="lang.label"
              :value="lang.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="t('configPage.downloadPath')">
          <el-input
            v-model="config.savePath"
            size="small"
            class="input-path"
            @click="openFolderSelector"
          >
            <template #append>
              <el-button type="primary" @click="savePathConfig">确认</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('configPage.retryCount')">
            <el-input
              type="number"
              v-model="config.retryCount"
              min="1"
              size="small"
              class="input-path"
              @change="setRetryCount"
              />
        </el-form-item>
        <el-form-item :label="t('configPage.retryInterval')">
            <el-input
              type="number"
              v-model="config.retryInterval"
              min="0"
              size="small"
              class="input-path"
              @change="setRetryInterval"
              />
        </el-form-item>
        <el-form-item :label="t('configPage.speechKey')">
            <el-input
              v-model="config.speechKey"
              size="small"
              class="input-path"
              @change="setSpeechKey"
              />
        </el-form-item>
        <el-form-item :label="t('configPage.serviceRegion')">
            <el-input
              v-model="config.serviceRegion"
              size="small"
              class="input-path"
              @change="setServiceRegion"
              :placeholder="t('configPage.serviceRegionPlaceHolder')"
              />
        </el-form-item>
        <el-form-item :label="t('configPage.openAIKey')">
            <el-input
              v-model="config.openAIKey"
              size="small"
              class="input-path"
              @change="setOpenAIKey"
              />
        </el-form-item>
        <el-form-item :label="t('configPage.gptModel')">
          <el-select
            v-model="config.gptModel"
            size="small"
            class="input-path"
            @change="setGPTModel"
          >
            <el-option
              v-for="model in gptModels"
              :key="model.value"
              :label="model.label"
              :value="model.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="t('configPage.autoplay')">
          <el-switch
            v-model="config.autoplay"
            :active-text="t('configPage.yes')"
            :inactive-text="t('configPage.no')"
            inline-prompt
            @change="switchChange"
          />
        </el-form-item>
        <el-form-item :label="t('configPage.updateNotification')">
          <el-switch
            v-model="config.updateNotification"
            :active-text="t('configPage.yes')"
            :inactive-text="t('configPage.no')"
            inline-prompt
            @change="updateNotificationChange"
          />
        </el-form-item>
        <el-form-item :label="t('configPage.titleStyle')">
          <el-switch
            v-model="config.titleStyle"
            active-text="MacOS"
            inactive-text="Windows"
            @change="updateTitleStyle"
          />
        </el-form-item>
        <el-form-item :label="t('configPage.auditionText')">
          <el-input v-model="config.audition" size="small" class="input-path">
            <template #append>
              <el-button type="primary" @click="auditionConfig">{{ t('configPage.confirm') }}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('configPage.templateEdit')">
          <el-table
            :data="config.formConfigList"
            style="width: 100%"
            height="calc(100vh - 560px)"
          >
          <el-table-column :prop="t('configPage.name')" :label="t('configPage.name')">
              <template #default="scope">
                <el-popover
                  effect="light"
                  trigger="hover"
                  placement="top"
                  width="auto"
                >
                  <template #default>-->
                    <div>{{ t('configPage.language') }}: {{ scope.row.content.languageSelect }}</div>
                    <div>{{ t('configPage.voice') }}: {{ scope.row.content.voiceSelect }}</div>
                    <div>{{ t('configPage.style') }}: {{ scope.row.content.voiceStyleSelect }}</div>
                    <div>{{ t('configPage.role') }}: {{ scope.row.content.role }}</div>
                    <div>{{ t('configPage.speed') }}: {{ scope.row.content.speed }}</div>
                    <div>{{ t('configPage.pitch') }}: {{ scope.row.content.pitch }}</div>

                  </template>
                  <template #reference>
                    <el-tag>{{ scope.row.tagName }}</el-tag>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :label="t('configPage.action')">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >{{ t('configPage.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="ipcRenderer.send('reload')"
            ><el-icon><Refresh /></el-icon>{{ t('configPage.refreshConfig') }}</el-button
          >
          <el-button type="warning" @click="openConfigFile"
            ><el-icon><Document /></el-icon>{{ t('configPage.configFile') }}</el-button
          >
          <el-dropdown split-button type="success" @click="openLogs">
            <el-icon><Finished /></el-icon>{{ t('configPage.openLogs') }}
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="openLogFolder"
                  ><el-icon><FolderDelete /></el-icon>{{ t('configPage.clearLogs') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-form-item>
      </el-form>

      <Donate class="donate"></Donate>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import Donate from "./Donate.vue";
import { useI18n } from 'vue-i18n';
import i18n from "@/assets/i18n/i18n";
const { t } = useI18n();

const { ipcRenderer, shell } = require("electron");

const Store = require("electron-store");
const store = new Store();

const ttsStore = useTtsStore();
const { config } = storeToRefs(ttsStore);


const languages = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' },
  { label: '中文', value: 'zh' },
];

const gptModels = [
  { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo'},
  { label: 'GPT-3.5 Turbo 16k', value: 'gpt-3.5-turbo-16k'},
  { label: 'GPT-3.5 Turbo Instruct', value: 'gpt-3.5-turbo-instruct'},
  { label: 'GPT 4 8k', value: 'gpt-4'},
  { label: 'GPT 4 32k', value: 'gpt-4-32k'},
];

const saveLanguageConfig = () => {
  // Actualiza el idioma en i18n y guarda la configuración
  i18n.global.locale.value = config.value.language;
  ttsStore.setLanguage();
  successMessage();
};


const openFolderSelector = async () => {
  const path = await ipcRenderer.invoke("openFolderSelector");
  if (path) {
    config.value.savePath = path[0];
  }
};

const successMessage = () => {
  ElMessage({
    message: "保存成功，请点击“刷新配置”立即应用。",
    type: "success",
    duration: 2000,
  });
};

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

const openLogs = () => {
  ipcRenderer.send("openLogs");
};

const openLogFolder = () => {
  ipcRenderer.send("openLogFolder");
  ElMessage({
    message: "正在打开日志文件夹，请手动清理！",
    type: "error",
    duration: 10000,
  });
};

const savePathConfig = () => {
  ttsStore.setSavePath();
  successMessage();
};

const auditionConfig = () => {
  ttsStore.setAuditionConfig();
  successMessage();
};

const switchChange = () => {
  ttsStore.setAutoPlay();
  successMessage();
};

const updateNotificationChange = () => {
  ttsStore.updateNotificationChange();
  successMessage();
};

const updateTitleStyle = () => {
  ttsStore.updateTitleStyle();
  successMessage();
};

const setSpeechKey = () => {
  ttsStore.setSpeechKey();
  successMessage();
};

const setServiceRegion = () => {
  ttsStore.setServiceRegion();
  successMessage();
};

const setOpenAIKey = () => {
  ttsStore.setOpenAIKey();
  successMessage();
};

const setGPTModel = () => {
  ttsStore.setGPTModel();
  successMessage();
};

const setRetryCount = () => {
  if (config.value.retryCount == '' || config.value.retryCount < 0) {
    config.value.retryCount = 1;
  }
  ttsStore.setRetryCount();
  successMessage();
};

const setRetryInterval = () => {
  if (config.value.retryInterval== '' || config.value.retryInterval < 0) {
    config.value.retryInterval = 0;
  }
  ttsStore.setRetryInterval();
  successMessage();
};
</script>

<style scoped>
.config-page {
  display: flex;
  flex-direction: row;
  padding: 10px;
  height: 97%;
}
.config-side {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.donate {
  width: 420px;
}
.el-form {
  margin-top: 7px;
  border-right: 1px solid #dcdfe6;
  width: calc(100% - 395px);
  padding-left: 10px;
  overflow-x: hidden;
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
  border-color: #409eff;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
}
:deep(.el-table .el-table__cell) {
  padding: 3px 0 !important;
}
.el-form-item {
  width: 37vw;
  margin-bottom: 8px;
}
.btns {
  width: 100%;
  box-sizing: border-box;
  padding-right: 2px;
}
:deep(.btns .el-form-item__content) {
  justify-content: space-between;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
