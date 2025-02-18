import express from "express";
import cors from "cors";
import configDotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
configDotenv.config();
connectDB();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json("Hello World!");
});

app.use("/users", userRouter);









export default app;