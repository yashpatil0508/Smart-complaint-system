import React from 'react';
import './Support.css';
import { NavLink } from 'react-router-dom';

export default function Support() {
  return (
    <div className="support-container">
      <div className="support-header">
        <h1>How To Register a Complaint</h1>
        <p>A simple step-by-step guide to reporting civic issues in your area.</p>
      </div>

      <div className="support-content">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-details">
            <h2>Log In or Sign Up</h2>
            <p>You must be signed into your citizen account to report an issue. This helps authorities contact you with updates.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-details">
            <h2>Go to "Raise Complaint"</h2>
            <p>Click on the <strong>Raise Complaint</strong> option in the navigation menu or the <strong>Report an Issue</strong> button on your dashboard.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-details">
            <h2>Fill in the Details</h2>
            <p>Provide information about the issue: select the correct category (e.g., Road, Garbage, Water), describe the problem, and provide the exact location.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">4</div>
          <div className="step-details">
            <h2>Upload a Photo</h2>
            <p>It's highly recommended to attach a clear picture of the issue. This makes it easier for the authorities to understand the problem quickly.</p>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">5</div>
          <div className="step-details">
            <h2>Submit & Track</h2>
            <p>Click <strong>Submit</strong>! Your complaint is now registered. You can track its live progress back on your Citizen Dashboard.</p>
          </div>
        </div>

        <div className="support-action">
          <NavLink to="/report" className="btn-primary">
            Report an Issue Now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
