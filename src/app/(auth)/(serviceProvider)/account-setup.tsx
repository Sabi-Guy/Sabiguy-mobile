import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";

export default function ServiceProviderAccountSetup() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <BackButton />

      <View className="h-16 w-16 items-center justify-center rounded-full bg-[#005823CC]">
        <Ionicons name="checkmark" size={28} color="#FFFFFF" />
      </View>

      <View className="mt-8 items-center">
        <Text className="text-3xl font-bold text-gray-900">Verification successful</Text>
        <Text className="mt-2 text-center text-base text-gray-600">
          Welcome onboard, Your SABIGUY account is almost complete.
          Just a few more details to help personalize your experience.
        </Text>
      </View>

      <View className="mt-10 w-full">
        <Pressable
          className="w-full rounded-md bg-[#005823CC] py-4"
          onPress={() => router.push("/(auth)/(serviceProvider)/personal-information")}
        >
          <Text className="text-center font-semibold text-white">Continue</Text>
        </Pressable>

        <Pressable className="mt-6" onPress={() => router.push("/(protected)/(serviceProvider)/(tabs)")}>
          <Text className="text-center font-semibold text-gray-600">Skip</Text>
        </Pressable>
      </View>
    </View>
  );
}
