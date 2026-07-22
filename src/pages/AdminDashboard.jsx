import React, { useEffect, useState } from "react";
import { getAdminDashboard, getBloodRequests } from "../services/api";
import AdminRequestChart from "../components/AdminRequestChart";
import AdminUserChart from "../components/AdminUserChart";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AdminDashboard() {
    const [data, setData] = useState({
        totalUsers: 0,
        totalDonors: 0,
        availableDonors: 0,
        totalAdmins: 0,
        normalUsers: 0,
        totalRequests: 0,
        pendingRequests: 0,
        acceptedRequests: 0,
        completedRequests: 0,
        totalMessages: 0,
        recentUsers: [],
        allUsers: [],
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getAdminDashboard();
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ==========================
    // Export Users Excel
    // ==========================

    const exportToExcel = () => {

        const users =
            data.allUsers && data.allUsers.length > 0
                ? data.allUsers
                : data.recentUsers;

        const exportData = users.map((user) => ({
            Name: user.name,
            Email: user.email,
            Phone: user.phone,
            BloodGroup: user.bloodGroup,
            City: user.city,
            Role: user.role,
            Donor: user.isDonor ? "Yes" : "No",
            Available: user.available ? "Yes" : "No",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Users Report"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(
            file,
            `Users_Report_${new Date()
                .toISOString()
                .slice(0, 10)}.xlsx`
        );
    };

    // ==========================
    // Export Blood Requests PDF
    // ==========================

    const exportBloodRequestsPDF = async () => {
        try {
            const res = await getBloodRequests();

            const requests = res.data.requests || [];

            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text("Smart Blood Donor System", 14, 18);

            doc.setFontSize(13);
            doc.text("Blood Requests Report", 14, 28);

            doc.setFontSize(10);
            doc.text(
                `Generated On: ${new Date().toLocaleDateString()}`,
                14,
                36
            );

            autoTable(doc, {
                startY: 45,

                head: [[
                    "Patient",
                    "Blood",
                    "Units",
                    "Hospital",
                    "City",
                    "Contact",
                    "Requester",
                    "Accepted By",
                    "Status"
                ]],

                body: requests.map((req) => [
                    req.patientName,
                    req.bloodGroup,
                    req.unitsRequired,
                    req.hospital,
                    req.city,
                    req.contactNumber,
                    req.requester?.name || "-",
                    req.acceptedBy?.name || "-",
                    req.status,
                ]),

                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                },

                headStyles: {
                    fillColor: [220, 53, 69],
                },
            });

            doc.save("Blood_Requests_Report.pdf");

        } catch (error) {
            console.log(error);
            alert("Failed to export PDF");
        }
    };

    const cards = [
        { title: "Total Users", value: data.totalUsers },
        { title: "Total Donors", value: data.totalDonors },
        { title: "Available Donors", value: data.availableDonors },
        { title: "Admins", value: data.totalAdmins },
        { title: "Blood Requests", value: data.totalRequests },
        { title: "Pending Requests", value: data.pendingRequests },
        { title: "Completed Requests", value: data.completedRequests },
        { title: "Contact Messages", value: data.totalMessages },
    ];
    return (
        <div className="container-fluid px-2 py-2 admin-dashboard">
            <div className="mb-3">
                <h4 className="fw-bold text-center mb-0">
                    Admin Dashboard
                </h4>
            </div>

            {/* Statistics */}

            <div className="row g-3">

                {cards.map((card) => (

                    <div
                        className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                        key={card.title}
                    >
                        <div className="card shadow-sm h-100 border-0 summary-card text-center">
                            <div className="card-body py-3">
                                <h6 className="text-muted mb-2">
                                    {card.title}
                                </h6>

                                <h2 className="text-danger fw-bold mb-0">                                    {card.value}
                                </h2>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Charts */}

            <div className="row mt-3">

                <div className="col-lg-6 mb-3">
                    <AdminRequestChart
                        pending={data.pendingRequests}
                        accepted={data.acceptedRequests}
                        completed={data.completedRequests}
                    />

                </div>

                <div className="col-lg-6 mb-3">

                    <AdminUserChart
                        users={data.totalUsers}
                        donors={data.totalDonors}
                        admins={data.totalAdmins}
                    />

                </div>

            </div>

            {/* Reports */}

            <div className="col-lg-6 mb-3">
                <div className="card shadow-sm border-0 mb-3">
                    <h6 className="mb-0">                        📊 Reports
                    </h6>

                </div>

                <div className="card-body">

                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className="btn btn-success btn-sm" onClick={exportToExcel}
                        >
                            📊 Export Users Excel
                        </button>

                        <button
                            className="btn btn-danger btn-sm" onClick={exportBloodRequestsPDF}
                        >
                            📄 Export Blood Requests PDF
                        </button>

                    </div>

                </div>

            </div>

            {/* Recent Users */}

            <div className="card shadow-sm border-0">
                <div className="card-header bg-danger text-white py-2">
                    <h6 className="mb-0">
                        Recent Users
                    </h6>

                </div>

                <div className="table-responsive">

                    <table className="table table-hover table-sm mb-0 align-middle">
                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Blood Group</th>

                                <th>City</th>

                                <th>Role</th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.recentUsers.length > 0 ? (

                                data.recentUsers.map((user) => (

                                    <tr key={user._id}>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>{user.bloodGroup}</td>

                                        <td>{user.city}</td>

                                        <td>

                                            <span
                                                className={`badge ${user.role === "admin"
                                                    ? "bg-primary"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center"
                                    >
                                        No Users Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;