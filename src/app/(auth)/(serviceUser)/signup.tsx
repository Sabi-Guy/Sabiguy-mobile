import { View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";

export default function signup() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <Text className="text-3xl font-bold text-gray-900">Create your account</Text>
        <Text className="mt-2 text-base text-gray-600">
          Please enter your details and let&apos;s get you started
        </Text>
      </View>

      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Full Name</Text>
          <TextInput
            placeholder="Enter your name"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Phone Number</Text>
          <TextInput
            placeholder="Enter your number"
            keyboardType="phone-pad"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Password</Text>
          <TextInput
            placeholder="Use a minimum of 6 characters"
            secureTextEntry
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <Pressable
        onPress={() => setAgreed((previous) => !previous)}
        className="mt-6 flex-row items-start"
      >
        <View
          className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border ${
            agreed ? "border-[#005823] bg-[#005823]" : "border-gray-400 bg-white"
          }`}
        >
          {agreed ? <Text className="text-xs font-bold text-white">✓</Text> : null}
        </View>

        <Text className="flex-1 text-sm text-gray-700">
          I agree to the <Text className="font-semibold text-[#005823]">Privacy Policy</Text> and{" "}
          <Text className="font-semibold text-[#005823]">Terms of Services</Text>
        </Text>
      </Pressable>

      <Button buttonText="Continue" onPress={() => {router.push("/(auth)/(serviceUser)/accountReady")}} disabled={!agreed} />

      <View className="mt-6 flex-row items-center">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="mx-3 text-sm text-gray-500">or</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      <Pressable
        className="mt-4 w-full flex-row items-center justify-center rounded-md py-4"
        style={{ backgroundColor: "#231F200D" }}
      >
        <Image
          source={require("../../../../assets/google.png")}
          className="mr-2 h-5 w-5"
          resizeMode="contain"
        />
        <Text className="font-semibold text-[#231F20]">Continue with Google</Text>
      </Pressable>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-sm text-gray-600">Already have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/(serviceUser)/login")}>
          <Text className="text-sm font-semibold text-[#005823CC]">Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
