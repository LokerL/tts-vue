
// import { useI18n } from 'vue-i18n';
import i18n from '@/assets/i18n/i18n';
import { voices } from './../../global/voices';
const { t } = i18n.global;
// const { t } = useI18n();  
// let lang = {
//   AF_ZA: "南非荷兰语(南非)",
//   AM_ET: "阿姆哈拉语(埃塞俄比亚)",
//   AR_AE: "阿拉伯语(阿拉伯联合酋长国)",
//   AR_BH: "阿拉伯语(巴林)",
//   AR_DZ: "阿拉伯语(阿尔及利亚)",
//   AR_EG: "阿拉伯语(埃及)",
//   AR_IL: "阿拉伯语(以色列)",
//   AR_IQ: "阿拉伯语(伊拉克)",
//   AR_JO: "阿拉伯语(约旦)",
//   AR_KW: "阿拉伯语(科威特)",
//   AR_LB: "阿拉伯语(黎巴嫩)",
//   AR_LY: "阿拉伯语(利比亚)",
//   AR_MA: "阿拉伯语(摩洛哥)",
//   AR_OM: "阿拉伯语(阿曼)",
//   AR_PS: "阿拉伯语(巴勒斯坦民族权力机构)",
//   AR_QA: "阿拉伯语(卡塔尔)",
//   AR_SA: "阿拉伯语(沙特阿拉伯)",
//   AR_SY: "阿拉伯语(叙利亚)",
//   AR_TN: "阿拉伯语(突尼斯)",
//   AR_YE: "阿拉伯语(也门)",
//   AS_IN: "阿萨姆语(印度)",
//   AZ_AZ: "阿塞拜疆语(阿塞拜疆) ",
//   BG_BG: "保加利亚语(保加利亚)",
//   BN_BD: "孟加拉语(孟加拉)",
//   BN_IN: "孟加拉语(印度)",
//   BS_BA: "波斯尼亚语(波斯尼亚和黑塞哥维那)",
//   CA_ES: "加泰罗尼亚语(西班牙)",
//   CS_CZ: "捷克语(捷克)",
//   CY_GB: "威尔士语(英国)",
//   DA_DK: "丹麦语(丹麦)",
//   DE_AT: "德语(奥地利)",
//   DE_CH: "德语(瑞士)",
//   DE_DE: "德语(德国)",
//   EL_GR: "希腊语(希腊)",
//   EN_AU: "英语(澳大利亚)",
//   EN_CA: "英语(加拿大)",
//   EN_GB: "英语(英国)",
//   EN_GH: "英语(加纳)",
//   EN_HK: "英语(香港特别行政区)",
//   EN_IE: "英语(爱尔兰)",
//   EN_IN: "英语(印度)",
//   EN_KE: "英语(肯尼亚)",
//   EN_NG: "英语(尼日利亚)",
//   EN_NZ: "英语(新西兰)",
//   EN_PH: "英语(菲律宾)",
//   EN_SG: "英语(新加坡)",
//   EN_TZ: "英语(坦桑尼亚)",
//   EN_US: "英语(美国)",
//   EN_ZA: "英语(南非)",
//   ES_AR: "西班牙语(阿根廷)",
//   ES_BO: "西班牙语(玻利维亚)",
//   ES_CL: "西班牙语(智利)",
//   ES_CO: "西班牙语(哥伦比亚)",
//   ES_CR: "西班牙语(哥斯达黎加)",
//   ES_CU: "西班牙语(古巴)",
//   ES_DO: "西班牙语(多米尼加共和国)",
//   ES_EC: "西班牙语(厄瓜多尔)",
//   ES_ES: "西班牙语(西班牙)",
//   ES_GQ: "西班牙语(赤道几内亚)",
//   ES_GT: "西班牙语(危地马拉)",
//   ES_HN: "西班牙语(洪都拉斯)",
//   ES_MX: "西班牙语(墨西哥)",
//   ES_NI: "西班牙语(尼加拉瓜)",
//   ES_PA: "西班牙语(巴拿马)",
//   ES_PE: "西班牙语(秘鲁)",
//   ES_PR: "西班牙语(波多黎各)",
//   ES_PY: "西班牙语(巴拉圭)",
//   ES_SV: "西班牙语(萨尔瓦多)",
//   ES_US: "西班牙语(美国)",
//   ES_UY: "西班牙语(乌拉圭)",
//   ES_VE: "西班牙语(委内瑞拉)",
//   ET_EE: "爱沙尼亚语(爱沙尼亚)",
//   EU_ES: "巴斯克语(巴斯克语)",
//   FA_IR: "波斯语(伊朗)",
//   FIL_PH: "菲律宾语(菲律宾)",
//   FI_FI: "芬兰语(芬兰)",
//   FR_BE: "法语(比利时)",
//   FR_CA: "法语(加拿大)",
//   FR_CH: "法语(瑞士)",
//   FR_FR: "法语(法国)",
//   GA_IE: "爱尔兰语(爱尔兰)",
//   GL_ES: "加利西亚语(加利西亚语)",
//   GU_IN: "古吉拉特语(印度)",
//   HE_IL: "希伯来语(以色列)",
//   HI_IN: "印地语(印度)",
//   HR_HR: "克罗地亚语(克罗地亚)",
//   HU_HU: "匈牙利语(匈牙利)",
//   HY_AM: "亚美尼亚语(亚美尼亚)",
//   ID_ID: "印度尼西亚语(印度尼西亚)",
//   IS_IS: "冰岛语(冰岛)",
//   IT_CH: "意大利语(瑞士)",
//   IT_IT: "意大利语(意大利)",
//   JA_JP: "日语(日本)",
//   JV_ID: "爪哇语(印度尼西亚)",
//   KA_GE: "格鲁吉亚语(格鲁吉亚)",
//   KK_KZ: "哈萨克语(哈萨克斯坦)",
//   KM_KH: "高棉语(柬埔寨)",
//   KN_IN: "埃纳德语(印度)",
//   KO_KR: "韩语(韩国)",
//   LO_LA: "老挝语(老挝) ",
//   LT_LT: "立陶宛语(立陶宛)",
//   LV_LV: "拉脱维亚语(拉脱维亚)",
//   MK_MK: "马其顿语(北马其顿)",
//   ML_IN: "马拉雅拉姆语(印度)",
//   MN_MN: "蒙古语(蒙古)",
//   MR_IN: "马拉地语(印度)",
//   MS_MY: "马来语(马来西亚)",
//   MT_MT: "马耳他语(马耳他)",
//   MY_MM: "缅甸语(缅甸)",
//   NB_NO: "书面挪威语(挪威)",
//   NE_NP: "尼泊尔语(尼泊尔)",
//   NL_BE: "荷兰语(比利时)",
//   NL_NL: "荷兰语(荷兰)",
//   OR_IN: "奥里亚语(印度)",
//   PA_IN: "旁遮普语(印度)",
//   PL_PL: "波兰语(波兰)",
//   PS_AF: "普什图语(阿富汗)",
//   PT_BR: "葡萄牙语(巴西)",
//   PT_PT: "葡萄牙语(葡萄牙)",
//   RO_MD: "罗马尼亚语(摩尔瓦多)",
//   RO_RO: "罗马尼亚语(罗马尼亚)",
//   RU_RU: "俄语(俄罗斯)",
//   SI_LK: "僧伽罗语(斯里兰卡)",
//   SK_SK: "斯洛伐克语(斯洛伐克)",
//   SL_SI: "斯洛文尼亚语(斯洛文尼亚)",
//   SO_SO: "索马里语(索马里)",
//   SQ_AL: "阿尔巴尼亚语(阿尔巴尼亚)",
//   SR_ME: "塞尔维亚语(西里尔文，黑山)",
//   SR_RS: "塞尔维亚语(塞尔维亚)",
//   SR_XK: "塞尔维亚语(西里尔语，科索沃)",
//   SU_ID: "巽他语(印度尼西亚)",
//   SV_SE: "瑞典语(瑞典)",
//   SW_KE: "斯瓦希里语(肯尼亚)",
//   SW_TZ: "斯瓦希里语(坦桑尼亚)",
//   TA_IN: "泰米尔语(印度)",
//   TA_LK: "泰米尔语(斯里兰卡)",
//   TA_MY: "泰米尔语(马来西亚)",
//   TA_SG: "泰米尔语(新加坡)",
//   TE_IN: "泰卢固语(印度)",
//   TH_TH: "泰语(泰国)",
//   TR_TR: "土耳其语(Türkiye)",
//   UK_UA: "乌克兰语(乌克兰)",
//   UR_IN: "乌尔都语(印度)",
//   UR_PK: "乌尔都语(巴基斯坦)",
//   UZ_UZ: "乌兹别克语(乌兹别克斯坦)",
//   VI_VN: "越南语(越南)",
//   WUU_CN: "中文(吴语，简体)",
//   X_CUSTOM: "自定义语言",
//   YUE_CN: "中文(粤语，简体)",
//   ZH_CN: "中文(普通话，简体)",
//   ZH_CN_Bilingual: "中文(普通话，简体)，英语双语",
//   ZH_CN_HENAN: "中文(中原官话河南，简体)",
//   ZH_CN_LIAONING: "中文(东北官话，简体)",
//   ZH_CN_SHAANXI: "中文(中原官话陕西，简体)",
//   ZH_CN_SHANDONG: "中文(冀鲁官话，简体)",
//   ZH_CN_SICHUAN: "中文(西南官话，简体)",
//   ZH_HK: "中文(粤语，繁体)",
//   ZH_TW: "中文(台湾普通话)",
//   ZU_ZA: "祖鲁语(南非)",
//   nalytics: "语言分析",
//   onversationAnalysisPreviewHint:
//     "通话摘要目前为封闭公共预览版，仅适用于已批准的资源。",
//   fAudio: "Language of audio",
//   esource: "语言资源",
//   echnologiesUsed: "使用的语言技术",
//   InPreview: "预览中的语言",
// };

let lang = t('lang');
console.log(lang);

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
  console.log("voicesList", voicesList);
  const voices = voicesList.filter((item: any) => item.locale == localeName);
  console.log("voices", voices);
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
