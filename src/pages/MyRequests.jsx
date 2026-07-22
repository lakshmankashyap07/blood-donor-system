import React, { useEffect, useState } from "react";
import { getMyRequests } from "../services/api";
import { toast } from "react-toastify";

function MyRequests({ searchTerm = "" }) {
    const [requests, setRequests] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 10;

    const fetchRequests = async () => {
        try {
            const res = await getMyRequests();
            setRequests(res.data.requests || []);
        } catch (error) {
            toast.error("Failed to load your requests");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Search Filter
    const filteredRequests = requests.filter((req) => {
        const search = searchTerm.trim().toLowerCase();

        if (search === "") return true;

        return (
            req.patientName?.toLowerCase().includes(search) ||
            req.bloodGroup?.toLowerCase().includes(search) ||
            req.hospital?.toLowerCase().includes(search) ||
            req.status?.toLowerCase().includes(search) ||
            req.acceptedBy?.name?.toLowerCase().includes(search)
        );
    });

    // Pagination Logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

    const currentRequests = filteredRequests.slice(
        indexOfFirstRequest,
        indexOfLastRequest
    );

    const totalPages = Math.ceil(
        filteredRequests.length / requestsPerPage
    );

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="container mt-4">
            <div className="card shadow border-0">
                <div className="card-header bg-danger text-white">
                    <h3 className="mb-0">📋 My Blood Requests</h3>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle text-center">
                            <thead className="table-danger">
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Blood Group</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th>Accepted By</th>
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

                                            <td>{req.hospital}</td>

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
                                                {req.acceptedBy
                                                    ? req.acceptedBy.name
                                                    : "Not Assigned"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No Requests Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

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
                                            onClick={() =>
                                                setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => (
                                            <li
                                                key={i}
                                                className={`page-item ${currentPage === i + 1
                                                        ? "active"
                                                        : ""
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
                                        className={`page-item ${currentPage === totalPages
                                                ? "disabled"
                                                : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
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

export default MyRequests;