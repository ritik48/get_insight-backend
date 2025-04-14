"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const google_genai_1 = require("@langchain/google-genai");
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.model = new google_genai_1.ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    maxOutputTokens: 2048,
    apiKey: process.env.GEMINI_API_KEY,
    safetySettings: [
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: generative_ai_1.HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
    ],
});
