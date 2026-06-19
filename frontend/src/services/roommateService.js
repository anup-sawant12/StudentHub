import { profileService } from "./profileService";
import { DEFAULT_ROOMMATE_POSTS, DEFAULT_ROOMMATE_REQUESTS } from "../data/roommateDummyData";
import { formatRent } from "../utils/roommateUtils";

const POSTS_KEY = "studenthub_roommate_posts";
const REQUESTS_KEY = "studenthub_roommate_requests";

const initStorage = () => {
  if (!localStorage.getItem(POSTS_KEY)) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(DEFAULT_ROOMMATE_POSTS));
  }
  if (!localStorage.getItem(REQUESTS_KEY)) {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(DEFAULT_ROOMMATE_REQUESTS));
  }
};

export const roommateService = {
  getPosts: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(POSTS_KEY));
    } catch (e) {
      console.error("Error reading roommate posts", e);
      return DEFAULT_ROOMMATE_POSTS;
    }
  },

  getPostById: (id) => {
    initStorage();
    const posts = roommateService.getPosts();
    return posts.find(post => post.id === id) || null;
  },

  createPost: (postData) => {
    initStorage();
    const profile = profileService.getProfile();
    const posts = roommateService.getPosts();

    const newPost = {
      id: `rm-${Date.now()}`,
      userId: "user-current", // Identifies current user
      name: profile.name || "Anup Sawant",
      avatar: profile.avatar || "https://img.magnific.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80",
      year: profile.year || "Sophomore (Class of 2028)",
      degree: profile.degree || "B.Tech CSE",
      title: postData.title,
      location: postData.location,
      rent: formatRent(postData.rent),
      description: postData.description,
      tags: postData.tags || [],
      gender: postData.gender || "Any",
      status: "Open",
      email: profile.email || "anup.sawant@studenthub.edu",
      phone: profile.phone || "+1 (555) 019-2834",
      time: "Just now"
    };

    posts.unshift(newPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

    // Log activity to user profile
    profileService.logActivity(`Published roommate requirement: "${newPost.title}".`, "roommate");

    return newPost;
  },

  deletePost: (id) => {
    initStorage();
    try {
      const posts = roommateService.getPosts();
      const postToDelete = posts.find(post => post.id === id);
      const filtered = posts.filter(post => post.id !== id);
      localStorage.setItem(POSTS_KEY, JSON.stringify(filtered));

      if (postToDelete) {
        profileService.logActivity(`Deleted roommate requirement: "${postToDelete.title}".`, "roommate");
        
        // Also remove any requests related to this post to keep clean data
        const requests = roommateService.getRequests();
        const cleanRequests = requests.filter(req => req.postId !== id);
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(cleanRequests));
      }
      return true;
    } catch (e) {
      console.error("Error deleting roommate post", e);
      return false;
    }
  },

  getRequests: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(REQUESTS_KEY));
    } catch (e) {
      console.error("Error reading roommate requests", e);
      return DEFAULT_ROOMMATE_REQUESTS;
    }
  },

  sendConnectionRequest: (postId, message) => {
    initStorage();
    const profile = profileService.getProfile();
    const post = roommateService.getPostById(postId);
    if (!post) return null;

    const requests = roommateService.getRequests();
    
    // Check if request already exists
    const exists = requests.find(req => req.postId === postId && req.senderEmail === profile.email);
    if (exists) return exists;

    const newRequest = {
      id: `req-${Date.now()}`,
      postId: post.id,
      postTitle: post.title,
      senderName: profile.name || "Anup Sawant",
      senderAvatar: profile.avatar || "",
      senderEmail: profile.email || "anup.sawant@studenthub.edu",
      senderPhone: profile.phone || "+1 (555) 019-2834",
      receiverName: post.name,
      receiverEmail: post.email,
      status: "Pending",
      message: message || `Hey ${post.name}, I'm interested in your roommate listing. Let's connect!`,
      time: "Just now"
    };

    requests.unshift(newRequest);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));

    profileService.logActivity(`Sent connection request to ${post.name} for "${post.title}".`, "roommate");

    return newRequest;
  },

  updateRequestStatus: (requestId, status) => {
    initStorage();
    try {
      const requests = roommateService.getRequests();
      const updated = requests.map(req => {
        if (req.id === requestId) {
          const profile = profileService.getProfile();
          const isReceiver = req.receiverEmail === profile.email;
          
          if (isReceiver) {
            // Log activity about response
            profileService.logActivity(`${status === "Accepted" ? "Accepted" : "Declined"} connection request from ${req.senderName}.`, "roommate");
          }
          return { ...req, status };
        }
        return req;
      });

      localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.error("Error updating request status", e);
      return false;
    }
  }
};
