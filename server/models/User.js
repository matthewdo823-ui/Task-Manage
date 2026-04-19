import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        Type: String,
        Required: true,
    },
    email: {
        Type: String,
        Required: true,
        Unique: true
    },
    password: {
        Type: String,
        Required: true,
    },
}, { timestamps: true });

export default mongoose.model("user", userSchema);