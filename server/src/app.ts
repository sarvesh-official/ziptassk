import express from "express"
import cors from "cors"

import TodoRouter from "./routes/todo.route";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", TodoRouter);

export default app;
