import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RequestBlood from "./pages/RequestBlood";
import BloodRequests from "./pages/BloodRequests";
import MyRequests from "./pages/MyRequests";
import DonationHistory from "./pages/DonationHistory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ContactMessages from "./pages/ContactMessages";
import AdminRoute from "./components/AdminRoute";
import ManageUsers from "./pages/ManageUsers";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
// import Notification from "./pages/Notification";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route
          path="/notifications"
          element={<Notification />}
        /> */}
        <Route
          path="/manage-users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/contact-messages"
          element={
            <AdminRoute>
              <ContactMessages />
            </AdminRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </ProtectedRoute>
          }
        >

          <Route
            path="/donation-history"
            element={
              <AdminRoute>
                <DonationHistory searchTerm={searchTerm} />
              </AdminRoute>
            }
          />

          <Route
            path="/"
            element={<Dashboard searchTerm={searchTerm} />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/request-blood"
            element={<RequestBlood />}
          />

          <Route
            path="/blood-requests"
            element={<BloodRequests searchTerm={searchTerm} />}
          />

          <Route
            path="/my-requests"
            element={<MyRequests searchTerm={searchTerm} />}
          />



          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable

      />

    </BrowserRouter>
  );
}

export default App;