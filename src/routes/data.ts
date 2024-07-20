import express from "express";
import { upload } from "../utils/file-upload-helper";
import { fetchDataAnalytics } from "../controllers/data";
import { catchAsync } from "../utils/catchAsync";
import { isAuthenticated } from "../utils/midllewares";

const router = express.Router();

router.post(
    "/",
    catchAsync(isAuthenticated),
    upload.single("file_data"),
    catchAsync(fetchDataAnalytics)
);

export { router };
