import React, { useState } from "react";
import ComplaintProgressStepper from "../Component/ComplaintProgressStepper";
import "./ReportIssue.css";

export default function ReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1: Complaint Type
    complaintType: "",

    // Step 2: Title
    complaintTitle: "",

    // Step 3: Description
    complaintDescription: "",

    // Step 4: Personal Info
    complainerName: "",
    wardNo: "",
    location: "",
    email: "",
    phone: "",

    // Step 5: Proof
    proofFile: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const complaintTypes = [
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
        proofFile: file,
      }));
    }
  };

  const validateCurrentStep = () => {
    if (currentStep === 1 && !formData.complaintType) {
      alert("Please select a complaint type");
      return false;
    }
    if (currentStep === 2 && !formData.complaintTitle.trim()) {
      alert("Please enter a complaint title");
      return false;
    }
    if (currentStep === 3 && !formData.complaintDescription.trim()) {
      alert("Please enter a complaint description");
      return false;
    }
    if (currentStep === 4) {
      if (!formData.complainerName.trim()) {
        alert("Please enter your name");
        return false;
      }
      if (!formData.wardNo.trim()) {
        alert("Please enter your ward number");
        return false;
      }
      if (!formData.location.trim()) {
        alert("Please enter the specific location for the report");
        return false;
      }
      if (!formData.email.trim()) {
        alert("Please enter your email");
        return false;
      }
      if (!formData.phone.trim()) {
        alert("Please enter your phone number");
        return false;
      }
    }
    if (currentStep === 5 && !formData.proofFile) {
      alert("Please upload proof of complaint");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found. Please log in.");

        const data = new FormData();
        data.append('complaintType', formData.complaintType);
        data.append('title', formData.complaintTitle);
        data.append('description', formData.complaintDescription);
        data.append('complainerName', formData.complainerName);
        data.append('wardNo', formData.wardNo);
        data.append('location', formData.location);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        if (formData.proofFile) {
          data.append('proofFile', formData.proofFile);
        }

        const response = await fetch('http://localhost:5000/api/complaints', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: data
        });

        const resData = await response.json();
        if (!response.ok) throw new Error(resData.message || 'Submission failed');

        console.log("Form Submitted Successfully:", resData);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setCurrentStep(1);
          setFormData({
            complaintType: "",
            complaintTitle: "",
            complaintDescription: "",
            complainerName: "",
            wardNo: "",
            location: "",
            email: "",
            phone: "",
            proofFile: null,
          });
        }, 3000);
      } catch (err) {
        console.error(err);
        alert(err.message || "An error occurred while submitting.");
      }
    }
  };

  return (
    <div className="report-issue-container">
      <div className="report-header">
        <h1>Report a Civic Issue</h1>
        <p>Follow the steps below to submit your complaint</p>
      </div>

      <ComplaintProgressStepper
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {submitted && (
        <div className="alert alert-success">
          <span>✓</span>
          <div>
            <strong>Complaint Submitted Successfully!</strong>
            <p>Your complaint has been recorded. Reference: CMP-{Date.now()}</p>
          </div>
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Complaint Type */}
          <div
            className={`form-step ${currentStep === 1 ? "active" : ""} ${
              currentStep > 1 ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <h2 className="step-title">Step 1: Select Complaint Type</h2>
              <p className="step-description">
                What type of civic issue are you reporting?
              </p>

              <div className="type-grid">
                {complaintTypes.map((type) => (
                  <div key={type} className="type-option">
                    <input
                      type="radio"
                      id={type}
                      name="complaintType"
                      value={type}
                      checked={formData.complaintType === type}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Title */}
          <div
            className={`form-step ${currentStep === 2 ? "active" : ""} ${
              currentStep > 2 ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <h2 className="step-title">Step 2: Complaint Title</h2>
              <p className="step-description">
                Provide a brief, descriptive title for your complaint
              </p>

              <div className="form-group">
                <input
                  type="text"
                  name="complaintTitle"
                  placeholder="e.g., Pothole on Main Street"
                  value={formData.complaintTitle}
                  onChange={handleInputChange}
                  maxLength="100"
                />
                <small className="char-count">
                  {formData.complaintTitle.length}/100
                </small>
              </div>
            </div>
          </div>

          {/* Step 3: Description */}
          <div
            className={`form-step ${currentStep === 3 ? "active" : ""} ${
              currentStep > 3 ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <h2 className="step-title">Step 3: Detailed Description</h2>
              <p className="step-description">
                Describe the issue in detail. Include location specifics, when
                you noticed it, and any relevant details.
              </p>

              <div className="form-group">
                <textarea
                  name="complaintDescription"
                  placeholder="Describe the issue in detail..."
                  value={formData.complaintDescription}
                  onChange={handleInputChange}
                  rows="8"
                  maxLength="1000"
                />
                <small className="char-count">
                  {formData.complaintDescription.length}/1000
                </small>
              </div>
            </div>
          </div>

          {/* Step 4: Personal Information */}
          <div
            className={`form-step ${currentStep === 4 ? "active" : ""} ${
              currentStep > 4 ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <h2 className="step-title">Step 4: Your Personal Information</h2>
              <p className="step-description">
                Please provide your contact details for follow-up
              </p>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="complainerName"
                    placeholder="Enter your full name"
                    value={formData.complainerName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Ward Number *</label>
                  <input
                    type="text"
                    name="wardNo"
                    placeholder="Enter your ward number"
                    value={formData.wardNo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Specific Location *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter precise location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Proof Upload */}
          <div
            className={`form-step ${currentStep === 5 ? "active" : ""} ${
              currentStep > 5 ? "completed" : ""
            }`}
          >
            <div className="step-content">
              <h2 className="step-title">Step 5: Upload Proof</h2>
              <p className="step-description">
                Upload a photo or document as proof of the complaint
              </p>

              <div className="form-group full-width">
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="proofFile"
                    name="proofFile"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="proofFile" className="file-label">
                    <span className="upload-icon">📤</span>
                    <span className="upload-text">
                      {formData.proofFile
                        ? `✓ ${formData.proofFile.name}`
                        : "Click to upload or drag and drop"}
                    </span>
                    <span className="upload-hint">
                      Supported: JPG, PNG, GIF, PDF (Max 5MB)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>

            <div className="nav-spacer"></div>

            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button type="submit" className="btn-primary btn-submit">
                ✓ Submit Complaint
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
