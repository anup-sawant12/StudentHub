import { useNavigation } from "../../context/NavigationContext";
import "./MyConfessions.css";

export default function MyConfessions({ confessions }) {
  const { navigateToDetails } = useNavigation();

  if (confessions.length === 0) {
    return (
      <div className="my-posts-empty">
        <p>You haven't posted any confessions yet.</p>
      </div>
    );
  }

  return (
    <div className="my-confessions-list">
      {confessions.map((c) => (
        <div key={c.id} className="my-conf-item" onClick={() => navigateToDetails(c.id)}>
          <div className="my-conf-header">
            <span className="my-conf-category">{c.category}</span>
            <span className="my-conf-time">{c.time}</span>
          </div>
          <p className="my-conf-text">"{c.text}"</p>
          <div className="my-conf-stats">
            <span className="my-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#f472b6" stroke="#f472b6" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {c.likes} likes
            </span>
            <span className="my-stat">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {c.comments ? c.comments.length : 0} comments
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
