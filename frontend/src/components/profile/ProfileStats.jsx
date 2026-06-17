import "./ProfileStats.css";

export default function ProfileStats({ stats }) {
  const totalPosts =
    (stats.lostFoundCount || 0) + (stats.confessionsCount || 0) + (stats.roommatesCount || 0);

  return (
    <div className="profile-stats-grid">
      {/* Stat 1: Total contributions */}
      <div className="profile-stat-widget total">
        <span className="stat-widget-label">Contributions</span>
        <h3 className="stat-widget-number">{totalPosts}</h3>
        <span className="stat-widget-sub">All activities</span>
      </div>

      {/* Stat 2: Lost & Found */}
      <div className="profile-stat-widget">
        <span className="stat-widget-label">Lost & Found</span>
        <h3 className="stat-widget-number">{stats.lostFoundCount || 0}</h3>
        <span className="stat-widget-sub">Items reported</span>
      </div>

      {/* Stat 3: Confessions */}
      <div className="profile-stat-widget">
        <span className="stat-widget-label">Confessions</span>
        <h3 className="stat-widget-number">{stats.confessionsCount || 0}</h3>
        <span className="stat-widget-sub">Posted anonymously</span>
      </div>

      {/* Stat 4: Roommate postings */}
      <div className="profile-stat-widget">
        <span className="stat-widget-label">Roommate Ads</span>
        <h3 className="stat-widget-number">{stats.roommatesCount || 0}</h3>
        <span className="stat-widget-sub">Active searches</span>
      </div>
    </div>
  );
}
