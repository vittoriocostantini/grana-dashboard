"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearSession,
  readSession,
  saveSession,
  type AuthUser,
} from "@/lib/auth-storage";
import { homePathForUser } from "@/lib/user-filters";

type AuthContextValue = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(readSession());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!user && pathname !== "/login") {
      router.replace("/login");
      return;
    }

    if (user && (pathname === "/login" || pathname === "/")) {
      router.replace(homePathForUser(user.email));
    }
  }, [ready, user, pathname, router]);

  function login(nextUser: AuthUser) {
    saveSession(nextUser);
    setUser(nextUser);
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  const waitingForRedirect =
    !ready ||
    (!user && pathname !== "/login") ||
    Boolean(user && (pathname === "/login" || pathname === "/"));

  if (waitingForRedirect) {
    return <div className="min-h-dvh bg-white" />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
