import React, { useState, useEffect } from "react";
import "./AttendanceForm.css";

export function AttendanceForm({ isOpen, onClose, mode, subjects, initialData, onSubmit }) {
  // 1. Subject Form Fields
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [room, setRoom] = useState("");
  const [target, setTarget] = useState(75);

  // 2. Log Form Fields
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("present");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");

  // Sync state with initialData if editing
  useEffect(() => {
    if (isOpen) {
      setError("");
      if (mode === "subject") {
        if (initialData) {
          setName(initialData.name || "");
          setInstructor(initialData.instructor || "");
          setRoom(initialData.room || "");
          setTarget(initialData.target || 75);
        } else {
          setName("");
          setInstructor("");
          setRoom("");
          setTarget(75);
        }
      } else if (mode === "log") {
        if (initialData) {
          setSubjectId(initialData.subjectId || "");
          setDate(initialData.date || new Date().toISOString().split("T")[0]);
          setStatus(initialData.status || "present");
          setNotes(initialData.notes || "");
        } else {
          setSubjectId(subjects.length > 0 ? subjects[0].id : "");
          setDate(new Date().toISOString().split("T")[0]);
          setStatus("present");
          setNotes("");
        }
      }
    }
  }, [isOpen, mode, initialData, subjects]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "subject") {
      if (!name.trim() || !instructor.trim()) {
        setError("Please fill in all required fields (Name, Instructor).");
        return;
      }
      if (Number(target) < 1 || Number(target) > 100) {
        setError("Target attendance must be between 1% and 100%.");
        return;
      }

      onSubmit({
        ...(initialData || {}),
        name: name.trim(),
        instructor: instructor.trim(),
        room: room.trim(),
        target: Number(target)
      });
    } else {
      if (!subjectId) {
        setError("Please select a subject.");
        return;
      }
      if (!date) {
        setError("Please choose a date.");
        return;
      }

      onSubmit({
        ...(initialData || {}),
        subjectId,
        date,
        status,
        notes: notes.trim()
      });
    }

    onClose();
  };

  return (
    <div className="attendance-modal-overlay" onClick={onClose}>
      <div className="attendance-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">
            {initialData ? "Edit" : "Add"}{" "}
            {mode === "subject" ? "Subject Details" : "Class Attendance"}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          {error && <div className="form-error-alert">{error}</div>}

          {mode === "subject" ? (
            /* --- Mode A: Subject Creation/Editing --- */
            <>
              <div className="form-field-group">
                <label className="form-field-label">Subject Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Database Management Systems"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-text-input"
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Room / Location</label>
                <input
                  type="text"
                  placeholder="e.g. LH-102"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="form-text-input"
                />
              </div>

              <div className="form-fields-row">
                <div className="form-field-group flex-2">
                  <label className="form-field-label">Instructor Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. R. K. Sen"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="form-text-input"
                    required
                  />
                </div>
                <div className="form-field-group flex-1">
                  <label className="form-field-label">Target % *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="form-text-input"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            /* --- Mode B: Class Attendance Logging --- */
            <>
              <div className="form-field-group">
                <label className="form-field-label">Select Subject *</label>
                {subjects.length === 0 ? (
                  <div style={{ color: "var(--progress-danger, #ef4444)", fontSize: "12px", marginTop: "4px" }}>
                    No subjects defined. Please create a subject first.
                  </div>
                ) : (
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="form-select-input"
                    required
                    disabled={!!initialData} // Don't allow changing subject if editing a logged class
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.code} - {sub.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Class Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-text-input"
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Attendance Status *</label>
                <div className="status-radio-group">
                  <label className="radio-label-wrapper">
                    <input
                      type="radio"
                      name="log-status"
                      value="present"
                      checked={status === "present"}
                      onChange={() => setStatus("present")}
                      className="radio-hidden-input"
                    />
                    <span className="custom-radio-button indicator-present">Present</span>
                  </label>

                  <label className="radio-label-wrapper">
                    <input
                      type="radio"
                      name="log-status"
                      value="late"
                      checked={status === "late"}
                      onChange={() => setStatus("late")}
                      className="radio-hidden-input"
                    />
                    <span className="custom-radio-button indicator-late">Late</span>
                  </label>

                  <label className="radio-label-wrapper">
                    <input
                      type="radio"
                      name="log-status"
                      value="absent"
                      checked={status === "absent"}
                      onChange={() => setStatus("absent")}
                      className="radio-hidden-input"
                    />
                    <span className="custom-radio-button indicator-absent">Absent</span>
                  </label>
                </div>
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Notes / Remarks</label>
                <textarea
                  placeholder="e.g. Arrived late due to rain, Lab experiment 3 completed..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="form-textarea-input"
                />
              </div>
            </>
          )}

          {/* Modal Footer Actions */}
          <div className="modal-actions-footer">
            <button type="button" onClick={onClose} className="modal-btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn-primary"
              disabled={mode === "log" && subjects.length === 0}
            >
              {initialData ? "Save Changes" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AttendanceForm;
