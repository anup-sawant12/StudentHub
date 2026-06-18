import React from "react";
import { AttendanceProgress } from "./AttendanceProgress";
import { calculateAttendanceStatus } from "../../utils/attendanceUtils";
import "./AttendanceCard.css";

export function AttendanceCard({ subject, stats, onMarkAttendance, onViewDetails }) {
  const { id, name, code, instructor, target = 75, room } = subject;
  const { total, present, absent, percentage } = stats;
  const status = calculateAttendanceStatus(percentage, target);

  const getStatusLabel = () => {
    switch (status) {
      case "safe": return "Safe";
      case "warning": return "Warning";
      case "danger": return "Critical";
      default: return "Unknown";
    }
  };

  return (
    <div className="attendance-card glass-card" onClick={() => onViewDetails(id)} style={{ cursor: "pointer" }}>
      {/* Card Header */}
      <div className="card-header-top">
        <div className="header-meta">
          {code && <span className="subject-code">{code}</span>}
          {code && room && <span className="subject-room">•</span>}
          {room && <span className="subject-room">{room}</span>}
        </div>
        <div className={`card-status-badge badge-${status}`}>
          {getStatusLabel()}
        </div>
      </div>

      {/* Subject Name and Instructor */}
      <div className="card-subject-details">
        <h3 className="subject-name">{name}</h3>
        <p className="subject-instructor">{instructor}</p>
      </div>

      {/* Progress Metric */}
      <div className="card-metric-section">
        <div className="metric-header">
          <span className="metric-ratio">{present} / {total} classes</span>
          <span className="metric-percentage">{percentage}%</span>
        </div>
        
        <AttendanceProgress percentage={percentage} type="bar" strokeWidth={6} status={status} />
        
        <div className="metric-footer">
          <span>Target: {target}%</span>
          <span className={`diff-label status-${status}`}>
            {percentage >= target ? `+${percentage - target}%` : `-${target - percentage}%`}
          </span>
        </div>
      </div>

      {/* Card Actions */}
      <div className="card-actions-grid" onClick={(e) => e.stopPropagation()}>
        <button 
          className="card-action-btn btn-present" 
          onClick={() => onMarkAttendance(id, "present")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Present
        </button>
        <button 
          className="card-action-btn btn-absent" 
          onClick={() => onMarkAttendance(id, "absent")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Absent
        </button>
      </div>
    </div>
  );
}

export default AttendanceCard;
