import fs from "fs";
import { Request, Response } from "express";

import {
    getTempSavedFilePath,
    uploadToCloudinary,
} from "../utils/file-upload-helper";
import { loadText } from "../genai/textLoaders";
import { analyzeData } from "../genai/analyzeData";
import { ApiError } from "../utils/ApiError";
import { UploadApiResponse } from "cloudinary";

const fetchDataAnalytics = async (req: Request, res: Response) => {
    if (!req.file && !req.body?.text) {
        throw new ApiError(400, "Provide a valid file or text");
    }

    const type_of_data = req.body?.type_of_data;
    if (!type_of_data) {
        throw new ApiError(400, "Invalid data received");
    }

    let textContent;
    let tempFilePath;

    let upload_result: UploadApiResponse | undefined;

    // if user sent a file
    if (type_of_data === "file") {
        if (!req.file) {
            throw new ApiError(400, "File not provided");
        }

        tempFilePath = await getTempSavedFilePath(req);
        const textDocument = await loadText(tempFilePath);
        textContent = textDocument[0].pageContent;

        // upload file to clodinary
        try {
            upload_result = await uploadToCloudinary(req);
        } catch (error) {
            console.log("File upload error ", error);
        }
    }
    // if user sent a text
    else {
        if (!req.body?.text) {
            throw new ApiError(400, "Text not provided");
        }
        textContent = req.body.text;
    }

    const { summary, sentiment, keywords } = await analyzeData(textContent);

    if (type_of_data === "file" && tempFilePath)
        await fs.promises.unlink(tempFilePath);

    res.status(200).json({
        success: true,
        data: {
            summary: summary.content,
            sentiment: sentiment.content,
            keywords: keywords.content,
        },
        upload_result: {
            url: upload_result?.secure_url,
            filename: upload_result?.original_filename,
        },
    });
};

export { fetchDataAnalytics };
