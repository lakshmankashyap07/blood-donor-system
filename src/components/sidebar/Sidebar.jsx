import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ closeSidebar }) {
    const menuStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "12px 15px",
        borderRadius: "8px",
        color: "#fff",
        textDecoration: "none",
        backgroundColor: isActive ? "#dc3545" : "transparent",
        transition: "0.3s ease",
        marginBottom: "8px",
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
                width: "250px",
                top: "70px",
                left: 0,
                height: "calc(100vh - 70px)",
                padding: "20px 15px",
            }}
        >
            <h4 className="mb-4">🩸 Blood Donor</h4>

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

            </ul>
        </div>
    );
}

export default Sidebar;