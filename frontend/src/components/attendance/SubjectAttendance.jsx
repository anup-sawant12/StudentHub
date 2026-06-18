import React from "react";
import { calculateAttendanceStatus, getAttendanceAdvice } from "../../utils/attendanceUtils";
import { AttendanceProgress } from "./AttendanceProgress";
import "./SubjectAttendance.css";

export function SubjectAttendance({ subject, stats }) {
  const { name, code, instructor, target = 75, room } = subject;
  const { total, present, late, absent, percentage } = stats;
  
  const status = calculateAttendanceStatus(percentage, target);
  const advice = getAttendanceAdvice(present, total, target);

  const getStatusText = () => {
    switch (status) {
      case "safe": return "Excellent standing. You are safely above your target attendance.";
      case "warning": return "Caution required. You are close to falling below the target attendance.";
      case "danger": return "Action required. You are below the required target attendance.";
      default: return "";
    }
  };

  return (
    <div className="subject-attendance-detail-panel">
      {/* Target Analysis Card */}
      <div className={`advice-banner-card border-${status}`}>
        <div className="advice-header">
          <div className={`status-dot dot-${status}`}></div>
          <span className="advice-title-text">Target Analysis</span>
        </div>
        <p className="advice-main-text">{advice.text}</p>
        <p className="advice-sub-text">{getStatusText()}</p>
      </div>

      {/* Grid of detailed ratios */}
      <div className="subject-details-grid">
        {/* Attended Card */}
        <div className="detail-stat-card glass-card">
          <span className="stat-card-label">Attended</span>
          <div className="stat-card-numbers">
            <span className="stat-card-value text-safe">{present}</span>
            <span className="stat-card-divider">/</span>
            <span className="stat-card-total">{total}</span>
          </div>
          <span className="stat-card-sub text-muted">Classes (including {late} late)</span>
        </div>

        {/* Missed Card */}
        <div className="detail-stat-card glass-card">
          <span className="stat-card-label">Missed</span>
          <div className="stat-card-numbers">
            <span className="stat-card-value text-danger">{absent}</span>
            <span className="stat-card-divider">/</span>
            <span className="stat-card-total">{total}</span>
          </div>
          <span className="stat-card-sub text-muted">Classes absent</span>
        </div>

        {/* Room / Location */}
        <div className="detail-stat-card glass-card">
          <span className="stat-card-label">Location Details</span>
          <h4 className="detail-stat-room">{room || "N/A"}</h4>
          <span className="stat-card-sub text-muted">Instructor: {instructor}</span>
        </div>
      </div>
    </div>
  );
}

export default SubjectAttendance;
