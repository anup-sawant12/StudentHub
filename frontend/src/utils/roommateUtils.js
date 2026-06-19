/**
 * Helper to clean and format rent strings.
 * E.g., 8000 -> "₹8,000/month", "₹8,000" -> "₹8,000/month"
 */
export function formatRent(rent) {
  if (!rent) return "₹0/month";
  let cleanVal = String(rent).replace(/[^\d]/g, "");
  if (!cleanVal) return rent; // fallback if it's already a text string like "₹8,000/month"
  let parsed = parseInt(cleanVal, 10);
  return `₹${parsed.toLocaleString("en-IN")}/month`;
}

/**
 * Calculates a match score percentage based on overlapping tags/interests.
 * Returns a number between 0 and 100.
 */
export function calculateMatchScore(userTags, postTags) {
  if (!userTags || !postTags || userTags.length === 0 || postTags.length === 0) {
    return 0;
  }
  
  const userTagsLower = userTags.map(t => t.toLowerCase());
  const postTagsLower = postTags.map(t => t.toLowerCase());
  
  const commonTags = userTagsLower.filter(tag => postTagsLower.includes(tag));
  
  // Calculate score as percentage of matching user tags
  return Math.min(100, Math.round((commonTags.length / userTagsLower.length) * 100));
}

