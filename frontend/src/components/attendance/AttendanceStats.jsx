import React from "react";
import { AttendanceProgress } from "./AttendanceProgress";
import { calculateAttendanceStatus, getAttendanceAdvice } from "../../utils/attendanceUtils";
import "./AttendanceStats.css";

export function AttendanceStats({ stats, target = 75 }) {
  const { total, present, absent, percentage } = stats;
  const status = calculateAttendanceStatus(percentage, target);
  const advice = getAttendanceAdvice(present, total, target);

  // Status message mappings
  const getStatusLabel = () => {
    switch (status) {
      case "safe":
        return "Safe Zone";
      case "warning":
        return "Warning Zone";
      case "danger":
        return "Critical Zone";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="attendance-stats-wrapper">
      {/* Overview Card */}
      <div className="stats-main-card glass-card">
        <div className="stats-main-content">
          <div className="stats-text">
            <span className="stats-subtitle">OVERALL ATTENDANCE</span>
            <h2 className="stats-percentage">{percentage}%</h2>
            <div className={`stats-status-badge badge-${status}`}>
              <span className="status-dot"></span>
              {getStatusLabel()}
            </div>
            <p className="stats-description">
              Target is {target}% overall. {advice.text}
            </p>
          </div>
          
          <div className="stats-progress-ring">
            <AttendanceProgress 
              percentage={percentage} 
              type="circle" 
              size={110} 
              strokeWidth={10} 
              status={status} 
            />
          </div>
        </div>
      </div>

      {/* Grid for numerical breakdowns */}
      <div className="stats-mini-grid">
        {/* Attended Card */}
        <div className="mini-stat-card glass-card">
          <div className="mini-stat-icon-container present-icon-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="mini-stat-details">
            <span className="mini-stat-label">Attended</span>
            <h3 className="mini-stat-value">{present}</h3>
            <span className="mini-stat-sub">Classes</span>
          </div>
        </div>

        {/* Missed Card */}
        <div className="mini-stat-card glass-card">
          <div className="mini-stat-icon-container absent-icon-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div className="mini-stat-details">
            <span className="mini-stat-label">Missed</span>
            <h3 className="mini-stat-value">{absent}</h3>
            <span className="mini-stat-sub">Classes</span>
          </div>
        </div>

        {/* Total Card */}
        <div className="mini-stat-card glass-card">
          <div className="mini-stat-icon-container total-icon-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="mini-stat-details">
            <span className="mini-stat-label">Total Conducted</span>
            <h3 className="mini-stat-value">{total}</h3>
            <span className="mini-stat-sub">Classes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceStats;
