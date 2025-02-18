import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength: [200, "First name must be at most 20 characters long"],
    },
    lastname: {
        type: String,
        maxlength: [200, "Last name must be at most 20 characters long"],
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Email must be at least 10 characters long"],
        maxlength: [200, "Email must be at most 200 characters long"],
    },
    password: {
        type: String,
        required: true,
        Selection: false,
        unique: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [200, "Password must be at most 20 characters long"],
    },
    socketId: {
        type: String
    }
});


userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            throw err;
        }
}

const userModel = mongoose.model("user", userSchema);
export default userModel;




