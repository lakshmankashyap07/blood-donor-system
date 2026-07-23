import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await loginAdmin(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="container py-4 login-page">
      <div className="row justify-content-center">

        <div className="col-lg-4 col-md-6">
          <div className="card shadow border-0 rounded-3">
            <div className="card-header bg-danger text-white text-center py-3">
              <h2 className="fw-bold mb-0">Login</h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold d-block text-start">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm" placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold d-block text-start">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger btn-sm w-100"                >
                  Login
                </button>
                <div className="text-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-danger text-decoration-none small"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center mt-3 small">                  Don't have an account?{" "}
                  <Link to="/register">Register</Link>
                </div>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;