import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDatabase from "./config/database.js";
import contactRouter from "./routes/contact.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio API is running!");
});

app.use("/api/contact", contactRouter);

await connectDatabase();

export default app;