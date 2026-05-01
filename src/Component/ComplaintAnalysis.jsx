import React from "react";
import "./ComplaintAnalysis.css";

function Donut({ segments, size = 88, stroke = 18 }) {
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((s, i) => {
          const dash = (s.pct / 100) * c;
          const circle = (
            <circle
              key={s.key}
              r={radius}
              cx={size / 2}
              cy={size / 2}
              fill="transparent"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += dash;
          return circle;
        })}
      </g>
      <circle
        r={radius - stroke / 2}
        cx={size / 2}
        cy={size / 2}
        fill="#fff"
        stroke="transparent"
      />
    </svg>
  );
}

export default function ComplaintAnalysis({
  data = [],
  size = 88,
  stroke = 18,
  large = false,
}) {
  const counts = data.reduce((acc, item) => {
    const key = (item.complaintType || item.department || item.type || "Other").trim();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(counts).reduce((s, n) => s + n, 0) || 0;

  const palette = ["#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const segments = Object.keys(counts).map((k, i) => ({
    key: k,
    count: counts[k],
    pct: Math.round((counts[k] / total) * 100),
    color: palette[i % palette.length],
  }));

  if (!segments.length) return null;

  const leftStyle = { width: `${size + 36}px` };

  return (
    <div className={`complaint-analysis ${large ? "analysis-large" : ""}`}>
      <div className="analysis-left" style={leftStyle}>
        <Donut segments={segments} size={size} stroke={stroke} />
      </div>
      <div className="analysis-right">
        <h4>Issue breakdown</h4>
        <ul className="analysis-legend">
          {segments.map((s) => (
            <li key={s.key}>
              <span className="swatch" style={{ background: s.color }} />
              <strong>{s.key}</strong>
              <span className="muted">
                {s.count} ({s.pct}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
