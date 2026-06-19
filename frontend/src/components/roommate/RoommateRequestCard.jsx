import React from "react";
import { profileService } from "../../services/profileService";
import "./RoommateRequestCard.css";

export function RoommateRequestCard({ request, onStatusChange }) {
  const currentUser = profileService.getProfile();
  const isIncoming = request.receiverEmail === currentUser.email;
  
  const handleAccept = () => {
    if (onStatusChange) {
      onStatusChange(request.id, "Accepted");
    }
  };

  const handleDecline = () => {
    if (onStatusChange) {
      onStatusChange(request.id, "Declined");
    }
  };

  const isPending = request.status === "Pending";
  const isAccepted = request.status === "Accepted";
  const isDeclined = request.status === "Declined";

  // Determine who to show on the card (the other person)
  const displayAvatar = isIncoming ? request.senderAvatar : null;
  const displayName = isIncoming ? request.senderName : request.receiverName;
  const displayRole = isIncoming ? "Sent you a request" : "You requested to connect";

  return (
    <div className={`roommate-request-card glass-card status-${request.status.toLowerCase()}`}>
      <div className="req-card-top">
        <div className="req-user-info">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              className="req-avatar"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop";
              }}
            />
          ) : (
            <div className="req-avatar-placeholder">
              {displayName.charAt(0)}
            </div>
          )}
          <div className="req-details">
            <h4 className="req-name">{displayName}</h4>
            <span className="req-role-label">{displayRole}</span>
          </div>
        </div>

        <span className={`req-status-tag tag-${request.status.toLowerCase()}`}>
          {request.status}
        </span>
      </div>

      <div className="req-card-body">
        <div className="req-post-reference">
          <span className="reference-label">Listing:</span>
          <span className="reference-title">"{request.postTitle}"</span>
        </div>

        {request.message && (
          <div className="req-message-box">
            <p className="req-message-text">"{request.message}"</p>
          </div>
        )}

        {/* Display Contact Info if Accepted */}
        {isAccepted && (
          <div className="req-contact-reveal">
            <div className="contact-reveal-header">📱 Connection Approved! Contact Info:</div>
            <div className="contact-fields">
              <div className="contact-field">
                <span className="field-name">Email:</span>
                <span className="field-value">{isIncoming ? request.senderEmail : request.receiverEmail}</span>
              </div>
              <div className="contact-field">
                <span className="field-name">Phone:</span>
                <span className="field-value">
                  {isIncoming ? request.senderPhone || "Not provided" : request.senderPhone || "+1 (555) 019-3333"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Received & Pending: Show Accept/Decline controls */}
      {isIncoming && isPending && (
        <div className="req-card-actions">
          <button onClick={handleDecline} className="btn-decline-req">
            Decline
          </button>
          <button onClick={handleAccept} className="btn-accept-req">
            Accept Connection
          </button>
        </div>
      )}
    </div>
  );
}

export default RoommateRequestCard;
