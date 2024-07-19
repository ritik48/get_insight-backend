import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

import path from "path";
import { ApiError } from "../utils/ApiError";

function loadText(filePath: string) {
    const extension = path.extname(filePath).toLocaleLowerCase();

    let loader;
    switch (extension) {
        case ".txt":
            loader = new TextLoader(filePath);
            break;
        case ".pdf":
            loader = new PDFLoader(filePath);
            break;
        case ".docx":
            loader = new DocxLoader(filePath);
            break;
        default:
            throw new ApiError(400, "Unknown file type provided");
    }

    return loader.load();
}

export { loadText };
