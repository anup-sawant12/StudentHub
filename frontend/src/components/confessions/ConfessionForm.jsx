import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import { CATEGORY_NAMES } from "../../data/confessionCategories";
import "./ConfessionForm.css";

const MAX_CHARACTERS = 500;

export default function ConfessionForm({ onAdd }) {
  const { navigateToList } = useNavigation();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARACTERS) {
      setText(val);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Confession text cannot be empty!");
      return;
    }
    if (text.trim().length < 10) {
      setError("Please write a confession of at least 10 characters.");
      return;
    }

    onAdd(text, category);
    navigateToList();
  };

  const charsRemaining = MAX_CHARACTERS - text.length;

  return (
    <form onSubmit={handleSubmit} className="conf-form-comp">
      <div className="conf-form-header">
        <h2 className="conf-form-title">Write Confession Anonymously 🤐</h2>
        <p className="conf-form-subtitle">
          Your identity will never be tracked or displayed. Express yourself freely.
        </p>
      </div>

      <div className="conf-form-body">
        {/* Category Selector */}
        <div className="conf-form-group">
          <label htmlFor="conf-category">Choose Category</label>
          <select
            id="conf-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="conf-select-input"
          >
            {CATEGORY_NAMES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Confession Text Area */}
        <div className="conf-form-group">
          <div className="conf-label-row">
            <label htmlFor="conf-text">Confession Content *</label>
            <span className={`conf-char-counter ${charsRemaining < 50 ? "warning" : ""}`}>
              {charsRemaining} characters left
            </span>
          </div>
          <textarea
            id="conf-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Type your secret or thoughts here... Be respectful of campus guidelines."
            rows="6"
            className={`conf-textarea-input ${error ? "error" : ""}`}
          ></textarea>
          {error && <span className="conf-error-text">{error}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="conf-form-actions">
        <button type="button" onClick={navigateToList} className="conf-btn-cancel">
          Cancel
        </button>
        <button type="submit" className="conf-btn-submit">
          Post Anonymously
        </button>
      </div>
    </form>
  );
}
