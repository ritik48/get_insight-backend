"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keywordChain = exports.sentimentChain = exports.summarizeChain = void 0;
const prompts_1 = require("@langchain/core/prompts");
const model_1 = require("./model");
const summarizePrompt = prompts_1.PromptTemplate.fromTemplate("Summarize the following text in a few sentences:\n\n{text}");
const sentimentPrompt = prompts_1.PromptTemplate.fromTemplate("Analyze the sentiment of the following text. Respond with only 'positive', 'negative', or 'neutral':\n\n{text}\n\nSentiment:");
const keywordsPrompt = prompts_1.PromptTemplate.fromTemplate("Extract the main keywords from the following text:\n\n{text}\n\nKeywords:");
const summarizeChain = summarizePrompt.pipe(model_1.model);
exports.summarizeChain = summarizeChain;
const sentimentChain = sentimentPrompt.pipe(model_1.model);
exports.sentimentChain = sentimentChain;
const keywordChain = keywordsPrompt.pipe(model_1.model);
exports.keywordChain = keywordChain;
