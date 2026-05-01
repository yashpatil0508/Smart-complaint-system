import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Report an Issue",
      desc: "Submit an issue you faced",
      path: "/report",
    },
    // { title: "View Live Map", desc: "See complaints on map", path: "/map" },
    {
      title: "Contact Support",
      desc: "Get help with your complaint",
      path: "/support",
    },
  ];

  return (
    <div className="quick-actions">
      <h3 className="qa-title">Quick Actions</h3>
      <div className="qa-grid">
        {actions.map((a) => (
          <button
            key={a.title}
            className="qa-card"
            onClick={() => navigate(a.path)}
          >
            <div className="qa-card-left">
              <div className="qa-icon">⚡</div>
            </div>
            <div className="qa-card-body">
              <h4>{a.title}</h4>
              <p className="muted">{a.desc}</p>
            </div>
            <div className="qa-card-right">›</div>
          </button>
        ))}
      </div>
    </div>
  );
}
