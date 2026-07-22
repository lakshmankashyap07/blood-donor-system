import express from "express";
import BloodRequest from "../models/BloodRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ===============================
// Create Blood Request
// ===============================
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            patientName,
            bloodGroup,
            unitsRequired,
            hospital,
            city,
            contactNumber,
            urgency,
        } = req.body;

        const request = await BloodRequest.create({
            requester: req.user.id,
            patientName,
            bloodGroup,
            unitsRequired,
            hospital,
            city,
            contactNumber,
            urgency,
        });

        res.status(201).json({
            success: true,
            message: "Blood Request Created Successfully",
            request,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// Get All Blood Requests
router.get("/", authMiddleware, async (req, res) => {
    try {
        const requests = await BloodRequest.find()
            .populate("requester", "name phone")
            .populate("acceptedBy", "name phone")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            requests,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



// Get Logged-in User Requests
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const requests = await BloodRequest.find({
            requester: req.user.id,
        })
            .populate("acceptedBy", "name phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            requests,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Accept Blood Request
router.put("/:id/accept", authMiddleware, async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        const donor = await User.findById(req.user.id);

        if (!donor.isDonor) {
            return res.status(403).json({
                success: false,
                message: "Only donors can accept blood requests.",
            });
        }

        if (!donor.available) {
            return res.status(403).json({
                success: false,
                message: "You are currently unavailable for donation.",
            });
        }

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found",
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                success: false,
                message: "Request has already been accepted",
            });
        }

        request.status = "Accepted";
        request.acceptedBy = req.user.id;

        await request.save();

        res.status(200).json({
            success: true,
            message: "Blood request accepted successfully",
            request,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// Complete Blood Donation
router.put("/:id/complete", authMiddleware, async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        const donor = await User.findById(req.user.id);

        if (!donor.isDonor) {
            return res.status(403).json({
                success: false,
                message: "Only donors can complete donations.",
            });
        }

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found",
            });
        }

        if (request.status !== "Accepted") {
            return res.status(400).json({
                success: false,
                message: "Only accepted requests can be completed",
            });
        }

        request.status = "Completed";
        await request.save();

        res.status(200).json({
            success: true,
            message: "Donation completed successfully",
            request,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Donation History
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const history = await BloodRequest.find({
            status: "Completed",
        })
            .populate("requester", "name phone")
            .populate("acceptedBy", "name phone")
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            history,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;