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

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
            path="/donation-history"
            element={<DonationHistory searchTerm={searchTerm} />}
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
        autoClose={3000}
      />

    </BrowserRouter>
  );
}

export default App;