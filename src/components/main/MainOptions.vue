<template>
  <div class="options">
    <el-form :model="formConfig" label-width="120px" label-position="top">
      <el-form-item :label="t('options.api')">
        <el-select
          v-model="formConfig.api"
          :placeholder="t('options.selectApi')"
          @change="apiChange"
          >
          <el-option
            v-for="item in oc.apiSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('options.language')">
        <el-select-v2
          class="languageSelect"
          v-model="formConfig.languageSelect"
          :placeholder="t('options.selectLanguage')"
          filterable
          :options="oc.languageSelect"
          @change="languageSelectChange"
        >
        </el-select-v2>
      </el-form-item>
      <el-form-item :label="t('options.voice')">
        <el-select
          v-model="formConfig.voiceSelect"
          :placeholder="t('options.selectVoice')"
          @change="voiceSelectChange"
        >
          <el-option
            v-for="item in voiceSelectList"
            :key="item.ShortName"
            :label="item.DisplayName + '-' + item.LocalName"
            :value="item.ShortName"
          >
            <div style="display: flex; justify-content: space-between">
              <span style="margin-right: 5px">{{
                item.DisplayName + "-" + item.LocalName
              }}</span>
              <el-button
                size="small"
                type="success"
                circle
                @click.stop="audition(item.ShortName)"
                ><el-icon><CaretRight /></el-icon
              ></el-button>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('options.speakingStyle')">
        <el-select
          v-model="formConfig.voiceStyleSelect"
          :placeholder="t('options.selectSpeakingStyle')"
          :disabled="apiEdge"
        >
          <el-option
            v-for="item in voiceStyleSelectList"
            :key="item"
            :label="getStyleDes(item)?.word || item"
            :value="item"
          >
            <div style="display: flex; justify-content: start">
              <span style="margin-right: 5px">{{
                getStyleDes(item)?.emoji
              }}</span>
              <span>{{ getStyleDes(item)?.word || item }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('options.rolePlaying')">
        <el-select v-model="formConfig.role" :placeholder="t('options.selectRole')" :disabled="apiEdge">
          <el-option
            v-for="item in rolePlayList"
            :key="item"
            :label="getRoleDes(item)?.word || item "
            :value="item"
          >
            <div style="display: flex; justify-content: start">
              <span style="margin-right: 5px">{{
                getRoleDes(item)?.emoji
              }}</span>
              <span>{{ getRoleDes(item)?.word || item }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('options.speed')">
        <el-slider
          v-model="formConfig.speed"
          show-input
          size="small"
          :show-input-controls="false"
          :max="3"
          :step="0.01"
        />
      </el-form-item>
      <el-form-item :label="t('options.pitch')">
        <el-slider
          v-model="formConfig.pitch"
          show-input
          size="small"
          :show-input-controls="false"
          :max="2"
          :step="0.01"
        />
      </el-form-item>
      <el-form-item class="startBtn">
        <div class="configOption">
          <el-button
            color="#626aef"
            :dark="false"
            plain
            size="small"
            @click="saveConfig"
            >{{ t('options.saveConfig') }}</el-button
          >
          <el-select-v2
            class="get-cfg"
            v-model="currConfigName"
            :placeholder="t('options.selectConfig')"
            filterable
            :options="config.configLabel"
            @change="configChange"
          ></el-select-v2>
        </div>
        <a href="#" class="btn" @click="startBtn">
          <template v-if="isLoading">
            <Loading></Loading>
          </template>
          <template v-else> {{ t('options.startConversion') }} </template>
        </a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { optionsConfig as oc } from "./options-config";
import { getStyleDes, getRoleDes } from "./emoji-config";
import Loading from "./Loading.vue";
import { ElMessage, ElMessageBox, arrowMiddleware } from "element-plus";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();  

const ttsStore = useTtsStore();
const {
  inputs,
  formConfig,
  page,
  tableData,
  currConfigName,
  config,
  isLoading,
} = storeToRefs(ttsStore);
const Store = require("electron-store");
const store = new Store();

// if (!formConfig.value.hasOwnProperty("api")) {
//   formConfig.value.api = true;
// }

const apiEdge = ref(false);

const apiChange = (res:number) => {
  if (res === 2) {
    apiEdge.value = true;
    ElMessage({
      message: t('messages.edgeApiWarning'),
      type: "warning",
      duration: 4000,
    });
  } else {
    if (res === 3 && (config.value.speechKey === "" || config.value.serviceRegion === "")) {
      ElMessage({
        message: t('messages.configureAzure'),
        type: "warning",
        duration: 4000,
      });
        return;
    }
    apiEdge.value = false;
  }
}

const audition = (value: string) => {
  ttsStore.audition(value);
};

watch(formConfig.value, (newValue) => {
  inputs.value.ssmlValue = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${newValue.voiceSelect}">
            <mstts:express-as  ${
              newValue.voiceStyleSelect != ""
                ? 'style="' + newValue.voiceStyleSelect + '"'
                : ""
            } ${
    newValue.role != "" ? 'role="' + newValue.role + '"' : ""
  }>
                <prosody rate="${(
                  (newValue.speed - 1) *
                  100
                ).toFixed()}%" pitch="${(
    (newValue.pitch - 1) *
    50
  ).toFixed()}%">
                ${inputs.value.inputValue}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `;
});

const saveConfig = () => {
  ElMessageBox.prompt(
      t('messages.saveConfigPrompt'),
      t('messages.saveConfig'),
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: t('buttons.confirm'),
      cancelButtonText: t('buttons.cancel'),
      inputValidator: (value: any) => {
        if (value == null || value == "" || value == undefined) {
          return false;
        } else {
          return true;
        }
      },
      inputErrorMessage: t('messages.invalidInput'),
    }
  )
    .then(({ value }) => {
      currConfigName.value = value;
      config.value.formConfigJson[value] = formConfig.value;
      store.set("FormConfig." + value, formConfig.value);
      ttsStore.genFormConfig();
      ElMessage({
        message: t('messages.saveSuccess'),
        type: "success",
        duration: 2000,
      });
    })
    .catch(() => {
      ElMessage({
      message: t('messages.cancelSave'),
        type: "info",
        duration: 2000,
      });
    });
};

// 如果SSML标签页的话锁定
let apiDisable = ref(false);
watch(page.value, (newValue) => {
  if (newValue.tabIndex === '2') {
    apiDisable.value = true;
    formConfig.value.api = true;
  } else {
    apiDisable.value = false;
  }
});

const strToArr = (str: string) => {
  if (str) {
    const obj = JSON.parse(str);
    return Object.keys(obj).sort((a, b) => obj[a] - obj[b]);
  }
  return []
}

const voiceSelectList = ref(
  oc.findVoicesByLocaleName(formConfig.value.languageSelect)
);
const languageSelectChange = (value: string) => {
  formConfig.value.voiceSelect = "";
  formConfig.value.voiceStyleSelect = "";
  formConfig.value.role = "";
  voiceSelectList.value = oc.findVoicesByLocaleName(value);
};

const defaultVoice = voiceSelectList.value.find(
  (item: any) => item.ShortName == formConfig.value.voiceSelect
)

// const voiceStyleSelectListInit = strToArr(defaultVoice?.VoiceStyleNameDefinitions);
const voiceStyleSelectListInit = defaultVoice?.VoiceStyleNames.split(",");
const voiceStyleSelectList: any = ref(voiceStyleSelectListInit);

// const rolePlayListInit = strToArr(defaultVoice?.VoiceRoleNameDefinitions);
const rolePlayListInit = defaultVoice?.VoiceRoleNames.split(",");
const rolePlayList: any = ref(rolePlayListInit);

const voiceSelectChange = (value: string) => {
  
  const voice = voiceSelectList.value.find(
    (item: any) => item.ShortName == formConfig.value.voiceSelect
  );
  // voiceStyleSelectList.value = strToArr(voice?.VoiceStyleNameDefinitions);
  voiceStyleSelectList.value = voice?.VoiceStyleNames.split(",");
  // rolePlayList.value = strToArr(voice?.VoiceRoleNameDefinitions);
  rolePlayList.value = voice?.VoiceRoleNames.split(",");
  formConfig.value.voiceStyleSelect = voiceStyleSelectList.value.length > 0 ? voiceStyleSelectList.value[0] : "";
  formConfig.value.role = rolePlayList.value.length > 0 ? rolePlayList.value[0] : "";
};
const configChange = (val: string) => {
  formConfig.value = config.value.formConfigJson[val];
};

const startBtn = () => {
  if (page.value.asideIndex == "1" && inputs.value.inputValue == "") {
    ElMessage({
      message: t('messages.inputWarning'),
      type: "warning",
      duration: 2000,
    });
    return;
  }
  if (page.value.asideIndex == "2" && tableData.value.length == 0) {
    ElMessage({
      message: t('messages.emptyListWarning'),
      type: "warning",
      duration: 2000,
    });
    return;
  }
  if (isLoading.value) {
    ElMessage({
      message: "请稍候。。。",
      type: "warning",
      duration: 2000,
    });
    return;
  }
  isLoading.value = true;

  ttsStore.start();
};
</script>

<style scoped>
.options {
  background-color: #fff;
  margin-left: 5px;
  padding: 10px 12px !important;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
.el-form {
  height: 99%;
  display: flex;
  flex-direction: column;
}
.configOption {
  display: flex;
  flex-direction: column;
}
.el-form-item {
  width: 270px;
  margin-bottom: 10px
}
.el-slider {
  margin-left: 5px;
}
.el-select {
  width: 100% !important;
}
.languageSelect {
  width: 100% !important;
}
.get-cfg {
  margin-top: 2px;
  width: 100px;
}
:deep(.el-form-item__label) {
  margin-bottom: 2px !important;
}
:deep(.el-slider__runway.show-input) {
  margin-right: 10px;
}
:deep(.el-slider > .el-input-number) {
  width: 40px;
}
:deep(.el-slider .el-input__wrapper) {
  width: 100%;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(.el-switch__label.is-active) {
  font-weight: bold;
}

.startBtn {
  margin-bottom: 0 !important;
  flex: 1;
  display: flex !important;
  align-items: flex-end;
}
:deep(.startBtn > .el-form-item__content) {
  justify-content: space-around;
}
.btn:link,
.btn:visited {
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(27, 27, 27);
  padding: 8px 30px;
  border: 1px solid;
  border-radius: 1000px;
  display: inline-block;
  transition: all 0.2s;
  position: relative;
}

.btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(27, 27, 27, 0.5);
}

.btn:active {
  transform: translateY(-3px);
}

.btn::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -1;
  transition: all 0.3s;
}

.btn:hover::after {
  background-color: rgb(0, 238, 255);
  transform: scaleX(1.4) scaleY(1.5);
  opacity: 0;
}
</style>
