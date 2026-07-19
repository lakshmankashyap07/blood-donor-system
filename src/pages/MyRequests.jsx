import React, { useEffect, useState } from "react";
import { getMyRequests } from "../services/api";
import { toast } from "react-toastify";

function MyRequests() {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await getMyRequests();
            setRequests(res.data.requests);
        } catch (error) {
            toast.error("Failed to load your requests");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

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
                                    <th>Patient</th>
                                    <th>Blood Group</th>
                                    <th>Hospital</th>
                                    <th>Status</th>
                                    <th>Accepted By</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.length > 0 ? (
                                    requests.map((req) => (
                                        <tr key={req._id}>
                                            <td>{req.patientName}</td>
                                            <td>{req.bloodGroup}</td>
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
                                        <td colSpan="5" className="text-center">
                                            No Requests Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyRequests;