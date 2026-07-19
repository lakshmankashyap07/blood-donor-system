// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { addDonor } from "../services/api";

// function AddDonor() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: "",
//         bloodGroup: "",
//         age: "",
//         gender: "",
//         city: "",
//         phone: "",
//         available: true,
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await addDonor(formData);
//             alert("Donor Added Successfully!");
//             navigate("/donors");
//         } catch (error) {
//             console.log(error);
//             alert("Failed to add donor");
//         }
//     };

//     return (
//         <div className="container-fluid py-4">
//             <div className="row justify-content-center">
//                 <div className="col-lg-8 col-md-10">

//                     <div className="card shadow border-0">

//                         <div className="card-header bg-danger text-white text-center">
//                             <h3 className="mb-0">Add New Donor</h3>
//                         </div>

//                         <div className="card-body p-4">

//                             <form onSubmit={handleSubmit}>

//                                 <div className="row">

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             placeholder="Enter Full Name"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">Blood Group</label>
//                                         <select
//                                             className="form-select"
//                                             name="bloodGroup"
//                                             value={formData.bloodGroup}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Blood Group</option>
//                                             <option>A+</option>
//                                             <option>A-</option>
//                                             <option>B+</option>
//                                             <option>B-</option>
//                                             <option>AB+</option>
//                                             <option>AB-</option>
//                                             <option>O+</option>
//                                             <option>O-</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">Age</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             name="age"
//                                             value={formData.age}
//                                             onChange={handleChange}
//                                             placeholder="Enter Age"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">Gender</label>
//                                         <select
//                                             className="form-select"
//                                             name="gender"
//                                             value={formData.gender}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Gender</option>
//                                             <option>Male</option>
//                                             <option>Female</option>
//                                             <option>Other</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">City</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="city"
//                                             value={formData.city}
//                                             onChange={handleChange}
//                                             placeholder="Enter City"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">Phone</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="phone"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             placeholder="Enter Phone Number"
//                                             required
//                                         />
//                                     </div>

//                                 </div>

//                                 <div className="d-flex justify-content-end mt-4">
//                                     <button type="submit" className="btn btn-danger px-4">
//                                         Save Donor
//                                     </button>
//                                 </div>

//                             </form>

//                         </div>

//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddDonor;