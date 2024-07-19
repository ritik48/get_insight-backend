import fs from "fs";
import { Request, Response } from "express";

import { getTempSavedFilePath } from "../utils/file-upload-helper";
import { loadText } from "../genai/textLoaders";
import { analyzeData } from "../genai/analyzeData";

const fetchDataAnalytics = async (req: Request, res: Response) => {
    const tempFilePath = await getTempSavedFilePath(req);
    const textDocument = await loadText(tempFilePath);
    const textContent = textDocument[0].pageContent;

    const { summary, sentiment, keywords } = await analyzeData(textContent);

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
