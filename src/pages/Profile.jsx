import React, { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile,
    becomeDonor,
    toggleAvailability,
} from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        age: "",
        gender: "",
        bloodGroup: "",
        city: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();

            setUser(res.data);

            setFormData({
                name: res.data.name || "",
                phone: res.data.phone || "",
                age: res.data.age || "",
                gender: res.data.gender || "",
                bloodGroup: res.data.bloodGroup || "",
                city: res.data.city || "",
            });
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await updateProfile(formData);

            setUser(res.data.user);

            setShowModal(false);

            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error("Update Failed");
        }
    };

    const handleBecomeDonor = async () => {
        try {
            const res = await becomeDonor();

            setUser(res.data.user);

            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to Become Donor");
        }
    };

    const handleAvailability = async () => {
        try {
            const res = await toggleAvailability();

            setUser(res.data.user);

            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to change availability");
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-danger"></div>
            </div>
        );
    }

    return (
        <>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        <div className="card shadow-lg border-0 rounded-4">

                            <div className="card-header bg-danger text-white text-center py-4">
                                <i className="bi bi-person-circle fs-1"></i>
                                <h2 className="mt-2">{user.name}</h2>
                                <p className="mb-0">{user.email}</p>
                            </div>

                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <strong>📞 Phone</strong>
                                        <p>{user.phone}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>🩸 Blood Group</strong>
                                        <p>{user.bloodGroup}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>🎂 Age</strong>
                                        <p>{user.age}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>👤 Gender</strong>
                                        <p>{user.gender}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>📍 City</strong>
                                        <p>{user.city}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Role</strong>
                                        <p className="text-capitalize">{user.role}</p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Donor Status</strong><br />
                                        {user.isDonor ? (
                                            <span className="badge bg-success">Donor</span>
                                        ) : (
                                            <span className="badge bg-secondary">Not Donor</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Availability</strong><br />
                                        {user.available ? (
                                            <span className="badge bg-success">Available</span>
                                        ) : (
                                            <span className="badge bg-danger">Unavailable</span>
                                        )}
                                    </div>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-center gap-3 flex-wrap">

                                    <button
                                        className="btn btn-warning"
                                        onClick={() => setShowModal(true)}
                                    >
                                        ✏️ Edit Profile
                                    </button>

                                    {!user.isDonor && (
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleBecomeDonor}
                                        >
                                            🩸 Become Donor
                                        </button>
                                    )}

                                    <button
                                        className={`btn ${user.available ? "btn-success" : "btn-secondary"
                                            }`}
                                        onClick={handleAvailability}
                                    >
                                        {user.available
                                            ? "🟢 Available"
                                            : "🔴 Unavailable"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Edit Profile</h5>

                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            Phone
                                        </label>                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            Age
                                        </label>                                        <input
                                            type="number"
                                            className="form-control"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            City
                                        </label>                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            Gender
                                        </label>
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label d-block text-start">
                                            Blood Group
                                        </label>
                                        <select
                                            className="form-select"
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-success"
                                    onClick={handleUpdate}
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Profile;