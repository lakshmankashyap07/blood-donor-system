import express from "express";
import User from "../models/User.js";
import authMiddleware, {
    adminMiddleware,
} from "../middleware/authMiddleware.js";
import BloodRequest from "../models/BloodRequest.js";
import Contact from "../models/Contact.js";

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
        const availableDonors = donors.filter((d) => d.available).length;
        const maleDonors = donors.filter((d) => d.gender === "Male").length;
        const femaleDonors = donors.filter((d) => d.gender === "Female").length;

        const bloodGroupStats = {
            "A+": donors.filter((d) => d.bloodGroup === "A+").length,
            "A-": donors.filter((d) => d.bloodGroup === "A-").length,
            "B+": donors.filter((d) => d.bloodGroup === "B+").length,
            "B-": donors.filter((d) => d.bloodGroup === "B-").length,
            "AB+": donors.filter((d) => d.bloodGroup === "AB+").length,
            "AB-": donors.filter((d) => d.bloodGroup === "AB-").length,
            "O+": donors.filter((d) => d.bloodGroup === "O+").length,
            "O-": donors.filter((d) => d.bloodGroup === "O-").length,
        };

        res.status(200).json({
            success: true,
            totalDonors,
            availableDonors,
            maleDonors,
            femaleDonors,
            bloodGroupStats,
            recentDonors: donors.slice(-5).reverse(),
            donors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// ==============================
// Admin Dashboard Analytics
// ==============================

router.get(
    "/admin-dashboard",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();

            const totalDonors = await User.countDocuments({
                isDonor: true,
            });

            const availableDonors = await User.countDocuments({
                isDonor: true,
                available: true,
            });

            const totalAdmins = await User.countDocuments({
                role: "admin",
            });

            const normalUsers = await User.countDocuments({
                role: "user",
            });

            const totalRequests = await BloodRequest.countDocuments();

            const pendingRequests = await BloodRequest.countDocuments({
                status: "Pending",
            });

            const acceptedRequests = await BloodRequest.countDocuments({
                status: "Accepted",
            });

            const completedRequests = await BloodRequest.countDocuments({
                status: "Completed",
            });

            const totalMessages = await Contact.countDocuments();

            const recentUsers = await User.find()
                .select("-password")
                .sort({ createdAt: -1 })
                .limit(5);

            const allUsers = await User.find()
                .select("-password")
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,

                totalUsers,
                totalDonors,
                availableDonors,

                totalAdmins,
                normalUsers,

                totalRequests,
                pendingRequests,
                acceptedRequests,
                completedRequests,

                totalMessages,

                recentUsers,
                allUsers,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

// ==============================
// Admin - Get All Users
// ==============================
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// ==============================
// Admin - Delete User
// ==============================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account.",
            });
        }
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// ==============================
// Admin - Change User Role
// ==============================
router.put(
    "/:id/role",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const { role } = req.body;

            if (req.user.id === req.params.id) {
                return res.status(400).json({
                    success: false,
                    message: "You cannot change your own role.",
                });
            }

            if (!["user", "admin"].includes(role)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid role",
                });
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { role },
                { new: true }
            ).select("-password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "User role updated successfully",
                user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

export default router;