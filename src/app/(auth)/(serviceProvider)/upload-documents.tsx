import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

function UploadCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="rounded-xl border border-dashed border-gray-300 p-4">
      <Text className="font-semibold text-gray-800">{title}</Text>
      <Text className="mt-1 text-sm text-gray-600">{subtitle}</Text>
      <Pressable className="mt-3 self-start rounded-md border border-gray-300 px-4 py-2">
        <Text className="font-semibold text-gray-700">Browse</Text>
      </Pressable>
    </View>
  );
}

export default function UploadDocuments() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Upload Documents</Text>
        <Text className="mt-2 text-base text-gray-600">Please upload clear photos & videos of your previously done jobs.</Text>
      </View>

      <View className="mt-6 gap-4">
        <UploadCard title="A short video of your working" subtitle="JPG, PNG, PDF format, max 10 MB" />
        <UploadCard title="Upload 3 - 4 photos of your past jobs" subtitle="JPG, PNG, PDF format, max 10 MB" />
      </View>

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/bank-account")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
      <Pressable className="mt-4 self-center" onPress={() => router.push("/(auth)/(serviceProvider)/profile-setup-complete")}>
        <Text className="font-semibold text-gray-600">Skip</Text>
      </Pressable>
    </ScrollView>
  );
}
