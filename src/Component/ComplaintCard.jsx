import "./ComplaintCard.css";
import {
  AiOutlineClockCircle,
  AiOutlineEye,
  AiOutlineUser,
} from "react-icons/ai";

export default function ComplaintCard({
  title = "Street Light",
  caseId = "CVC-2025-001238",
  status = "Resolved",
  priority = "Medium",
  description = "Street light not working for past 3 days, causing safety concerns for pedestrians and vehicles during night hours.",
  location = "Park Street, Sector 12, Gurgaon",
  submitted = "12 Jan 2025, 10:15 pm",
  updated = "15 Jan 2025, 02:45 pm",
  imagesCount = 1,
  department = "Electrical",
  assignee = "Priya Sharma",
  slaCompleted = 40,
  slaTotal = 48,
  votes = 8,
  comments = 1,
  rating = 4,
  onView = () => {},
}) {
  const statusLower = status.toLowerCase();
  
  let progressPct = 25; // Default (Pending)
  if (statusLower.includes("assigned")) progressPct = 50;
  else if (statusLower.includes("progress")) progressPct = 75;
  else if (statusLower.includes("resolved")) progressPct = 100;
  else if (statusLower.includes("escalated")) progressPct = 100;

  let statusClass = "resolved";
  if (statusLower.includes("pending")) statusClass = "pending";
  if (statusLower.includes("escalated") || statusLower.includes("rejected"))
    statusClass = "escalated";

  const priorityLower = priority.toLowerCase();
  let priorityClass = "medium";
  if (priorityLower === "high") priorityClass = "high";
  if (priorityLower === "low") priorityClass = "low";

  return (
    <div className="complaint-card modern">
      <div className="card-top">
        <div className="left">
          <div className={`status-dot ${statusClass}`}></div>
          <div>
            <h2 className="title">{title}</h2>
            <div className="meta-row">
              <span className="case-id">{caseId}</span>
              <div className="badges">
                <span className={`badge ${statusClass}`}>
                  {status.toUpperCase()}
                </span>
                <span className={`badge ${priorityClass}`}>
                  {priority.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="actions">
            <button className="icon-btn" title="View" onClick={onView}>
              <AiOutlineEye />
            </button>
          </div>
        </div>
      </div>

      <p className="description">{description}</p>

      <div className="info-grid modern">
        <div>
          <AiOutlineUser className="inline-icon" /> <strong>Location:</strong>{" "}
          {location}
        </div>
        <div>
          <AiOutlineClockCircle className="inline-icon" />{" "}
          <strong>Submitted:</strong> {submitted}
        </div>
        <div>
          <AiOutlineClockCircle className="inline-icon" />{" "}
          <strong>Updated:</strong> {updated}
        </div>
        <div>
          <strong>Images:</strong> {imagesCount}
        </div>
      </div>

      <div className="assignment">
        <strong>Department:</strong> {department} &nbsp;&nbsp;
        <strong>Assigned to:</strong> {assignee}
      </div>

      <div className="sla">
        <div className="sla-header">
          <span>Status Progress</span>
          <span className={`completed ${progressPct >= 100 && !statusClass.includes("escalated") ? "done" : ""}`}>
            {progressPct}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className={`progress-fill ${statusClass}`}
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
        <small>Current Status: {status}</small>
      </div>

      <div className="card-footer modern">
        <div className="rating">
          {Array.from({ length: 5 })
            .map((_, i) => (i < rating ? "★" : "☆"))
            .join(" ")}
        </div>
      </div>
    </div>
  );
}
