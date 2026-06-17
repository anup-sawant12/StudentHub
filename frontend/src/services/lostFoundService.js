const STORAGE_KEY = "studenthub_lost_found";

const DEFAULT_ITEMS = [
  {
    id: "lf-1",
    status: "lost",
    title: "Student ID Card",
    time: "2h ago",
    location: "Canteen, Central Hub",
    category: "Documents",
    description: "Lost near the main counter around lunch time. Name: Alex Rivers. If found, please drop it at the desk or return it directly.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    contactName: "Alex Rivers",
    contactEmail: "alex.rivers@studenthub.edu"
  },
  {
    id: "lf-2",
    status: "found",
    title: "Wireless Earbuds",
    time: "5h ago",
    location: "Library, 3rd Floor",
    category: "Electronics",
    description: "Found on a desk in the quiet study zone. White case, looks like AirPods. Left it with the librarian at the front desk.",
    image: "https://images.unsplash.com/photo-1588449668365-d15e397f6787?q=80&w=600&auto=format&fit=crop",
    contactName: "Anup Sawant",
    contactEmail: "anup.sawant@studenthub.edu"
  },
  {
    id: "lf-3",
    status: "lost",
    title: "Black Wallet",
    time: "Yesterday",
    location: "Hostel A, Room 402",
    category: "Personal",
    description: "Leather wallet with multiple cards and some cash. If found, please contact me. Reward included!",
    image: "https://images.unsplash.com/photo-1627124357626-8c44c77c688c?q=80&w=600&auto=format&fit=crop",
    contactName: "Rahul Sharma",
    contactEmail: "rahul.sharma@studenthub.edu"
  },
  {
    id: "lf-4",
    status: "found",
    title: "Engineering Notebook",
    time: "2 days ago",
    location: "Block C, Lab 2",
    category: "Books",
    description: "Left behind after the circuit design practical. Lots of handwritten engineering diagrams. Kept safe in Lab 2 drawer.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    contactName: "Prof. Verma",
    contactEmail: "verma.physics@studenthub.edu"
  },
  {
    id: "lf-5",
    status: "lost",
    title: "Blue Sunglasses",
    time: "3h ago",
    location: "Sports Complex",
    category: "Personal",
    description: "Ray-Ban style with blue gradient lenses. Lost during the football practice. Please contact if found.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    contactName: "Aman Gupta",
    contactEmail: "aman.gupta@studenthub.edu"
  },
  {
    id: "lf-6",
    status: "found",
    title: "Set of Keys",
    time: "8h ago",
    location: "Auditorium Lobby",
    category: "Keys",
    description: "A bunch of 4 keys with a 'NASA' lanyard. Found under one of the lobby couches after the orientation program.",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop",
    contactName: "Sneha Patel",
    contactEmail: "sneha.patel@studenthub.edu"
  }
];

// Initialize localStorage if not present
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
  }
};

export const lostFoundService = {
  getItems: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      console.error("Error parsing lost & found items", e);
      return DEFAULT_ITEMS;
    }
  },

  getItemById: (id) => {
    initStorage();
    const items = lostFoundService.getItems();
    return items.find((item) => item.id === id) || null;
  },

  addItem: (item) => {
    initStorage();
    const items = lostFoundService.getItems();
    const newItem = {
      ...item,
      id: `lf-${Date.now()}`,
      time: "Just now",
      image: item.image || "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?q=80&w=600&auto=format&fit=crop",
      contactName: item.contactName || "Anup Sawant",
      contactEmail: item.contactEmail || "anup.sawant@studenthub.edu"
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  }
};
