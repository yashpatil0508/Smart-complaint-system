import React, { useMemo, useState, useEffect } from "react";
import styles from "./AuthorityDashboard.module.css";

const categories = [
  "Infrastructure",
  "Sanitation",
  "Urban Planning",
  "Water",
  "Environment",
  "Road & Pavement",
];
const statuses = ["Pending", "In Progress", "Resolved", "Assigned"];
const priorities = ["Low", "Medium", "High"];

const AuthorityDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [userName, setUserName] = useState("Authority");
  const [complaints, setComplaints] = useState([]);
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(
        name.split(" ")[0].charAt(0).toUpperCase() +
        name.split(" ")[0].slice(1),
      );
    }

    const fetchAuthorityData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const compRes = await fetch("http://localhost:5000/api/complaints", {
          headers,
        });
        if (compRes.ok) {
          const compData = await compRes.json();
          setComplaints(compData);
        }

        const statsRes = await fetch(
          "http://localhost:5000/api/dashboard/stats",
          { headers },
        );
        if (statsRes.ok) {
          const s = await statsRes.json();
          setStatsData(s);
        }
      } catch (err) {
        console.error("Error fetching authority dashboard data:", err);
      }
    };
    fetchAuthorityData();
  }, []);

  const handleStatusUpdate = async (complaintId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/complaints/${complaintId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
            remark: `Status updated by authority`,
          }),
        },
      );

      if (response.ok) {
        alert("Complaint status updated successfully!");
        setComplaints(
          complaints.map((c) =>
            c._id === complaintId ? { ...c, status: newStatus } : c,
          ),
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status: ", err);
    }
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const matchesStatus = statusFilter === "" || item.status === statusFilter;
      const matchesLocation =
        locationFilter.trim() === "" ||
        (item.location && item.location.toLowerCase().includes(locationFilter.toLowerCase()));
      return matchesStatus && matchesLocation;
    });
  }, [complaints, statusFilter, locationFilter]);

  const stats = useMemo(() => {
    if (statsData) {
      return {
        total: statsData.total || 0,
        pending: statsData.pending || 0,
        inProgress: statsData.inProgress || 0,
        resolved: statsData.resolved || 0,
        highPriority: statsData.highPriority || 0,
      };
    }
    return {
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      highPriority: 0,
    };
  }, [statsData]);

  const byMonth = useMemo(() => {
    if (!statsData || !statsData.byMonth) return [];
    return statsData.byMonth.map((m) => ({
      month: `Month ${m._id}`,
      count: m.count,
    }));
  }, [statsData]);

  const statusDist = useMemo(() => {
    return statuses.map((s) => ({
      status: s,
      value: complaints.filter((i) => i.status === s).length,
    }));
  }, [complaints]);

  const statusClass = (status) => {
    if (status === "Resolved") return styles.statusResolved;
    if (status === "In Progress") return styles.statusInProgress;
    return styles.statusPending;
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardGrid}>
        <main className={styles.mainContent}>
          <div
            className={styles.welcome}
          >
            <div >
              <h1
              >
                Welcome Back, {userName}
              </h1>
              <p

              >
                Track your assigned civic complaints and their resolution
                progress
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
          <section className={styles.cardsSection}>
            <div className={styles.cardsGrid}>
              {[
                {
                  label: "Total Complaints",
                  value: stats.total,
                  variant: "blue",
                },
                {
                  label: "Pending Complaints",
                  value: stats.pending,
                  variant: "amber",
                },
                {
                  label: "In Progress",
                  value: stats.inProgress,
                  variant: "indigo",
                },
                {
                  label: "Resolved Complaints",
                  value: stats.resolved,
                  variant: "green",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`${styles.card} ${styles[`${card.variant}Card`]}`}
                >
                  <p className={styles.cardTitle}>{card.label}</p>
                  <p className={styles.cardValue}>{card.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.panelSection}>
            <div
              className={styles.filterRow}
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div
                className={styles.filterBlock}
                style={{ display: "flex", gap: "12px" }}
              >
                <select
                  className={styles.filterInput}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <input
                  className={styles.filterInput}
                  type="text"
                  placeholder="Filter by location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    {[
                      "Complaint ID",
                      "Title",
                      "Category",
                      "Location",
                      "Citizen",
                      "Status",
                      "Priority",
                      "Update Status",
                    ].map((title) => (
                      <th key={title} className={styles.tableHeadCell}>
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan={8} className={styles.emptyRow}>
                        No complaints match the filters or assigned to you.
                      </td>
                    </tr>
                  ) : (
                    filteredComplaints.map((row) => (
                      <tr key={row._id} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          {row._id.substring(0, 6)}...
                        </td>
                        <td className={styles.tableCell}>{row.title}</td>
                        <td className={styles.tableCell}>
                          {row.complaintType}
                        </td>
                        <td className={styles.tableCell}>{row.location}</td>
                        <td className={styles.tableCell}>
                          {row.complainerName}
                        </td>
                        <td className={styles.tableCell}>
                          <span
                            className={`${styles.statusBadge} ${statusClass(row.status)}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          {row.priority || "Low"}
                        </td>
                        <td className={styles.tableCell}>
                          <select
                            className="form-select"
                            style={{ padding: "0.2rem", borderRadius: "4px" }}
                            value={row.status}
                            onChange={(e) =>
                              handleStatusUpdate(row._id, e.target.value)
                            }
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
