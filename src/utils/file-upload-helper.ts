import os from "os";
import fs from "fs";
import path from "path";
import { ApiError } from "./ApiError";
import { Request } from "express";

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

export { getTempSavedFilePath };
