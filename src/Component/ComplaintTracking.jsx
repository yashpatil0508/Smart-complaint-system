import React, { useState, useEffect } from "react";
import ComplaintCardContainer from "./ComplaintCardContainer";
import "./ComplaintTracking.css";

const ComplaintTracking = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch('http://localhost:5000/api/complaints', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <section className="complaint-tracking">
      <div className="tracking-header">
        <h2 className="tracking-title">Track Civic Issues</h2>
        <p className="tracking-subtitle">
          Monitor the progress of reported problems in your community
        </p>
      </div>
      <div className="tracking-content">
        <div className="filter-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search by ID, Area, or Keyword" />
          </div>
          <div className="filter-buttons">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Pending</button>
            <button className="filter-btn">In Progress</button>
            <button className="filter-btn">Resolved</button>
          </div>
        </div>
        {loading ? (
           <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
        ) : (
           <ComplaintCardContainer complaints={complaints} />
        )}
      </div>
    </section>
  );
};

export default ComplaintTracking;
