"use client";
import { useState, useCallback } from "react";
import type { User, AuthState } from "@/lib/types/user.types";

const MOCK_USER: User = {
  id: "usr_demo",
  email: "demo@sportfara.com",
  fullName: "James Adeyemi",
  role: "creator",
  tier: "premium",
  createdAt: "2026-01-15",
  locale: "en",
};

export function useAuth(): AuthState & {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
} {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USER);
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
    signIn,
    signOut,
  };
}
