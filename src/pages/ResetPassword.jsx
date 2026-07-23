import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import { toast } from "react-toastify";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;
    const otp = location.state?.otp;

    useEffect(() => {
        if (!email || !otp) {
            navigate("/forgot-password");
        }
    }, [email, otp, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await resetPassword({
                email,
                otp,
                newPassword,
            });

            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Password reset failed"
            );
        }
    };

    return (
        <div className="container py-4 reset-password-page">
            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "85vh" }}
            >
                <div className="col-lg-5 col-md-6">

                    <div className="card shadow border-0 rounded-3">

                        <div className="card-header bg-danger text-white text-center py-3">
                            <h2 className="fw-bold mb-0">
                                Reset Password
                            </h2>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold d-block text-start">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control form-control-sm"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger btn-sm w-100"
                                >
                                    Reset Password
                                </button>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;