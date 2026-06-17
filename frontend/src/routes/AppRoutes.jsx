import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import LostFoundPage from "../pages/lost-found/LostFoundPage";
import CreatePostPage from "../pages/lost-found/CreatePostPage";
import LostFoundDetails from "../pages/lost-found/LostFoundDetails";
import ConfessionFeedPage from "../pages/confessions/ConfessionFeedPage";
import CreateConfessionPage from "../pages/confessions/CreateConfessionPage";
import ConfessionDetailsPage from "../pages/confessions/ConfessionDetailsPage";
import { useNavigation } from "../context/NavigationContext";

export default function AppRoutes() {
  const { activeTab, subView } = useNavigation();

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
