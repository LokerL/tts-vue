import OpenAI from 'openai';
import logger from "../utils/log";

const gptApi = async (promptGPT: string, model: string, key: string) => {
    logger.info(`promptGPT: ${promptGPT}`);
    const openai = new OpenAI({
        apiKey: key,
    });
    logger.info(`model: ${model}`);
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: promptGPT }],
        model: model,
    });
    logger.info(`chatCompletion: ${JSON.stringify(chatCompletion)}`);

    return chatCompletion.choices[0].message.content;
}

export { gptApi };