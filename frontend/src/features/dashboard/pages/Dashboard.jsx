import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      
      {/* 1. Welcome Back Banner */}
      <div className="welcome-banner">
        <h1 className="welcome-title">Welcome Back 👋</h1>
        <p className="welcome-subtitle">
          Manage your college life, stay updated with campus events, and connect with your peers from one central ecosystem.
        </p>
        <div className="welcome-actions">
          <button className="welcome-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" />
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" />
            </svg>
            Add Lost Item
          </button>
          <button className="welcome-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
            Post Confession
          </button>
          <button className="welcome-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Add Experience
          </button>
        </div>
      </div>

      {/* 2. Stats Grid (4 columns) */}
      <div className="stats-grid">
        
        {/* Stat 1: Lost & Found */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <span className="stat-badge">+3 today</span>
          </div>
          <p className="stat-label">Lost & Found</p>
          <h3 className="stat-value">24</h3>
        </div>

        {/* Stat 2: Confessions */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <span className="stat-badge">Trending</span>
          </div>
          <p className="stat-label">Confessions</p>
          <h3 className="stat-value">156</h3>
        </div>

        {/* Stat 3: Experiences */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
            </div>
            <span className="stat-badge">New Hires</span>
          </div>
          <p className="stat-label">Experiences</p>
          <h3 className="stat-value">4333</h3>
        </div>

        {/* Stat 4: Attendance */}
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="stat-badge-good">Good</span>
          </div>
          <p className="stat-label">Attendance</p>
          <h3 className="stat-value">82%</h3>
        </div>

      </div>

      {/* 3. Main Split Grid */}
      <div className="dashboard-main-grid">
        
        {/* Left Column (col-span-2) */}
        <div className="main-column">
          
          {/* Card: Recent Lost & Found */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Recent Lost & Found</h2>
              <a href="#" className="section-link">View All</a>
            </div>
            
            <div className="list-container">
              <div className="list-item">
                <div className="item-left">
                  <div className="item-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">Earbuds near Library</h4>
                    <p className="item-subtitle">Found 2 hours ago • Block C</p>
                  </div>
                </div>
                <button className="item-btn">
                  Claim
                </button>
              </div>

              <div className="list-item">
                <div className="item-left">
                  <div className="item-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="7" y1="8" x2="17" y2="8" />
                      <line x1="7" y1="12" x2="17" y2="12" />
                      <line x1="7" y1="16" x2="13" y2="16" />
                    </svg>
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">Student ID near Canteen</h4>
                    <p className="item-subtitle">Found 5 hours ago • South Wing</p>
                  </div>
                </div>
                <button className="item-btn">
                  Claim
                </button>
              </div>
            </div>
          </div>

          {/* Sub-grid: Trending & Placements */}
          <div className="sub-grid">
            
            {/* Trending Confessions */}
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Trending</h2>
                <a href="#" className="section-link">View All</a>
              </div>
              
              <div className="list-container">
                <div className="confession-card">
                  <p className="confession-text">
                    "Actually thinking of switching majors in my final year. Is it too late? I feel like I'm stuck in a loop..."
                  </p>
                  <div className="confession-footer">
                    <span className="footer-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      134
                    </span>
                    <span className="footer-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      24
                    </span>
                  </div>
                </div>

                <div className="confession-card">
                  <p className="confession-text">
                    "Whoever left their notes in Room 402, I have them! They look super important."
                  </p>
                  <div className="confession-footer">
                    <span className="footer-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      92
                    </span>
                    <span className="footer-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      12
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Placements */}
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">Placements</h2>
                <a href="#" className="section-link">View All</a>
              </div>
              
              <div className="list-container">
                <div className="placement-item">
                  <div className="item-left">
                    <div className="placement-logo google-logo">
                      G
                    </div>
                    <div className="item-details">
                      <h4 className="item-title">Google SDE Intern</h4>
                      <p className="item-subtitle">Experience Shared</p>
                    </div>
                  </div>
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>

                <div className="placement-item">
                  <div className="item-left">
                    <div className="placement-logo amazon-logo">
                      a
                    </div>
                    <div className="item-details">
                      <h4 className="item-title">Amazon SDE Full-time</h4>
                      <p className="item-subtitle">Aptitude Round Tips</p>
                    </div>
                  </div>
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Roommate Suggestions */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Roommate Suggestions</h2>
              <a href="#" className="section-link">Find More</a>
            </div>

            <div className="roommate-grid">
              
              {/* Roommate 1 */}
              <div className="roommate-card">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                  alt="Rahul"
                  className="roommate-avatar"
                />
                <h4 className="roommate-name">Rahul, 20</h4>
                <p className="roommate-sub">Hostel A • ₹8k</p>
                <div className="tag-group">
                  <span className="tag">Gaming</span>
                  <span className="tag">Late Night</span>
                </div>
                <button className="btn-connect">
                  Connect
                </button>
              </div>

              {/* Roommate 2 */}
              <div className="roommate-card">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                  alt="Sneha"
                  className="roommate-avatar"
                />
                <h4 className="roommate-name">Sneha, 19</h4>
                <p className="roommate-sub">PG Outer • ₹12k</p>
                <div className="tag-group">
                  <span className="tag">Quiet</span>
                  <span className="tag">Reading</span>
                </div>
                <button className="btn-connect">
                  Connect
                </button>
              </div>

              {/* Roommate 3 */}
              <div className="roommate-card">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
                  alt="Aman"
                  className="roommate-avatar"
                />
                <h4 className="roommate-name">Aman, 21</h4>
                <p className="roommate-sub">Hostel B • ₹6k</p>
                <div className="tag-group">
                  <span className="tag">Coding</span>
                  <span className="tag">Early Bird</span>
                </div>
                <button className="btn-connect">
                  Connect
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (col-span-1) */}
        <div className="side-column">
          
          {/* Quick Actions Card */}
          <div className="section-card">
            <h2 className="section-title">Quick Actions</h2>
            <div style={{ height: "16px" }}></div>
            
            <div className="quick-actions-grid">
              <button className="action-btn">
                <div className="action-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <span className="action-btn-label">Lost Item</span>
              </button>

              <button className="action-btn">
                <div className="action-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="9" y1="7" x2="15" y2="7" />
                    <line x1="9" y1="11" x2="15" y2="11" />
                  </svg>
                </div>
                <span className="action-btn-label">Confess</span>
              </button>

              <button className="action-btn">
                <div className="action-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <span className="action-btn-label">Attendance</span>
              </button>

              <button className="action-btn">
                <div className="action-btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <span className="action-btn-label">Experience</span>
              </button>
            </div>
          </div>

          {/* Attendance Tracker progress bar card */}
          <div className="section-card">
            <div className="section-header">
              <div>
                <h2 className="section-title">Attendance</h2>
                <p className="item-subtitle">Target: 75% overall</p>
              </div>
              <div className="attendance-avg-container">
                <div className="attendance-avg">82%</div>
                <div className="attendance-avg-label">Avg</div>
              </div>
            </div>

            <div className="progress-bars">
              <div className="progress-bar-wrapper">
                <div className="progress-bar-info">
                  <span>DBMS</span>
                  <span>78%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-indicator" style={{ width: "78%" }}></div>
                </div>
              </div>

              <div className="progress-bar-wrapper">
                <div className="progress-bar-info">
                  <span>Operating Systems</span>
                  <span>91%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-indicator" style={{ width: "91%" }}></div>
                </div>
              </div>
              
              <button className="btn-detailed">
                Detailed Report
              </button>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="section-card">
            <h2 className="section-title">Upcoming Events</h2>
            <div style={{ height: "16px" }}></div>
            
            <div className="events-list">
              <div className="event-item">
                <div className="date-badge">
                  <span className="date-month">Oct</span>
                  <span className="date-day">12</span>
                </div>
                <div className="event-details">
                  <h4 className="event-title">Tech Nexus Hackathon</h4>
                  <p className="event-sub">Main Auditorium - 09:00 AM</p>
                </div>
              </div>

              <div className="event-item">
                <div className="date-badge">
                  <span className="date-month">Oct</span>
                  <span className="date-day">15</span>
                </div>
                <div className="event-details">
                  <h4 className="event-title">Career Fair 2024</h4>
                  <p className="event-sub">Sports Ground - 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;