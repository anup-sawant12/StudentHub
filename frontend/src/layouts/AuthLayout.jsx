import React from "react";
import "./AuthLayout.css";

export function AuthLayout({ children }) {
  return (
    <div className="auth-layout-container">
      {/* Decorative Glow Balls */}
      <div className="glow-ball blue-glow"></div>
      <div className="glow-ball purple-glow"></div>

      <div className="auth-layout-card glass-card">
        {/* Left Side: Branding and details */}
        <div className="auth-brand-section">
          <div className="brand-header">
            <span className="brand-logo-txt">StudentHub</span>
            <span className="brand-badge">v1.2</span>
          </div>

          <div className="brand-welcome-pitch">
            <h1 className="pitch-heading">The Campus Ecosystem</h1>
            <p className="pitch-desc">
              Connect with peers, track database attendances, browse anonymous confessions, share SDE placement experiences, and match roommates in one unified space.
            </p>

            <div className="pitch-features-list">
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <div className="feature-info">
                  <strong>Lost & Found</strong>
                  <span>Report and search items instantly.</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤫</div>
                <div className="feature-info">
                  <strong>Confession Boards</strong>
                  <span>Share thoughts anonymously with your college.</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📅</div>
                <div className="feature-info">
                  <strong>Attendance Tracker</strong>
                  <span>Never dip below the 75% target again.</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🤝</div>
                <div className="feature-info">
                  <strong>Roommate Finder</strong>
                  <span>Find roommates based on habits and tags.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <span>StudentHub Inc. • Institutional Portal</span>
          </div>
        </div>

        {/* Right Side: Render Forms */}
        <div className="auth-form-section">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
