import { useState } from "react";
import "./ConfessionComments.css";

export default function ConfessionComments({ confessionId, comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    onAddComment(confessionId, newComment);
    setNewComment("");
    setError("");
  };

  return (
    <div className="conf-comments-section">
      <h3 className="comments-heading">
        Discussion ({comments ? comments.length : 0})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form-box">
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setError("");
          }}
          placeholder="Reply to this confession anonymously..."
          rows="3"
          className={`comment-textarea ${error ? "error" : ""}`}
        ></textarea>
        {error && <span className="comment-error-msg">{error}</span>}
        <div className="comment-form-actions">
          <button type="submit" className="comment-btn-submit">
            Comment Anonymously
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-bubble">
              <div className="comment-bubble-header">
                <span className="comment-author">Anonymous Student</span>
                <span className="comment-time">{comment.time}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments-prompt">
            No comments yet. Start the discussion!
          </p>
        )}
      </div>
    </div>
  );
}
