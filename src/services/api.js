import axios from "axios";
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default API;

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

export const getDashboard = () =>
    API.get("/users/dashboard", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Contact Message
export const sendContactMessage = (data) =>
    API.post("/contact", data);

// Get Contact Messages
export const getContactMessages = () =>
    API.get("/contact", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Delete Contact Message
export const deleteContactMessage = (id) =>
    API.delete(`/contact/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// ==============================
// Admin - Manage Users
// ==============================

// Get All Users
export const getUsers = () =>
    API.get("/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Delete User
export const deleteUser = (id) =>
    API.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Update User Role
export const updateUserRole = (id, role) =>
    API.put(
        `/users/${id}/role`,
        { role },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

// Admin Dashboard Analytics
export const getAdminDashboard = () =>
    API.get("/users/admin-dashboard", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Forgot Password
export const forgotPassword = (data) =>
    API.post("/auth/forgot-password", data);

// Verify OTP
export const verifyOTP = (data) =>
    API.post("/auth/verify-otp", data);

// Reset Password
export const resetPassword = (data) =>
    API.post("/auth/reset-password", data);

export const getNotifications = () =>
    API.get("/notifications", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

export const markAsRead = (id) =>
    API.put(
        `/notifications/read/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

export const markAllRead = () =>
    API.put(
        "/notifications/read-all",
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

export const deleteNotification = (id) =>
    API.delete(`/notifications/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });