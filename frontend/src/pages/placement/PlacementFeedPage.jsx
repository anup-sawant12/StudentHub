import React, { useState, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { placementService } from "../../services/placementService";
import ExperienceFeed from "../../components/placement/ExperienceFeed";
import "./PlacementFeedPage.css";

export function PlacementFeedPage() {
  const { navigateToCreate } = useNavigation();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const data = placementService.getExperiences();
    setExperiences(data);
  }, []);

  const handleLike = (id) => {
    const updated = placementService.likeExperience(id);
    if (updated) {
      // Refresh state
      setExperiences((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this experience post?")) {
      const success = placementService.deleteExperience(id);
      if (success) {
        setExperiences((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete experience post.");
      }
    }
  };

  return (
    <div className="placement-feed-page">
      {/* Header Panel */}
      <div className="placement-header">
        <div className="placement-title-container">
          <h1 className="page-title">Placement Portal</h1>
          <p className="page-subtitle">
            Browse SDE, analyst, and consulting interview logs shared by peers.
          </p>
        </div>
        <button onClick={navigateToCreate} className="btn-share-exp">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Share Experience
        </button>
      </div>

      {/* Main List Feed */}
      <ExperienceFeed experiences={experiences} onLike={handleLike} onDelete={handleDelete} />
    </div>
  );
}

export default PlacementFeedPage;
