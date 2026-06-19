import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigation } from "../../context/NavigationContext";
import { authService } from "../../services/authService";

export function RegisterPage() {
  const { login } = useNavigation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (name, email, password) => {
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      authService.register(name, email, password);
      
      // Directly log in
      login(email, password);
    } catch (e) {
      setError(e.message || "Failed to register account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <RegisterForm onSubmit={handleRegisterSubmit} error={error} loading={loading} />
    </AuthLayout>
  );
}

export default RegisterPage;
