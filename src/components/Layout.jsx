import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./sidebar/Sidebar";

function Layout({ searchTerm, setSearchTerm }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                toggleSidebar={() => setSidebarOpen(true)}
            />

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100"
                        style={{
                            background: "rgba(0,0,0,0.5)",
                            zIndex: 1040,
                        }}
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    <div
                        className="position-fixed bg-dark"
                        style={{
                            width: "250px",
                            height: "100vh",
                            top: "70px",
                            left: 0,
                            zIndex: 1050,
                        }}
                    >
                        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
                    </div>
                </>
            )}

            <div
                style={{
                    display: "flex",
                    marginTop: "70px",
                }}
            >
                {/* Desktop Sidebar */}
                <div
                    className="d-none d-lg-block"
                    style={{
                        width: "250px",
                        minWidth: "250px",
                        background: "#212529",
                        minHeight: "calc(100vh - 70px)",
                    }}
                >
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div
                    style={{
                        flex: 1,
                        padding: "20px",
                        background: "#f8f9fa",
                        minHeight: "calc(100vh - 70px)",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;