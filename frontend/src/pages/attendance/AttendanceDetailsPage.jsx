import React, { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { useAttendance } from "../../hooks/useAttendance";
import { calculateStats } from "../../utils/attendanceUtils";
import SubjectAttendance from "../../components/attendance/SubjectAttendance";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceForm from "../../components/attendance/AttendanceForm";
import "./AttendanceDetailsPage.css";

export function AttendanceDetailsPage() {
  const { selectedItemId, navigateToList } = useNavigation();
  const {
    subjects,
    logs,
    updateSubject,
    deleteSubject,
    addLog,
    updateLog,
    deleteLog
  } = useAttendance();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("subject"); // "subject" or "log"
  const [editingData, setEditingData] = useState(null);

  // Find active subject details
  const subject = subjects.find((s) => s.id === selectedItemId);
  if (!subject) {
    return (
      <div className="table-empty-state glass-card" style={{ padding: "64px 32px" }}>
        <h2 style={{ fontSize: "20px", color: "#ffffff", marginBottom: "8px" }}>Subject Not Found</h2>
        <p style={{ color: "var(--muted)", marginBottom: "16px" }}>The subject you are trying to view does not exist or has been deleted.</p>
        <button onClick={navigateToList} className="btn-primary-add" style={{ padding: "8px 16px" }}>
          Back to List
        </button>
      </div>
    );
  }

  // Filter logs for this subject
  const subjectLogs = logs.filter((l) => l.subjectId === subject.id);
  const stats = calculateStats(subjectLogs);

  const handleEditSubject = () => {
    setFormMode("subject");
    setEditingData(subject);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = () => {
    if (window.confirm(`Are you sure you want to delete ${subject.name} and all its logs? This cannot be undone.`)) {
      deleteSubject(subject.id);
      navigateToList();
    }
  };

  const handleLogClassClick = () => {
    setFormMode("log");
    setEditingData({
      subjectId: subject.id,
      date: new Date().toISOString().split("T")[0],
      status: "present",
      notes: ""
    });
    setIsFormOpen(true);
  };

  const handleEditLog = (log) => {
    setFormMode("log");
    setEditingData(log);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === "subject") {
      updateSubject(formData);
    } else {
      if (editingData && editingData.id) {
        updateLog(formData);
      } else {
        addLog(formData);
      }
    }
    setIsFormOpen(false);
  };

  return (
    <div className="attendance-page">
      {/* 1. Header with back navigation and options */}
      <div className="attendance-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={navigateToList} className="btn-back-nav" title="Back to Tracker">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div className="header-text-container">
            <div className="detail-page-header">
              <h1 className="page-title">{subject.name}</h1>
              <span className={`stats-status-badge badge-${stats.percentage >= subject.target ? "safe" : "danger"}`} style={{ marginLeft: "4px" }}>
                {stats.percentage}%
              </span>
            </div>
            <div className="subject-details-meta-bar">
              <span className="subject-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Code: {subject.code}
              </span>
              {subject.room && (
                <span className="subject-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Room: {subject.room}
                </span>
              )}
              <span className="subject-meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Instructor: {subject.instructor}
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <button onClick={handleEditSubject} className="btn-secondary-log">
            Edit Subject
          </button>
          <button onClick={handleDeleteSubject} className="btn-secondary-log" style={{ borderColor: "rgba(239, 68, 68, 0.2)", color: "var(--progress-danger)" }}>
            Delete Subject
          </button>
        </div>
      </div>

      {/* 2. Stat Analysis Breakdown */}
      <SubjectAttendance subject={subject} stats={stats} />

      {/* 3. Subject History Log Table */}
      <div className="recent-logs-section">
        <h2 className="subjects-grid-title">Class Log History</h2>
        <AttendanceTable
          logs={subjectLogs}
          subjects={subjects}
          onEditLog={handleEditLog}
          onDeleteLog={deleteLog}
        />
      </div>

      {/* 4. Modal Form popup */}
      <AttendanceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        mode={formMode}
        subjects={subjects}
        initialData={editingData}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default AttendanceDetailsPage;
