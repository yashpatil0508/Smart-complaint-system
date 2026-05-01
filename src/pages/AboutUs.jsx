import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>Making Cities Smarter, One Complaint at a Time</h1>
      </div>

      <div className="about-content">
        <section className="about-section introduction">
          <h2>Introduction</h2>
          <p>
            The Smart Complaint and Civic Issue Management System helps citizens report civic issues like potholes, garbage, water leakage, and streetlight problems, connecting them directly with authorities for quick and efficient resolution.
          </p>
        </section>

        <section className="about-section objective">
          <h2>Objective</h2>
          <p>
            Our purpose is to improve communication between citizens and the government, reduce manual work, and increase transparency in handling public complaints.
          </p>
        </section>

        <section className="about-section cards-section">
          <div className="about-card features">
            <h2>Key Features</h2>
            <ul>
              <li>Online complaint registration</li>
              <li>Complaint status tracking</li>
              <li>Category-based issue reporting</li>
              <li>Admin dashboard for managing complaints</li>
              <li>Notifications and updates</li>
            </ul>
          </div>

          <div className="about-card users">
            <h2>Users</h2>
            <div className="user-types">
              <div>
                <strong>Citizens</strong>
                <p>To register and track complaints</p>
              </div>
              <div>
                <strong>Admin / Authorities</strong>
                <p>To manage and resolve complaints</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section benefits">
          <h2>Benefits</h2>
          <div className="benefit-items">
            <span>⏳ Time-saving</span>
            <span>⚡ Efficiency</span>
            <span>🔍 Transparency</span>
            <span>🏙️ Better City Management</span>
          </div>
        </section>

        <section className="about-section technologies">
          <h2>Technologies Used</h2>
          <div className="tech-tags">
            <span className="tag html">HTML</span>
            <span className="tag css">CSS</span>
            <span className="tag js">JavaScript</span>
            <span className="tag react">React</span>
            <span className="tag node">Node.js</span>
            <span className="tag mongo">MongoDB</span>
          </div>
        </section>

        <section className="about-section future-scope">
          <h2>Future Scope</h2>
          <ul>
            <li>Mobile app development</li>
            <li>GPS-based tracking</li>
            <li>AI-based issue detection</li>
            <li>Real-time notifications</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
