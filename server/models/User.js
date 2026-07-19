import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true,
        },

        bloodGroup: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isDonor: {
            type: Boolean,
            default: false,
        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);