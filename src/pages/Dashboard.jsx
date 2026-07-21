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

  // Filter Donors
  const filteredDonors = dashboard.donors.filter((donor) => {
    const search = searchTerm.trim().toLowerCase();

    if (search === "") return true;

    return (
      donor.name?.toLowerCase().includes(search) ||
      donor.city?.toLowerCase().includes(search) ||
      donor.bloodGroup?.toLowerCase().includes(search)
    );
  });

  // Blood Group Statistics (Filtered)
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
    <div className="container-fluid p-4">

      <h2 className="text-center fw-bold mb-4">
        Blood Donor Dashboard
      </h2>

      {/* Cards */}

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Total Donors</h6>
              <h2>{dashboard.totalDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Available Donors</h6>
              <h2>{dashboard.availableDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Male Donors</h6>
              <h2>{dashboard.maleDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h6>Female Donors</h6>
              <h2>{dashboard.femaleDonors}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Chart */}

      <BloodGroupChart donors={filteredDonors} />

      {/* Blood Group Statistics */}

      <div className="card shadow mt-5">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Blood Group Statistics</h5>
        </div>

        <div className="card-body">

          <div className="row">

            {Object.entries(bloodGroupStats).map(([group, count]) => (

              <div className="col-md-3 col-6 mb-3" key={group}>

                <div className="border rounded p-3 text-center">

                  <h4 className="text-danger">{group}</h4>

                  <h5>{count} Donors</h5>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Recent Donors */}

      <div className="card shadow mt-5">

        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">Recent Donors</h5>
        </div>

        <div className="table-responsive">

          <table className="table table-hover mb-0">

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

                  <td colSpan="6" className="text-center">
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