import React, { useState } from "react";
import "./ComplaintSubmissionForm.css";

function ComplaintSubmissionForm() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    contact: "",
    category: "",
    description: "",
    location: "",
    wardNo: "",
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Select a Category",
    "Road & Pavement",
    "Water Supply",
    "Electricity",
    "Sanitation",
    "Traffic",
    "Street Lighting",
    "Public Parks",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form
    if (
      !formData.title ||
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.category ||
      !formData.description ||
      !formData.location ||
      !formData.wardNo
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("complainerName", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.contact);
      submitData.append("complaintType", formData.category);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("wardNo", formData.wardNo);
      if (formData.image) {
        submitData.append("proofFile", formData.image);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: submitData,
      });

      if (res.ok) {
        setSubmitted(true);
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            title: "",
            name: "",
            email: "",
            contact: "",
            category: "",
            description: "",
            location: "",
            wardNo: "",
            image: null,
          });
          setSubmitted(false);
        }, 2000);
      } else {
        alert("Failed to submit complaint. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  return (
    <section className="complaint-form-section">
      <div className="form-container container">
        <div className="form-header">
          <h2>Report a Civic Issue</h2>
          <p>Help us improve your city by reporting issues in your area</p>
        </div>

        {submitted && (
          <div className="alert alert-success">
            <span>✓</span>
            <div>
              <strong>Complaint Submitted Successfully!</strong>
              <p>
                Your complaint has been registered. You can track its status
                using your reference number.
              </p>
            </div>
          </div>
        )}

        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group full-width" style={{marginBottom: '1.5rem'}}>
            <label htmlFor="title">Complaint Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="E.g., Broken pipe in Sector 4"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number *</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                placeholder="Enter your phone number"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((cat, idx) => (
                  <option
                    key={idx}
                    value={cat === "Select a Category" ? "" : cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location Address *</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter the location/address"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width" style={{marginBottom: '1.5rem'}}>
            <label htmlFor="wardNo">Ward Number / Zone *</label>
            <input
              type="text"
              id="wardNo"
              name="wardNo"
              placeholder="Enter your Ward Number or Zone"
              value={formData.wardNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="image">Upload Image (Optional)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="image" className="file-label">
                <span>📷 Choose Image</span>
                {formData.image && (
                  <span className="file-name">{formData.image.name}</span>
                )}
              </label>
            </div>
            <small>Max file size: 5MB. Supported formats: JPG, PNG, GIF</small>
          </div>

          <button type="submit" className="btn-primary btn-submit">
            Submit Complaint
          </button>
        </form>
      </div>
    </section>
  );
}

export default ComplaintSubmissionForm;
