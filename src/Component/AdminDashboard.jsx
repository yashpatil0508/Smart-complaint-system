import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [userName, setUserName] = useState("Administrator");
  const [complaints, setComplaints] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    highPriority: 0,
  });
  const priorities = ["Low", "Medium", "High"];

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: "📊" },
    { id: "complaints", label: "All Complaints", icon: "📋" },
    { id: "users", label: "Users Management", icon: "👥" },
    { id: "reports", label: "Reports & Analytics", icon: "📈" },
    { id: "settings", label: "System Settings", icon: "⚙️" },
    { id: "feedback", label: "User Feedback", icon: "💬" },
    { id: "logout", label: "Logout", icon: "🚪" },
  ];

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(
        name.split(" ")[0].charAt(0).toUpperCase() +
        name.split(" ")[0].slice(1),
      );
    }

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Complaints
        const compRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints`, {
          headers,
        });
        if (compRes.ok) {
          const compData = await compRes.json();
          setComplaints(compData);
        }

        // Fetch Stats
        const statsRes = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dashboard/stats`,
          { headers },
        );
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch Authorities for Assignment
        const authRes = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/authorities`,
          { headers },
        );
        if (authRes.ok) {
          const authData = await authRes.json();
          setAuthorities(authData);
        }
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAssignAuthority = async (complaintId, authorityId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints/${complaintId}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ assignedAuthority: authorityId }),
        },
      );

      if (response.ok) {
        alert("Complaint assigned successfully!");
        // Update local state to reflect assignment
        setComplaints(
          complaints.map((c) =>
            c._id === complaintId
              ? {
                ...c,
                assignedAuthority: authorityId,
                status: c.status === "Pending" ? "In Progress" : c.status,
              }
              : c,
          ),
        );
      } else {
        alert("Failed to assign complaint");
      }
    } catch (err) {
      console.error("Error formatting assignment: ", err);
    }
  };

  const handlePriorityChange = async (complaintId, newPriority) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints/${complaintId}/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ priority: newPriority }),
        },
      );

      if (response.ok) {
        setComplaints(
          complaints.map((c) =>
            c._id === complaintId ? { ...c, priority: newPriority } : c,
          ),
        );
      } else {
        alert("Failed to update priority");
      }
    } catch (err) {
      console.error("Error updating priority:", err);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this complaint permanently?",
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/complaints/${complaintId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setComplaints(complaints.filter((c) => c._id !== complaintId));
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete complaint");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  const dashboardStats = [
    { label: "Total Complaints", value: stats.total, variant: "blue" },
    { label: "Pending Complaints", value: stats.pending, variant: "amber" },
    { label: "In Progress", value: stats.inProgress, variant: "indigo" },
    { label: "Resolved Complaints", value: stats.resolved, variant: "green" },
  ];

  return (
    <div className="admin-dashboard" style={{ display: "block" }}>
      <main className="admin-content" style={{ padding: "24px 40px" }}>
        <div className="content-section">
          <div
            className="welcome"
            style={{
              padding: "32px",
              background:
                "linear-gradient(135deg, #0a1f44 0%, rgba(10, 31, 68, 0.95) 100%)",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 8px 24px rgba(10, 31, 68, 0.15)",
              marginBottom: "32px",
              border: "1px solid rgba(30, 144, 255, 0.2)",
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 8px 0",
                  color: "white",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                Welcome Back, {userName}
              </h1>
              <p
                style={{
                  margin: 0,
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                }}
              >
                Manage system settings, users, and overall complaint statistics
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
                style={{
                  padding: "8px 16px",
                  background: "#e11d48",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                }}
                title="Logout"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          <section className="cardsSection">
            <div className="cardsGrid">
              {dashboardStats.map((card) => (
                <div key={card.label} className={`card_${card.variant}Card`}>
                  <p className="cardTitle">{card.label}</p>
                  <p className="cardValue">{card.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="recent-section">
            <h2>All Complaints Management</h2>
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Citizen</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <tr key={complaint._id}>
                      <td>{complaint._id.substring(0, 6)}...</td>
                      <td>{complaint.title}</td>
                      <td>{complaint.complaintType}</td>
                      <td>
                        <span
                          className={`status-badge status-${complaint.status.toLowerCase().replace(" ", "-")}`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className="form-select"
                          style={{
                            padding: "0.2rem",
                            borderRadius: "4px",
                            minWidth: "120px",
                          }}
                          value={complaint.priority || "Low"}
                          onChange={(e) =>
                            handlePriorityChange(complaint._id, e.target.value)
                          }
                        >
                          {priorities.map((priority) => (
                            <option key={priority} value={priority}>
                              {priority}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{complaint.complainerName}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                          }}
                        >
                          <select
                            className="form-select"
                            style={{
                              padding: "0.2rem",
                              borderRadius: "4px",
                              flex: 1,
                            }}
                            value={
                              complaint.assignedAuthority?._id ||
                              complaint.assignedAuthority ||
                              ""
                            }
                            onChange={(e) =>
                              handleAssignAuthority(
                                complaint._id,
                                e.target.value,
                              )
                            }
                          >
                            <option value="">-- Assign --</option>
                            {authorities.map((auth) => (
                              <option key={auth._id} value={auth._id}>
                                {auth.name} ({auth.department})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleDeleteComplaint(complaint._id)}
                            style={{
                              padding: "4px 8px",
                              background: "#dc2626",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            title="Delete Complaint"
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No complaints found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
