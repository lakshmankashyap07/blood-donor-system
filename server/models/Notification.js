import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: [
                "request_created",
                "request_accepted",
                "donation_completed",
                "general",
            ],
            default: "general",
        },

        isRead: {
            type: Boolean,
            default: false,
        },

        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BloodRequest",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Notification",
    notificationSchema
);