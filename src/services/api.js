import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3004/api",
});

// export const getDonors = (bloodGroup = "", city = "") =>
//     API.get(
//         `/donors?bloodGroup=${bloodGroup}&city=${city}`
//     );

// export const addDonor = (data) => API.post("/donors", data);

// export const updateDonor = (id, data) =>
//     API.put(`/donors/${id}`, data);

// export const deleteDonor = (id) =>
//     API.delete(`/donors/${id}`);
// export const getDonorById = (id) => API.get(`/donors/${id}`);

export const loginAdmin = (data) =>
    API.post("/auth/login", data);

export const registerUser = (data) =>
    API.post("/auth/register", data);

// User Profile
export const getProfile = () =>
    API.get("/users/profile", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const updateProfile = (data) =>
    API.put("/users/profile", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const becomeDonor = () =>
    API.put(
        "/users/become-donor",
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

// Change Availability
export const toggleAvailability = () =>
    API.put(
        "/users/toggle-availability",
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

export const createBloodRequest = (data) =>
    API.post("/requests", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const getBloodRequests = () =>
    API.get("/requests", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Accept Blood Request
export const acceptBloodRequest = (id) =>
    API.put(
        `/requests/${id}/accept`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

export const getMyRequests = () =>
    API.get("/requests/my", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const completeBloodRequest = (id) =>
    API.put(
        `/requests/${id}/complete`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

export const getDonationHistory = () =>
    API.get("/requests/history", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });