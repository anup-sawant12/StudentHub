import React from "react";
import "./RoommateInterests.css";

export const AVAILABLE_TAGS = [
  "Gaming",
  "Quiet",
  "Coding",
  "Late Night",
  "Early Bird",
  "Vegetarian",
  "Gym",
  "Non-Smoker",
  "Reading",
  "Music",
  "Pet Friendly"
];

// Helper to get consistent background/border colors for tags
export function getTagStyle(tag) {
  const normalized = tag.toLowerCase();
  if (normalized.includes("gaming")) return "tag-gaming";
  if (normalized.includes("quiet")) return "tag-quiet";
  if (normalized.includes("coding")) return "tag-coding";
  if (normalized.includes("late")) return "tag-latenight";
  if (normalized.includes("early") || normalized.includes("bird")) return "tag-earlybird";
  if (normalized.includes("veg")) return "tag-vegetarian";
  if (normalized.includes("gym") || normalized.includes("sport")) return "tag-gym";
  if (normalized.includes("smoke") || normalized.includes("smoker")) return "tag-nonsmoker";
  if (normalized.includes("read")) return "tag-reading";
  if (normalized.includes("music")) return "tag-music";
  return "tag-default";
}

export function RoommateInterests({
  selectedTags = [],
  onChange,
  selectable = false,
  limit
}) {
  const handleTagClick = (tag) => {
    if (!selectable || !onChange) return;
    
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const tagsToRender = selectable ? AVAILABLE_TAGS : selectedTags;
  const displayedTags = limit ? tagsToRender.slice(0, limit) : tagsToRender;

  if (!selectable && displayedTags.length === 0) {
    return <span className="no-interests">No interests specified</span>;
  }

  return (
    <div className={`interests-container ${selectable ? "selectable" : ""}`}>
      {displayedTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        const tagClass = getTagStyle(tag);
        
        return (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`interest-badge ${tagClass} ${selectable ? "selectable-badge" : ""} ${isSelected ? "selected" : ""}`}
            style={{ cursor: selectable ? "pointer" : "default" }}
          >
            {selectable && (
              <span className="select-indicator">{isSelected ? "✓ " : "+ "}</span>
            )}
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default RoommateInterests;
