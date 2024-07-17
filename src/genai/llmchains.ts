import { PromptTemplate } from "@langchain/core/prompts";
import { model } from "./model";

const summarizePrompt = PromptTemplate.fromTemplate(
    "Summarize the following text in a few sentences:\n\n{text}"
);

const sentimentPrompt = PromptTemplate.fromTemplate(
    "Analyze the sentiment of the following text. Respond with only 'positive', 'negative', or 'neutral':\n\n{text}\n\nSentiment:"
);

const keywordsPrompt = PromptTemplate.fromTemplate(
    "Extract the main keywords from the following text:\n\n{text}\n\nKeywords:"
);

const summarizeChain = summarizePrompt.pipe(model);
const sentimentChain = sentimentPrompt.pipe(model);
const keywordChain = keywordsPrompt.pipe(model);

export { summarizeChain, sentimentChain, keywordChain };
