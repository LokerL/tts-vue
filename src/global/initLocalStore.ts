import i18n from '@/assets/i18n/i18n';
import { voices } from './voices';
const Store = require("electron-store");
const store = new Store();
const { ipcRenderer } = require("electron");
const { t } = i18n.global;

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
  const locale = i18n.global.locale.value;

  const formConfigDefault = {
    es: {
      languageSelect: "es-MX",
      voiceSelect: "es-MX-DaliaNeural",
      voiceStyleSelect: "Default",
      role: "",
      speed: 1.0,
      pitch: 1.0,
      api: 1,
    },
    en: {
      languageSelect: "en-US",
      voiceSelect: "en-US-JennyNeural",
      voiceStyleSelect: "Default",
      role: "",
      speed: 1.0,
      pitch: 1.0,
      api: 1,
    },
    zh: {
      languageSelect: "zh-CN",
      voiceSelect: "zh-CN-XiaoxiaoNeural",
      voiceStyleSelect: "Default",
      role: "",
      speed: 1.0,
      pitch: 1.0,
      api: 1,
    },
  };

  store.set("FormConfig.默认", formConfigDefault[locale]);
  
  if (!store.has("savePath")) {
    store.set("savePath", ipcRenderer.sendSync("getDesktopPath"));
  }
  if (!store.has("audition")) {
    store.set(
      "audition",
      t("initialLocalStore.audition")
    );
  }
  if (!store.has("language")) {
    store.set("language", locale);
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
  if (!store.has("speechKey")) {
    store.set("speechKey", "");
  }
  if (!store.has("serviceRegion")) {
    store.set("serviceRegion", "");
  }
  if (!store.has("disclaimers")) {
    store.set("disclaimers", false);
  }
  if (!store.has("retryCount")) {
    store.set("retryCount", 10);
  }
  if (!store.has("retryInterval")) {
    store.set("retryInterval", 3);
  }
}
