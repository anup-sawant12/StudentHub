import { CATEGORY_NAMES } from "../../data/confessionCategories";
import "./ConfessionFilters.css";

export default function ConfessionFilters({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) {
  const categories = ["All", ...CATEGORY_NAMES];

  return (
    <div className="conf-filters-box">
      {/* Category Pills List */}
      <div className="conf-pills-list">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`conf-pill-btn ${isActive ? "active" : ""}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Sorting Dropdown */}
      <div className="conf-sort-wrapper">
        <span className="conf-sort-label">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="conf-sort-select"
        >
          <option value="recent">Recent</option>
          <option value="popular">Most Liked</option>
        </select>
      </div>
    </div>
  );
}
