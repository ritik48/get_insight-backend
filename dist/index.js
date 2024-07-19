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
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const multer_1 = __importDefault(require("multer"));
const allowedFileTypes = [".txt", ".pdf", ".doc", ".docx"];
const path_1 = __importDefault(require("path"));
const file_upload_helper_1 = require("./utils/file-upload-helper");
const textLoaders_1 = require("./genai/textLoaders");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const extension = path_1.default.extname(file.originalname);
        if (allowedFileTypes.includes(extension.toLowerCase())) {
            cb(null, true);
        }
        else {
            cb(new Error("Ony these file types are allowed : " +
                allowedFileTypes.join(", ")));
        }
    },
});
app.post("/", upload.single("file_data"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
app.get("/status", (req, res) => {
    res.json({ success: true, message: "server online" });
});
app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json({ success: false, message });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
