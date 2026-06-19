import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import LostFoundPage from "../pages/lost-found/LostFoundPage";
import CreatePostPage from "../pages/lost-found/CreatePostPage";
import LostFoundDetails from "../pages/lost-found/LostFoundDetails";
import ConfessionFeedPage from "../pages/confessions/ConfessionFeedPage";
import CreateConfessionPage from "../pages/confessions/CreateConfessionPage";
import ConfessionDetailsPage from "../pages/confessions/ConfessionDetailsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import EditProfilePage from "../pages/profile/EditProfilePage";
import MyPostsPage from "../pages/profile/MyPostsPage";
import SettingsPage from "../pages/profile/SettingsPage";
import AttendancePage from "../pages/attendance/AttendancePage";
import AttendanceDetailsPage from "../pages/attendance/AttendanceDetailsPage";
import PlacementFeedPage from "../pages/placement/PlacementFeedPage";
import AddExperiencePage from "../pages/placement/AddExperiencePage";
import RoommatePage from "../pages/roommate/RoommatePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import { useNavigation } from "../context/NavigationContext";

export default function AppRoutes() {
  const { activeTab, subView, user, authView } = useNavigation();

  // Redirect to Auth Views if not logged in
  if (!user) {
    switch (authView) {
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
      case "forgot-password":
        return <ForgotPasswordPage />;
      case "verify-email":
        return <VerifyEmailPage />;
      default:
        return <LoginPage />;
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Lost & Found":
        if (subView === "create") {
          return <CreatePostPage />;
        }
        if (subView === "details") {
          return <LostFoundDetails />;
        }
        return <LostFoundPage />;
      case "Anonymous Confessions":
        if (subView === "create") {
          return <CreateConfessionPage />;
        }
        if (subView === "details") {
          return <ConfessionDetailsPage />;
        }
        return <ConfessionFeedPage />;
      case "Attendance Tracker":
        if (subView === "details") {
          return <AttendanceDetailsPage />;
        }
        return <AttendancePage />;
      case "Placement Portal":
        if (subView === "create") {
          return <AddExperiencePage />;
        }
        return <PlacementFeedPage />;
      case "Profile":
        if (subView === "edit") {
          return <EditProfilePage />;
        }
        if (subView === "posts") {
          return <MyPostsPage />;
        }
        return <ProfilePage />;
      case "Settings":
        return <SettingsPage />;
      case "Roommate Finder":
        return <RoommatePage />;
      default:
        return (
          <div className="under-construction" style={{ padding: "64px 32px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }}>
              {activeTab} Page
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              This section is currently under construction. Check back later!
            </p>
          </div>
        );
    }
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
}


