import { useNavigation } from "../../context/NavigationContext";
import "./ProfileHeader.css";

export default function ProfileHeader({ activeSubtab }) {
  const { setSubView } = useNavigation();

  return (
    <div className="profile-header-comp">
      <div className="profile-sub-nav">
        <button
          onClick={() => setSubView(null)}
          className={`sub-nav-btn ${activeSubtab === "overview" ? "active" : ""}`}
        >
          Profile Overview
        </button>
        <button
          onClick={() => setSubView("posts")}
          className={`sub-nav-btn ${activeSubtab === "posts" ? "active" : ""}`}
        >
          My Contributions
        </button>
      </div>
    </div>
  );
}

