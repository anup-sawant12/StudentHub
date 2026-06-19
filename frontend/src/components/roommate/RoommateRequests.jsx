import React, { useState } from "react";
import RoommateRequestCard from "./RoommateRequestCard";
import { profileService } from "../../services/profileService";
import "./RoommateRequests.css";

export function RoommateRequests({ requests = [], onStatusChange }) {
  const [activeSegment, setActiveSegment] = useState("received");
  const currentUser = profileService.getProfile();

  const receivedRequests = requests.filter(
    (req) => req.receiverEmail.toLowerCase() === currentUser.email.toLowerCase()
  );
  
  const sentRequests = requests.filter(
    (req) => req.senderEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const displayedRequests = activeSegment === "received" ? receivedRequests : sentRequests;

  return (
    <div className="roommate-requests-container">
      {/* Tab Segment Controls */}
      <div className="requests-tabs-header">
        <button
          onClick={() => setActiveSegment("received")}
          className={`requests-tab-btn ${activeSegment === "received" ? "active" : ""}`}
        >
          Received Requests
          {receivedRequests.length > 0 && (
            <span className="count-badge">{receivedRequests.length}</span>
          )}
        </button>
        <button
          onClick={() => setActiveSegment("sent")}
          className={`requests-tab-btn ${activeSegment === "sent" ? "active" : ""}`}
        >
          Sent Requests
          {sentRequests.length > 0 && (
            <span className="count-badge">{sentRequests.length}</span>
          )}
        </button>
      </div>

      {/* Requests Feed list */}
      {displayedRequests.length === 0 ? (
        <div className="requests-empty-state glass-card">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <h4>No {activeSegment} requests found</h4>
          <p>
            {activeSegment === "received"
              ? "When other students want to connect regarding your posts, they will show up here."
              : "Explore roommate posts and click 'Connect' to initiate contact."}
          </p>
        </div>
      ) : (
        <div className="requests-cards-grid">
          {displayedRequests.map((req) => (
            <RoommateRequestCard
              key={req.id}
              request={req}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RoommateRequests;
