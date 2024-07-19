import fs from "fs";
import { Request, Response } from "express";

import { getTempSavedFilePath } from "../utils/file-upload-helper";
import { loadText } from "../genai/textLoaders";
import { analyzeData } from "../genai/analyzeData";
import { ApiError } from "../utils/ApiError";

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

    if (type_of_data === "file") {
        if (!req.file) {
            throw new ApiError(400, "File not provided");
        }

        tempFilePath = await getTempSavedFilePath(req);
        const textDocument = await loadText(tempFilePath);
        textContent = textDocument[0].pageContent;
    } else {
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
    });
};

export { fetchDataAnalytics };
