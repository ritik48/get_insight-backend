import os from "os";
import fs from "fs";
import path from "path";
import { Request } from "express";
import multer from "multer";

import { ApiError } from "./ApiError";

const allowedFileTypes = [".txt", ".pdf", ".doc", ".docx"];

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
                    "Only these file types are allowed : " +
                        allowedFileTypes.join(", ")
                )
            );
        }
    },
});

const getTempSavedFilePath = async (req: Request) => {
    const tempPath = os.tmpdir();
    const tempFilePath = path.join(tempPath, req?.file?.originalname as string);

    try {
        await fs.promises.writeFile(tempFilePath, req.file?.buffer as Buffer);

        return tempFilePath;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while reading the file");
    }
};

export { getTempSavedFilePath, upload };
