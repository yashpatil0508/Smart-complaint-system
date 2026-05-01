import React from "react";
import "./ComplaintStatistics.css";

function ComplaintStatistics() {
  const stats = [
    {
      id: 1,
      label: "Total Complaints",
      value: "2,458",
      icon: "📋",
      color: "#0A1F44",
      trend: "+12%",
    },
    {
      id: 2,
      label: "Pending",
      value: "425",
      icon: "⏳",
      color: "#FF4D4D",
      trend: "-8%",
    },
    {
      id: 3,
      label: "In Progress",
      value: "612",
      icon: "🔄",
      color: "#1E90FF",
      trend: "+4%",
    },
    {
      id: 4,
      label: "Resolved",
      value: "1,421",
      icon: "✅",
      color: "#00C896",
      trend: "+18%",
    },
  ];

  return (
    <section className="complaint-statistics">
      <div className="stats-container container">
        <div className="stats-header">
          <h2>Complaint Dashboard</h2>
          <p>Real-time statistics of civic complaints in your city</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="stat-card"
              style={{ "--accent-color": stat.color }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-trend">{stat.trend} from last month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ComplaintStatistics;
