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
exports.fetchDataAnalytics = void 0;
const fs_1 = __importDefault(require("fs"));
const file_upload_helper_1 = require("../utils/file-upload-helper");
const textLoaders_1 = require("../genai/textLoaders");
const analyzeData_1 = require("../genai/analyzeData");
const fetchDataAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tempFilePath = yield (0, file_upload_helper_1.getTempSavedFilePath)(req);
    const textDocument = yield (0, textLoaders_1.loadText)(tempFilePath);
    const textContent = textDocument[0].pageContent;
    const { summary, sentiment, keywords } = yield (0, analyzeData_1.analyzeData)(textContent);
    yield fs_1.default.promises.unlink(tempFilePath);
    res.status(200).json({
        success: true,
        data: {
            summary: summary.content,
            sentiment: sentiment.content,
            keywords: keywords.content,
        },
    });
});
exports.fetchDataAnalytics = fetchDataAnalytics;
