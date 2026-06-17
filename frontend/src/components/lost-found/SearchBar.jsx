import { useNavigation } from "../../context/NavigationContext";
import "./SearchBar.css";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useNavigation();

  return (
    <div className="search-bar-container">
      <span className="search-bar-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery || ""}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar-input"
      />
    </div>
  );
}
