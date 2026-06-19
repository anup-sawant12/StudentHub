import React from "react";
import { useNavigation } from "../../context/NavigationContext";
import useRoommates from "../../hooks/useRoommates";
import RoommateStats from "../../components/roommate/RoommateStats";
import RoommateList from "../../components/roommate/RoommateList";
import RoommateRequests from "../../components/roommate/RoommateRequests";
import CreateRoommatePost from "../../components/roommate/CreateRoommatePost";
import "./RoommatePage.css";

export function RoommatePage() {
  const { subView, setSubView, navigateToCreate, navigateToList } = useNavigation();
  const {
    posts,
    requests,
    loading,
    createPost,
    deletePost,
    sendConnectionRequest,
    handleRequestStatusChange
  } = useRoommates();

  const handleCreateSubmit = (formData) => {
    createPost(formData);
    navigateToList();
  };

  const handleConnectRequest = (postId, message) => {
    sendConnectionRequest(postId, message);
  };

  if (loading) {
    return (
      <div className="roommate-loading">
        <div className="loading-spinner"></div>
        <p>Loading Roommate Finder...</p>
      </div>
    );
  }

  // Render form if subView is 'create'
  if (subView === "create") {
    return (
      <div className="roommate-page">
        <CreateRoommatePost onSubmit={handleCreateSubmit} onCancel={navigateToList} />
      </div>
    );
  }

  const pendingIncomingCount = requests.filter(
    (req) => req.receiverEmail === "anup.sawant@studenthub.edu" && req.status === "Pending"
  ).length;

  return (
    <div className="roommate-page">
      {/* Header Section */}
      <div className="roommate-header">
        <div className="header-text-container">
          <h1 className="page-title">
            {subView === "requests" ? "Connection Requests" : "Roommate Finder"}
          </h1>
          <p className="page-subtitle">
            {subView === "requests"
              ? "Manage incoming and outgoing roommate matching requests."
              : "Match with campus peers based on shared habits, budgets, and location preferences."}
          </p>
        </div>
        
        <div className="header-actions">
          {subView === "requests" ? (
            <button onClick={navigateToList} className="btn-secondary-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Listings
            </button>
          ) : (
            <button onClick={() => setSubView("requests")} className="btn-secondary-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              My Requests
              {pendingIncomingCount > 0 && <span className="action-alert-dot"></span>}
            </button>
          )}
          
          <button onClick={navigateToCreate} className="btn-post-requirement">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Post Requirement
          </button>
        </div>
      </div>

      {/* Stats Board */}
      <RoommateStats posts={posts} requests={requests} />

      {/* Active Content view */}
      <div className="roommate-content">
        {subView === "requests" ? (
          <RoommateRequests requests={requests} onStatusChange={handleRequestStatusChange} />
        ) : (
          <RoommateList
            posts={posts}
            requests={requests}
            onConnect={handleConnectRequest}
            onDelete={deletePost}
          />
        )}
      </div>
    </div>
  );
}

export default RoommatePage;
