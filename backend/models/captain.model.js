import mongoose from "mongoose";
import { createRequire } from "module";
import * as bcrypt from "bcrypt";
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");


const captainSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: [3, "Firstname must be at least 3 characters long"],
        maxlength: [50, "Firstname must be at most 50 characters long"]
    },
    lastname: {
        type: String,
        minlength: [3, "Lastname must be at least 3 characters long"],
        maxlength: [50, "Lastname must be at most 50 characters long"],
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [10, "Email must be at least 10 characters long"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        unique: true,
        Selection: false,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            enum: ["car", "motercycle", "auto", "van"],
            required: true
        },
        locaton: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    }
});

captainSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw err;
    }
}

const captainModel = mongoose.model("captain", captainSchema);
export default captainModel;