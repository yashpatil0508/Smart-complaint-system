import React from "react";
import ComplaintStatCard from "./ComplaintStatCard";
import {
  AiOutlineCheck,
  AiOutlineHourglass,
  AiOutlineExclamationCircle,
} from "react-icons/ai";

function ComplaintStatContainer({ stats }) {
  const defaultStats = [
    {
      title: "Resolved",
      value: 8,
      trend: "+3 this week",
      trendValue: 3,
      Icon: AiOutlineCheck,
    },
    {
      title: "Pending",
      value: 12,
      trend: "+1 this week",
      trendValue: 1,
      Icon: AiOutlineHourglass,
    },
    {
      title: "In Progress Complaint",
      value: 2,
      trend: "Being worked on",
      trendValue: 0,
      Icon: AiOutlineExclamationCircle,
    },
    {
      title: "Total",
      value: 22,
      trend: "+3 this week",
      trendValue: 3,
      Icon: AiOutlineCheck,
    },
  ];

  const list = Array.isArray(stats) && stats.length ? stats : defaultStats;

  return (
    <div className="container">
      <div className="row">
        {list.map((s, i) => (
          <div className="col" key={i}>
            <ComplaintStatCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplaintStatContainer;
