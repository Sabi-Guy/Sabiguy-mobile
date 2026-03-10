import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function FaceCapture() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Face capturing</Text>
        <Text className="mt-2 text-base text-gray-600">Look directly at the camera.</Text>
      </View>

      <View className="mt-12 h-72 rounded-xl border-2 border-dashed border-[#005823CC]" />

      <View className="mt-10 items-center">
        <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-[#005823CC]">
          <Text className="text-xl text-white">REC</Text>
        </Pressable>
      </View>

      <Pressable className="mt-auto mb-10 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/verify-skill")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </View>
  );
}


