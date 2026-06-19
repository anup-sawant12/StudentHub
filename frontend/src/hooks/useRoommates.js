import { useState, useEffect, useCallback } from "react";
import { roommateService } from "../services/roommateService";

export function useRoommates() {
  const [posts, setPosts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setLoading(true);
    const allPosts = roommateService.getPosts();
    const allReqs = roommateService.getRequests();
    setPosts(allPosts);
    setRequests(allReqs);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const createPost = useCallback((postData) => {
    const newPost = roommateService.createPost(postData);
    refreshData();
    return newPost;
  }, [refreshData]);

  const deletePost = useCallback((postId) => {
    const success = roommateService.deletePost(postId);
    if (success) {
      refreshData();
    }
    return success;
  }, [refreshData]);

  const sendConnectionRequest = useCallback((postId, message) => {
    const newReq = roommateService.sendConnectionRequest(postId, message);
    if (newReq) {
      refreshData();
    }
    return newReq;
  }, [refreshData]);

  const handleRequestStatusChange = useCallback((requestId, status) => {
    const success = roommateService.updateRequestStatus(requestId, status);
    if (success) {
      refreshData();
    }
    return success;
  }, [refreshData]);

  return {
    posts,
    requests,
    loading,
    createPost,
    deletePost,
    sendConnectionRequest,
    handleRequestStatusChange,
    refreshData
  };
}

export default useRoommates;
