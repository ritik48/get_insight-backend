import express from "express";
import { upload } from "../utils/file-upload-helper";
import { fetchDataAnalytics } from "../controllers/data";

const router = express.Router();

router.post("/", upload.single("file_data"), fetchDataAnalytics);

export { router };
