import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";

import {
    FaSignOutAlt,
    FaUserCircle,
    FaBell,
    FaTrash,
    FaCheck,
} from "react-icons/fa";

import {
    getProfile,
    becomeDonor,
    toggleAvailability,
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
} from "../../services/api";

function Header({ searchTerm, setSearchTerm, toggleSidebar }) {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            loadProfile();
            loadNotifications();
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

    const loadNotifications = async () => {
        try {
            const res = await getNotifications();
            setNotifications(res.data.notifications);
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

    const handleMarkAsRead = async (id) => {
        try {
            await markAsRead(id);
            loadNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllRead();
            loadNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNotification(id);
            loadNotifications();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                        {/* Notification Bell */}

                        <button
                            className="btn btn-dark rounded-circle position-relative d-flex align-items-center justify-content-center me-2"
                            style={{
                                width: "38px",
                                height: "34px",
                                minWidth: "34px",
                                padding: 0,
                            }}
                            onClick={() => setShowNotifications((prev) => !prev)}                        >
                            <FaBell size={18} />

                            {notifications.filter(n => !n.isRead).length > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                                    style={{ fontSize: "10px" }}
                                >
                                    {notifications.filter(n => !n.isRead).length}
                                </span>
                            )}
                        </button>
                        {/* Profile */}

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

                        {/* Logout */}

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

            {/* Notification Offcanvas */}

            <Offcanvas
                show={showNotifications}
                onHide={() => setShowNotifications(false)}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Notifications
                    </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>

                    <div className="d-flex justify-content-end mb-3">

                        {/* {notifications.length > 0 && (
                            <button
                                className="btn btn-success btn-sm"
                                onClick={handleMarkAllRead}
                            >
                                <FaCheck className="me-1" />
                                Mark All Read
                            </button>
                        )} */}

                    </div>

                    {notifications.length === 0 ? (
                        <p className="text-center text-muted">
                            No Notifications
                        </p>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`card mb-2 shadow-sm ${notification.isRead
                                    ? "border-secondary"
                                    : "border-danger"
                                    }`}
                            >
                                <div className="card-body p-1">
                                    <h6 className="fw-bold mb-1" style={{
                                        fontSize: "15px",
                                    }}>
                                        {notification.title}
                                    </h6>

                                    <p
                                        className="mb-2 text-muted"
                                        style={{
                                            fontSize: "13px",
                                            lineHeight: "18px",
                                        }}
                                    >
                                        {notification.message}
                                    </p>

                                    {/* <div className="d-flex justify-content-end">
                                        {!notification.isRead && (
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    handleMarkAsRead(notification._id)
                                                }
                                            >
                                                <FaCheck />
                                            </button>
                                        )}

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(notification._id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    )}

                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


export default Header;