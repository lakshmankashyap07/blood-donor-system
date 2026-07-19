import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    city: "",
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
      const res = await registerUser(formData);

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-header bg-danger text-white text-center">
              <h3>Create Account</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Phone
                    </label>                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Gender
                    </label>                    <select
                      name="gender"
                      className="form-select"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      className="form-select"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
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

                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-bold text-start d-block">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Register
                </button>

              </form>

              <div className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">Login</Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;