"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const data_1 = require("./routes/data");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/data", data_1.router);
app.get("/", (req, res) => {
    res.json({ success: true, message: "server online" });
});
app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    console.log("Error = ", err);
    res.status(status).json({ success: false, message: message });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
});
