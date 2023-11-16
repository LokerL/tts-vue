// @/store/firstStore.js

import { defineStore } from "pinia";
import { getTTSData, getDataGPT } from "./play";
import { ElMessage, ElMessageBox } from "element-plus";
import { h } from "vue";
const fs = require("fs");
const path = require("path");
const Store = require("electron-store");
const { ipcRenderer } = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const { Readable } = require('stream');

if (process.env.NODE_ENV === 'development') {
  // 处于开发状态
  console.log('开发状态');
  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
} else if (process.env.NODE_ENV === 'production') {
  // 处于打包状态
  console.log('打包状态');
  ffmpeg.setFfmpegPath(ffmpegInstaller.path.replace("app.asar", "app.asar.unpacked"));
}

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
        language: store.get("language"),
        formConfigJson: store.get("FormConfig"),
        formConfigList: <any>[],
        configLabel: <any>[],
        savePath: store.get("savePath"),
        audition: store.get("audition"),
        autoplay: store.get("autoplay"),
        updateNotification: store.get("updateNotification"),
        titleStyle: store.get("titleStyle"),
        api: store.get("api"),
        formatType: store.get("formatType"),
        speechKey: store.get("speechKey"),
        serviceRegion: store.get("serviceRegion"),
        disclaimers: store.get("disclaimers"),
        retryCount: store.get("retryCount"),
        retryInterval: store.get("retryInterval"),
        openAIKey: store.get("openAIKey"),
        gptModel: store.get("gptModel"),
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
            <mstts:express-as  ${express != "General" ? 'style="' + express + '"' : ""
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
    setLanguage() {
      store.set("language", this.config.language);
    },
    setAuditionConfig() {
      store.set("audition", this.config.audition);
    },
    updateNotificationChange() {
      store.set("updateNotification", this.config.updateNotification);
    },
    updateTitleStyle() {
      store.set("titleStyle", this.config.titleStyle);
    },
    setFormatType() {
      store.set("formatType", this.config.formatType);
    },
    setAutoPlay() {
      store.set("autoplay", this.config.autoplay);
    },
    setSpeechKey() {
      store.set("speechKey", this.config.speechKey);
    },
    setOpenAIKey() {
      store.set("openAIKey", this.config.openAIKey);
    },
    setGPTModel() {
      store.set("gptModel", this.config.gptModel);
    },
    setServiceRegion() {
      store.set("serviceRegion", this.config.serviceRegion);
    },
    setRetryCount() {
      store.set("retryCount", parseInt(this.config.retryCount));
    },
    setRetryInterval() {
      store.set("retryInterval", parseInt(this.config.retryInterval));
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
      this.config.configLabel = Object.keys(this.config.formConfigJson).map(
        (item) => ({
          value: item,
          label: item,
        })
      );
    },
    async startChatGPT(promptGPT: string) {
      await getDataGPT(
        {
          promptGPT: promptGPT,
          key: this.config.openAIKey,
          model: this.config.gptModel,
          retryCount: this.config.retryCount,
          retryInterval: this.config.retryInterval,
        }
      )
        .then((res: any) => {
          this.inputs.inputValue = res;
          this.setSSMLValue();
          console.log(res);
          ElMessage({
            message: "Response Success!",
            type: "success",
            duration: 2000,
          });
          // this.start();
        })
        .catch((err: any) => {
          console.error(err);
          ElMessage({
            message: "转换失败\n" + String(err),
            type: "error",
            duration: 3000,
          });
        });
    },
    async start() {
      console.log("清空缓存中");
      let resFlag = true;
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
        if (
          this.page.tabIndex == "1" &&
          this.formConfig.api == 1 &&
          this.inputs.inputValue.length > 400
        ) {
          const delimiters = ["，", "。", "？", ",", ".", "?", "\n"];
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
            try {
              ipcRenderer.send(
                "log.info",
                `正在执行第${index + 1}次转换。。。`
              );
              const element = tasks[index];
              value.inputValue = element;
              const buffers: any = await getTTSData(
                value,
                this.formConfig.voiceSelect,
                this.formConfig.voiceStyleSelect,
                this.formConfig.role,
                (this.formConfig.speed - 1) * 100,
                (this.formConfig.pitch - 1) * 50,
                this.formConfig.api,
                this.config.speechKey,
                this.config.serviceRegion,
                this.config.retryCount,
              );
              this.currMp3Buffer = Buffer.concat([this.currMp3Buffer, buffers]);
              ipcRenderer.send(
                "log.info",
                `第${index + 1}次转换完成，此时Buffer长度为：${this.currMp3Buffer.length
                }`
              );
            } catch (error) {
              resFlag = false;
              console.error(error);
              ipcRenderer.send("log.error", error);
              this.isLoading = false;
              ElMessage({
                message: "网络异常！\n" + String(error),
                type: "error",
                duration: 3000,
              });
              if (this.currMp3Buffer.length > 0) {
                const svlob = new Blob([this.currMp3Buffer]);
                this.currMp3Url = URL.createObjectURL(svlob);
              }
              return;
            }
          }

          if (this.currMp3Buffer.length > 0) {
            const svlob = new Blob([this.currMp3Buffer]);
            this.currMp3Url = URL.createObjectURL(svlob);
          }
          this.isLoading = false;
        } else {
          // 字数少直接转换
          await getTTSData(
            value,
            this.formConfig.voiceSelect,
            this.formConfig.voiceStyleSelect,
            this.formConfig.role,
            (this.formConfig.speed - 1) * 100,
            (this.formConfig.pitch - 1) * 50,
            this.formConfig.api,
            this.config.speechKey,
            this.config.serviceRegion,
            this.config.retryCount,
          )
            .then((mp3buffer: any) => {
              this.currMp3Buffer = mp3buffer;
              const svlob = new Blob([mp3buffer]);
              this.currMp3Url = URL.createObjectURL(svlob);
              this.isLoading = false;
            })
            .catch((err) => {
              resFlag = false;
              this.isLoading = false;
              console.error(err);
              ElMessage({
                message: "转换失败\n" + String(err),
                type: "error",
                duration: 2000,
              });
            });
        }
        if (resFlag) {
          ElMessage({
            message: this.config.autoplay
              ? "成功，正在试听~"
              : "成功，请手动播放。",
            type: "success",
            duration: 2000,
          });
        }

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

              if (datastr.length > 400 && this.formConfig.api == 1) {
                const delimiters = "，。？,.? ".split("");
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
                  try {
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
                      (this.formConfig.pitch - 1) * 50,
                      this.formConfig.api,
                      this.config.speechKey,
                      this.config.serviceRegion,
                      this.config.retryCount,
                    );
                    buffer = Buffer.concat([buffer, buffers]);
                    ipcRenderer.send(
                      "log.info",
                      `第${index + 1}次转换完成，此时Buffer长度为：${buffer.length
                      }`
                    );
                  } catch (error) {
                    console.error(error);
                    resFlag = false;
                    ipcRenderer.send("log.error", error);
                    this.isLoading = false;
                    ElMessage({
                      message: "转换失败\n" + String(error),
                      type: "error",
                      duration: 3000,
                    });
                    if (buffer.length > 0) {
                      fs.writeFileSync(filePath, buffer);
                      this.setDoneStatus(item.filePath);
                    }
                    return;
                  }
                }
                fs.writeFileSync(filePath, buffer);
                this.setDoneStatus(item.filePath);
                if (resFlag) {
                  ElMessage({
                    message: "成功，正在写入" + filePath,
                    type: "success",
                    duration: 2000,
                  });
                }

                this.isLoading = false;
              } else {
                await getTTSData(
                  inps,
                  this.formConfig.voiceSelect,
                  this.formConfig.voiceStyleSelect,
                  this.formConfig.role,
                  (this.formConfig.speed - 1) * 100,
                  (this.formConfig.pitch - 1) * 50,
                  this.formConfig.api,
                  this.config.speechKey,
                  this.config.serviceRegion,
                  this.config.retryCount,
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
                    console.error(err);
                    ElMessage({
                      message: "转换失败\n" + String(err),
                      type: "error",
                      duration: 3000,
                    });
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

      console.log('当前设置的格式:', this.config.formatType);

      //-------------------------------------------------------------------------------------------------------------------------------------

      const filePath = path.join(this.config.savePath, currTime + this.config.formatType);
      if (this.config.formatType == ".mp3") {
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
      }
      else {
        // 将 this.currMp3Buffer 转换为可读流
        const inputStream = new Readable();
        inputStream.push(this.currMp3Buffer);
        inputStream.push(null); // 结束流
        // 使用 fluent-ffmpeg 进行转码
        ffmpeg(inputStream)
          .output(filePath)
          .audioCodec('pcm_s16le') // 示例：使用 PCM 16位音频编码
          .audioChannels(2) // 示例：设置音频通道数为2
          .audioFrequency(44100) // 示例：设置音频采样率为44100Hz
          .on('end', () => {
            console.log('转码完成！音频已保存为文件:', filePath);
            ipcRenderer.send("showItemInFolder", filePath);

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
              duration: 3000,
            });

          })
          .on('error', (err: any) => {
            console.error('转码出错:', err);

            ElMessage({
              dangerouslyUseHTMLString: true,
              message: h("p", null, [
                h("span", null, "转码失败！！！：" + err)
              ]),
              type: "error",
              duration: 3000,
            });

          })
          .run();
      }
      //-------------------------------------------------------------------------------------------------------------------------------------

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
        (this.formConfig.pitch - 1) * 50,
        this.formConfig.api,
        this.config.speechKey,
        this.config.serviceRegion,
        this.config.retryCount,
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
    showDisclaimers() {
      if (!this.config.disclaimers) {
        ElMessageBox.confirm(
          "该软件以及代码仅为个人学习测试使用，请在下载后24小时内删除，不得用于商业用途，否则后果自负。任何违规使用造成的法律后果与本人无关。该软件也永远不会收费，如果您使用该软件前支付了额外费用，或付费获得源码以及成品软件，那么你一定被骗了！",
          "注意！",
          {
            confirmButtonText: "我已确认，不再弹出",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.set("disclaimers", true);
        });
      }
    }
  },
});
