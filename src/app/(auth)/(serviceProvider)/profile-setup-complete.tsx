import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileSetupComplete() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="items-center">
        <View className="relative items-center justify-center">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-[#005823CC]">
            <Ionicons name="checkmark" size={28} color="#FFFFFF" />
          </View>
          <View className="absolute -top-6 h-0 w-0 border-x-[14px] border-b-[24px] border-x-transparent border-b-[#4B5563]" />
          <View className="absolute -top-3 h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          <View className="absolute -left-8 top-2 h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          <View className="absolute -right-8 top-1 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          <View className="absolute -left-6 -top-2 h-1 w-3 -rotate-12 rounded-full bg-[#9CA3AF]" />
          <View className="absolute -right-6 -top-1 h-1 w-3 rotate-12 rounded-full bg-[#9CA3AF]" />
        </View>
        <Text className="mt-4 text-center text-3xl font-bold text-gray-900">
          Your profile setup is complete
        </Text>
        <Text className="mt-2 text-center text-base text-gray-600">
          We are reviewing your documents and will notify you once you&apos;re verified.
        </Text>
      </View>

      <Pressable
        className="mt-10 w-full rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(protected)/(serviceProvider)/(tabs)")}
      >
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>
    </View>
  );
}
