import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
configDotenv();
export const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.use(cors());



