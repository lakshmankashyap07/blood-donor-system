import express from "express";
import {
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
} from "../controllers/notificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications
router.get("/", authMiddleware, getNotifications);

// Mark single notification as read
router.put("/read/:id", authMiddleware, markAsRead);

// Mark all notifications as read
router.put("/read-all", authMiddleware, markAllRead);

// Delete notification
router.delete("/:id", authMiddleware, deleteNotification);

export default router;