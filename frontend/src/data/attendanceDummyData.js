export const INITIAL_SUBJECTS = [
  {
    id: "sub-1",
    name: "Database Management Systems",
    code: "CS-301",
    instructor: "Dr. R. K. Sen",
    target: 75,
    room: "LH-102"
  },
  {
    id: "sub-2",
    name: "Operating Systems",
    code: "CS-302",
    instructor: "Prof. A. Verma",
    target: 75,
    room: "Lab-3"
  },
  {
    id: "sub-3",
    name: "Computer Networks",
    code: "CS-303",
    instructor: "Dr. Sneha Roy",
    target: 75,
    room: "LH-204"
  },
  {
    id: "sub-4",
    name: "Software Engineering",
    code: "CS-304",
    instructor: "Prof. Manoj Kumar",
    target: 75,
    room: "Room-12"
  },
  {
    id: "sub-5",
    name: "Engineering Mathematics III",
    code: "MA-301",
    instructor: "Dr. K. B. Bhat",
    target: 75,
    room: "LH-101"
  }
];

export const getInitialLogs = () => {
  const logs = [];
  let logId = 1;
  const config = [
    { id: "sub-1", present: 18, absent: 5 },
    { id: "sub-2", present: 20, absent: 2 },
    { id: "sub-3", present: 16, absent: 4 },
    { id: "sub-4", present: 15, absent: 5 },
    { id: "sub-5", present: 17, absent: 3 }
  ];

  // We go backward day by day from today
  const today = new Date();
  
  config.forEach((sub) => {
    let pCount = sub.present;
    let aCount = sub.absent;
    let daysAgo = 1; // Start from yesterday to make it realistic

    while (pCount > 0 || aCount > 0) {
      const date = new Date(today);
      date.setDate(today.getDate() - daysAgo);

      // Only schedule on weekdays (Mon-Fri)
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        let status = "present";
        
        // Randomly scatter absents or do it deterministically to preserve consistency
        if (aCount > 0 && (pCount === 0 || (pCount + aCount) % 4 === 0)) {
          status = "absent";
          aCount--;
        } else {
          pCount--;
        }

        // Convert some presents to late to show all statuses (approx 10% rate)
        if (status === "present" && (pCount % 7 === 0)) {
          status = "late";
        }

        logs.push({
          id: `log-${logId++}`,
          subjectId: sub.id,
          date: date.toISOString().split("T")[0],
          status: status,
          notes: ""
        });
      }
      daysAgo++;
    }
  });

  // Sort logs by date descending so the newest logs appear first
  return logs.sort((a, b) => b.date.localeCompare(a.date));
};
