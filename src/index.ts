import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import { analyzeData } from "./genai/analyzeData";
import { isAuthenticated } from "./utils/midllewares";

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", async (req: Request, res: Response) => {
    const { summary, sentiment, keywords } = await analyzeData();

    res.status(200).json({
        success: true,
        data: {
            summary: summary.content,
            sentiment: sentiment.content,
            keywords: keywords.content,
        },
    });
});

app.get("/status", (req: Request, res: Response) => {
    res.json({ success: true, message: "server online" });
});

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
