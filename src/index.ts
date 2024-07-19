import { config } from "dotenv";
config();
import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { analyzeData } from "./genai/analyzeData";

import os from "os";
import fs from "fs";

const app = express();
app.use(express.json());

import multer from "multer";

const allowedFileTypes = [".txt", ".pdf", ".doc", ".docx"];
import path from "path";
import { ApiError } from "./utils/ApiError";
import { getTempSavedFilePath } from "./utils/file-upload-helper";
import { loadText } from "./genai/textLoaders";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        if (allowedFileTypes.includes(extension.toLowerCase())) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Ony these file types are allowed : " +
                        allowedFileTypes.join(", ")
                )
            );
        }
    },
});

app.post(
    "/",
    upload.single("file_data"),
    async (req: Request, res: Response) => {
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
    }
);

app.get("/status", (req: Request, res: Response) => {
    res.json({ success: true, message: "server online" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message } = err;

    res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
