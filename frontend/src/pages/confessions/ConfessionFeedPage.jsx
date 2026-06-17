import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { useConfessions } from "../../hooks/useConfessions";
import ConfessionFilters from "../../components/confessions/ConfessionFilters";
import ConfessionFeed from "../../components/confessions/ConfessionFeed";
import ConfessionStats from "../../components/confessions/ConfessionStats";
import TrendingConfessions from "../../components/confessions/TrendingConfessions";
import "./ConfessionFeedPage.css";

export default function ConfessionFeedPage() {
  const { navigateToCreate, searchQuery } = useNavigation();
  const { confessions, likeConfession } = useConfessions();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  // 1. Filter items
  const filteredConfessions = confessions.filter((item) => {
    const matchesSearch =
      searchQuery === "" || item.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 2. Sort items
  const sortedConfessions = [...filteredConfessions].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    // Default to 'recent' (our items are pre-sorted by newest, but we can do a mock ID sorting)
    return 0; // maintain original chronological unshift order
  });

  return (
    <div className="conf-feed-page">
      {/* Page Header */}
      <div className="conf-feed-header">
        <div className="conf-header-text">
          <h1 className="conf-page-title">Anonymous Confessions</h1>
          <p className="conf-page-subtitle">
            Share your secrets, ask for advice, or speak your mind completely anonymously.
          </p>
        </div>
        <button onClick={navigateToCreate} className="conf-btn-share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lock-plus-icon">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <line x1="12" y1="15" x2="12" y2="19" />
            <line x1="10" y1="17" x2="14" y2="17" />
          </svg>
          Share Confession
        </button>
      </div>

      {/* Main Splits Grid Layout */}
      <div className="conf-feed-layout">
        {/* Left Column: Filters and Posts Feed */}
        <div className="conf-feed-main-col">
          <div className="conf-filters-wrapper">
            <ConfessionFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
          <div className="conf-feed-timeline">
            <ConfessionFeed items={sortedConfessions} onLike={likeConfession} />
          </div>
        </div>

        {/* Right Column: Sidebar Stats & Popular Listings */}
        <div className="conf-feed-side-col">
          <ConfessionStats confessions={confessions} />
          <TrendingConfessions />
        </div>
      </div>
    </div>
  );
}
