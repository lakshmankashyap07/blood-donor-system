import React, { useEffect, useState } from "react";
import { getDonationHistory } from "../services/api";
import { toast } from "react-toastify";

function DonationHistory({ searchTerm = "" }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await getDonationHistory();
      setHistory(res.data.history || []);
    } catch (error) {
      toast.error("Failed to load donation history");
    }
  };

  // Search Filter
  const filteredHistory = history.filter((item) => {
    const search = searchTerm.trim().toLowerCase();

    if (search === "") return true;

    return (
      item.patientName?.toLowerCase().includes(search) ||
      item.bloodGroup?.toLowerCase().includes(search) ||
      item.acceptedBy?.name?.toLowerCase().includes(search) ||
      item.hospital?.toLowerCase().includes(search) ||
      item.city?.toLowerCase().includes(search) ||
      "completed".includes(search)
    );
  });

  return (
    <div className="container mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">🩸 Donation History</h3>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-success">
                <tr>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>Donor</th>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <tr key={item._id}>
                      <td>{item.patientName}</td>

                      <td>
                        <span className="badge bg-danger">
                          {item.bloodGroup}
                        </span>
                      </td>

                      <td>
                        {item.acceptedBy
                          ? item.acceptedBy.name
                          : "N/A"}
                      </td>

                      <td>{item.hospital}</td>

                      <td>{item.city}</td>

                      <td>
                        <span className="badge bg-success">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Completed Donations
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

export default DonationHistory;