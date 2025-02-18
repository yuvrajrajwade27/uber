import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token : {
        type: String,
        required: true,
        unique: true
    },
    expirydAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const blacklistTokenModel = mongoose.model("blacklistToken", blacklistTokenSchema);
export default blacklistTokenModel;
