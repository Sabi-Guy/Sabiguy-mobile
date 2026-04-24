import { create } from "zustand";
import {
  clearAuthToken,
  clearUserKycLevel,
  clearRefreshToken,
  clearUserEmail,
  clearUserName,
  clearUserRole,
  getAuthToken,
  getUserKycLevel,
  getRefreshToken,
  getUserEmail,
  getUserName,
  getUserRole,
  setAuthToken,
  setRefreshToken,
  setUserEmail,
  setUserKycLevel,
  setUserName,
  setUserRole,
} from "@/lib/token";
import { parseKycLevel } from "@/lib/provider-kyc";

export type AuthRole = "provider" | "buyer" | "user" | null;

type SessionPayload = {
  token?: string | null;
  refreshToken?: string | null;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  kycLevel?: number | string | null;
};

type AuthState = {
  hydrated: boolean;
  token: string | null;
  refreshToken: string | null;
  email: string | null;
  name: string | null;
  role: AuthRole;
  kycLevel: number | null;
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
  name: null,
  role: null,
  kycLevel: null,
  isAuthenticated: false,

  initializeAuth: async () => {
    const [token, refreshToken, email, role, name, kycLevelRaw] = await Promise.all([
      getAuthToken(),
      getRefreshToken(),
      getUserEmail(),
      getUserRole(),
      getUserName(),
      getUserKycLevel(),
    ]);

    const normalizedRole = normalizeRole(role);
    const normalizedKycLevel = parseKycLevel(kycLevelRaw);

    set({
      hydrated: true,
      token,
      refreshToken,
      email,
      name,
      role: normalizedRole,
      kycLevel: normalizedKycLevel,
      isAuthenticated: Boolean(token),
    });
  },

  setSession: async ({ token, refreshToken, email, name, role, kycLevel }) => {
    const normalizedRole = normalizeRole(role);
    const normalizedKycLevel = parseKycLevel(kycLevel);

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
    if (normalizedKycLevel !== null) {
      await setUserKycLevel(normalizedKycLevel);
    }

    set((state) => ({
      token: token ?? state.token,
      refreshToken: refreshToken ?? state.refreshToken,
      email: email ?? state.email,
      name: name ?? state.name,
      role: normalizedRole ?? state.role,
      kycLevel: normalizedKycLevel ?? state.kycLevel,
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
      clearUserKycLevel(),
    ]);

    set({
      token: null,
      refreshToken: null,
      email: null,
      name: null,
      role: null,
      kycLevel: null,
      isAuthenticated: false,
    });
  },
}));
