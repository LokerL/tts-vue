// @/store/firstStore.js

import { defineStore } from "pinia";
import getTTSData from "./play";
import { ElMessage } from "element-plus";
import { h } from "vue";
const fs = require("fs");
const path = require("path");
const Store = require("electron-store");
const { ipcRenderer } = require("electron");
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
        audition: store.get("audition"),
        autoplay: store.get("autoplay"),
        updateNotification: store.get("updateNotification"),
      },
      isLoading: false,
      currMp3Buffer: Buffer.alloc(0),
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
    setAuditionConfig() {
      store.set("audition", this.config.audition);
    },
    updateNotificationChange() {
      store.set("updateNotification", this.config.updateNotification);
    },
    setAutoPlay() {
      store.set("autoplay", this.config.autoplay);
    },
    addFormConfig() {
      this.config.formConfigJson[this.currConfigName] = this.formConfig;
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
      console.log("清空缓存中");
      this.currMp3Buffer = Buffer.alloc(0);
      this.currMp3Url = "";
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
        if (this.page.tabIndex == "1" && this.inputs.inputValue.length > 400) {
          const delimiters = "，。？,.?".split("");
          const maxSize = 300;
          ipcRenderer.send("log.info", "字数过多，正在对文本切片。。。");

          const textHandler = this.inputs.inputValue.split("").reduce(
            (obj: any, char, index, arr) => {
              obj.buffer.push(char);
              if (delimiters.indexOf(char) >= 0) obj.end = index;
              if (obj.buffer.length === maxSize) {
                obj.res.push(
                  obj.buffer.splice(0, obj.end + 1 - obj.offset).join("")
                );
                obj.offset += obj.res[obj.res.length - 1].length;
              }
              return obj;
            },
            {
              buffer: [],
              end: 0,
              offset: 0,
              res: [],
            }
          );
          textHandler.res.push(textHandler.buffer.join(""));
          const tasks = textHandler.res;
          for (let index = 0; index < tasks.length; index++) {
            ipcRenderer.send("log.info", `正在执行第${index + 1}次转换。。。`);
            const element = tasks[index];
            value.inputValue = element;
            const buffers: any = await getTTSData(
              value,
              this.formConfig.voiceSelect,
              this.formConfig.voiceStyleSelect,
              this.formConfig.role,
              (this.formConfig.speed - 1) * 100,
              (this.formConfig.pitch - 1) * 50
            );
            this.currMp3Buffer = Buffer.concat([this.currMp3Buffer, buffers]);
            ipcRenderer.send(
              "log.info",
              `第${index + 1}次转换完成，此时Buffer长度为：${
                this.currMp3Buffer.length
              }`
            );
          }

          const svlob = new Blob([this.currMp3Buffer]);
          this.currMp3Url = URL.createObjectURL(svlob);
          this.isLoading = false;
        } else {
          // 字数少直接转换
          await getTTSData(
            value,
            this.formConfig.voiceSelect,
            this.formConfig.voiceStyleSelect,
            this.formConfig.role,
            (this.formConfig.speed - 1) * 100,
            (this.formConfig.pitch - 1) * 50
          )
            .then((mp3buffer: any) => {
              this.currMp3Buffer = mp3buffer;
              const svlob = new Blob([mp3buffer]);
              this.currMp3Url = URL.createObjectURL(svlob);
              this.isLoading = false;
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err);
            });
        }
        ElMessage({
          message: this.config.autoplay
            ? "成功，正在试听~"
            : "成功，请手动播放。",
          type: "success",
          duration: 2000,
        });
        ipcRenderer.send("log.info", `转换完成`);
      } else {
        // this.page.asideIndex == "2" 批量转换
        this.page.tabIndex == "1";

        // 分割方法

        this.tableData.forEach(async (item: any) => {
          const inps = {
            activeIndex: 1, // 值转换普通文本
            inputValue: "",
            tableValue: item,
          };
          const filePath = path.join(
            this.config.savePath,
            item.fileName.split(path.extname(item.fileName))[0] + ".mp3"
          );
          await fs.readFile(
            item.filePath,
            "utf8",
            async (err: any, datastr: any) => {
              if (err) console.log(err);

              inps.inputValue = datastr;
              let buffer = Buffer.alloc(0);

              if (datastr.length > 400) {
                const delimiters = "，。？,.?".split("");
                const maxSize = 300;
                ipcRenderer.send("log.info", "字数过多，正在对文本切片。。。");

                const textHandler = datastr.split("").reduce(
                  (obj: any, char: any, index: any, arr: any) => {
                    obj.buffer.push(char);
                    if (delimiters.indexOf(char) >= 0) obj.end = index;
                    if (obj.buffer.length === maxSize) {
                      obj.res.push(
                        obj.buffer.splice(0, obj.end + 1 - obj.offset).join("")
                      );
                      obj.offset += obj.res[obj.res.length - 1].length;
                    }
                    return obj;
                  },
                  {
                    buffer: [],
                    end: 0,
                    offset: 0,
                    res: [],
                  }
                );
                textHandler.res.push(textHandler.buffer.join(""));
                const tasks = textHandler.res;
                for (let index = 0; index < tasks.length; index++) {
                  ipcRenderer.send(
                    "log.info",
                    `正在执行第${index + 1}次转换。。。`
                  );
                  const element = tasks[index];
                  inps.inputValue = element;
                  const buffers: any = await getTTSData(
                    inps,
                    this.formConfig.voiceSelect,
                    this.formConfig.voiceStyleSelect,
                    this.formConfig.role,
                    (this.formConfig.speed - 1) * 100,
                    (this.formConfig.pitch - 1) * 50
                  );
                  buffer = Buffer.concat([buffer, buffers]);
                  ipcRenderer.send(
                    "log.info",
                    `第${index + 1}次转换完成，此时Buffer长度为：${
                      buffer.length
                    }`
                  );
                }

                fs.writeFileSync(filePath, buffer);
                this.setDoneStatus(item.filePath);
                ElMessage({
                  message: "成功，正在写入" + filePath,
                  type: "success",
                  duration: 2000,
                });
                this.isLoading = false;
              } else {
                await getTTSData(
                  inps,
                  this.formConfig.voiceSelect,
                  this.formConfig.voiceStyleSelect,
                  this.formConfig.role,
                  (this.formConfig.speed - 1) * 100,
                  (this.formConfig.pitch - 1) * 50
                )
                  .then((mp3buffer: any) => {
                    fs.writeFileSync(filePath, mp3buffer);
                    this.setDoneStatus(item.filePath);
                    ElMessage({
                      message: "成功，正在写入" + filePath,
                      type: "success",
                      duration: 2000,
                    });
                    this.isLoading = false;
                  })
                  .catch((err) => {
                    this.isLoading = false;
                    console.log(err);
                  });
              }
            }
          );
        });
        // this.isLoading = false;
      }
    },
    writeFileSync() {
      const currTime = new Date().getTime().toString();
      const filePath = path.join(this.config.savePath, currTime + ".mp3");
      fs.writeFileSync(path.resolve(filePath), this.currMp3Buffer);
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: h("p", null, [
          h("span", null, "下载完成："),
          h(
            "span",
            {
              on: {
                click: this.showItemInFolder(filePath),
              },
            },
            filePath
          ),
        ]),
        type: "success",
        duration: 4000,
      });
      ipcRenderer.send("log.info", `下载完成:${filePath}`);
    },
    async audition(val: string) {
      const inps = {
        activeIndex: 1, // 值转换普通文本
        inputValue: this.config.audition,
      };
      await getTTSData(
        inps,
        val,
        this.formConfig.voiceStyleSelect,
        this.formConfig.role,
        (this.formConfig.speed - 1) * 100,
        (this.formConfig.pitch - 1) * 50
      )
        .then((mp3buffer: any) => {
          this.currMp3Buffer = mp3buffer;
          const svlob = new Blob([mp3buffer]);
          const sound = new Audio(URL.createObjectURL(svlob));
          sound.play();
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    showItemInFolder(filePath: string) {
      ipcRenderer.send("showItemInFolder", filePath);
    },
  },
});
