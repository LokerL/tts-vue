const axios = require("axios");

const { ipcRenderer } = require("electron");

async function getTTSData(
  inps: any,
  voice: string,
  express: string,
  role: string,
  rate = 0,
  pitch = 0
) {
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
  const result = await ipcRenderer.invoke("speech", SSML);
  return result;
}
export default getTTSData;
