import * as Location from "expo-location";
import { useAuthStore } from "@/store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_LOCATION_CACHE_KEY = "user_location_cache";

type UpdateLocationParams = {
	address: string;
};

type LocationPayload = {
	address: string;
	latitude: number;
	longitude: number;
};

const formatAddress = (item: Location.LocationGeocodedAddress) => {
	const parts = [
		item.name,
		item.street,
		item.city,
		item.region,
		item.postalCode,
		item.country,
	].filter(Boolean);

	return parts.join(", ");
};

const sendLocation = async (payload: LocationPayload) => {
	const token = useAuthStore.getState().token;
	const response = await fetch("https://api.nifesi.xyz/api/v1/users/location", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(`Failed to update location: ${response.status}`);
	}

	await setCachedUserLocation({ address: payload.address, latitude: payload.latitude, longitude: payload.longitude });

	return response.json();
};

export async function updateUserLocation({ address }: UpdateLocationParams) {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		throw new Error("Location permission denied");
	}

	const geocoded = await Location.geocodeAsync(address);
	if (!geocoded || geocoded.length === 0) {
		throw new Error("Could not resolve coordinates for this address");
	}

	const { latitude, longitude } = geocoded[0];

	return sendLocation({ address, latitude, longitude });
}

export async function updateUserLocationFromDevice() {
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== "granted") {
		throw new Error("Location permission denied");
	}

	const position = await Location.getCurrentPositionAsync({
		accuracy: Location.Accuracy.Balanced,
	});

	const { latitude, longitude } = position.coords;
	const reversed = await Location.reverseGeocodeAsync({ latitude, longitude });
	const address = reversed[0] ? formatAddress(reversed[0]) : `${latitude}, ${longitude}`;

	return sendLocation({ address, latitude, longitude });
}

export async function getCachedUserLocation() {
	const raw = await AsyncStorage.getItem(USER_LOCATION_CACHE_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw) as { address?: string | null; latitude?: number; longitude?: number };
	} catch {
		return null;
	}
}

export async function setCachedUserLocation(payload: { address: string; latitude?: number; longitude?: number }) {
	await AsyncStorage.setItem(USER_LOCATION_CACHE_KEY, JSON.stringify(payload));
}
