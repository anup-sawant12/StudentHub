import { useState, useEffect, useCallback } from "react";
import { confessionService } from "../services/confessionService";

export function useConfessions() {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshConfessions = useCallback(() => {
    setLoading(true);
    const data = confessionService.getConfessions();
    setConfessions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshConfessions();
  }, [refreshConfessions]);

  const addConfession = useCallback((text, category) => {
    const newItem = confessionService.addConfession(text, category);
    setConfessions((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const likeConfession = useCallback((id) => {
    const updated = confessionService.likeConfession(id);
    setConfessions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: updated.likes } : c))
    );
  }, []);

  const addComment = useCallback((confessionId, commentText) => {
    const updated = confessionService.addComment(confessionId, commentText);
    setConfessions((prev) =>
      prev.map((c) => (c.id === confessionId ? { ...c, comments: updated.comments } : c))
    );
    return updated;
  }, []);

  return {
    confessions,
    loading,
    refreshConfessions,
    addConfession,
    likeConfession,
    addComment
  };
}
export default useConfessions;
