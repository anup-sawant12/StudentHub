import { profileService } from "./profileService";
import { INITIAL_SUBJECTS, getInitialLogs } from "../data/attendanceDummyData";

const SUBJECTS_KEY = "studenthub_attendance_subjects";
const LOGS_KEY = "studenthub_attendance_logs";

const initStorage = () => {
  if (!localStorage.getItem(SUBJECTS_KEY)) {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(INITIAL_SUBJECTS));
  }
  if (!localStorage.getItem(LOGS_KEY)) {
    localStorage.setItem(LOGS_KEY, JSON.stringify(getInitialLogs()));
  }
};

export const attendanceService = {
  getSubjects: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(SUBJECTS_KEY)) || [];
    } catch (e) {
      console.error("Error reading attendance subjects", e);
      return INITIAL_SUBJECTS;
    }
  },

  getLogs: () => {
    initStorage();
    try {
      return JSON.parse(localStorage.getItem(LOGS_KEY)) || [];
    } catch (e) {
      console.error("Error reading attendance logs", e);
      return [];
    }
  },

  addSubject: (subject) => {
    initStorage();
    const subjects = attendanceService.getSubjects();
    const newSubject = {
      ...subject,
      id: `sub-${Date.now()}`,
      target: Number(subject.target) || 75
    };
    subjects.push(newSubject);
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));

    profileService.logActivity(`Added new subject: "${newSubject.name}" (${newSubject.code}).`, "attendance");
    return newSubject;
  },

  updateSubject: (updatedSubject) => {
    initStorage();
    const subjects = attendanceService.getSubjects();
    const index = subjects.findIndex((s) => s.id === updatedSubject.id);
    if (index !== -1) {
      subjects[index] = {
        ...updatedSubject,
        target: Number(updatedSubject.target) || 75
      };
      localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
      profileService.logActivity(`Updated details for subject: "${updatedSubject.name}".`, "attendance");
      return subjects[index];
    }
    return null;
  },

  deleteSubject: (subjectId) => {
    initStorage();
    const subjects = attendanceService.getSubjects();
    const subjectToDelete = subjects.find((s) => s.id === subjectId);
    
    // Filter out the subject
    const filteredSubjects = subjects.filter((s) => s.id !== subjectId);
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(filteredSubjects));

    // Also filter out any logs for that subject
    const logs = attendanceService.getLogs();
    const filteredLogs = logs.filter((l) => l.subjectId !== subjectId);
    localStorage.setItem(LOGS_KEY, JSON.stringify(filteredLogs));

    if (subjectToDelete) {
      profileService.logActivity(`Deleted subject "${subjectToDelete.name}" and all of its logs.`, "attendance");
    }
    return true;
  },

  addLog: (log) => {
    initStorage();
    const logs = attendanceService.getLogs();
    const newLog = {
      ...log,
      id: `log-${Date.now()}`
    };
    
    logs.unshift(newLog);
    // Keep sorted descending by date
    logs.sort((a, b) => b.date.localeCompare(a.date));
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));

    const subjects = attendanceService.getSubjects();
    const subject = subjects.find((s) => s.id === log.subjectId);
    const subjectName = subject ? subject.name : "Unknown Subject";
    const statusText = log.status.charAt(0).toUpperCase() + log.status.slice(1);

    profileService.logActivity(`Marked "${subjectName}" class on ${log.date} as ${statusText}.`, "attendance");
    return newLog;
  },

  updateLog: (updatedLog) => {
    initStorage();
    const logs = attendanceService.getLogs();
    const index = logs.findIndex((l) => l.id === updatedLog.id);
    if (index !== -1) {
      logs[index] = { ...updatedLog };
      logs.sort((a, b) => b.date.localeCompare(a.date));
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs));

      const subjects = attendanceService.getSubjects();
      const subject = subjects.find((s) => s.id === updatedLog.subjectId);
      const subjectName = subject ? subject.name : "Unknown Subject";
      
      profileService.logActivity(`Updated class log details for "${subjectName}" on ${updatedLog.date}.`, "attendance");
      return logs[index];
    }
    return null;
  },

  deleteLog: (logId) => {
    initStorage();
    const logs = attendanceService.getLogs();
    const logToDelete = logs.find((l) => l.id === logId);
    if (logToDelete) {
      const filteredLogs = logs.filter((l) => l.id !== logId);
      localStorage.setItem(LOGS_KEY, JSON.stringify(filteredLogs));

      const subjects = attendanceService.getSubjects();
      const subject = subjects.find((s) => s.id === logToDelete.subjectId);
      const subjectName = subject ? subject.name : "Unknown Subject";

      profileService.logActivity(`Deleted a class log for "${subjectName}" on ${logToDelete.date}.`, "attendance");
      return true;
    }
    return false;
  }
};
export default attendanceService;
