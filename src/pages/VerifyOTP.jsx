import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/api";
import { toast } from "react-toastify";

function VerifyOTP() {
    const [otp, setOtp] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await verifyOTP({
                email,
                otp,
            });

            toast.success(res.data.message);

            navigate("/reset-password", {
                state: {
                    email,
                    otp,
                },
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Invalid OTP"
            );
        }
    };

    return (
        <div className="container py-4 verify-otp-page">
            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "85vh" }}
            >
                <div className="col-lg-5 col-md-6">

                    <div className="card shadow border-0 rounded-3">

                        <div className="card-header bg-danger text-white text-center py-3">
                            <h3 className="fw-bold mb-0">
                                Verify OTP
                            </h3>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold d-block text-start">
                                        Enter OTP
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger btn-sm w-100"
                                >
                                    Verify OTP
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;