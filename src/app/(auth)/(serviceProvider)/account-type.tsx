import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function AccountType() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"individual" | "business">("individual");

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Account Type</Text>
        <Text className="mt-2 text-base text-gray-600">Choose the account type to continue setup.</Text>
      </View>

      <View className="mt-6 gap-3">
        <Pressable
          className={`rounded-lg border px-4 py-4 ${accountType === "individual" ? "border-[#005823CC] bg-[#005823CC]" : "border-gray-300 bg-[#231F200D]"}`}
          onPress={() => setAccountType("individual")}
        >
          <Text className={`${accountType === "individual" ? "text-white" : "text-gray-700"}`}>Individual</Text>
        </Pressable>
        <Pressable
          className={`rounded-lg border px-4 py-4 ${accountType === "business" ? "border-[#005823CC] bg-[#005823CC]" : "border-gray-300 bg-[#231F200D]"}`}
          onPress={() => setAccountType("business")}
        >
          <Text className={`${accountType === "business" ? "text-white" : "text-gray-700"}`}>Business</Text>
        </Pressable>
      </View>

      {accountType === "business" ? (
        <View className="mt-6 gap-4">
          <TextInput placeholder="Registered business name" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
          <TextInput placeholder="CAC registration number" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
          <TextInput placeholder="Business address" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        </View>
      ) : (
        <View className="mt-6 gap-2 rounded-lg border border-dashed border-gray-300 p-4">
          <Text className="text-sm font-semibold text-gray-700">Upload required documents</Text>
          <Text className="text-sm text-gray-600">NIN slip and at least one supporting document.</Text>
          <Pressable className="mt-2 self-start rounded-md border border-gray-300 px-4 py-2">
            <Text className="font-semibold text-gray-700">Upload file</Text>
          </Pressable>
        </View>
      )}

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/face-capture")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </ScrollView>
  );
}
