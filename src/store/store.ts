// @/store/firstStore.js

import { defineStore } from "pinia";
import getTTSData from "./play";
import { ElMessage } from "element-plus";
const fs = require("fs");
const path = require("path");
const Store = require("electron-store");
const store = new Store();
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
      formConfig: store.get("FormConfig.默认"),
      page: {
        asideIndex: "1",
        tabIndex: "1",
      },
      tableData: <any>[], // 文件列表的数据
      currConfigName: "默认", // 当前配置的名字
      config: {
        formConfigJson: store.get("FormConfig"),
        formConfigList: <any>[],
        configLable: <any>[],
        savePath: store.get("savePath"),
        autoplay: store.get("autoplay"),
      },
      isLoading: false,
      currMp3Buffer: null,
      currMp3Url: "",
      audioPlayer: null,
    };
  },
  // 定义getters，类似于computed，具有缓存g功能
  getters: {},
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
    setSSMLValue(text = "") {
      if (text === "") text = this.inputs.inputValue;
      const voice = this.formConfig.voiceSelect;
      const express = this.formConfig.voiceStyleSelect;
      const role = this.formConfig.role;
      const rate = (this.formConfig.speed - 1) * 100;
      const pitch = (this.formConfig.pitch - 1) * 50;

      this.inputs.ssmlValue = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
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
    setSavePath() {
      store.set("savePath", this.config.savePath);
    },
    setAutoPlay() {
      store.set("autoplay", this.config.autoplay);
    },
    addFormConfig() {
      this.config.formConfigJson[this.currConfigName] = this.formConfig;
      console.log(this.config.formConfigJson);
      this.genFormConfig();
    },
    genFormConfig() {
      // store.set("FormConfig", this.config.formConfigJson);
      this.config.formConfigList = Object.keys(this.config.formConfigJson).map(
        (item) => ({
          tagName: item,
          content: this.config.formConfigJson[item],
        })
      );
      this.config.configLable = Object.keys(this.config.formConfigJson).map(
        (item) => ({
          value: item,
          label: item,
        })
      );
    },
    async start() {
      // this.page.asideIndex == "1"单文本转换
      if (this.page.asideIndex == "1") {
        this.currMp3Url = "";
        const value = {
          activeIndex: this.page.tabIndex,
          inputValue:
            this.page.tabIndex == "1"
              ? this.inputs.inputValue
              : this.inputs.ssmlValue,
        };
        await getTTSData(
          value,
          this.formConfig.voiceSelect,
          this.formConfig.voiceStyleSelect,
          this.formConfig.role,
          (this.formConfig.speed - 1) * 100,
          (this.formConfig.pitch - 1) * 50
        ).then((mp3buffer: any) => {
          this.currMp3Buffer = mp3buffer;
          const svlob = new Blob([mp3buffer]);
          this.currMp3Url = URL.createObjectURL(svlob);
          this.isLoading = false;
          ElMessage({
            message: this.config.autoplay
              ? "成功，正在试听~"
              : "成功，请手动播放。",
            type: "success",
            duration: 2000,
          });
        });
      } else {
        // this.page.asideIndex == "2" 批量转换
        this.page.tabIndex == "1";
        this.tableData.forEach((item: any) => {
          const inps = {
            activeIndex: 1, // 值转换普通文本
            inputValue: "",
            tableValue: item,
          };
          const filePath = path.join(
            this.config.savePath,
            item.fileName.split(path.extname(item.fileName))[0] + ".mp3"
          );
          fs.readFile(item.filePath, "utf8", async (err: any, datastr: any) => {
            if (err) console.log(err);
            inps.inputValue = datastr;

            const data = await getTTSData(
              inps,
              this.formConfig.voiceSelect,
              this.formConfig.voiceStyleSelect,
              this.formConfig.role,
              (this.formConfig.speed - 1) * 100,
              (this.formConfig.pitch - 1) * 50
            ).then((mp3buffer: any) => {
              console.log(this.isLoading);
              fs.writeFileSync(filePath, mp3buffer);
              this.setDoneStatus(item.filePath);
              ElMessage({
                message: "成功，正在写入" + filePath,
                type: "success",
                duration: 2000,
              });
              this.isLoading = false;
            });
          });
        });
        // this.isLoading = false;
      }
    },
    writeFileSync() {
      const currTime = new Date().getTime().toString();
      const filePath = path.join(this.config.savePath, currTime + ".mp3");
      fs.writeFileSync(path.resolve(filePath), this.currMp3Buffer);
      ElMessage({
        message: "下载成功：" + filePath,
        type: "success",
        duration: 2000,
      });
    },
    tts() {},
  },
});
