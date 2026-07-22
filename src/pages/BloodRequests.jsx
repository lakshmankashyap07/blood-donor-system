import React, { useEffect, useState } from "react";
import {
    getBloodRequests,
    acceptBloodRequest,
    completeBloodRequest,
    getProfile,
} from "../services/api";
import { toast } from "react-toastify";

function BloodRequests({ searchTerm = "" }) {
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 10;

    // Filters
    const [bloodFilter, setBloodFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [cityFilter, setCityFilter] = useState("All");

    useEffect(() => {
        fetchRequests();
        loadProfile();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await getBloodRequests();
            setRequests(res.data.requests || []);
        } catch (error) {
            toast.error("Failed to load blood requests");
        }
    };

    const loadProfile = async () => {
        try {
            const res = await getProfile();

            if (res.data.user) {
                setUser(res.data.user);
            } else {
                setUser(res.data);
            }
        } catch (error) {
            toast.error("Failed to load profile");
        }
    };

    const handleAccept = async (id) => {
        try {
            await acceptBloodRequest(id);
            toast.success("Request Accepted Successfully");
            fetchRequests();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to accept request"
            );
        }
    };

    const handleComplete = async (id) => {
        try {
            await completeBloodRequest(id);
            toast.success("Donation Completed Successfully");
            fetchRequests();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to complete donation"
            );
        }
    };

    // City Dropdown
    const cities = [
        "All",
        ...new Set(
            requests
                .map((r) => r.city)
                .filter(Boolean)
        ),
    ];

    // Search + Filters
    const filteredRequests = requests.filter((req) => {
        const search = searchTerm.trim().toLowerCase();

        const matchesSearch =
            search === "" ||
            req.patientName?.toLowerCase().includes(search) ||
            req.bloodGroup?.toLowerCase().includes(search) ||
            req.hospital?.toLowerCase().includes(search) ||
            req.city?.toLowerCase().includes(search);

        const matchesBlood =
            bloodFilter === "All" ||
            req.bloodGroup === bloodFilter;

        const matchesStatus =
            statusFilter === "All" ||
            req.status === statusFilter;

        const matchesCity =
            cityFilter === "All" ||
            req.city === cityFilter;

        return (
            matchesSearch &&
            matchesBlood &&
            matchesStatus &&
            matchesCity
        );
    });

    // Pagination
    const indexOfLastRequest =
        currentPage * requestsPerPage;

    const indexOfFirstRequest =
        indexOfLastRequest - requestsPerPage;

    const currentRequests = filteredRequests.slice(
        indexOfFirstRequest,
        indexOfLastRequest
    );

    const totalPages = Math.ceil(
        filteredRequests.length / requestsPerPage
    );

    const paginate = (pageNumber) =>
        setCurrentPage(pageNumber);
    return (
        <div className="container mt-4">
            <div className="card shadow-sm blood-request-card">

                <div className="card-header bg-danger text-white">
                    <h3 className="mb-0">🩸 Blood Requests</h3>
                </div>

                <div className="card-body">

                    {/* Filters */}

                    <div className="row mb-3">

                        <div className="col-md-4 mb-2">
                            <select
                                className="form-select"
                                value={bloodFilter}
                                onChange={(e) => {
                                    setBloodFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="All">All Blood Groups</option>
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

                        <div className="col-md-4 mb-2">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-2">
                            <select
                                className="form-select"
                                value={cityFilter}
                                onChange={(e) => {
                                    setCityFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle text-center">

                            <thead className="table-danger">
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Blood Group</th>
                                    <th>Units</th>
                                    <th>Hospital</th>
                                    <th>City</th>
                                    <th>Urgency</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {currentRequests.length > 0 ? (

                                    currentRequests.map((req, index) => (

                                        <tr key={req._id}>

                                            <td>{indexOfFirstRequest + index + 1}</td>

                                            <td>{req.patientName}</td>

                                            <td>
                                                <span className="badge bg-danger">
                                                    {req.bloodGroup}
                                                </span>
                                            </td>

                                            <td>{req.unitsRequired}</td>

                                            <td>{req.hospital}</td>

                                            <td>{req.city}</td>

                                            <td>
                                                <span
                                                    className={`badge ${req.urgency === "High"
                                                        ? "bg-danger"
                                                        : req.urgency === "Medium"
                                                            ? "bg-warning text-dark"
                                                            : "bg-success"
                                                        }`}
                                                >
                                                    {req.urgency}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${req.status === "Pending"
                                                        ? "bg-secondary"
                                                        : req.status === "Accepted"
                                                            ? "bg-primary"
                                                            : "bg-success"
                                                        }`}
                                                >
                                                    {req.status}
                                                </span>
                                            </td>

                                            <td>

                                                {!user?.isDonor ? (
                                                    <span className="text-muted">
                                                        Not Allowed
                                                    </span>
                                                ) : !user?.available ? (
                                                    <span className="badge bg-warning text-dark">
                                                        Unavailable
                                                    </span>
                                                ) : req.status === "Pending" ? (
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleAccept(req._id)}
                                                    >
                                                        Accept
                                                    </button>
                                                ) : req.status === "Accepted" ? (
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleComplete(req._id)}
                                                    >
                                                        Complete
                                                    </button>
                                                ) : (
                                                    <span className="badge bg-success">
                                                        ✔ Completed
                                                    </span>
                                                )}

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="9" className="text-center">
                                            No Blood Requests Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>
                    {/* Pagination */}
                    {filteredRequests.length > requestsPerPage && (
                        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">

                            <p className="mb-2">
                                Showing <strong>{indexOfFirstRequest + 1}</strong> -{" "}
                                <strong>
                                    {Math.min(
                                        indexOfLastRequest,
                                        filteredRequests.length
                                    )}
                                </strong>{" "}
                                of <strong>{filteredRequests.length}</strong> Requests
                            </p>

                            <nav>
                                <ul className="pagination mb-0">

                                    <li
                                        className={`page-item ${currentPage === 1 ? "disabled" : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => (
                                            <li
                                                key={i}
                                                className={`page-item ${currentPage === i + 1 ? "active" : ""
                                                    }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => paginate(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        )
                                    )}

                                    <li
                                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Next
                                        </button>
                                    </li>

                                </ul>
                            </nav>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );

}

export default BloodRequests;