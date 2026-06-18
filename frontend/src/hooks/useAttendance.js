import { useState, useEffect, useCallback } from "react";
import { attendanceService } from "../services/attendanceService";
import { calculateOverallStats } from "../utils/attendanceUtils";

export function useAttendance() {
  const [subjects, setSubjects] = useState([]);
  const [logs, setLogs] = useState([]);
  const [overallStats, setOverallStats] = useState({ total: 0, present: 0, late: 0, absent: 0, percentage: 0 });
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setLoading(true);
    const subList = attendanceService.getSubjects();
    const logList = attendanceService.getLogs();
    
    setSubjects(subList);
    setLogs(logList);
    
    const stats = calculateOverallStats(subList, logList);
    setOverallStats(stats);
    
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const addSubject = useCallback((subject) => {
    const newSub = attendanceService.addSubject(subject);
    refreshData();
    return newSub;
  }, [refreshData]);

  const updateSubject = useCallback((subject) => {
    const updated = attendanceService.updateSubject(subject);
    refreshData();
    return updated;
  }, [refreshData]);

  const deleteSubject = useCallback((subjectId) => {
    const result = attendanceService.deleteSubject(subjectId);
    refreshData();
    return result;
  }, [refreshData]);

  const addLog = useCallback((log) => {
    const newLog = attendanceService.addLog(log);
    refreshData();
    return newLog;
  }, [refreshData]);

  const updateLog = useCallback((log) => {
    const updated = attendanceService.updateLog(log);
    refreshData();
    return updated;
  }, [refreshData]);

  const deleteLog = useCallback((logId) => {
    const result = attendanceService.deleteLog(logId);
    refreshData();
    return result;
  }, [refreshData]);

  return {
    subjects,
    logs,
    overallStats,
    loading,
    refreshData,
    addSubject,
    updateSubject,
    deleteSubject,
    addLog,
    updateLog,
    deleteLog
  };
}
export default useAttendance;
