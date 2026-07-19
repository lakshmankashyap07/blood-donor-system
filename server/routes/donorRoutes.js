// import express from "express";
// import Donor from "../models/Donor.js";

// const router = express.Router();

// // GET All Donors
// router.get("/", async (req, res) => {
//     try {
//         const { bloodGroup, city } = req.query;

//         let filter = {
//             isDonor: true,
//             available: true,
//         };

//         if (bloodGroup) {
//             filter.bloodGroup = bloodGroup;
//         }

//         if (city) {
//             filter.city = { $regex: city, $options: "i" };
//         }

//         const donors = await User.find(filter).select("-password");

//         res.json({
//             success: true,
//             donors,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });
// // GET Single Donor By ID
// router.get("/:id", async (req, res) => {
//     try {
//         const donor = await Donor.findById(req.params.id);

//         if (!donor) {
//             return res.status(404).json({ message: "Donor not found" });
//         }

//         res.json(donor);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // ADD New Donor
// router.post("/", async (req, res) => {
//     try {
//         const donor = new Donor(req.body);
//         const savedDonor = await donor.save();

//         res.status(201).json(savedDonor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // UPDATE Donor
// router.put("/:id", async (req, res) => {
//     try {
//         const updatedDonor = await Donor.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {
//                 new: true,
//                 runValidators: true,
//             }
//         );

//         if (!updatedDonor) {
//             return res.status(404).json({ message: "Donor not found" });
//         }

//         res.json(updatedDonor);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // DELETE Donor
// router.delete("/:id", async (req, res) => {
//     try {
//         const deletedDonor = await Donor.findByIdAndDelete(req.params.id);

//         if (!deletedDonor) {
//             return res.status(404).json({ message: "Donor not found" });
//         }

//         res.json({
//             message: "Donor deleted successfully",
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default router;