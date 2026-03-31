import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EMAIL_KEY = "user_email";
const ROLE_KEY = "user_role";

export async function setAuthToken(token: string) {
  if (!token) return;
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getAuthToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearAuthToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function setRefreshToken(token: string) {
  if (!token) return;
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function clearRefreshToken() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export async function setUserEmail(email: string) {
  if (!email) return;
  await SecureStore.setItemAsync(EMAIL_KEY, email);
}

export async function getUserEmail() {
  return SecureStore.getItemAsync(EMAIL_KEY);
}

export async function clearUserEmail() {
  await SecureStore.deleteItemAsync(EMAIL_KEY);
}

export async function setUserRole(role: string) {
  if (!role) return;
  await SecureStore.setItemAsync(ROLE_KEY, role);
}

export async function getUserRole() {
  return SecureStore.getItemAsync(ROLE_KEY);
}

export async function clearUserRole() {
  await SecureStore.deleteItemAsync(ROLE_KEY);
}
