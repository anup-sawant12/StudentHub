import "./ActivityTimeline.css";

export default function ActivityTimeline({ activities }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="timeline-empty">
        <p>No recent activity recorded.</p>
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "profile":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "post":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        );
      case "system":
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      default:
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  return (
    <div className="activity-timeline-comp">
      <h3 className="timeline-title">Recent Activity Log</h3>
      <div className="timeline-container">
        {activities.map((act, index) => (
          <div key={act.id} className="timeline-item">
            {/* The vertical connector line is drawn with css on timeline-item */}
            <div className={`timeline-indicator ${act.type || "general"}`}>
              {getActivityIcon(act.type)}
            </div>
            <div className="timeline-content">
              <p className="timeline-text">{act.text}</p>
              <span className="timeline-time">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
