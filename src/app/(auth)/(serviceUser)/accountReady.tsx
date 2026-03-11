import React from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function accountReady() {
      const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="h-16 w-16 items-center justify-center rounded-full bg-[#005823CC]">
        <Text className="text-3xl text-white">OK</Text>
      </View>
      <Text className="mt-8 text-center text-3xl font-bold text-gray-900">Your account is ready</Text>
      <Text className="mt-2 text-center text-base text-gray-600">
       Explore our services, connect with professionals, and start getting things done with ease.
      </Text>
      <Pressable className="mt-10 w-full rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(protected)/(tabs)/index")}>
        <Text className="text-center font-semibold text-white">Go to Dashboard</Text>
      </Pressable>
      <Pressable className="mt-10 w-full rounded-md py-4" onPress={() => router.push("/(protected)/(tabs)/index")}>
        <Text className="text-center font-semibold text-black">Browse Services</Text>
      </Pressable>
    </View>
  )
}