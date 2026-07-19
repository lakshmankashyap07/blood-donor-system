import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pagenotfound from "./pages/Pagenotfound";
// import Donors from "./pages/Donors";
// import AddDonor from "./pages/AddDonor";
// import EditDonor from "./pages/EditDonor";
import Profile from "./pages/Profile";
import RequestBlood from "./pages/RequestBlood";
import BloodRequests from "./pages/BloodRequests";
import MyRequests from "./pages/MyRequests";
import DonationHistory from "./pages/DonationHistory";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app-layout flex-column flex-lg-row">
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* <Route
              path="/donors"
              element={
                <ProtectedRoute>
                  <Donors />
                </ProtectedRoute>
              }
            /> */}

            {/* <Route
              path="/add-donor"
              element={
                <ProtectedRoute>
                  <AddDonor />
                </ProtectedRoute>
              }
            /> */}

            {/* <Route
              path="/edit-donor/:id"
              element={
                <ProtectedRoute>
                  <EditDonor />
                </ProtectedRoute>
              }
            /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request-blood" element={<RequestBlood />} />
            <Route path="/blood-requests" element={<BloodRequests />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/donation-history" element={<DonationHistory />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donation-history" element={<DonationHistory />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Pagenotfound />} /> */}
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;