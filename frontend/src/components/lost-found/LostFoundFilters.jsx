import "./LostFoundFilters.css";

const CATEGORIES = ["All", "Electronics", "Documents", "Books", "Keys", "Personal"];
const STATUSES = ["All", "Lost", "Found"];

export default function LostFoundFilters({
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="filters-container">
      {/* Status Filter */}
      <div className="filter-wrapper">
        <span className="filter-label">Status:</span>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="filter-select"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status} className="filter-option">
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-wrapper">
        <span className="filter-label">Category:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select animate-checkmark"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="filter-option">
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
