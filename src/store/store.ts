// @/store/firstStore.js

import { defineStore } from "pinia";
import getTTSData from "./play";
// 定义并导出容器，第一个参数是容器id，必须唯一，用来将所有的容器
// 挂载到根容器上
export const useTtsStore = defineStore("ttsStore", {
  // 定义state，用来存储状态的
  state: () => {
    return {
      inputs: {
        inputValue: "你好啊\n今天天气怎么样?",
        ssmlValue: "你好啊\n今天天气怎么样?",
      },
      formConfig: {
        languageSelect: "Chinese (Mandarin, Simplified)",
        voiceSelect: "zh-CN-XiaoxiaoNeural",
        voiceStyleSelect: "General",
        role: "Default",
        speed: 1.0,
        pitch: 1.0,
      },
      page: {
        asideIndex: "1",
        tabIndex: "1",
      },
      tableData: <any>[],
      currConfigName: "",
      config: {
        FormConfig: {},
      },
      isLoading: false,
      mp3Buffer: null,
    };
  },
  // 定义getters，类似于computed，具有缓存g功能
  getters: {
    getSSML(state) {
      const text = state.inputs.ssmlValue;
      const voice = state.formConfig.voiceSelect;
      const express = state.formConfig.voiceStyleSelect;
      const role = state.formConfig.role;
      const rate = (state.formConfig.speed - 1) * 100;
      const pitch = (state.formConfig.pitch - 1) * 50;

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
    },
    configLable(state) {
      return Object.keys(state.formConfig).map((item) => ({
        value: item,
        label: item,
      }));
    },
  },
  // 定义actions，类似于methods，用来修改state，做一些业务逻辑
  actions: {
    setDoneStatus(filePath: string) {
      for (const item of this.tableData) {
        if (item.filePath == filePath) {
          item.status = "done";
          return;
        }
      }
    },
    setInputValue(value: string) {
      this.inputs.inputValue = value;
      this.inputs.ssmlValue = value;
    },
    setSsmlValue(value: string) {
      this.inputs.ssmlValue = value;
    },
    setValues(values: object) {
      Object.assign(this.inputs, values);
    },
    setFormConf(config: object) {
      Object.assign(this.formConfig, config);
    },
    start(ttsFun: Function) {},
    async getMp3Buffer() {
      if (this.page.asideIndex == "1") {
        const value =
          this.page.tabIndex == "1" ? this.inputs.inputValue : this.getSSML;
        this.isLoading = true;
        const mp3buffer: any = await getTTSData(
          value,
          this.formConfig.voiceSelect,
          this.formConfig.voiceStyleSelect,
          this.formConfig.role,
          (this.formConfig.speed - 1) * 100,
          (this.formConfig.pitch - 1) * 50
        );
        return mp3buffer;
      }
    },
  },
});
