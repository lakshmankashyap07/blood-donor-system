import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import {
    getProfile,
    becomeDonor,
    toggleAvailability,
} from "../../services/api";
import { toast } from "react-toastify";

function Header({
    searchTerm,
    setSearchTerm,
    toggleSidebar,
}) {
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
            className="navbar navbar-dark bg-danger fixed-top shadow"
            style={{ height: "70px", zIndex: 1100 }}
        >
            <div className="container-fluid">

                {/* Mobile Menu */}
                <button
                    className="btn btn-danger d-lg-none me-2"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <Link className="navbar-brand fw-bold" to="/">
                    🩸 Smart Blood Donor
                </Link>

                <div className="d-none d-md-block mx-3 flex-grow-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by Name, Blood Group or City"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />
                </div>

                <div className="d-flex align-items-center">

                    <span className="text-white fw-bold me-2 d-none d-lg-inline">
                        {!user?.isDonor
                            ? "Become Donor"
                            : user.available
                                ? "Available"
                                : "Unavailable"}
                    </span>

                    <div className="form-check form-switch me-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            style={{
                                width: "50px",
                                height: "25px",
                                cursor: "pointer",
                            }}
                            checked={
                                user?.isDonor
                                    ? user.available
                                    : false
                            }
                            onChange={handleToggle}
                        />
                    </div>

                    <Link
                        to="/profile"
                        className="btn btn-light btn-sm me-2"
                    >
                        <FaUserCircle size={25} />
                    </Link>

                    <button
                        className="btn btn-dark btn-sm"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt size={25} />
                    </button>

                </div>
            </div>
        </nav>
    );
}

export default Header;