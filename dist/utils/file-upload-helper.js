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
exports.uploadToCloudinary = exports.upload = exports.getTempSavedFilePath = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const stream_1 = require("stream");
// Configure Cloudinary
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});
const ApiError_1 = require("./ApiError");
const allowedFileTypes = [".txt", ".pdf", ".doc", ".docx"];
// Configure Multer
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
            cb(new Error("Only these file types are allowed : " +
                allowedFileTypes.join(", ")));
        }
    },
});
exports.upload = upload;
const getTempSavedFilePath = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tempPath = os_1.default.tmpdir();
    const tempFilePath = path_1.default.join(tempPath, (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname);
    try {
        yield fs_1.default.promises.writeFile(tempFilePath, (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer);
        return tempFilePath;
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, "Something went wrong while reading the file");
    }
});
exports.getTempSavedFilePath = getTempSavedFilePath;
const uploadToCloudinary = (req) => {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const stream = cloudinary_1.v2.uploader.upload_stream({
            resource_type: "auto",
            folder: "ai",
            filename_override: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream_1.Readable.from((_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer).pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
