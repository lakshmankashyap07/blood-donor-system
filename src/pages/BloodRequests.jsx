import React, { useEffect, useState } from "react";
import {
    getBloodRequests,
    acceptBloodRequest,
    completeBloodRequest,
    getProfile,
} from "../services/api";
import { toast } from "react-toastify";

function BloodRequests() {
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(null);

    const fetchRequests = async () => {
        try {
            const res = await getBloodRequests();
            setRequests(res.data.requests);
        } catch (error) {
            toast.error("Failed to load blood requests");
        }
    };

    const loadProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAccept = async (id) => {
        try {
            await acceptBloodRequest(id);
            toast.success("Request Accepted Successfully");
            fetchRequests();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to accept request"
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
                error.response?.data?.message || "Failed to complete donation"
            );
        }
    };

    useEffect(() => {
        fetchRequests();
        loadProfile();
    }, []);

    return (
        <div className="container mt-4">
            <div className="card shadow border-0">
                <div className="card-header bg-danger text-white">
                    <h3 className="mb-0">🩸 Blood Requests</h3>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle text-center">
                            <thead className="table-danger">
                                <tr>
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
                                {requests.length > 0 ? (
                                    requests.map((req) => (
                                        <tr key={req._id}>
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
                                        <td colSpan="8" className="text-center">
                                            No Blood Requests Found
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

export default BloodRequests;