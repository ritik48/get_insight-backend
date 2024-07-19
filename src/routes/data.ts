import express from "express";
import { upload } from "../utils/file-upload-helper";
import { fetchDataAnalytics } from "../controllers/data";
import { catchAsync } from "../utils/catchAsync";

const router = express.Router();

router.post("/", upload.single("file_data"), catchAsync(fetchDataAnalytics));

export { router };
