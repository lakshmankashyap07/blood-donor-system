import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Save Contact Message
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

export default router;