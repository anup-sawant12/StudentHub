import { useState } from "react";
import { profileService } from "../../services/profileService";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    matchingAlerts: true,
    confessionNotifications: false,
    blurNsfw: true,
    compactView: false,
    analyticsOptIn: true,
  });

  const [clearSuccess, setClearSuccess] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      profileService.logActivity(
        `Updated settings preference: ${key.replace(/([A-Z])/g, " $1")}.`,
        "system"
      );
      return updated;
    });
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all local data? This will clear profile edits and recent activities.")) {
      localStorage.clear();
      profileService.logActivity("Reset all local storage data.", "system");
      setClearSuccess(true);
      setTimeout(() => {
        setClearSuccess(false);
        // Refresh page to trigger initializations
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="settings-page-container">
      <div className="settings-content-wrapper">
        <div className="settings-panel-card">
          <h2 className="settings-heading">System Preferences</h2>

          <p className="settings-subheading">Configure your campus app notifications and interactive preferences.</p>

          {/* Section 1: Notifications */}
          <div className="settings-section">
            <h3 className="section-title">Notification Settings</h3>
            
            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Email Notifications</span>
                <p className="option-desc">Receive email digests for official posts, announcements, and match requests.</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle("emailAlerts")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Lost & Found Matches</span>
                <p className="option-desc">Get instant notification if a posted found item matches your lost keywords.</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.matchingAlerts}
                  onChange={() => handleToggle("matchingAlerts")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Confession Activity</span>
                <p className="option-desc">Notify me when my confession thread gets comments (tracked privately).</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.confessionNotifications}
                  onChange={() => handleToggle("confessionNotifications")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>

          <hr className="settings-divider" />

          {/* Section 2: Content Filter */}
          <div className="settings-section">
            <h3 className="section-title">Content & Privacy</h3>

            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Safety Filter (NSFW)</span>
                <p className="option-desc">Blur potentially sensitive images and text tags in public feeds.</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.blurNsfw}
                  onChange={() => handleToggle("blurNsfw")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Telemetry & Diagnostics</span>
                <p className="option-desc">Share anonymous usage data to help us build a faster student ecosystem.</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.analyticsOptIn}
                  onChange={() => handleToggle("analyticsOptIn")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>

          <hr className="settings-divider" />

          {/* Section 3: Layout options */}
          <div className="settings-section">
            <h3 className="section-title">Interface Theme</h3>
            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Compact Density Layout</span>
                <p className="option-desc">Reduce padding and spacing to show more items on lists.</p>
              </div>
              <label className="switch-toggle">
                <input
                  type="checkbox"
                  checked={settings.compactView}
                  onChange={() => handleToggle("compactView")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>

          <hr className="settings-divider" />

          {/* Section 4: Critical Reset actions */}
          <div className="settings-section danger-zone">
            <h3 className="section-title danger">Danger Zone</h3>
            <div className="settings-option-row">
              <div className="option-info">
                <span className="option-label">Reset Local Data</span>
                <p className="option-desc">Wipe all cached profile edits, confessions tracking details, and start fresh.</p>
              </div>
              <button onClick={handleResetData} className="btn-reset-data">
                {clearSuccess ? "Resetting..." : "Reset Data"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
