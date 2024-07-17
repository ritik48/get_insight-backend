"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeData = void 0;
const llmchains_1 = require("./llmchains");
function analyzeData(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const summary = yield llmchains_1.summarizeChain.invoke({ text });
        const sentiment = yield llmchains_1.sentimentChain.invoke({ text });
        const keywords = yield llmchains_1.keywordChain.invoke({ text });
        console.log("summary : \n");
        console.log(summary.content);
        console.log("\n\nSentiment : \n");
        console.log(sentiment.content);
        console.log("\n\nKeywords : \n");
        console.log(keywords.content);
    });
}
exports.analyzeData = analyzeData;
