import { profileService } from "./profileService";

const STORAGE_KEY = "studenthub_placement_experiences";

const DEFAULT_EXPERIENCES = [
  {
    id: "exp-1",
    companyName: "Google",
    role: "Software Development Intern",
    year: "2024",
    type: "Internship",
    authorName: "Sneha Patel",
    overallDifficulty: "Medium",
    selectionStatus: "Selected",
    rounds: "Round 1: Online Assessment (2 LeetCode Medium Questions)\nRound 2: Technical Interview 1 (Graphs, DFS/BFS, and Complexity Analysis)\nRound 3: Technical Interview 2 (Dynamic Programming & System Design basics)",
    experienceText: "The interviewers were extremely friendly and guided me through the thought process. For Google, focus heavily on writing clean, optimal code and explaining time/space complexities clearly during the live coding rounds.",
    tips: "Practice LeetCode (mostly Graphs and DP). Study recursion trees and master the big-O analysis. Speak your thoughts out loud during the interviews!",
    createdAt: "2h ago",
    likes: 12,
    likedByUser: false
  },
  {
    id: "exp-2",
    companyName: "Amazon",
    role: "SDE Full-time",
    year: "2024",
    type: "Full-time",
    authorName: "Rahul Sharma",
    overallDifficulty: "Hard",
    selectionStatus: "Selected",
    rounds: "Round 1: Online Assessment (Coding & Work Style Simulation)\nRound 2: Technical Interview (Trees, HashMaps, and AWS basics)\nRound 3: Bar Raiser Interview (Amazon Leadership Principles & System Design)",
    experienceText: "Amazon places a massive emphasis on Leadership Principles. Almost 50% of the interview score depends on how well you exhibit customer obsession, ownership, and deep diving. The coding questions were standard LeetCode Medium/Hard.",
    tips: "Learn AWS services at a high level. Prepare stories for behavioral questions mapping to Amazon's Leadership Principles. Don't skip the mock interviews!",
    createdAt: "Yesterday",
    likes: 24,
    likedByUser: false
  },
  {
    id: "exp-3",
    companyName: "Microsoft",
    role: "Software Engineer",
    year: "2024",
    type: "Full-time",
    authorName: "Aman Gupta",
    overallDifficulty: "Hard",
    selectionStatus: "Selected",
    rounds: "Round 1: Online Coding (3 Tasks)\nRound 2: Technical Screen (Linked List, Bit Manipulation)\nRound 3: System Design & Architectural Coding (OOP design)",
    experienceText: "The system design round was challenging. I was asked to design a rate limiter. Make sure to discuss scale, databases, and trade-offs clearly. The algorithms portion focused on arrays, string formatting, and trees.",
    tips: "Read 'Designing Data-Intensive Applications'. Be strong in Object-Oriented Design patterns (SOLID principles). Practice writing clean class designs.",
    createdAt: "3 days ago",
    likes: 8,
    likedByUser: false
  }
];

const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPERIENCES));
  }
};

export const placementService = {
  getExperiences: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      console.error("Error reading placement experiences", e);
      return DEFAULT_EXPERIENCES;
    }
  },

  getExperienceById: (id) => {
    initStorage();
    const list = placementService.getExperiences();
    return list.find((item) => item.id === id) || null;
  },

  addExperience: (exp) => {
    initStorage();
    const list = placementService.getExperiences();
    const newExp = {
      ...exp,
      id: `exp-${Date.now()}`,
      createdAt: "Just now",
      likes: 0,
      likedByUser: false,
      authorName: exp.authorName.trim() || "Anonymous"
    };

    list.unshift(newExp);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    profileService.logActivity(`Shared a interview experience at "${newExp.companyName}" for the "${newExp.role}" role.`, "placement");
    return newExp;
  },

  likeExperience: (id) => {
    initStorage();
    const list = placementService.getExperiences();
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      const item = list[index];
      if (item.likedByUser) {
        item.likes = Math.max(0, item.likes - 1);
        item.likedByUser = false;
      } else {
        item.likes += 1;
        item.likedByUser = true;
      }
      list[index] = item;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return item;
    }
    return null;
  }
};

export default placementService;
