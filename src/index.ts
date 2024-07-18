import { config } from "dotenv";
config();
import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message } = err;

    res.status(status).json({ success: false, message });
});

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
