import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function BankAccount() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Bank Account</Text>
        <Text className="mt-2 text-base text-gray-600">Select the bank account for your withdrawal.</Text>
      </View>

      <View className="mt-6 gap-4">
        <TextInput placeholder="Bank" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        <TextInput placeholder="Account Number" keyboardType="number-pad" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        <TextInput placeholder="Account Name" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
      </View>

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/profile-setup-complete")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </View>
  );
}
