import React from "react";
import ComplaintCard from "./ComplaintCard";
import ComplaintAnalysis from "./ComplaintAnalysis";
import "./ComplaintCardContainer.css";

export default function ComplaintCardContainer({
  complaints,
  layout = "list",
}) {
  const sample = [

  ];

  const list =
    Array.isArray(complaints) && complaints.length ? complaints : sample;

  const handleView = (c) => {
    // Placeholder action - replace with navigation or modal as needed
    // eslint-disable-next-line no-alert
    alert(`Open complaint ${c.caseId}`);
  };

  return (
    <section className="complaint-container">
      <div className="container-header">
        <h3>Recent Complaints</h3>
        <div className="header-actions">
          <button className="btn small">New Complaint</button>
          <button className="btn outline small">Filter</button>
        </div>
      </div>

      <ComplaintAnalysis data={list} />

      <div
        className={`complaint-grid ${layout === "horizontal" ? "horizontal" : ""}`}
        role={layout === "horizontal" ? "list" : undefined}
        aria-label="complaint list"
      >
        {list.map((c, i) => {
          const isSample = !c._id;
          const mappedProps = isSample ? c : {
            title: c.title || c.complaintType,
            caseId: c._id ? `CVC-${c._id.slice(-6).toUpperCase()}` : c.caseId,
            status: c.status || "Pending",
            priority: c.priority || "Low",
            description: c.description,
            location: c.location || c.wardNo || "Not provided",
            submitted: c.createdAt ? new Date(c.createdAt).toLocaleString() : c.submitted,
            updated: c.updatedAt ? new Date(c.updatedAt).toLocaleString() : c.updated,
            imagesCount: c.proofFile ? 1 : 0,
            department: c.assignedAuthority?.department || "Pending Assignment",
            assignee: c.assignedAuthority?.name || "Unassigned",
            slaCompleted: 0,
            slaTotal: 48,
            votes: 0,
            comments: 0,
            rating: 0
          };

          return (
            <div
              className="card-wrap"
              role={layout === "horizontal" ? "listitem" : undefined}
              key={c._id || c.caseId || i}
            >
              <ComplaintCard {...mappedProps} onView={() => handleView(c)} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
