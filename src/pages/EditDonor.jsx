// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getDonorById, updateDonor } from "../services/api";

// function EditDonor() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: "",
//         bloodGroup: "",
//         age: "",
//         gender: "",
//         city: "",
//         phone: "",
//     });

//     useEffect(() => {
//         loadDonor();
//     }, [id]);

//     const loadDonor = async () => {
//         try {
//             const res = await getDonorById(id);

//             setFormData({
//                 name: res.data.name,
//                 bloodGroup: res.data.bloodGroup,
//                 age: res.data.age,
//                 gender: res.data.gender,
//                 city: res.data.city,
//                 phone: res.data.phone,
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await updateDonor(id, formData);
//             alert("Donor Updated Successfully!");
//             navigate("/donors");
//         } catch (err) {
//             console.log(err.response?.data || err);
//             alert("Update Failed");
//         }
//     };

//     return (
//         <div className="container-fluid py-4">
//             <div className="row justify-content-center">
//                 <div className="col-lg-8 col-md-10">

//                     <div className="card shadow border-0">

//                         <div className="card-header bg-warning text-dark text-center">
//                             <h3 className="mb-0">
//                                 <i className="bi bi-pencil-square me-2"></i>
//                                 Edit Donor
//                             </h3>
//                         </div>

//                         <div className="card-body p-4">

//                             <form onSubmit={handleSubmit}>

//                                 <div className="row">

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             Blood Group
//                                         </label>
//                                         <select
//                                             className="form-select"
//                                             name="bloodGroup"
//                                             value={formData.bloodGroup}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Blood Group</option>
//                                             <option value="A+">A+</option>
//                                             <option value="A-">A-</option>
//                                             <option value="B+">B+</option>
//                                             <option value="B-">B-</option>
//                                             <option value="AB+">AB+</option>
//                                             <option value="AB-">AB-</option>
//                                             <option value="O+">O+</option>
//                                             <option value="O-">O-</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             Age
//                                         </label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             name="age"
//                                             value={formData.age}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             Gender
//                                         </label>
//                                         <select
//                                             className="form-select"
//                                             name="gender"
//                                             value={formData.gender}
//                                             onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Gender</option>
//                                             <option value="Male">Male</option>
//                                             <option value="Female">Female</option>
//                                             <option value="Other">Other</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             City
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="city"
//                                             value={formData.city}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>

//                                     <div className="col-md-6 mb-3">
//                                         <label className="form-label fw-semibold d-block text-start">
//                                             Phone
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="phone"
//                                             value={formData.phone}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>

//                                 </div>

//                                 <div className="d-flex justify-content-between mt-4">
//                                     <button
//                                         type="button"
//                                         className="btn btn-secondary"
//                                         onClick={() => navigate("/donors")}
//                                     >
//                                         Back
//                                     </button>

//                                     <button
//                                         type="submit"
//                                         className="btn btn-warning"
//                                     >
//                                         Update Donor
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

// export default EditDonor;