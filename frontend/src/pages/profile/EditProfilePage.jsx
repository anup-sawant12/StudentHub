import { useProfile } from "../../hooks/useProfile";
import ProfileHeader from "../../components/profile/ProfileHeader";
import EditProfileForm from "../../components/profile/EditProfileForm";
import "./EditProfilePage.css";

export default function EditProfilePage() {
  const { profile, updateProfile, loading } = useProfile();

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading Profile Form...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile-page-container">
      <ProfileHeader activeSubtab="overview" />
      
      <div className="edit-profile-content-card">
        <EditProfileForm profile={profile} onUpdate={updateProfile} />
      </div>
    </div>
  );
}
