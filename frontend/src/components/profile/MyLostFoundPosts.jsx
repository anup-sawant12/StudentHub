import { useNavigation } from "../../context/NavigationContext";
import "./MyLostFoundPosts.css";

export default function MyLostFoundPosts({ posts }) {
  const { navigateToDetails, setActiveTab } = useNavigation();

  if (posts.length === 0) {
    return (
      <div className="my-posts-empty">
        <p>You haven't reported any lost or found items yet.</p>
      </div>
    );
  }

  return (
    <div className="my-lf-posts-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="my-lf-post-item"
          onClick={() => {
            setActiveTab("Lost & Found");
            navigateToDetails(post.id);
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="my-lf-post-thumb"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=600&auto=format&fit=crop";
            }}
          />
          <div className="my-lf-post-info">
            <div className="my-lf-post-meta">
              <span className={`my-lf-status-badge ${post.status}`}>
                {post.status.toUpperCase()}
              </span>
              <span className="my-lf-post-time">{post.time}</span>
            </div>
            <h4 className="my-lf-post-title">{post.title}</h4>
            <p className="my-lf-post-loc">{post.location}</p>
          </div>
          <svg className="my-lf-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
