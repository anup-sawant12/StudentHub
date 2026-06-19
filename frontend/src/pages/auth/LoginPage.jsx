import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { useNavigation } from "../../context/NavigationContext";

export function LoginPage() {
  const { login } = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      // Simulate quick network latency for extremely premium feel
      await new Promise((resolve) => setTimeout(resolve, 800));
      login(email, password);
    } catch (e) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={handleLoginSubmit} error={error} loading={loading} />
    </AuthLayout>
  );
}

export default LoginPage;
