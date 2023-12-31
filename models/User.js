import mongoose from "mongoose";
import { Schema, model } from mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },

    },
    password: {
        type: String,
        required: true,
    },
});

export const user = model("User", userSchema);