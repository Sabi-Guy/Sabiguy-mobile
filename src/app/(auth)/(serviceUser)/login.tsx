import { View, Text, TextInput, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";


export default function login() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <Text className="text-3xl font-bold text-gray-900">Welcome back</Text>
        <Text className="mt-2 text-base text-gray-600">
          Kindly provide your email address and password to continue
        </Text>
      </View>

      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Email or phone</Text>
          <TextInput
            placeholder="Enter your email or phone"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <Pressable className="mt-4" onPress={() => router.push("/(auth)/(serviceUser)/forgot")}>
        <Text className="text-sm font-semibold text-[#231F20]">Forgot Password?</Text>
      </Pressable>

      {/* <Button buttonText="Continue" onPress={() => router.push("/(protected)/(tabs)/")} /> */}
      <Button buttonText="Continue" onPress={() => router.push("/(auth)/(serviceUser)/verify")} />

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
        <Text className="text-sm text-gray-600">Don&apos;t have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/(serviceUser)/signup")}>
          <Text className="text-sm font-semibold text-[#005823CC]">Sign Up</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}
