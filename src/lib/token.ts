import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EMAIL_KEY = "user_email";
const ROLE_KEY = "user_role";
const NAME_KEY = "user_name";

let secureStoreAvailable: boolean | null = null;

async function canUseSecureStore() {
  if (secureStoreAvailable !== null) return secureStoreAvailable;
  try {
    secureStoreAvailable = await SecureStore.isAvailableAsync();
  } catch {
    secureStoreAvailable = false;
  }

  return secureStoreAvailable;
}

async function setStoredItem(key: string, value: string) {
  if (await canUseSecureStore()) {
    await SecureStore.setItemAsync(key, value);
  } else {
    await AsyncStorage.setItem(key, value);
  }
}

async function getStoredItem(key: string) {
  if (await canUseSecureStore()) {
    return SecureStore.getItemAsync(key);
  }

  return AsyncStorage.getItem(key);
}

async function deleteStoredItem(key: string) {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await AsyncStorage.removeItem(key);
  }
}

export async function setAuthToken(token: string) {
  if (!token) return;
  await setStoredItem(TOKEN_KEY, token);
}

export async function getAuthToken() {
  return getStoredItem(TOKEN_KEY);
}

export async function clearAuthToken() {
  await deleteStoredItem(TOKEN_KEY);
}

export async function setRefreshToken(token: string) {
  if (!token) return;
  await setStoredItem(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken() {
  return getStoredItem(REFRESH_TOKEN_KEY);
}

export async function clearRefreshToken() {
  await deleteStoredItem(REFRESH_TOKEN_KEY);
}

export async function setUserEmail(email: string) {
  if (!email) return;
  await setStoredItem(EMAIL_KEY, email);
}

export async function getUserEmail() {
  return getStoredItem(EMAIL_KEY);
}

export async function clearUserEmail() {
  await deleteStoredItem(EMAIL_KEY);
}

export async function setUserRole(role: string) {
  if (!role) return;
  await setStoredItem(ROLE_KEY, role);
}

export async function getUserRole() {
  return getStoredItem(ROLE_KEY);
}

export async function clearUserRole() {
  await deleteStoredItem(ROLE_KEY);
}

export async function setUserName(name: string) {
  if (!name) return;
  await setStoredItem(NAME_KEY, name);
}

export async function getUserName() {
  return getStoredItem(NAME_KEY);
}

export async function clearUserName() {
  await deleteStoredItem(NAME_KEY);
}
