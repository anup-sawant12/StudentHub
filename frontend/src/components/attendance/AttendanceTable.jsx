import React, { useState } from "react";
import { formatDate } from "../../utils/attendanceUtils";
import "./AttendanceTable.css";

export function AttendanceTable({ logs, subjects, onEditLog, onDeleteLog }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getSubjectInfo = (subjectId) => {
    const sub = subjects.find((s) => s.id === subjectId);
    return sub ? { name: sub.name, code: sub.code || "" } : { name: "Deleted Subject", code: "" };
  };

  // Filter logs based on inputs
  const filteredLogs = logs.filter((log) => {
    const subInfo = getSubjectInfo(log.subjectId);
    
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      subInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subInfo.code && subInfo.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.notes && log.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    // Subject filter
    const matchesSubject = selectedSubjectId === "all" || log.subjectId === selectedSubjectId;

    // Status filter
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="attendance-table-container">
      {/* Search and Filters Bar */}
      <div className="table-filters-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search logs by subject, code, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-search-input"
          />
        </div>

        <div className="dropdowns-group">
          {/* Subject Selector */}
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code || sub.name}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-responsive-wrapper">
        {filteredLogs.length === 0 ? (
          <div className="table-empty-state">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="13" y2="17" />
            </svg>
            <p>No class logs match your filters.</p>
          </div>
        ) : (
          <table className="logs-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Notes / Remarks</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const subInfo = getSubjectInfo(log.subjectId);
                return (
                  <tr key={log.id} className="log-row">
                    <td className="log-date">{formatDate(log.date)}</td>
                    <td className="log-subject">
                      <div className="subject-info-cell">
                        {subInfo.code && <span className="cell-subject-code">{subInfo.code}</span>}
                        <span className="cell-subject-name">{subInfo.name}</span>
                      </div>
                    </td>
                    <td className="log-status">
                      <span className={`status-pill pill-${log.status}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="log-notes">
                      {log.notes ? (
                        <span className="notes-text">{log.notes}</span>
                      ) : (
                        <span className="notes-empty">—</span>
                      )}
                    </td>
                    <td className="log-actions" style={{ textAlign: "right" }}>
                      <div className="action-buttons-wrapper">
                        <button
                          onClick={() => onEditLog(log)}
                          className="table-action-btn edit-btn"
                          title="Edit log entry"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteLog(log.id)}
                          className="table-action-btn delete-btn"
                          title="Delete log entry"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AttendanceTable;
