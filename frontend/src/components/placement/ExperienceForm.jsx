import React, { useState } from "react";
import "./ExperienceForm.css";

export function ExperienceForm({ onSubmit, onCancel }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [type, setType] = useState("Internship");
  const [overallDifficulty, setOverallDifficulty] = useState("Medium");
  const [selectionStatus, setSelectionStatus] = useState("Selected");
  const [rounds, setRounds] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [tips, setTips] = useState("");
  const [authorName, setAuthorName] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim() || !role.trim() || !experienceText.trim()) {
      setError("Please fill in all required fields (Company, Role, and Experience details).");
      return;
    }

    onSubmit({
      companyName: companyName.trim(),
      role: role.trim(),
      year: year.trim(),
      type,
      overallDifficulty,
      selectionStatus,
      rounds: rounds.trim(),
      experienceText: experienceText.trim(),
      tips: tips.trim(),
      authorName: authorName.trim() || "Anonymous"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="experience-form-container glass-card">
      <h2 className="form-title-text">Share Interview Experience</h2>
      <p className="form-subtitle-text">
        Provide details about your interview loops, questions asked, and helpful hints for future aspirants.
      </p>

      {error && <div className="form-alert-error">{error}</div>}

      {/* Field 1 & 2: Company & Role */}
      <div className="form-row-two-columns">
        <div className="form-input-group flex-2">
          <label className="input-field-label">Company Name *</label>
          <input
            type="text"
            placeholder="e.g. Google, Amazon, Microsoft"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="form-text-input"
            required
          />
        </div>

        <div className="form-input-group flex-2">
          <label className="input-field-label">Job Role *</label>
          <input
            type="text"
            placeholder="e.g. Software Development Intern, Analyst"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-text-input"
            required
          />
        </div>
      </div>

      {/* Field 3, 4, 5: Year, Type, Difficulty */}
      <div className="form-row-three-columns">
        <div className="form-input-group flex-1">
          <label className="input-field-label">Year of Interview *</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-text-input"
            required
          />
        </div>

        <div className="form-input-group flex-1">
          <label className="input-field-label">Job Type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select-input"
          >
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
          </select>
        </div>

        <div className="form-input-group flex-1">
          <label className="input-field-label">Overall Difficulty *</label>
          <select
            value={overallDifficulty}
            onChange={(e) => setOverallDifficulty(e.target.value)}
            className="form-select-input"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Field 6 & 7: Selection Status & Author Name */}
      <div className="form-row-two-columns">
        <div className="form-input-group flex-1">
          <label className="input-field-label">Selection Status *</label>
          <select
            value={selectionStatus}
            onChange={(e) => setSelectionStatus(e.target.value)}
            className="form-select-input"
          >
            <option value="Selected">Selected</option>
            <option value="Not Selected">Not Selected</option>
            <option value="Awaiting Results">Awaiting Results</option>
          </select>
        </div>

        <div className="form-input-group flex-1">
          <label className="input-field-label">Your Name (Optional)</label>
          <input
            type="text"
            placeholder="Defaults to Anonymous"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="form-text-input"
          />
        </div>
      </div>

      {/* Field 8: Interview Rounds description */}
      <div className="form-input-group">
        <label className="input-field-label">Interview Rounds & Process</label>
        <textarea
          placeholder="e.g. Round 1: Online Assessment (2 coding tasks)&#10;Round 2: Technical Interview (DFS/BFS graph problems)&#10;Round 3: Behavioral/HR interview..."
          value={rounds}
          onChange={(e) => setRounds(e.target.value)}
          rows="4"
          className="form-textarea-input"
        />
      </div>

      {/* Field 9: Experience details */}
      <div className="form-input-group">
        <label className="input-field-label">Interview Experience & Details *</label>
        <textarea
          placeholder="Describe your overall experience. What questions were asked? How was the coding environment? Any specific challenges?"
          value={experienceText}
          onChange={(e) => setExperienceText(e.target.value)}
          rows="5"
          className="form-textarea-input"
          required
        />
      </div>

      {/* Field 10: Preparation tips */}
      <div className="form-input-group">
        <label className="input-field-label">Preparation Tips for Juniors</label>
        <textarea
          placeholder="What resources did you use? (e.g. LeetCode, specific books, AWS guides). What topics should they focus on?"
          value={tips}
          onChange={(e) => setTips(e.target.value)}
          rows="3"
          className="form-textarea-input"
        />
      </div>

      {/* Form Buttons */}
      <div className="form-actions-row">
        <button type="button" onClick={onCancel} className="btn-cancel-form">
          Cancel
        </button>
        <button type="submit" className="btn-submit-form">
          Publish Experience
        </button>
      </div>
    </form>
  );
}

export default ExperienceForm;
