import React, { useEffect, useState } from "react";
import { getDonationHistory } from "../services/api";
import { toast } from "react-toastify";

function DonationHistory({ searchTerm = "" }) {
  const [history, setHistory] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const historyPerPage = 10;

  // Filters
  const [bloodFilter, setBloodFilter] = useState("All");
  const [donorFilter, setDonorFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

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

  // Unique Cities
  const cities = [
    "All",
    ...new Set(
      history
        .map((item) => item.city)
        .filter(Boolean)
    ),
  ];

  // Unique Donors
  const donors = [
    "All",
    ...new Set(
      history
        .map((item) => item.acceptedBy?.name)
        .filter(Boolean)
    ),
  ];

  // Search + Filters
  const filteredHistory = history.filter((item) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      search === "" ||
      item.patientName?.toLowerCase().includes(search) ||
      item.bloodGroup?.toLowerCase().includes(search) ||
      item.acceptedBy?.name?.toLowerCase().includes(search) ||
      item.hospital?.toLowerCase().includes(search) ||
      item.city?.toLowerCase().includes(search);

    const matchesBlood =
      bloodFilter === "All" ||
      item.bloodGroup === bloodFilter;

    const matchesDonor =
      donorFilter === "All" ||
      item.acceptedBy?.name === donorFilter;

    const matchesCity =
      cityFilter === "All" ||
      item.city === cityFilter;

    return (
      matchesSearch &&
      matchesBlood &&
      matchesDonor &&
      matchesCity
    );
  });

  // Pagination Logic
  const indexOfLastHistory =
    currentPage * historyPerPage;

  const indexOfFirstHistory =
    indexOfLastHistory - historyPerPage;

  const currentHistory = filteredHistory.slice(
    indexOfFirstHistory,
    indexOfLastHistory
  );

  const totalPages = Math.ceil(
    filteredHistory.length / historyPerPage
  );

  const paginate = (pageNumber) =>
    setCurrentPage(pageNumber);
  return (
    <div className="container mt-4">
      <div className="card shadow-sm donation-history-card">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">🩸 Donation History</h3>
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
                value={donorFilter}
                onChange={(e) => {
                  setDonorFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {donors.map((donor, index) => (
                  <option key={index} value={donor}>
                    {donor}
                  </option>
                ))}
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
            <table className="table table-bordered table-hover text-center">

              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Blood Group</th>
                  <th>Donor</th>
                  <th>Hospital</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentHistory.length > 0 ? (
                  currentHistory.map((item, index) => (
                    <tr key={item._id}>

                      <td>{indexOfFirstHistory + index + 1}</td>

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
                    <td colSpan="7" className="text-center">
                      No Completed Donations
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          {filteredHistory.length > historyPerPage && (
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">

              <p className="mb-2">
                Showing <strong>{indexOfFirstHistory + 1}</strong> -{" "}
                <strong>
                  {Math.min(
                    indexOfLastHistory,
                    filteredHistory.length
                  )}
                </strong>{" "}
                of <strong>{filteredHistory.length}</strong> Donations
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

export default DonationHistory;