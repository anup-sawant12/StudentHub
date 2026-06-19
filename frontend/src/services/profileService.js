import { INITIAL_PROFILE } from "../data/profileData";
import { lostFoundService } from "./lostFoundService";
import { confessionService } from "./confessionService";
import { roommateService } from "./roommateService";

const PROFILE_KEY = "studenthub_profile";
const ACTIVITIES_KEY = "studenthub_activities";
const MY_CONFESSIONS_IDS_KEY = "studenthub_my_confession_ids";

const DEFAULT_ACTIVITIES = [
  { id: "act-1", text: "Joined StudentHub portal.", time: "5 days ago", type: "system" },
  { id: "act-2", text: "Verified institutional email address.", time: "4 days ago", type: "system" },
  { id: "act-3", text: "Updated skills tags in profile.", time: "3 days ago", type: "profile" }
];

const initStorage = () => {
  if (!localStorage.getItem(PROFILE_KEY)) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(INITIAL_PROFILE));
  }
  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(DEFAULT_ACTIVITIES));
  }
  if (!localStorage.getItem(MY_CONFESSIONS_IDS_KEY)) {
    localStorage.setItem(MY_CONFESSIONS_IDS_KEY, JSON.stringify(["c-1"])); // default first confession is theirs
  }
};

export const profileService = {
  getProfile: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch (e) {
      console.error("Error reading profile", e);
      return INITIAL_PROFILE;
    }
  },

  updateProfile: (updatedProfile) => {
    initStorage();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    profileService.logActivity("Updated profile details.", "profile");
    return updatedProfile;
  },

  // Track confessions created by this user browser
  trackMyConfession: (confessionId) => {
    initStorage();
    try {
      const ids = JSON.parse(localStorage.getItem(MY_CONFESSIONS_IDS_KEY)) || [];
      if (!ids.includes(confessionId)) {
        ids.unshift(confessionId);
        localStorage.setItem(MY_CONFESSIONS_IDS_KEY, JSON.stringify(ids));
      }
    } catch (e) {
      console.error("Error tracking confession ID", e);
    }
  },

  getMyConfessions: () => {
    initStorage();
    try {
      const myIds = JSON.parse(localStorage.getItem(MY_CONFESSIONS_IDS_KEY)) || [];
      const allConfessions = confessionService.getConfessions();
      return allConfessions.filter((c) => myIds.includes(c.id));
    } catch (e) {
      console.error("Error reading my confessions", e);
      return [];
    }
  },

  getMyLostFoundPosts: () => {
    const profile = profileService.getProfile();
    const allLF = lostFoundService.getItems();
    // Filter where the email matches the profile email
    return allLF.filter(
      (item) =>
        item.contactEmail &&
        item.contactEmail.toLowerCase().trim() === profile.email.toLowerCase().trim()
    );
  },

  getMyRoommatePosts: () => {
    const profile = profileService.getProfile();
    const allRoommates = roommateService.getPosts();
    return allRoommates.filter(
      (post) =>
        post.email &&
        post.email.toLowerCase().trim() === profile.email.toLowerCase().trim()
    );
  },

  getActivityTimeline: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(ACTIVITIES_KEY));
    } catch (e) {
      console.error("Error reading activity timeline", e);
      return DEFAULT_ACTIVITIES;
    }
  },

  logActivity: (text, type = "general") => {
    initStorage();
    try {
      const list = JSON.parse(localStorage.getItem(ACTIVITIES_KEY)) || [];
      const newLog = {
        id: `act-${Date.now()}`,
        text,
        time: "Just now",
        type
      };
      list.unshift(newLog);
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(list));
      return newLog;
    } catch (e) {
      console.error("Error logging activity", e);
      return null;
    }
  }
};
export default profileService;
