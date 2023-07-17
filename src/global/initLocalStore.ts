import { voices } from './voices';
const Store = require("electron-store");
const store = new Store();
const { ipcRenderer } = require("electron");

export default async function initStore() {
  try {
    const msVoicesList = await ipcRenderer.invoke("voices");
    localStorage.setItem("msVoicesList", JSON.stringify(msVoicesList));
  } catch (error) {
    // 如果网络请求失败并且localStorage的msVoicesList为空
    if (localStorage.getItem("msVoicesList") == null) {
      localStorage.setItem("msVoicesList", JSON.stringify(voices));
    }
  }

  store.set("FormConfig.默认", {
    languageSelect: "zh-CN",
    voiceSelect: "zh-CN-XiaoxiaoNeural",
    voiceStyleSelect: "Default",
    role: "",
    speed: 1.0,
    pitch: 1.0,
    api: 1,
    specchKey: "",
    serviceRegion: "",
  });
  
  if (!store.has("savePath")) {
    store.set("savePath", ipcRenderer.sendSync("getDesktopPath"));
  }
  if (!store.has("audition")) {
    store.set(
      "audition",
      "如果你觉得这个项目还不错， 欢迎Star、Fork和PR。你的Star是对作者最好的鼓励。"
    );
  }
  if (!store.has("autoplay")) {
    store.set("autoplay", true);
  }
  if (!store.has("updateNotification")) {
    store.set("updateNotification", true);
  }
  if (!store.has("titleStyle")) {
    store.set("titleStyle", true);
  }
}
