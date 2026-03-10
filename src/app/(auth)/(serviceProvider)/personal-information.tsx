import React from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function PersonalInformation() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Personal Information</Text>
        <Text className="mt-2 text-base text-gray-600">Let us know who you are and where you work.</Text>
      </View>

      <View className="mt-6 gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Gender</Text>
          <TextInput placeholder="Gender" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Address</Text>
          <TextInput placeholder="Your address" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">City of residence</Text>
          <TextInput placeholder="Lagos" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        </View>
      </View>

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/account-type")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </ScrollView>
  );
}
