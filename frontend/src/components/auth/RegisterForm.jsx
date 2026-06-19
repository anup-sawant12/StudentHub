import React, { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";

export function RegisterForm({ onSubmit, error, loading }) {
  const { setAuthView } = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }
    
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!formData.email.endsWith("vit.edu.in")) {
      errs.email = "Please use an institutional email ending in @vit.edu.in";
    }
    
    if (!formData.password) {
      errs.password = "Password is required";
    } else if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData.name, formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-header-info">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Get started with your StudentHub campus account.</p>
      </div>

      {error && <div className="auth-error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Anup Sawant"
          className={validationErrors.name ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.name && (
          <span className="error-text">{validationErrors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Institutional Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g  abc.xyz@vit.edu.in"
          className={validationErrors.email ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.email && (
          <span className="error-text">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Min. 6 characters"
          className={validationErrors.password ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.password && (
          <span className="error-text">{validationErrors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          className={validationErrors.confirmPassword ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.confirmPassword && (
          <span className="error-text">{validationErrors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" className="btn-auth-submit" disabled={loading}>
        {loading ? <span className="auth-spinner"></span> : "Sign Up"}
      </button>

      <div className="auth-footer-prompt">
        <span>Already have an account?</span>
        <button
          type="button"
          onClick={() => setAuthView("login")}
          className="auth-link"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
