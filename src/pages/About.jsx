import React from "react";

function About() {
  return (
    <div className="container mt-4">
      <div className="card shadow border-0">

        <div className="card-header bg-primary text-white">
          <h3>ℹ️ About Smart Blood Donor</h3>
        </div>

        <div className="card-body">

          <h5>Project Description</h5>

          <p>
            Smart Blood Donor is a MERN Stack based Blood Donation Management
            System that connects blood donors with people who need blood during
            emergencies.
          </p>

          <hr />

          <h5>Technologies Used</h5>

          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MongoDB</li>
            <li>Bootstrap 5</li>
            <li>JWT Authentication</li>
          </ul>

          <hr />

          <h5>Project Features</h5>

          <ul>
            <li>User Registration & Login</li>
            <li>Become Blood Donor</li>
            <li>Availability Toggle</li>
            <li>Blood Request System</li>
            <li>Accept Blood Request</li>
            <li>Donation History</li>
            <li>Dashboard Analytics</li>
            <li>Global Search</li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default About;