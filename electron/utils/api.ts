const axios = require("axios");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const speechApi = (ssml: string) => {
  var data = JSON.stringify({
    ssml,
    ttsAudioFormat: "audio-24khz-160kbitrate-mono-mp3",
    offsetInPlainText: 0,
    properties: {
      SpeakTriggerSource: "AccTuningPagePlayButton",
    },
  });

  var config = {
    method: "post",
    url: "https://southeastasia.api.speech.microsoft.com/accfreetrial/texttospeech/acc/v3.0-beta1/vcg/speak",
    responseType: "arraybuffer",
    headers: {
      authority: "southeastasia.api.speech.microsoft.com",
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      customvoiceconnectionid: uuidv4(),
      origin: "https://speech.microsoft.com",
      "sec-ch-ua":
        '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      "content-type": "application/json",
    },

    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
};

const voicesApi = () => {

  const data = JSON.stringify({
    "queryCondition": {
       "items": [
          {
             "name": "VoiceTypeList",
             "value": "StandardVoice",
             "operatorKind": "Contains"
          } 
       ]
    }
 });
 
 const config = {
    method: 'post',
    url: 'https://southeastasia.api.speech.microsoft.com/accfreetrial/texttospeech/acc/v3.0-beta1/vcg/voices',
    headers: { 
       'authority': 'southeastasia.api.speech.microsoft.com', 
       'accept': 'application/json, text/plain, */*', 
       'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6', 
       'customvoiceconnectionid': '97130be0-f304-11ed-b81e-274ad6e5de17', 
       'origin': 'https://speech.microsoft.com', 
       'sec-ch-ua': '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"', 
       'sec-ch-ua-mobile': '?0', 
       'sec-ch-ua-platform': '"Windows"', 
       'sec-fetch-dest': 'empty', 
       'sec-fetch-mode': 'cors', 
       'sec-fetch-site': 'same-site', 
       'speechstudio-session-id': '951910a0-f304-11ed-b81e-274ad6e5de17', 
       'speechstudio-subscriptionsession-id': 'undefined', 
       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42', 
       'x-ms-useragent': 'SpeechStudio/2021.05.001', 
       'content-type': 'application/json'
    },
    data : data,
    timeout: 1500,
 };
 return new Promise((resolve, reject) => {
  axios(config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      console.error(error);
      reject(error);
    });
  });
}

export default {
  speechApi,
  voicesApi,
};
