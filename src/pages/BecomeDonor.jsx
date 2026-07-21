import React, { useEffect, useState } from "react";
import {
    becomeDonor,
    toggleAvailability,
    getProfile,
} from "../services/api";
import { toast } from "react-toastify";

function BecomeDonor() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleBecomeDonor = async () => {
        try {
            const res = await becomeDonor();

            toast.success(res.data.message);

            setUser(res.data.user);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to become donor"
            );
        }
    };

    const handleAvailability = async () => {
        try {
            const res = await toggleAvailability();

            toast.success(res.data.message);

            setUser(res.data.user);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update availability"
            );
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-danger"></div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow border-0">

                <div className="card-header bg-danger text-white">
                    <h3 className="mb-0">❤️ Become Blood Donor</h3>
                </div>

                <div className="card-body text-center">

                    {!user?.isDonor ? (
                        <>
                            <h4>Become a Blood Donor</h4>

                            <p className="text-muted mt-3">
                                Help save lives by becoming a registered blood donor.
                            </p>

                            <button
                                className="btn btn-danger btn-lg mt-3"
                                onClick={handleBecomeDonor}
                            >
                                Become Donor
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="alert alert-success">
                                <h5>✅ You are already a Blood Donor</h5>
                            </div>

                            <h5 className="mt-4">
                                Availability Status
                            </h5>

                            <h4
                                className={
                                    user.available
                                        ? "text-success"
                                        : "text-danger"
                                }
                            >
                                {user.available
                                    ? "Available"
                                    : "Unavailable"}
                            </h4>

                            <button
                                className={`btn mt-3 ${user.available
                                        ? "btn-warning"
                                        : "btn-success"
                                    }`}
                                onClick={handleAvailability}
                            >
                                {user.available
                                    ? "Mark Unavailable"
                                    : "Mark Available"}
                            </button>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}

export default BecomeDonor;