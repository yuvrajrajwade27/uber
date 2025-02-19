import userModel from "../models/userModel.js";
import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id : decoded._id });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({ _id : decoded._id });
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export { authUser, authCaptain };
