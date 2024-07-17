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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const analyzeData_1 = require("./genai/analyzeData");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { summary, sentiment, keywords } = yield (0, analyzeData_1.analyzeData)();
    res.status(200).json({
        success: true,
        data: {
            summary: summary.content,
            sentiment: sentiment.content,
            keywords: keywords.content,
        },
    });
}));
app.get("/status", (req, res) => {
    res.json({ success: true, message: "server online" });
});
app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
