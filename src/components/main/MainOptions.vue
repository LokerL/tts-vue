<template>
  <div class="options">
    <el-form :model="formConfig" label-width="120px" label-position="top">
      <el-form-item label="语言">
        <el-select-v2
          class="languageSelect"
          v-model="formConfig.languageSelect"
          placeholder="选择语言"
          filterable
          :options="oc.languageSelect"
          @change="languageSelectChange"
        >
        </el-select-v2>
      </el-form-item>
      <el-form-item label="语音">
        <el-select
          v-model="formConfig.voiceSelect"
          placeholder="选择语音"
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
      <el-form-item label="说话风格">
        <el-select
          v-model="formConfig.voiceStyleSelect"
          placeholder="选择说话风格"
        >
          <el-option label="General">General</el-option>
          <el-option
            v-for="item in voiceStyleSelectList"
            :key="item"
            :label="getStyleDes(item)?.word"
            :value="item"
          >
            <div style="display: flex; justify-content: start">
              <span style="margin-right: 5px">{{
                getStyleDes(item)?.emoji
              }}</span>
              <span>{{ getStyleDes(item)?.word }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色扮演">
        <el-select v-model="formConfig.role" placeholder="选择角色">
          <el-option label="Default">Default</el-option>
          <el-option
            v-for="item in rolePlayList"
            :key="item"
            :label="getRoleDes(item)?.word"
            :value="item"
          >
            <div style="display: flex; justify-content: start">
              <span style="margin-right: 5px">{{
                getRoleDes(item)?.emoji
              }}</span>
              <span>{{ getRoleDes(item)?.word }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语速">
        <el-slider
          v-model="formConfig.speed"
          show-input
          size="small"
          :show-input-controls="false"
          :max="3"
          :step="0.01"
        />
      </el-form-item>
      <el-form-item label="音调">
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
            >保存配置</el-button
          >
          <el-select-v2
            class="get-cfg"
            v-model="currConfigName"
            placeholder="选择配置"
            filterable
            :options="config.configLable"
            @change="configChange"
          ></el-select-v2>
        </div>
        <a href="#" class="btn" @click="startBtn">
          <template v-if="isLoading">
            <Loading></Loading>
          </template>
          <template v-else> 开始转换 </template>
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
import { ElMessage, ElMessageBox } from "element-plus";
import { useTtsStore } from "@/store/store";
import { storeToRefs } from "pinia";

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

const audition = (value: string) => {
  ttsStore.audition(value);
};

watch(formConfig.value, (newValue) => {
  inputs.value.ssmlValue = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${newValue.voiceSelect}">
            <mstts:express-as  ${
              newValue.voiceStyleSelect != "General"
                ? 'style="' + newValue.voiceStyleSelect + '"'
                : ""
            } ${
    newValue.role != "Default" ? 'role="' + newValue.role + '"' : ""
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
    `<p>给此配置起一个简单的名字吧:)</p><br>默认显示的配置名：<strong>默认</strong>`,
    "保存配置",
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputValidator: (value: any) => {
        if (value == null || value == "" || value == undefined) {
          return false;
        } else {
          return true;
        }
      },
      inputErrorMessage: "错误的输入",
    }
  )
    .then(({ value }) => {
      currConfigName.value = value;
      config.value.formConfigJson[value] = formConfig.value;
      store.set("FormConfig." + value, formConfig.value);
      ttsStore.genFormConfig();
      ElMessage({
        message: "保存成功。",
        type: "success",
        duration: 2000,
      });
    })
    .catch(() => {
      ElMessage({
        message: "取消保存",
        type: "info",
        duration: 2000,
      });
    });
};

const voiceSelectList = ref(
  oc.findVoicesByLocaleName(formConfig.value.languageSelect)
);
const languageSelectChange = (value: string) => {
  formConfig.value.voiceSelect = "";
  formConfig.value.voiceStyleSelect = "General";
  formConfig.value.role = "Default";
  voiceSelectList.value = oc.findVoicesByLocaleName(value);
};
const voiceStyleSelectListInit = voiceSelectList.value.find(
  (item: any) => item.ShortName == formConfig.value.voiceSelect
)?.StyleList;
const voiceStyleSelectList: any = ref(voiceStyleSelectListInit);
const rolePlayList: any = ref([]);
const voiceSelectChange = (value: string) => {
  formConfig.value.voiceStyleSelect = "General";
  formConfig.value.role = "Default";
  const voice = voiceSelectList.value.find(
    (item: any) => item.ShortName == formConfig.value.voiceSelect
  );
  voiceStyleSelectList.value = voice?.StyleList;
  rolePlayList.value = voice?.RolePlayList;
};
const configChange = (val: string) => {
  formConfig.value = config.value.formConfigJson[val];
  console.log(formConfig.value);
};

const startBtn = () => {
  if (page.value.asideIndex == "1" && inputs.value.inputValue == "") {
    ElMessage({
      message: "请输入文字内容。",
      type: "warning",
      duration: 2000,
    });
    return;
  }
  if (page.value.asideIndex == "2" && tableData.value.length == 0) {
    ElMessage({
      message: "列表内容为空。",
      type: "warning",
      duration: 2000,
    });
    return;
  }
  for (const key in formConfig.value) {
    if (Object.prototype.hasOwnProperty.call(formConfig.value, key)) {
      if (!formConfig.value[key]) {
        ElMessage({
          message: "有空选项。",
          type: "warning",
          duration: 2000,
        });
        return;
      }
    }
  }
  if (isLoading.value) {
    ElMessage({
      message: "请稍后。。。",
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
/* From uiverse.io by @Zena4L */
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
