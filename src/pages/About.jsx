import React from "react";

function About() {
  return (
    <div className="container-fluid about-page">

      {/* Hero Section */}

      <section className="py-5">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="badge bg-danger px-3 py-2 mb-3">
                SMART BLOOD DONOR
              </span>

              <h1 className="display-4 fw-bold">
                Connecting Donors,
                <br />
                Saving Lives ❤️
              </h1>

              <p className="lead text-muted mt-4">
                Smart Blood Donor is a secure platform that connects blood
                donors with patients quickly and efficiently. Our goal is
                to make blood available whenever and wherever it is needed.
              </p>

              <div className="mt-4">

                <button className="btn btn-danger btn-lg me-3">
                  Become Donor
                </button>

                <button className="btn btn-outline-danger btn-lg">
                  Contact Us
                </button>

              </div>

            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">

              <img
                src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-2895.jpg"
                className="img-fluid hero-img"
                alt="Blood Donation"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="py-5 bg-light rounded-4">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Why Choose Smart Blood Donor?
            </h2>

            <p className="text-muted">
              Making blood donation easier, faster and safer.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <i className="bi bi-lightning-charge-fill text-danger display-5"></i>

                <h5 className="mt-3">Fast Search</h5>

                <p className="text-muted">
                  Find nearby donors instantly.
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <i className="bi bi-shield-check text-danger display-5"></i>

                <h5 className="mt-3">Verified Users</h5>

                <p className="text-muted">
                  Safe and trusted donor profiles.
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <i className="bi bi-clock-history text-danger display-5"></i>

                <h5 className="mt-3">24×7 Available</h5>

                <p className="text-muted">
                  Emergency support anytime.
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <i className="bi bi-heart-pulse-fill text-danger display-5"></i>

                <h5 className="mt-3">Life Saving</h5>

                <p className="text-muted">
                  Every donation saves lives.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Our Impact =================

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">Our Impact</h2>

            <p className="text-muted">
              Together we are making a difference.
            </p>

          </div>

          <div className="row g-4 text-center">

            <div className="col-md-3">

              <div className="impact-card">

                <i className="bi bi-people-fill text-danger display-5"></i>

                <h2 className="fw-bold mt-3">500+</h2>

                <p className="text-muted mb-0">
                  Registered Donors
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="impact-card">

                <i className="bi bi-droplet-fill text-danger display-5"></i>

                <h2 className="fw-bold mt-3">300+</h2>

                <p className="text-muted mb-0">
                  Blood Requests
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="impact-card">

                <i className="bi bi-heart-pulse-fill text-danger display-5"></i>

                <h2 className="fw-bold mt-3">150+</h2>

                <p className="text-muted mb-0">
                  Lives Saved
                </p>

              </div>

            </div>

            <div className="col-md-3">

              <div className="impact-card">

                <i className="bi bi-geo-alt-fill text-danger display-5"></i>

                <h2 className="fw-bold mt-3">20+</h2>

                <p className="text-muted mb-0">
                  Cities Covered
                </p>

              </div>

            </div>

          </div>

        </div>

      </section> */}

      {/* ================= How It Works ================= */}

      <section className="py-5 bg-light rounded-4">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              How It Works
            </h2>

            <p className="text-muted">
              Get help in just three simple steps.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="step-number">1</div>

                <i className="bi bi-person-plus-fill display-4 text-danger my-3"></i>

                <h4>Create Account</h4>

                <p className="text-muted">
                  Register yourself as a donor or recipient in just a few minutes.
                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="step-number">2</div>

                <i className="bi bi-search-heart display-4 text-danger my-3"></i>

                <h4>Find Blood Request</h4>

                <p className="text-muted">
                  Search verified blood requests based on blood group and location.                </p>

              </div>

            </div>

            <div className="col-lg-4">

              <div className="card border-0 shadow-sm h-100 text-center p-4">

                <div className="step-number">3</div>

                <i className="bi bi-heart-fill display-4 text-danger my-3"></i>

                <h4>Save Life</h4>

                <p className="text-muted">
                  Contact the Recipient and help save someone's life.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Mission & Vision ================= */}

      <section className="py-5">

        <div className="container">

          <div className="row g-4">

            <div className="col-lg-6">

              <div className="about-box h-100">

                <div className="d-flex align-items-center mb-3">

                  <div className="about-circle me-3">
                    <i className="bi bi-bullseye"></i>
                  </div>

                  <h3 className="fw-bold mb-0">
                    Our Mission
                  </h3>

                </div>

                <p className="text-muted mb-0">
                  Our mission is to build a trusted platform that connects blood
                  donors with patients quickly and efficiently. We aim to reduce
                  delays during emergencies and encourage voluntary blood donation
                  through technology.
                </p>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="about-box h-100">

                <div className="d-flex align-items-center mb-3">

                  <div className="about-circle me-3">
                    <i className="bi bi-eye-fill"></i>
                  </div>

                  <h3 className="fw-bold mb-0">
                    Our Vision
                  </h3>

                </div>

                <p className="text-muted mb-0">
                  We envision a future where no one loses their life because blood
                  was unavailable. By connecting donors and recipients, we hope to
                  make life-saving blood accessible anytime and anywhere.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= Final CTA ================= */}

      <section className="py-5">

        <div className="container">

          <div className="cta-section">

            <div className="row align-items-center">

              <div className="col-lg-8">

                <h2 className="fw-bold">
                  Ready to Save a Life?
                </h2>

                <p className="text-muted mb-0">
                  Join thousands of donors who are making a real difference.
                  Register today and become a hero for someone in need.
                </p>

              </div>

              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                <button className="btn btn-danger btn-lg px-5">
                  Become a Donor
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;