import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import Toast from "react-native-toast-message";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

const GENDER_OPTIONS = ["Female", "Male", "Other", "Prefer not to say"];

export default function PersonalInformation() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [gender, setGender] = useState<string>("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!gender || !address.trim() || !city.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please complete gender, address, and city.",
      });
      return;
    }

    try {
      setSubmitting(true);
        await apiRequest("/provider", {
        method: "POST",
        json: {
          gender: gender.toLowerCase(),
          city: city.trim(),
          address: address.trim(),
        },
      });
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Personal information updated.",
      });
      await setSession({ kycLevel: 2 });
      router.push("/(auth)/(serviceProvider)/account-type");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Unable to save details. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-8">
        <View className="mb-6">
          <ProgressBar step={1} total={5} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Personal Information</Text>
        <Text className="mt-2 text-base text-gray-600">
          Let&apos;s know who you are, tell us a bit about yourself
        </Text>
      </View>

      <View className="mt-6 gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Gender</Text>
          <Pressable
            className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
            onPress={() => setShowGenderOptions((prev) => !prev)}
          >
            <Text className="text-sm text-gray-700">{gender || "Gender"}</Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showGenderOptions ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              {GENDER_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  className="px-4 py-3"
                  onPress={() => {
                    setGender(option);
                    setShowGenderOptions(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{option}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Address</Text>
          <TextInput
            placeholder="Your address"
            value={address}
            onChangeText={setAddress}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">City of residence</Text>
          <TextInput
            placeholder="Lagos"
            value={city}
            onChangeText={setCity}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
        </View>
      </View>

      {/* Work coverage radius removed per latest flow */}

      <Pressable
        className={`mt-8 rounded-md bg-[#005823CC] py-4 ${submitting ? "opacity-70" : ""}`}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text className="text-center font-semibold text-white">
          {submitting ? "Saving..." : "Next"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
