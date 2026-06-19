import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigation } from "../../context/NavigationContext";
import { authService } from "../../services/authService";

export function VerifyEmailPage() {
  const { setAuthView, emailToVerify } = useNavigation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const targetEmail = emailToVerify || "your student email";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      authService.verifyEmail(targetEmail, code);
      setSuccess(true);
    } catch (e) {
      setError(e.message || "Failed to verify email. Try '123456' as a code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {success ? (
        <div className="auth-form">
          <div className="auth-header-info">
            <h2 className="auth-title">Email Verified!</h2>
            <p className="auth-subtitle">Your student account is now active.</p>
          </div>

          <div className="auth-success-banner">
            ✨ Your email has been verified successfully. You can now log in using your password.
          </div>

          <button
            type="button"
            onClick={() => setAuthView("login")}
            className="btn-auth-submit"
            style={{ width: "100%" }}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-header-info">
            <h2 className="auth-title">Verify Email</h2>
            <p className="auth-subtitle">Enter verification code sent to {targetEmail}.</p>
          </div>

          {error && <div className="auth-error-banner">{error}</div>}

          <div className="form-group">
            <label htmlFor="verify-code">6-Digit Verification Code</label>
            <input
              type="text"
              id="verify-code"
              maxLength="6"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d]/g, "");
                setCode(val);
                setError("");
              }}
              placeholder="e.g. 123456"
              disabled={loading}
              required
              style={{ letterSpacing: "8px", textIndent: "4px", textAlign: "center", fontSize: "18px" }}
            />
          </div>

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner"></span> : "Verify Email"}
          </button>

          <div className="auth-footer-prompt">
            <span>Didn't receive code?</span>
            <button
              type="button"
              onClick={() => alert("Verification code has been resent to " + targetEmail)}
              className="auth-link"
              disabled={loading}
            >
              Resend Code
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

export default VerifyEmailPage;
