import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(() => {
    setLoading(true);
    const data = profileService.getProfile();
    const act = profileService.getActivityTimeline();
    setProfile(data);
    setActivities(act);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const updateProfile = useCallback((updatedData) => {
    const res = profileService.updateProfile(updatedData);
    setProfile(res);
    // Refresh activities since updateProfile logs a new activity
    const act = profileService.getActivityTimeline();
    setActivities(act);
    
    // Also dispatch a custom event to notify Navbar and other components of profile updates!
    window.dispatchEvent(new Event("profile-updated"));
    
    return res;
  }, []);

  const getMyPosts = useCallback(() => {
    return {
      confessions: profileService.getMyConfessions(),
      lostFound: profileService.getMyLostFoundPosts(),
      roommate: profileService.getMyRoommatePosts()
    };
  }, []);

  return {
    profile,
    activities,
    loading,
    refreshProfile,
    updateProfile,
    getMyPosts
  };
}
export default useProfile;
