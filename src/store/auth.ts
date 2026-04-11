import { create } from "zustand";
import {
  clearAuthToken,
  clearRefreshToken,
  clearUserEmail,
  clearUserName,
  clearUserRole,
  getAuthToken,
  getRefreshToken,
  getUserEmail,
  getUserName,
  getUserRole,
  setAuthToken,
  setRefreshToken,
  setUserEmail,
  setUserName,
  setUserRole,
} from "@/lib/token";

export type AuthRole = "provider" | "buyer" | "user" | null;

type SessionPayload = {
  token?: string | null;
  refreshToken?: string | null;
  email?: string | null;
  name?: string | null;
  role?: string | null;
};

type AuthState = {
  hydrated: boolean;
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  name: string | null;
  role: AuthRole;
  isAuthenticated: boolean;
  initializeAuth: () => Promise<void>;
  setSession: (payload: SessionPayload) => Promise<void>;
  clearSession: () => Promise<void>;
};

const normalizeRole = (role?: string | null): AuthRole => {
  if (!role) return null;
  const normalized = role.toLowerCase();
  if (normalized === "provider") return "provider";
  if (normalized === "buyer" || normalized === "user") return normalized;
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  hydrated: false,
  token: null,
  refreshToken: null,
  email: null,
  role: null,
  isAuthenticated: false,

  initializeAuth: async () => {
    const [token, refreshToken, email, role, name] = await Promise.all([
      getAuthToken(),
      getRefreshToken(),
      getUserEmail(),
      getUserRole(),
      getUserName(),
    ]);

    const normalizedRole = normalizeRole(role);

    set({
      hydrated: true,
      token,
      refreshToken,
      email,
      name,
      role: normalizedRole,
      isAuthenticated: Boolean(token),
    });
  },

  setSession: async ({ token, refreshToken, email, name, role }) => {
    const normalizedRole = normalizeRole(role);

    if (token) {
      await setAuthToken(token);
    }
    if (refreshToken) {
      await setRefreshToken(refreshToken);
    }
    if (email) {
      await setUserEmail(email);
    }
    if (name) {
      await setUserName(name);
    }
    if (normalizedRole) {
      await setUserRole(normalizedRole);
    }

    set((state) => ({
      token: token ?? state.token,
      refreshToken: refreshToken ?? state.refreshToken,
      email: email ?? state.email,
      name: name ?? state.name,
      role: normalizedRole ?? state.role,
      isAuthenticated: Boolean(token ?? state.token),
    }));
  },

  clearSession: async () => {
    await Promise.all([
      clearAuthToken(),
      clearRefreshToken(),
      clearUserEmail(),
      clearUserName(),
      clearUserRole(),
    ]);

    set({
      token: null,
      refreshToken: null,
      email: null,
      name: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
