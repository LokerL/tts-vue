const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const ws = require("nodejs-websocket");
const { ipcRenderer } = require("electron");

async function getAuthToken() {
  const res = await axios.get(
    "https://azure.microsoft.com/zh-cn/products/cognitive-services/speech-translation/"
  );

  const reg = /token: \"(.*?)\"/;

  if (reg.test(res.data)) {
    const token = RegExp.$1;

    return "bearer " + token;
  }
}

function getXTime() {
  return new Date().toISOString();
}

function wssSend(connect: any, msg: string) {
  return new Promise((resolve, reject) => {
    connect.send(msg, resolve);
  });
}

function wssConnect(url: string) {
  return new Promise((resolve, reject) => {
    const connect = ws.connect(
      url,
      {
        extraHeaders: {
          Origin: "https://azure.microsoft.com",
        },
      },
      function () {
        resolve(connect);
      }
    );
  });
}

async function getTTSData(
  inps: any,
  voice: string,
  express: string,
  role: string,
  rate = 0,
  pitch = 0
) {
  try {
    let SSML = "";
    if (inps.activeIndex == "1") {
      SSML = `
    <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <mstts:express-as  ${
              express != "General" ? 'style="' + express + '"' : ""
            } ${role != "Default" ? 'role="' + role + '"' : ""}>
                <prosody rate="${rate}%" pitch="${pitch}%">
                ${inps.inputValue}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `;
    } else {
      SSML = inps.inputValue;
    }
    ipcRenderer.send("log.info", SSML);
    console.log(SSML);

    console.log("获取Token...");
    const Authorization = await getAuthToken();
    const XConnectionId = uuidv4().toUpperCase().replaceAll("-", "");

    ipcRenderer.send("log.info", "创建webscoket连接...");
    // const connect: any = await wssConnect(
    //   `wss://eastus.tts.speech.microsoft.com/cognitiveservices/websocket/v1?Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`
    // );
    console.log("创建webscoket连接...");
    console.log("Authorization:", Authorization);
    console.log("XConnectionId:", XConnectionId);
    const connect: any = await wssConnect(
      `wss://eastus.api.speech.microsoft.com/cognitiveservices/websocket/v1?TrafficType=AzureDemo&Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`
    );

    ipcRenderer.send("log.info", "第1次上报...");
    console.log("第1次上报...");
    const message_1 = `Path: speech.config\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.19.0","build":"JavaScript","lang":"JavaScript","os":{"platform":"Browser/Linux x86_64","name":"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0","version":"5.0 (X11)"}}}}`;
    await wssSend(connect, message_1);

    ipcRenderer.send("log.info", "第2次上报...");
    console.log("第2次上报...");
    const message_2 = `Path: synthesis.context\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"synthesis":{"audio":{"metadataOptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":false},"outputFormat":"audio-24khz-160kbitrate-mono-mp3"}}}`;
    await wssSend(connect, message_2);

    ipcRenderer.send("log.info", "第3次上报...");
    console.log("第3次上报...");
    const message_3 = `Path: ssml\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/ssml+xml\r\n\r\n${SSML}`;
    await wssSend(connect, message_3);

    return new Promise((resolve, reject) => {
      let final_data = Buffer.alloc(0);
      connect.on("text", (data: string | string[]) => {
        if (data.indexOf("Path:turn.end") >= 0) {
          ipcRenderer.send("log.info", "已完成");
          console.log("已完成");
          connect.close();
          resolve(final_data);
        }
      });
      connect.on(
        "binary",
        function (response: {
          on: (arg0: string, arg1: { (): void; (): void }) => void;
          read: () => any;
        }) {
          console.log("正在接收数据...");
          let data = Buffer.alloc(0);
          response.on("readable", function () {
            const newData = response.read();
            if (newData)
              data = Buffer.concat(
                [data, newData],
                data.length + newData.length
              );
          });
          response.on("end", function () {
            const index = data.toString().indexOf("Path:audio") + 10;
            const cmbData = data.slice(index + 2);
            final_data = Buffer.concat([final_data, cmbData]);
          });
        }
      );
      connect.on("close", function (code: any, reason: any) {});
    });
  } catch (error) {
    console.log(error);
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}
export default getTTSData;
