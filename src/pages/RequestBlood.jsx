import React, { useState } from "react";
import { createBloodRequest } from "../services/api";
import { toast } from "react-toastify";

function RequestBlood() {
    const [formData, setFormData] = useState({
        patientName: "",
        bloodGroup: "",
        unitsRequired: 1,
        hospital: "",
        city: "",
        contactNumber: "",
        urgency: "Medium",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBloodRequest(formData);

            toast.success("Blood Request Created Successfully");

            setFormData({
                patientName: "",
                bloodGroup: "",
                unitsRequired: 1,
                hospital: "",
                city: "",
                contactNumber: "",
                urgency: "Medium",
            });
        } catch (error) {
            toast.error("Failed to create request");
        }
    };

    return (
        <div
            className="container py-2"
            style={{ maxWidth: "850px" }}
        >
            <div className="card request-card shadow-sm border-0">

                <div className="card-header bg-danger text-white py-2">
                    <h5 className="mb-0 text-center">
                        🩸 Request Blood
                    </h5>
                </div>

                <div className="card-body p-3">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-2">

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Patient Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Blood Group
                                </label>

                                <select
                                    className="form-select"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Units Required
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="unitsRequired"
                                    value={formData.unitsRequired}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Hospital
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    City
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Contact Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-start w-100">
                                    Urgency
                                </label>

                                <select
                                    className="form-select"
                                    name="urgency"
                                    value={formData.urgency}
                                    onChange={handleChange}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                        </div>

                        <div className="text-center mt-3">
                            <button
                                type="submit"
                                className="btn btn-danger px-4"
                            >
                                Submit Request
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default RequestBlood;