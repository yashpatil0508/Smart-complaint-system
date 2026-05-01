import React from "react";
import "./Features.jsx.css";

function Features() {
  const features = [
    {
      icon: "📝",
      title: "Quick Complaint Submission",
      description:
        "Submit civic complaints effortlessly with detailed information, photos, and location tracking. Our streamlined form makes reporting issues fast and simple for citizens.",
    },
    {
      icon: "🗺️",
      title: "Live Issue Map",
      description:
        "Visualize all reported complaints on an interactive live map. See the location and status of every civic issue in your area in real-time.",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description:
        "Track your complaint status from submission to resolution. Receive notifications at every stage and stay informed about progress updates.",
    },
    {
      icon: "⚡",
      title: "Smart Prioritization",
      description:
        "High-priority issues are automatically escalated and assigned to relevant authorities. Urgent complaints get faster response and resolution.",
    },
    {
      icon: "👥",
      title: "Authority Accountability",
      description:
        "Authorities are assigned to each complaint with transparent timelines. Monitor their response and hold them accountable for timely resolution.",
    },
    {
      icon: "⭐",
      title: "Community Engagement",
      description:
        "Vote on complaints, add comments, and engage with your community. Amplify important civic issues and track community-backed resolutions.",
    },
  ];

  return (
    <div className="features-container">
      <div className="features-header">
        <h2>Smart Complaint & Civic Issue Management</h2>
        <p>
          Transforming civic complaints into efficient solutions through
          technology and transparency
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
