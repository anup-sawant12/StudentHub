import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  return (
    <div className="layout-container">

      <Sidebar />

      <Navbar />

      <main className="layout-main">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;