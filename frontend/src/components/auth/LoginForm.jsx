import React, { useState } from "react";
import { useNavigation } from "../../context/NavigationContext";

export function LoginForm({ onSubmit, error, loading }) {
  const { setAuthView } = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!formData.email.endsWith("vit.edu.in")) {
      errs.email = "Please use an institutional email ending in @vit.edu.in";
    }

    if (!formData.password) {
      errs.password = "Password is required";
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-header-info">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to your StudentHub ecosystem account.</p>
      </div>

      {error && <div className="auth-error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="email">Institutional Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g.abc.xyz@vit.edu.in"
          className={validationErrors.email ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.email && (
          <span className="error-text">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <div className="label-row">
          <label htmlFor="password">Password</label>
          <button
            type="button"
            onClick={() => setAuthView("forgot-password")}
            className="auth-link-inline"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={validationErrors.password ? "error" : ""}
          disabled={loading}
        />
        {validationErrors.password && (
          <span className="error-text">{validationErrors.password}</span>
        )}
      </div>

      <button type="submit" className="btn-auth-submit" disabled={loading}>
        {loading ? <span className="auth-spinner"></span> : "Sign In"}
      </button>

      <div className="auth-footer-prompt">
        <span>New to StudentHub?</span>
        <button
          type="button"
          onClick={() => setAuthView("register")}
          className="auth-link"
          disabled={loading}
        >
          Create an account
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
