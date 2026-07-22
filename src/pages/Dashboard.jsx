import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import BloodGroupChart from "../components/BloodGroupChart";

function Dashboard({ searchTerm = "" }) {
  const [dashboard, setDashboard] = useState({
    totalDonors: 0,
    availableDonors: 0,
    maleDonors: 0,
    femaleDonors: 0,
    donors: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredDonors = dashboard.donors.filter((donor) => {
    const search = searchTerm.trim().toLowerCase();

    if (search === "") return true;

    return (
      donor.name?.toLowerCase().includes(search) ||
      donor.city?.toLowerCase().includes(search) ||
      donor.bloodGroup?.toLowerCase().includes(search)
    );
  });

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const bloodGroupStats = {};

  bloodGroups.forEach((group) => {
    bloodGroupStats[group] = filteredDonors.filter(
      (d) => d.bloodGroup === group
    ).length;
  });

  return (
    <div className="container-fluid px-0 py-2">

      <h3 className="text-center fw-bold mb-3">
        Blood Donor Dashboard
      </h3>

      {/* Summary Cards */}

      <div className="row g-3 mb-3">

        <div className="col-lg-3 col-md-6 col-6">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body py-3">
              <h6 className="text-muted mb-2">Total Donors</h6>
              <h3 className="fw-bold mb-0">{dashboard.totalDonors}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-6">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body py-3">
              <h6 className="text-muted mb-2">Available Donors</h6>
              <h3 className="fw-bold mb-0">{dashboard.availableDonors}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-6">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body py-3">
              <h6 className="text-muted mb-2">Male Donors</h6>
              <h3 className="fw-bold mb-0">{dashboard.maleDonors}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-6">
          <div className="card shadow-sm text-center h-100">
            <div className="card-body py-3">
              <h6 className="text-muted mb-2">Female Donors</h6>
              <h3 className="fw-bold mb-0">{dashboard.femaleDonors}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Blood Group Chart */}

      <BloodGroupChart donors={filteredDonors} />

      {/* Blood Group Statistics */}

      <div className="card shadow-sm mt-3">

        <div className="card-header bg-primary text-white py-2">
          <h6 className="mb-0 text-center">
            Blood Group Statistics
          </h6>
        </div>

        <div className="card-body py-3">

          <div className="row g-2">

            {Object.entries(bloodGroupStats).map(([group, count]) => (

              <div
                className="col-lg-3 col-md-4 col-6"
                key={group}
              >
                <div className="border rounded text-center py-2 h-100">
                  <h5 className="text-danger mb-1">
                    {group}
                  </h5>

                  <small className="text-muted">
                    {count} Donors
                  </small>
                </div>
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Recent Donors */}

      <div className="card shadow-sm mt-3">

        <div className="card-header bg-danger text-white py-2">
          <h6 className="mb-0 text-center">
            Recent Donors
          </h6>
        </div>

        <div className="table-responsive">

          <table className="table table-hover table-sm mb-0">

            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>Gender</th>
                <th>City</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>

              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor) => (
                  <tr key={donor._id}>
                    <td>{donor.name}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.age}</td>
                    <td>{donor.gender}</td>
                    <td>{donor.city}</td>
                    <td>{donor.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No Donors Found
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

export default Dashboard;