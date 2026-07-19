import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    const menuStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        width: "100%",
        padding: "10px 15px",
        borderRadius: "8px",
        color: "#fff",
        textDecoration: "none",
        backgroundColor: isActive ? "#dc3545" : "transparent",
    });

    return (
        <div
            className="bg-dark text-white p-3 shadow"
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                top: "70px",
                left: 0,
                overflowY: "auto",
            }}
        >
            <h4 className="mb-4">🩸 Blood Donor</h4>

            <ul className="nav flex-column w-100">

                <li className="nav-item mb-2">
                    <NavLink to="/" style={menuStyle}>
                        🏠 <span className="ms-2">Dashboard</span>
                    </NavLink>
                </li>

                {/* <li className="nav-item mb-2">
                    <NavLink to="/donors" style={menuStyle}>
                        ❤️ <span className="ms-2">Donors</span>
                    </NavLink>
                </li> */}

                <li className="nav-item mb-2">
                    <NavLink to="/request-blood" style={menuStyle}>
                        🩸 <span className="ms-2">Request Blood</span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="/blood-requests"
                        style={menuStyle}
                    >
                        📋 <span className="ms-2">Blood Requests</span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/my-requests" style={menuStyle}>
                        📋 <span className="ms-2">My Requests</span>
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink to="/donation-history" style={menuStyle}>
                        📜 <span className="ms-2">Donation History</span>
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink to="/profile" style={menuStyle}>
                        👤 <span className="ms-2">Profile</span>
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink to="/about" style={menuStyle}>
                        ℹ️ <span className="ms-2">About</span>
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink to="/contact" style={menuStyle}>
                        📞 <span className="ms-2">Contact</span>
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}

export default Sidebar;