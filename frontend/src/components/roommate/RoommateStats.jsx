import React from "react";
import "./RoommateStats.css";

export function RoommateStats({ posts = [], requests = [] }) {
  const totalPosts = posts.length;
  
  // Pending received requests for current user (anup.sawant@studenthub.edu)
  const pendingRequests = requests.filter(
    (req) => req.receiverEmail === "anup.sawant@studenthub.edu" && req.status === "Pending"
  ).length;
  
  // Total accepted connections in the system
  const matchesMade = requests.filter((req) => req.status === "Accepted").length;

  return (
    <div className="roommate-stats-grid">
      {/* Card 1: Total Listings */}
      <div className="roommate-stat-card glass-card">
        <div className="stat-icon-container blue-theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div className="stat-details">
          <span className="stat-value">{totalPosts}</span>
          <span className="stat-label">Total Listings</span>
        </div>
      </div>

      {/* Card 2: Pending Requests */}
      <div className="roommate-stat-card glass-card">
        <div className="stat-icon-container purple-theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="stat-details">
          <span className="stat-value">{pendingRequests}</span>
          <span className="stat-label">Pending Requests</span>
        </div>
      </div>

      {/* Card 3: Matches Made */}
      <div className="roommate-stat-card glass-card">
        <div className="stat-icon-container orange-theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="stat-details">
          <span className="stat-value">{matchesMade}</span>
          <span className="stat-label">Matches Made</span>
        </div>
      </div>
    </div>
  );
}

export default RoommateStats;
