import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm fixed-top"
            style={{ height: "70px", zIndex: 1050 }}
        >
            <div className="container-fluid">

                <Link className="navbar-brand fw-bold fs-4" to="/">
                    🩸 Smart Blood Donor
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarContent"
                >
                    <ul className="navbar-nav align-items-center">

                        <li className="nav-item me-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search donor..."
                            />
                        </li>

                        <li className="nav-item me-2">
                            <Link to="/login" className="btn btn-light">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/register" className="btn btn-outline-light">
                                Register
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Header;