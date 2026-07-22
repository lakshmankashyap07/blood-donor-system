import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import {
    getProfile,
    becomeDonor,
    toggleAvailability,
} from "../../services/api";
import { toast } from "react-toastify";

function Header({ searchTerm, setSearchTerm, toggleSidebar }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [token]);

    const loadProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        setUser(null);
        navigate("/login", { replace: true });

        toast.success("Logged out successfully");
    };

    const handleToggle = async () => {
        try {
            if (!user?.isDonor) {
                const confirmBecome = window.confirm(
                    "Do you want to become a Blood Donor?"
                );

                if (!confirmBecome) return;

                const res = await becomeDonor();

                toast.success(res.data.message);
                setUser(res.data.user);
            } else {
                const res = await toggleAvailability();

                toast.success(res.data.message);
                setUser(res.data.user);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <nav
            className="navbar navbar-dark bg-danger fixed-top shadow-sm"
            style={{
                height: "56px",
                zIndex: 1100,
                padding: "0 14px",
            }}
        >
            <div className="container-fluid p-0 align-items-center">

                {/* Mobile Menu */}

                <button
                    className="btn btn-danger d-lg-none me-2"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                {/* Logo */}

                <Link
                    className="navbar-brand fw-bold me-3"
                    to="/"
                    style={{
                        fontSize: "1.05rem",
                        whiteSpace: "nowrap",
                    }}
                >
                    🩸 Smart Blood Donor
                </Link>

                {/* Search */}

                <div
                    className="d-none d-md-flex flex-grow-1 mx-3"
                    style={{ maxWidth: "520px" }}
                >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by Name, Blood Group or City"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        style={{
                            height: "34px",
                            fontSize: "13px",
                        }}
                    />
                </div>

                {/* Right Side */}

                <div className="d-flex align-items-center">

                    <span
                        className="text-white me-2 d-none d-lg-inline"
                        style={{
                            fontSize: "13px",
                            fontWeight: "600",
                        }}
                    >
                        {!user?.isDonor
                            ? "Become Donor"
                            : user.available
                                ? "Available"
                                : "Unavailable"}
                    </span>

                    <div className="form-check form-switch me-2">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={
                                user?.isDonor
                                    ? user.available
                                    : false
                            }
                            onChange={handleToggle}
                            style={{
                                width: "36px",
                                height: "18px",
                                cursor: "pointer",
                            }}
                        />

                    </div>

                    <Link
                        to="/profile"
                        className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                            width: "38px",
                            height: "34px",
                            minWidth: "34px",
                            padding: 0,
                        }}
                    >
                        <FaUserCircle size={25} />
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: "36px",
                            height: "34px",
                            minWidth: "34px",
                            padding: 0,
                        }}
                    >
                        <FaSignOutAlt size={22} />
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Header;