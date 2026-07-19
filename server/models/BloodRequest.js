import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        patientName: {
            type: String,
            required: true,
            trim: true,
        },

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },

        unitsRequired: {
            type: Number,
            required: true,
            min: 1,
        },

        hospital: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        contactNumber: {
            type: String,
            required: true,
        },

        urgency: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Completed"],
            default: "Pending",
        },

        acceptedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("BloodRequest", bloodRequestSchema);