"use client";

import { AuthScreen } from "@/components/auth/auth-screen";
import { useAuth } from "@/components/auth/auth-provider";

export default function LoginPage() {
  const { login } = useAuth();

  return <AuthScreen onAuthenticated={login} />;
}
