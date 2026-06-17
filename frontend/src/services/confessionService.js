import { profileService } from "./profileService";

const STORAGE_KEY = "studenthub_confessions";

const DEFAULT_CONFESSIONS = [
  {
    id: "c-1",
    text: "Actually thinking of switching majors in my final year. Is it too late? I feel like I'm stuck in a loop...",
    category: "Academics",
    time: "2h ago",
    likes: 134,
    comments: [
      { id: "cm-1", text: "It's never too late, but check with your academic advisor first!", time: "1h ago" },
      { id: "cm-2", text: "I did the same in my 3rd year. Hardest decision, but best decision ever.", time: "45m ago" },
      { id: "cm-3", text: "Hang in there, friend. The grass always looks greener.", time: "30m ago" }
    ]
  },
  {
    id: "c-2",
    text: "To the girl in the red hoodie who sits in the library corner every Tuesday: I've had a crush on you since semester 1. I'm too shy to say hi, so I'll just write this here. If you read this, maybe we can study together?",
    category: "Crush & Romance",
    time: "5h ago",
    likes: 280,
    comments: [
      { id: "cm-4", text: "Omg go talk to her! Girls in red hoodies are usually nice.", time: "4h ago" },
      { id: "cm-5", text: "I know exactly who you mean, she's super sweet! Just say hello.", time: "3h ago" },
      { id: "cm-6", text: "A library romance, how classic! Hope you guys meet.", time: "2h ago" }
    ]
  },
  {
    id: "c-3",
    text: "Whoever stole my project files from the lab PC: please return them. My final grading is next week and I'm losing my mind. I worked on it for months.",
    category: "Rants",
    time: "Yesterday",
    likes: 95,
    comments: [
      { id: "cm-7", text: "This is awful. Always carry a pen drive or push to git!", time: "Yesterday" },
      { id: "cm-8", text: "Check with the lab assistant, they might have cleaned the drive or moved it.", time: "Yesterday" }
    ]
  },
  {
    id: "c-4",
    text: "DBMS lab exam was a total disaster. The query results returned empty array and so did my brain during the viva.",
    category: "Exam Stress",
    time: "2 days ago",
    likes: 180,
    comments: [
      { id: "cm-9", text: "SQL joins will be the death of me.", time: "2 days ago" },
      { id: "cm-10", text: "At least you got an empty array, my server crashed.", time: "1 day ago" }
    ]
  },
  {
    id: "c-5",
    text: "Hostel A floor 3 kitchen has currently evolved a new species of mold. Please wash your pans after cooking! It's getting hazardous.",
    category: "Hostel Life",
    time: "3 days ago",
    likes: 72,
    comments: [
      { id: "cm-11", text: "Hostel A kitchen is basically a biology lab at this point.", time: "3 days ago" },
      { id: "cm-12", text: "So true, I've started cooking in my room (don't tell the warden).", time: "2 days ago" }
    ]
  },
  {
    id: "c-6",
    text: "Is it normal to spend 90% of the lecture time calculating how many classes you can skip without falling below 75% attendance?",
    category: "Humor",
    time: "4 days ago",
    likes: 320,
    comments: [
      { id: "cm-13", text: "The real CS student math.", time: "4 days ago" },
      { id: "cm-14", text: "Guilty! I have a whole Excel sheet dedicated to this.", time: "3 days ago" },
      { id: "cm-15", text: "Then you miscalculate once and have to attend 8 AMs for two weeks straight.", time: "3 days ago" }
    ]
  },
  {
    id: "c-7",
    text: "Tip for CS juniors: Don't buy physical books for the core classes. The library portal has PDFs of all of them, and most syllabus content is on YouTube anyway. Save your money!",
    category: "Advice",
    time: "5 days ago",
    likes: 142,
    comments: [
      { id: "cm-16", text: "Wish someone told me this last year, spent like 5k on textbooks.", time: "4 days ago" },
      { id: "cm-17", text: "YouTube channel 'Abdul Bari' is single-handedly saving my degree.", time: "4 days ago" }
    ]
  }
];

const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONFESSIONS));
  }
};

export const confessionService = {
  getConfessions: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      console.error("Error parsing confessions", e);
      return DEFAULT_CONFESSIONS;
    }
  },

  getConfessionById: (id) => {
    initStorage();
    const confessions = confessionService.getConfessions();
    return confessions.find((c) => c.id === id) || null;
  },

  addConfession: (text, category) => {
    initStorage();
    const confessions = confessionService.getConfessions();
    const newConfession = {
      id: `c-${Date.now()}`,
      text: text.trim(),
      category: category,
      time: "Just now",
      likes: 0,
      comments: []
    };
    confessions.unshift(newConfession);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(confessions));
    
    // Track contribution in profile
    profileService.trackMyConfession(newConfession.id);
    profileService.logActivity(`Posted an anonymous confession under "${category}".`, "confession");
    
    return newConfession;
  },

  likeConfession: (id) => {
    initStorage();
    const confessions = confessionService.getConfessions();
    const updated = confessions.map((c) => {
      if (c.id === id) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((c) => c.id === id);
  },

  addComment: (confessionId, commentText) => {
    initStorage();
    const confessions = confessionService.getConfessions();
    const updated = confessions.map((c) => {
      if (c.id === confessionId) {
        const newComment = {
          id: `cm-${Date.now()}`,
          text: commentText.trim(),
          time: "Just now"
        };
        return {
          ...c,
          comments: [...c.comments, newComment]
        };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((c) => c.id === confessionId);
  }
};
