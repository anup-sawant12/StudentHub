import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileStats from "../../components/profile/ProfileStats";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { profile, loading, getMyPosts } = useProfile();

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading Profile...</p>
      </div>
    );
  }

  const posts = getMyPosts();
  const stats = {
    lostFoundCount: posts.lostFound ? posts.lostFound.length : 0,
    confessionsCount: posts.confessions ? posts.confessions.length : 0,
    roommatesCount: posts.roommate ? posts.roommate.length : 0,
  };

  return (
    <div className="profile-page-container">
      <ProfileHeader activeSubtab="overview" />
      
      <div className="profile-grid">
        {/* Left Column - User Identity */}
        <div className="profile-grid-column left">
          <ProfileCard profile={profile} />
        </div>

        {/* Right Column - Stats & Institutional Info */}
        <div className="profile-grid-column right">
          <ProfileStats stats={stats} />
          <ProfileInfo profile={profile} />
        </div>
      </div>
    </div>
  );
}

