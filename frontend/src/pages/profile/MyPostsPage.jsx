import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/profile/ProfileHeader";
import MyConfessions from "../../components/profile/MyConfessions";
import MyLostFoundPosts from "../../components/profile/MyLostFoundPosts";
import MyRoommatePosts from "../../components/profile/MyRoommatePosts";
import "./MyPostsPage.css";

export default function MyPostsPage() {
  const { getMyPosts, loading } = useProfile();
  const [activeSegment, setActiveSegment] = useState("confessions");

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading Your Contributions...</p>
      </div>
    );
  }

  const posts = getMyPosts();

  const renderSegmentContent = () => {
    switch (activeSegment) {
      case "confessions":
        return <MyConfessions confessions={posts.confessions || []} />;
      case "lostfound":
        return <MyLostFoundPosts posts={posts.lostFound || []} />;
      case "roommate":
        return <MyRoommatePosts posts={posts.roommate || []} />;
      default:
        return null;
    }
  };

  const getSegmentCount = (segment) => {
    switch (segment) {
      case "confessions":
        return posts.confessions ? posts.confessions.length : 0;
      case "lostfound":
        return posts.lostFound ? posts.lostFound.length : 0;
      case "roommate":
        return posts.roommate ? posts.roommate.length : 0;
      default:
        return 0;
    }
  };

  return (
    <div className="my-posts-page-container">
      <ProfileHeader activeSubtab="posts" />

      <div className="my-posts-card">
        {/* Segment Tabs */}
        <div className="posts-tabs-segment">
          <button
            onClick={() => setActiveSegment("confessions")}
            className={`segment-btn ${activeSegment === "confessions" ? "active" : ""}`}
          >
            Confessions
            <span className="segment-badge">{getSegmentCount("confessions")}</span>
          </button>
          <button
            onClick={() => setActiveSegment("lostfound")}
            className={`segment-btn ${activeSegment === "lostfound" ? "active" : ""}`}
          >
            Lost & Found
            <span className="segment-badge">{getSegmentCount("lostfound")}</span>
          </button>
          <button
            onClick={() => setActiveSegment("roommate")}
            className={`segment-btn ${activeSegment === "roommate" ? "active" : ""}`}
          >
            Roommate Finder
            <span className="segment-badge">{getSegmentCount("roommate")}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="posts-segment-content">
          {renderSegmentContent()}
        </div>
      </div>
    </div>
  );
}
