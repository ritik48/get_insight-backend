import { config } from "dotenv";
config();
import express, { NextFunction, Request, Response } from "express";
import { router as dataRouter } from "./routes/data";

const app = express();
app.use(express.json());

app.use("/data", dataRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "server online" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;
  console.log("Error = ", err);

  res.status(status).json({ success: false, message: message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
