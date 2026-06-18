import React from "react";
import "./AttendanceProgress.css";

export function AttendanceProgress({ percentage, type = "bar", size = 80, strokeWidth = 8, status = "safe" }) {
  // Determine color matching status
  const getColorClass = () => {
    switch (status) {
      case "safe":
        return "var(--progress-safe, #10b981)"; // Green
      case "warning":
        return "var(--progress-warning, #f59e0b)"; // Orange
      case "danger":
        return "var(--progress-danger, #ef4444)"; // Red
      default:
        return "#ffffff";
    }
  };

  if (type === "circle") {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="attendance-progress-circle-container" style={{ width: size, height: size, position: "relative", display: "inline-flex", alignItems: "center", justifyItems: "center" }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Active Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={getColorClass()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.35s ease" }}
          />
        </svg>
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <span className="circle-percentage-text" style={{ fontSize: `${size * 0.22}px`, fontWeight: "700", color: "#ffffff" }}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  }

  // Default Bar Indicator
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-track" style={{ height: `${strokeWidth}px`, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "9999px", overflow: "hidden" }}>
        <div
          className="progress-indicator"
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: getColorClass(),
            borderRadius: "9999px",
            transition: "width 0.3s ease"
          }}
        />
      </div>
    </div>
  );
}

export default AttendanceProgress;
