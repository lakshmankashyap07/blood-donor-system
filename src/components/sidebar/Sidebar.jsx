import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ closeSidebar }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const menuStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "8px 10px",
        borderRadius: "8px",
        color: "#fff",
        textDecoration: "none",
        backgroundColor: isActive ? "#dc3545" : "transparent",
        transition: "0.3s",
        marginBottom: "3px",
        fontSize: "14px",
        fontWeight: isActive ? "500" : "500",
        lineHeight: "1.2",
    });

    const handleClick = () => {
        if (closeSidebar) {
            closeSidebar();
        }
    };

    return (
        <div
            className="bg-dark text-white shadow position-fixed d-none d-lg-block"
            style={{
                width: "201px",
                top: "56px",
                left: 0,
                height: "calc(100vh - 56px)",
                padding: "12px 10px",
                overflowY: "auto",
                overflowX: "hidden",
            }}
        >
            <h5 className="mb-4 margin">🩸 Blood Donor</h5>

            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/" style={menuStyle} onClick={handleClick}>
                        🏠 <span className="ms-2">Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/request-blood"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        🩸 <span className="ms-2">Request Blood</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/blood-requests"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        📋 <span className="ms-2">Blood Requests</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/my-requests"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        📄 <span className="ms-2">My Requests</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/donation-history"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        📜 <span className="ms-2">Donation History</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/about"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        ℹ️ <span className="ms-2">About</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/contact"
                        style={menuStyle}
                        onClick={handleClick}
                    >
                        📞 <span className="ms-2">Contact</span>
                    </NavLink>
                </li>

                {user?.role === "admin" && (
                    <li className="nav-item">
                        <NavLink
                            to="/admin-dashboard"
                            style={menuStyle}
                            onClick={handleClick}
                        >
                            📊 <span className="ms-2">Admin Dashboard</span>
                        </NavLink>
                    </li>
                )}

                {user?.role === "admin" && (
                    <li className="nav-item">
                        <NavLink
                            to="/manage-users"
                            style={menuStyle}
                            onClick={handleClick}
                        >
                            👥 <span className="ms-2">Manage Users</span>
                        </NavLink>
                    </li>
                )}

                {user?.role === "admin" && (
                    <li className="nav-item">
                        <NavLink
                            to="/contact-messages"
                            style={menuStyle}
                            onClick={handleClick}
                        >
                            📩 <span className="ms-2">Contact Messages</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;