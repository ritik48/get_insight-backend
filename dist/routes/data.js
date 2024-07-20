"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const file_upload_helper_1 = require("../utils/file-upload-helper");
const data_1 = require("../controllers/data");
const catchAsync_1 = require("../utils/catchAsync");
const midllewares_1 = require("../utils/midllewares");
const router = express_1.default.Router();
exports.router = router;
router.post("/", (0, catchAsync_1.catchAsync)(midllewares_1.isAuthenticated), file_upload_helper_1.upload.single("file_data"), (0, catchAsync_1.catchAsync)(data_1.fetchDataAnalytics));
