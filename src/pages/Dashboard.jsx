import React, { useEffect, useState } from "react";
// import { getDonors } from "../services/api";
import BloodGroupChart from "../components/BloodGroupChart";

function Dashboard() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await getDonors();
      setDonors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Dashboard Statistics
  const totalDonors = donors.length;

  const maleDonors = donors.filter(
    (donor) => donor.gender === "Male"
  ).length;

  const femaleDonors = donors.filter(
    (donor) => donor.gender === "Female"
  ).length;

  const availableDonors = donors.filter(
    (donor) => donor.available === true
  ).length;


  const bloodGroupStats = {
    "A+": donors.filter((d) => d.bloodGroup === "A+").length,
    "A-": donors.filter((d) => d.bloodGroup === "A-").length,
    "B+": donors.filter((d) => d.bloodGroup === "B+").length,
    "B-": donors.filter((d) => d.bloodGroup === "B-").length,
    "AB+": donors.filter((d) => d.bloodGroup === "AB+").length,
    "AB-": donors.filter((d) => d.bloodGroup === "AB-").length,
    "O+": donors.filter((d) => d.bloodGroup === "O+").length,
    "O-": donors.filter((d) => d.bloodGroup === "O-").length,
  };
  return (
    <div className="w-100 p-4">
      <h2 className="fw-bold mb-4">Blood Donor Dashboard</h2>

      <div className="row g-4">

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-people-fill text-danger fs-1"></i>
              <h6 className="mt-3 text-secondary">Total Donors</h6>
              <h2 className="fw-bold">{totalDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-heart-pulse-fill text-success fs-1"></i>
              <h6 className="mt-3 text-secondary">Available Donors</h6>
              <h2 className="fw-bold">{availableDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-person-fill text-primary fs-1"></i>
              <h6 className="mt-3 text-secondary">Male Donors</h6>
              <h2 className="fw-bold">{maleDonors}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <i className="bi bi-person-fill text-warning fs-1"></i>
              <h6 className="mt-3 text-secondary">Female Donors</h6>
              <h2 className="fw-bold">{femaleDonors}</h2>
            </div>
          </div>
        </div>

      </div>

      <BloodGroupChart donors={donors} />

      <div className="card shadow-sm mt-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Blood Group Statistics</h5>
        </div>

        <div className="card-body">
          <div className="row">

            {Object.entries(bloodGroupStats).map(([group, count]) => (
              <div className="col-md-3 col-6 mb-3" key={group}>
                <div className="border rounded p-3 text-center">
                  <h4 className="text-danger fw-bold">{group}</h4>
                  <h5>{count} Donors</h5>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Recent Donors Table */}

      <div className="card shadow-sm mt-5">
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
              {donors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.age}</td>
                  <td>{donor.gender}</td>
                  <td>{donor.city}</td>
                  <td>{donor.phone}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;