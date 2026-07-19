// import React, { useEffect, useState } from "react";
// import { getDonors } from "../services/api";
// import { toast } from "react-toastify";

// function Donors() {
//     const [donors, setDonors] = useState([]);
//     const [search, setSearch] = useState("");
//     const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
//     const [selectedGender, setSelectedGender] = useState("");
//     const [selectedCity, setSelectedCity] = useState("");

//     // Pagination
//     const [currentPage, setCurrentPage] = useState(1);
//     const donorsPerPage = 5;

//     useEffect(() => {
//         fetchDonors();
//     }, []);

//     const fetchDonors = async () => {
//         try {
//             const res = await getDonors();

//             // Works whether backend returns array or { donors: [...] }
//             const donorData = Array.isArray(res.data)
//                 ? res.data
//                 : res.data.donors || [];

//             setDonors(donorData);
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to load donors");
//         }
//     };

//     // Search & Filter
//     const filteredDonors = donors.filter((donor) => {
//         return (
//             donor.name.toLowerCase().includes(search.toLowerCase()) &&
//             (selectedBloodGroup === "" ||
//                 donor.bloodGroup === selectedBloodGroup) &&
//             (selectedGender === "" ||
//                 donor.gender === selectedGender) &&
//             (selectedCity === "" ||
//                 donor.city === selectedCity)
//         );
//     });

//     // Pagination
//     const indexOfLastDonor = currentPage * donorsPerPage;
//     const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;

//     const currentDonors = filteredDonors.slice(
//         indexOfFirstDonor,
//         indexOfLastDonor
//     );

//     const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);
//     return (
//         <div className="container-fluid py-4">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2 className="fw-bold text-danger">🩸 Available Donors</h2>
//             </div>

//             {/* Search & Filters */}
//             <div className="card shadow-sm mb-4">
//                 <div className="card-body">
//                     <div className="row g-3">
//                         <div className="col-md-3">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Search by Name"
//                                 value={search}
//                                 onChange={(e) => {
//                                     setSearch(e.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                             />
//                         </div>

//                         <div className="col-md-3">
//                             <select
//                                 className="form-select"
//                                 value={selectedBloodGroup}
//                                 onChange={(e) => {
//                                     setSelectedBloodGroup(e.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                             >
//                                 <option value="">All Blood Groups</option>
//                                 <option>A+</option>
//                                 <option>A-</option>
//                                 <option>B+</option>
//                                 <option>B-</option>
//                                 <option>AB+</option>
//                                 <option>AB-</option>
//                                 <option>O+</option>
//                                 <option>O-</option>
//                             </select>
//                         </div>

//                         <div className="col-md-2">
//                             <select
//                                 className="form-select"
//                                 value={selectedGender}
//                                 onChange={(e) => {
//                                     setSelectedGender(e.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                             >
//                                 <option value="">All Genders</option>
//                                 <option>Male</option>
//                                 <option>Female</option>
//                                 <option>Other</option>
//                             </select>
//                         </div>

//                         <div className="col-md-2">
//                             <select
//                                 className="form-select"
//                                 value={selectedCity}
//                                 onChange={(e) => {
//                                     setSelectedCity(e.target.value);
//                                     setCurrentPage(1);
//                                 }}
//                             >
//                                 <option value="">All Cities</option>

//                                 {[...new Set(donors.map((donor) => donor.city))].map(
//                                     (city) => (
//                                         <option key={city} value={city}>
//                                             {city}
//                                         </option>
//                                     )
//                                 )}
//                             </select>
//                         </div>

//                         <div className="col-md-2">
//                             <button
//                                 className="btn btn-secondary w-100"
//                                 onClick={() => {
//                                     setSearch("");
//                                     setSelectedBloodGroup("");
//                                     setSelectedGender("");
//                                     setSelectedCity("");
//                                     setCurrentPage(1);
//                                 }}
//                             >
//                                 Reset
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Donor Table */}
//             <div className="card shadow-sm">
//                 <div className="table-responsive">
//                     <table className="table table-hover align-middle mb-0">
//                         <thead className="table-danger">
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Blood Group</th>
//                                 <th>Age</th>
//                                 <th>Gender</th>
//                                 <th>City</th>
//                                 <th>Phone</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {currentDonors.length > 0 ? (
//                                 currentDonors.map((donor) => (
//                                     <tr key={donor._id}>
//                                         <td>{donor.name}</td>
//                                         <td>
//                                             <span className="badge bg-danger">
//                                                 {donor.bloodGroup}
//                                             </span>
//                                         </td>
//                                         <td>{donor.age}</td>
//                                         <td>{donor.gender}</td>
//                                         <td>{donor.city}</td>
//                                         <td>{donor.phone}</td>
//                                         <td>
//                                             {donor.available ? (
//                                                 <span className="badge bg-success">
//                                                     Available
//                                                 </span>
//                                             ) : (
//                                                 <span className="badge bg-secondary">
//                                                     Unavailable
//                                                 </span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="7" className="text-center py-4">
//                                         No donors found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mt-3">
//                 <button
//                     className="btn btn-outline-danger"
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage(currentPage - 1)}
//                 >
//                     Previous
//                 </button>

//                 <span className="fw-bold">
//                     Page {currentPage} of {totalPages || 1}
//                 </span>

//                 <button
//                     className="btn btn-outline-danger"
//                     disabled={currentPage === totalPages || totalPages === 0}
//                     onClick={() => setCurrentPage(currentPage + 1)}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Donors;