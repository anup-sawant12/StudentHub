import { useNavigation } from "../../context/NavigationContext";
import "./MyRoommatePosts.css";

export default function MyRoommatePosts({ posts }) {
  const { setActiveTab } = useNavigation();

  if (!posts || posts.length === 0) {
    return (
      <div className="my-posts-empty">
        <p>You haven't posted any roommate requirements yet.</p>
      </div>
    );
  }

  return (
    <div className="my-roommate-posts-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="my-roommate-post-item"
          onClick={() => {
            setActiveTab("Roommate Finder");
          }}
        >
          <div className="my-roommate-post-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          
          <div className="my-roommate-post-info">
            <div className="my-roommate-post-meta">
              <span className="my-roommate-rent">{post.rent}</span>
              <span className="my-roommate-time">{post.time}</span>
            </div>
            <h4 className="my-roommate-title">{post.title}</h4>
            <p className="my-roommate-loc">{post.location}</p>
          </div>

          <svg className="my-roommate-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      ))}
    </div>
  );
}
