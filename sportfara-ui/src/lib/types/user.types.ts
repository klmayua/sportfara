export type UserTier = "free" | "premium" | "pro";
export type UserRole = "user" | "creator" | "admin";

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  tier: UserTier;
  createdAt: string;
  locale: "en" | "fr";
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
