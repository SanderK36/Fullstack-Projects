import express from "express";
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio API is running!")
});

app.post("/api/contact", (req, res) =>  {
    const {name, email, message} = req.body;

    console.log("New contact message:");
    console.log({name, email, message});
    res.status(200).json({
        success: true,
        message: "Message received!"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
})