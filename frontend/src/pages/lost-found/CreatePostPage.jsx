import { useNavigation } from "../../context/NavigationContext";
import PostForm from "../../components/lost-found/PostForm";
import "./CreatePostPage.css";

export default function CreatePostPage() {
  const { navigateToList } = useNavigation();

  return (
    <div className="create-post-page">
      {/* Back Navigation Header */}
      <div className="create-post-header">
        <button onClick={navigateToList} className="btn-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="back-arrow-icon">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Listings
        </button>
      </div>

      <div className="create-post-content">
        <PostForm />
      </div>
    </div>
  );
}
