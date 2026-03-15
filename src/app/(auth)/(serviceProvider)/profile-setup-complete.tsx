import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileSetupComplete() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-[#005823CC]">
        <Text className="text-3xl text-white">✓</Text>
      </View>
      <Text className="mt-8 text-center text-3xl font-bold text-gray-900">Your profile setup is complete</Text>
      <Text className="mt-2 text-center text-base text-gray-600">
        We are reviewing your documents and will notify you once verified.
      </Text>
      <Pressable className="mt-10 w-full rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(protected)/(tabs)/")}>
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>
    </View>
  );
}


