import express from "express";
import cors from "cors";
import configDotenv from "dotenv";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import cookieParser from "cookie-parser";
configDotenv.config();
connectDB();



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json("Hello World!");
});

app.use("/users", userRouter);

app.use("/captains", captainRouter);









export default app;