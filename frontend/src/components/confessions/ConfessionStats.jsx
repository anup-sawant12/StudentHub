import { CONFESSION_CATEGORIES } from "../../data/confessionCategories";
import "./ConfessionStats.css";

export default function ConfessionStats({ confessions }) {
  const totalConfessions = confessions.length;
  const totalLikes = confessions.reduce((acc, c) => acc + (c.likes || 0), 0);

  // Group by category to find popular tags
  const categoryCounts = confessions.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="section-card conf-stats-card">
      <h2 className="section-title">Confessions Hub</h2>
      <p className="stats-tagline">Campus stats anonymously updated.</p>

      {/* Numerical Stats Grid */}
      <div className="stats-kpis">
        <div className="stat-kpi">
          <span className="kpi-value">{totalConfessions}</span>
          <span className="kpi-label">Total Posts</span>
        </div>
        <div className="stat-kpi">
          <span className="kpi-value">{totalLikes}</span>
          <span className="kpi-label">Hearts Received</span>
        </div>
      </div>

      {/* Active categories count list */}
      <div className="stats-popular-categories">
        <h4 className="stats-subtitle">Active Spaces</h4>
        <div className="stats-categories-list">
          {sortedCategories.slice(0, 4).map(([cat, count]) => {
            const config = CONFESSION_CATEGORIES[cat] || { color: "#ffffff" };
            return (
              <div key={cat} className="stat-category-row">
                <span className="stat-category-dot" style={{ backgroundColor: config.color }}></span>
                <span className="stat-category-name">{cat}</span>
                <span className="stat-category-count">{count} posts</span>
              </div>
            );
          })}
          {sortedCategories.length === 0 && (
            <p className="no-active-spaces">No active spaces yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
