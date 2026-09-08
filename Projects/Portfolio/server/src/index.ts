import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDatabase from "./config/database.js";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio API is running!");
});

app.use("/api/contact", contactRouter);

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();