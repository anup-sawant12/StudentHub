import { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";
import "./EditProfileForm.css";

export default function EditProfileForm({ profile, onUpdate }) {
  const { setSubView } = useNavigation();
  const [formData, setFormData] = useState({
    name: profile.name || "",
    avatar: profile.avatar || "",
    year: profile.year || "",
    bio: profile.bio || "",
    phone: profile.phone || "",
    skillsInput: profile.skills ? profile.skills.join(", ") : "",
    rollNumber: profile.rollNumber || "",
    email: profile.email || "",
    department: profile.department || "",
    degree: profile.degree || ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.bio.trim()) newErrors.bio = "Biography is required";
    if (formData.avatar && !formData.avatar.startsWith("http")) {
      newErrors.avatar = "Please enter a valid image URL starting with http/https";
    }
    if (!formData.email.trim()) {
      newErrors.email = "University Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Parse comma-separated skills
    const skillsArray = formData.skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onUpdate({
      ...profile,
      name: formData.name,
      avatar: formData.avatar || "https://img.magnific.com/free-photo/young-handsome-man-wearing-casual-tshirt-blue-background-happy-face-smiling-with-crossed-arms-looking-camera-positive-person_839833-12963.jpg?semt=ais_hybrid&w=740&q=80",
      year: formData.year,
      bio: formData.bio,
      phone: formData.phone,
      skills: skillsArray,
      rollNumber: formData.rollNumber,
      email: formData.email,
      department: formData.department,
      degree: formData.degree
    });

    setSubView(null);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2 className="form-heading">Edit Student Profile</h2>

      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group full-width">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Profile Avatar URL */}
        <div className="form-group full-width">
          <label htmlFor="avatar">Profile Avatar URL</label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="e.g. https://images.unsplash.com/..."
            className={errors.avatar ? "error" : ""}
          />
          {errors.avatar && <span className="error-text">{errors.avatar}</span>}
        </div>

        {/* Year/Class */}
        <div className="form-group">
          <label htmlFor="year">Class / Year</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. Sophomore (Class of 2028)"
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Contact Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 019-2834"
          />
        </div>

        {/* Skills input */}
        <div className="form-group full-width">
          <label htmlFor="skillsInput">Skills (separated by commas)</label>
          <input
            type="text"
            id="skillsInput"
            name="skillsInput"
            value={formData.skillsInput}
            onChange={handleChange}
            placeholder="e.g. React, JavaScript, Node.js, SQL"
          />
        </div>

        {/* Bio */}
        <div className="form-group full-width">
          <label htmlFor="bio">Biography *</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            className={errors.bio ? "error" : ""}
          ></textarea>
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>

        {/* Institutional Details */}
        <div className="form-section-title full-width">Institutional Details</div>

        {/* Roll Number */}
        <div className="form-group">
          <label htmlFor="rollNumber">Student Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
          />
        </div>

        {/* Institutional Email */}
        <div className="form-group">
          <label htmlFor="email">Institutional Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        {/* Degree */}
        <div className="form-group">
          <label htmlFor="degree">Degree Program</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="button" onClick={() => setSubView(null)} className="btn-cancel">
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Save Profile
        </button>
      </div>
    </form>
  );
}
