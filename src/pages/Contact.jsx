import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendContactMessage } from "../services/api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await sendContactMessage(formData);

      toast.success(
        res.data.message || "Message Sent Successfully!"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container text-center">
          <h1>Contact</h1>
          <p>
            Home <span>›</span> Contact
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container my-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="contact-form-card shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    name="message"
                    className="form-control"
                    placeholder="Write Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="col-lg-6">
            <div className="contact-info-card">
              <small className="text-uppercase">
                Contact Us
              </small>

              <h2 className="mt-2">
                Have Questions?
                <br />
                Contact Us
              </h2>

              <p className="mt-3">
                If you have any questions regarding blood donation,
                blood requests or becoming a donor, feel free to
                contact our support team.
              </p>

              <hr className="bg-light" />

              <h5>Contact Information</h5>

              <p>📍 Lucknow, Uttar Pradesh, India</p>

              <p>📞 +91 9876543210</p>

              <p>✉ support@blooddonor.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;