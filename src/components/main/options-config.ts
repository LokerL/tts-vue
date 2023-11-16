
// import { useI18n } from 'vue-i18n';
import i18n from '@/assets/i18n/i18n';
import { voices } from './../../global/voices';
const { t } = i18n.global;

let msVoicesList;
if (localStorage.getItem("msVoicesList") !== null) {
  msVoicesList = JSON.parse(localStorage.getItem("msVoicesList") || "[]");
} else {
  msVoicesList = voices;
}

const voicesList = msVoicesList.map((item: any) => {
  item.properties.locale = item.locale;
  // ZH_CN_SHANDONG有BUG很奇怪
  // if (lang.hasOwnProperty(item.locale.toUpperCase().replace("-", "_").replace("-", "_"))) {
  //   item.properties.localeZH =
  //     lang[item.locale.toUpperCase().replace("-", "_").replace("-", "_")];
  // } else {
  //   item.properties.localeZH = item.locale
  // }
  item.properties.localeZH = t('lang.' + item.locale.toUpperCase().replace("-", "_").replace("-", "_"));

  return item.properties;
});

const list = voicesList
  .map((item: any) => {
    return {
      value: item.locale,
      label: item.localeZH,
    };
  })
  .sort((a: any, b: any) => b.value.localeCompare(a.value, "en"));

const tempMap = new Map();
const languageSelect = list.filter(
  (item: any) => !tempMap.has(item.value) && tempMap.set(item.value, 1)
);

const findVoicesByLocaleName = (localeName: any) => {
  const voices = voicesList.filter((item: any) => item.locale == localeName);
  return voices;
};

const apiSelect = [
  {
    value: 1,
    label: "Microsoft Speech API",
  },
  {
    value: 2,
    label: "Edge Speech API",
  },
  {
    value: 3,
    label: "Azure Speech API",
  },
];

export const optionsConfig = {
  voicesList,
  languageSelect,
  findVoicesByLocaleName,
  apiSelect,
};
