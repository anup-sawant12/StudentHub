const USERS_KEY = "studenthub_registered_users";
const SESSION_KEY = "studenthub_current_user";

const DEFAULT_USERS = [
  {
    name: "Anup Sawant",
    email: "anup.sawant@vit.edu.in",
    password: "password123",
    avatar: "https://img.magnific.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80",
    rollNumber: "CS2028-042",
    degree: "Bachelor of Technology",
    department: "Computer Science & Engineering",
    year: "Sophomore (Class of 2028)",
    phone: "+1 (555) 019-2834",
    bio: "Full-stack web enthusiast, CS section rep.",
    skills: ["React", "JavaScript", "CSS Grid", "Node.js", "SQL", "Git"],
    verified: true
  }
];

const initStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

export const authService = {
  getUsers: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || DEFAULT_USERS;
    } catch (e) {
      console.error("Error reading users", e);
      return DEFAULT_USERS;
    }
  },

  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch (e) {
      console.error("Error reading session", e);
      return null;
    }
  },

  login: (email, password) => {
    initStorage();
    const users = authService.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error("Invalid institutional email or password.");
    }

    if (!user.verified) {
      throw new Error("Email address has not been verified yet.");
    }

    // Save session
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  register: (name, email, password) => {
    initStorage();
    const users = authService.getUsers();
    
    // Check if email already registered
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error("This email is already associated with another student account.");
    }

    // Basic email check
    if (!email.includes("@") || !email.endsWith("vit.edu.in")) {
      throw new Error("Please use your institutional @vit.edu.in email address.");
    }

    const newUser = {
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      rollNumber: `CS2028-0${Math.floor(Math.random() * 90 + 10)}`,
      degree: "Bachelor of Technology",
      department: "Computer Science & Engineering",
      year: "Sophomore (Class of 2028)",
      phone: "",
      bio: "Joined StudentHub portal.",
      skills: ["JavaScript", "HTML", "CSS"],
      verified: true // Auto-verified
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return newUser;
  },

  verifyEmail: (email, code) => {
    initStorage();
    // In mock authentication, any 6-digit code or '123456' works!
    if (!code || code.length !== 6) {
      throw new Error("Verification code must be exactly 6 digits.");
    }

    const users = authService.getUsers();
    const userIdx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

    if (userIdx === -1) {
      throw new Error("Student account not found.");
    }

    users[userIdx].verified = true;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return true;
  },

  forgotPassword: (email) => {
    initStorage();
    const users = authService.getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!exists) {
      throw new Error("We couldn't find a student account with that email.");
    }
    
    // Mock successful reset trigger
    return true;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateSessionProfile: (profileData) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;

    const updatedUser = {
      ...currentUser,
      ...profileData
    };

    // Update in session
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    // Update in users database
    const users = authService.getUsers();
    const updatedUsers = users.map((u) => 
      u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    // Also sync the global studenthub_profile key if used by profileService
    localStorage.setItem("studenthub_profile", JSON.stringify(updatedUser));

    return updatedUser;
  }
};

export default authService;
