import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get Logged-in User Profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update Logged-in User Profile
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const {
            name,
            phone,
            age,
            gender,
            bloodGroup,
            city,
        } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                phone,
                age,
                gender,
                bloodGroup,
                city,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Become Donor
router.put("/become-donor", authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                isDonor: true,
            },
            {
                new: true,
            }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "You are now a Blood Donor",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Change Availability
router.put("/toggle-availability", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.available = !user.available;

        await user.save();

        res.status(200).json({
            success: true,
            message: `Availability changed to ${user.available ? "Available" : "Unavailable"
                }`,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Dashboard Statistics
router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const donors = await User.find({ isDonor: true }).select("-password");

        const totalDonors = donors.length;

        const availableDonors = donors.filter(
            (d) => d.available
        ).length;

        const maleDonors = donors.filter(
            (d) => d.gender === "Male"
        ).length;

        const femaleDonors = donors.filter(
            (d) => d.gender === "Female"
        ).length;

        const bloodGroupStats = {
            "A+": donors.filter(d => d.bloodGroup === "A+").length,
            "A-": donors.filter(d => d.bloodGroup === "A-").length,
            "B+": donors.filter(d => d.bloodGroup === "B+").length,
            "B-": donors.filter(d => d.bloodGroup === "B-").length,
            "AB+": donors.filter(d => d.bloodGroup === "AB+").length,
            "AB-": donors.filter(d => d.bloodGroup === "AB-").length,
            "O+": donors.filter(d => d.bloodGroup === "O+").length,
            "O-": donors.filter(d => d.bloodGroup === "O-").length,
        };

        res.status(200).json({
            success: true,
            totalDonors,
            availableDonors,
            maleDonors,
            femaleDonors,
            bloodGroupStats,
            recentDonors: donors.slice(-5).reverse(),
            donors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
export default router;