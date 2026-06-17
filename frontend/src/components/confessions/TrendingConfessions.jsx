import { useNavigation } from "../../context/NavigationContext";
import { confessionService } from "../../services/confessionService";
import { useEffect, useState } from "react";
import "./TrendingConfessions.css";

export default function TrendingConfessions() {
  const { setActiveTab, navigateToDetails } = useNavigation();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // Fetch and sort by likes descending, pick top 2
    const items = confessionService.getConfessions();
    const sorted = [...items].sort((a, b) => b.likes - a.likes).slice(0, 2);
    setTrending(sorted);
  }, []);

  return (
    <div className="section-card trending-confessions-card">
      <div className="section-header">
        <h2 className="section-title">Trending Confessions</h2>
        <button
          onClick={() => setActiveTab("Anonymous Confessions")}
          className="section-link"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          View All
        </button>
      </div>

      <div className="list-container">
        {trending.map((item) => (
          <div
            key={item.id}
            className="list-item confession-trend-item"
            onClick={() => {
              setActiveTab("Anonymous Confessions");
              navigateToDetails(item.id);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="trend-details">
              <p className="trend-text">"{item.text}"</p>
              <div className="trend-meta">
                <span className="trend-category">{item.category}</span>
                <span className="trend-stat">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f472b6" stroke="#f472b6" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {item.likes}
                </span>
                <span className="trend-stat">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {item.comments ? item.comments.length : 0}
                </span>
              </div>
            </div>
          </div>
        ))}
        {trending.length === 0 && (
          <p className="no-trends-prompt">No trending confessions.</p>
        )}
      </div>
    </div>
  );
}
