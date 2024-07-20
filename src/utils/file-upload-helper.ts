import os from "os";
import fs from "fs";
import path from "path";
import { Request } from "express";
import multer from "multer";
import { Readable } from "stream";

// Configure Cloudinary
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
cloudinary.config({
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

import { ApiError } from "./ApiError";

const allowedFileTypes = [".txt", ".pdf", ".doc", ".docx"];

// Configure Multer
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

const uploadToCloudinary = (
    req: Request
): Promise<UploadApiResponse | undefined> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "ai",
                filename_override: req.file?.originalname,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        Readable.from(req.file?.buffer as Buffer).pipe(stream);
    });
};

export { getTempSavedFilePath, upload, uploadToCloudinary };
