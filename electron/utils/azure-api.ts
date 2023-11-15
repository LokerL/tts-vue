import logger from "../utils/log";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const azureApi = (ssml: string, key: string, region: string) => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.setProperty(sdk.PropertyId.SpeechServiceResponse_RequestSentenceBoundary, "true");
    var audio_config = sdk.AudioConfig.fromDefaultSpeakerOutput();
    var speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, audio_config);
    return new Promise((resolve, reject) => {
        speechSynthesizer.speakSsmlAsync(
            ssml,
            (result: any) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    logger.info(`Speech synthesized to speaker for text [${ssml}]`);
                    resolve(Buffer.from(result.audioData));
                } else {
                    logger.info("Speech synthesis canceled, " + result.errorDetails + "\nDid you update the subscription info?");
                    reject(result);
                }
                speechSynthesizer.close();
                speechSynthesizer = null;
            },
            (err: any) => {
                logger.info("Error synthesizing. " + err);
                speechSynthesizer.close();
                speechSynthesizer = null;
            }
        );
    }
    );
}

export default azureApi;