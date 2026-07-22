import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware, {
    adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==============================
// Send Contact Message (Public)
// ==============================
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            subject,
            message,
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

// ==============================
// Get All Contact Messages (Admin Only)
// ==============================
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const contacts = await Contact.find().sort({
                createdAt: -1,
            });

            res.status(200).json({
                success: true,
                contacts,
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    }
);

// ==============================
// Delete Contact Message (Admin Only)
// ==============================
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            await Contact.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Message deleted successfully",
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: "Server Error",
            });
        }
    }
);

export default router;