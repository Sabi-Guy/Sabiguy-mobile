import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import cancel from "../../../../../../assets/cancel.png";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import {
  getCachedUserLocation,
  updateUserLocation,
  updateUserLocationFromDevice,
} from "@/lib/getLocation";

export default function location() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter new address");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadPlaceholder = async () => {
      const cached = await getCachedUserLocation();
      if (active && cached?.address?.trim()) {
        setPlaceholder(cached.address.trim());
      }
    };

    loadPlaceholder();

    return () => {
      active = false;
    };
  }, []);

  const handleUpdateLocation = async () => {
    if (!address.trim()) {
      setError("Enter an address to continue");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await updateUserLocation({ address: address.trim() });
      router.back();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update location";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUseDeviceLocation = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await updateUserLocationFromDevice();
      router.back();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update location";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ScrollView className="p-5">
      <View className="flex-row justify-between mb-5 items-center">
        <Text>Service Location</Text>
        <TouchableOpacity onPress={router.back}>
          <Image source={cancel} className="h-5 w-5" />
        </TouchableOpacity>
      </View>
      <SearchBar
        placeholder={placeholder}
        value={address}
        onChangeText={setAddress}
      />
      {error ? <Text className="mt-2 text-xs text-red-600">{error}</Text> : null}
      <TouchableOpacity
        className={`mt-5 rounded-lg px-4 py-3 ${submitting ? "opacity-70" : ""}`}
        style={{ backgroundColor: "#231F201A" }}
        onPress={handleUpdateLocation}
        disabled={submitting}
      >
        <Text className="text-center text-sm font-semibold text-[#005823]">
          Update location
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleUseDeviceLocation}
        disabled={submitting}
        className={`mt-4 rounded-lg px-4 py-3 ${submitting ? "opacity-70" : ""}`}
        style={{ backgroundColor: "#231F201A" }}
      >
        <View className="flex-row items-center justify-center gap-2">
          <Entypo name="location-pin" size={20} color="#0F7A3A" />
          <Text className="text-sm font-semibold text-[#005823]">
            {submitting ? "Updating location..." : "Use your current location"}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
