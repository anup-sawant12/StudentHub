import React from "react";
import { useNavigation } from "../../context/NavigationContext";
import { placementService } from "../../services/placementService";
import ExperienceForm from "../../components/placement/ExperienceForm";
import "./AddExperiencePage.css";

export function AddExperiencePage() {
  const { navigateToList } = useNavigation();

  const handleFormSubmit = (formData) => {
    placementService.addExperience(formData);
    navigateToList();
  };

  return (
    <div className="placement-feed-page">
      {/* Header Area */}
      <div className="placement-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={navigateToList} className="btn-back-nav" title="Back to Feed">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <div className="placement-title-container">
            <h1 className="page-title">Share Experience</h1>
            <p className="page-subtitle">Add your interview processes and preparation guidelines.</p>
          </div>
        </div>
      </div>

      {/* Sharing Form Component */}
      <ExperienceForm onSubmit={handleFormSubmit} onCancel={navigateToList} />
    </div>
  );
}

export default AddExperiencePage;
