export const DEFAULT_ROOMMATE_POSTS = [
  {
    id: "rm-1",
    userId: "user-rahul",
    name: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    year: "Sophomore (Class of 2028)",
    degree: "B.Tech CSE",
    title: "Looking for a chilled flatmate for Hostel A single-sharing converter",
    location: "Hostel A",
    rent: "₹8,000/month",
    description: "Looking for someone who is cool with coding sessions and late-night gaming. I sleep around 2 AM. Very chill about cleanliness but should respect basic privacy.",
    tags: ["Gaming", "Late Night", "Coding"],
    gender: "Male",
    status: "Open",
    email: "rahul.sharma@studenthub.edu",
    phone: "+1 (555) 019-1111",
    time: "2 days ago"
  },
  {
    id: "rm-2",
    userId: "user-sneha",
    name: "Sneha Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    year: "Sophomore (Class of 2028)",
    degree: "B.Tech ECE",
    title: "Need a quiet, studious flatmate for a 2BHK in PG Outer",
    location: "PG Outer Area",
    rent: "₹12,000/month",
    description: "Fully furnished 2BHK flat. Looking for a neat and clean female roommate. Prefer someone who is quiet, loves reading, and doesn't host frequent parties. Rent is split 50/50.",
    tags: ["Quiet", "Reading", "Early Bird", "Vegetarian"],
    gender: "Female",
    status: "Open",
    email: "sneha.patel@studenthub.edu",
    phone: "+1 (555) 019-2222",
    time: "3 days ago"
  },
  {
    id: "rm-3",
    userId: "user-aman",
    name: "Aman Gupta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    year: "Junior (Class of 2027)",
    degree: "B.Tech ME",
    title: "Double room in Hostel B - sharing partner needed",
    location: "Hostel B",
    rent: "₹6,000/month",
    description: "Looking for a neat sharing partner for a Hostel B double room. I am an early bird, sports enthusiast, and regular at the gym. No smoking preferred.",
    tags: ["Coding", "Early Bird", "Gym", "Non-Smoker"],
    gender: "Male",
    status: "Open",
    email: "aman.gupta@studenthub.edu",
    phone: "+1 (555) 019-3333",
    time: "4 days ago"
  }
];

export const DEFAULT_ROOMMATE_REQUESTS = [
  {
    id: "req-1",
    postId: "rm-2",
    postTitle: "Need a quiet, studious flatmate for a 2BHK in PG Outer",
    senderName: "Anup Sawant",
    senderAvatar: "https://img.magnific.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80",
    senderEmail: "anup.sawant@studenthub.edu",
    senderPhone: "+1 (555) 019-2834",
    receiverName: "Sneha Patel",
    receiverEmail: "sneha.patel@studenthub.edu",
    status: "Pending",
    message: "Hey Sneha, I saw your post. I'm also looking for a quiet room in PG Outer. Let's connect!",
    time: "1 day ago"
  }
];
