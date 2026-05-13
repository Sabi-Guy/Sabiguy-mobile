import { apiRequest } from "@/lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProviderProfileData = {
  gender?: string | null;
  city?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
};

export type ProviderProfileResponse = {
  success?: boolean;
  message?: string;
  data?: ProviderProfileData | null;
};

const PROVIDER_PROFILE_CACHE_KEY = "provider_profile_cache";

export async function updateProviderProfile(payload: {
  gender: string;
  city: string;
  address: string;
}) {
  return apiRequest<ProviderProfileResponse>("/provider", {
    method: "POST",
    json: payload,
  });
}

export async function getCachedProviderProfile() {
  const raw = await AsyncStorage.getItem(PROVIDER_PROFILE_CACHE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProviderProfileData;
  } catch {
    return null;
  }
}

export async function setCachedProviderProfile(profile: ProviderProfileData) {
  await AsyncStorage.setItem(PROVIDER_PROFILE_CACHE_KEY, JSON.stringify(profile));
}
