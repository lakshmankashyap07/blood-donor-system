import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await forgotPassword({ email });

            toast.success(res.data.message);

            navigate("/verify-otp", {
                state: { email },
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="container py-4 forgot-password-page">
            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "85vh" }}
            >
                <div className="col-lg-5 col-md-6 col-sm-10">
                    <div className="card shadow border-0 rounded-3">

                        <div className="card-header bg-danger text-white text-center py-2">
                            <h4 className="fw-bold mb-0">
                                Forgot Password
                            </h4>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold d-block text-start">
                                        Registered Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger btn-sm w-100"
                                >
                                    Send OTP
                                </button>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;