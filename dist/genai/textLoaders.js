"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadText = loadText;
const text_1 = require("langchain/document_loaders/fs/text");
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const docx_1 = require("@langchain/community/document_loaders/fs/docx");
const path_1 = __importDefault(require("path"));
const ApiError_1 = require("../utils/ApiError");
function loadText(filePath) {
    const extension = path_1.default.extname(filePath).toLocaleLowerCase();
    let loader;
    switch (extension) {
        case ".txt":
            loader = new text_1.TextLoader(filePath);
            break;
        case ".pdf":
            loader = new pdf_1.PDFLoader(filePath);
            break;
        case ".docx":
            loader = new docx_1.DocxLoader(filePath);
            break;
        default:
            throw new ApiError_1.ApiError(400, "Unknown file type provided");
    }
    return loader.load();
}
