"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const file_upload_helper_1 = require("../utils/file-upload-helper");
const data_1 = require("../controllers/data");
const router = express_1.default.Router();
exports.router = router;
router.post("/", file_upload_helper_1.upload.single("file_data"), data_1.fetchDataAnalytics);
