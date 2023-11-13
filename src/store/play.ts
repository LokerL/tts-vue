import { ipcRenderer } from "electron";
import { PromptGPT } from "@/types/prompGPT";

async function getTTSData(
  inps: any,
  voice: string,
  express: string,
  role: string,
  rate = 0,
  pitch = 0,
  api: number,
  key: string,
  region: string,
  retryCount: number,
  retryInterval = 1,
) {
  // 判断retryCount是否为0或者null，如果是则不重试
  if (!retryCount) {
    retryCount = 1;
  }
  if (!retryInterval) {
    retryInterval = 1;
  }
  let SSML = "";
  if (inps.activeIndex == "1" && (api == 1 || api == 3)) {
    SSML = `
    <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <mstts:express-as  ${express != "" ? 'style="' + express + '"' : ""
      } ${role != "" ? 'role="' + role + '"' : ""}>
                <prosody rate="${rate}%" pitch="${pitch}%">
                ${inps.inputValue}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `;
  }
  else if (inps.activeIndex == "1" && api == 2) {
    SSML = `
    <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <prosody rate="${rate}%" pitch="${pitch}%">
            ${inps.inputValue}
            </prosody>
        </voice>
    </speak>
    `;
  }
  else {
    SSML = inps.inputValue;
  }
  ipcRenderer.send("log.info", SSML);
  console.log(SSML);
  if (api == 1) {
    const result = await retrySpeechInvocation(SSML, retryCount, retryInterval * 1000);
    return result;
  } else if (api == 2) {
    const result = await ipcRenderer.invoke("edgeApi", SSML);
    return result;
  } else {
    const result = await ipcRenderer.invoke("azureApi", SSML, key, region);
    return result;
  }
}
async function retrySpeechInvocation(SSML: string, retryCount: number, delay: number) {
  let retry = 0;
  while (retry < retryCount) {
    try {
      console.log("语音调用尝试:", retry + 1);
      const result = await ipcRenderer.invoke("speech", SSML);
      return result; // 执行成功，返回结果
    } catch (error) {
      console.error("Speech invocation failed:", error);
      await sleep(delay); // 暂停一段时间后再重试
    }
    retry++;
  }
  throw new Error(`${retryCount} 次重试后仍转换失败。`); // 重试次数用尽，抛出异常
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// promptGPT 
async function getDataGPT(options: PromptGPT) {
  let { promptGPT, model, key, retryCount, retryInterval=1 } = options;
  // 判断retryCount是否为0或者null，如果是则不重试
  if (!retryCount) {
    retryCount = 1;
  }
  if (!retryInterval) {
    retryInterval = 1;
  }
  const result = await ipcRenderer.invoke("promptGPT", promptGPT, model, key);
  return result;
}

export { getTTSData, getDataGPT };
