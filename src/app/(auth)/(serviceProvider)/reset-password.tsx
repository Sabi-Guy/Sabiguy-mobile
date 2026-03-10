import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const canContinue = useMemo(
    () => password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword,
    [password, confirmPassword]
  );

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Reset password</Text>
        <Text className="mt-2 text-base text-gray-600">Please set your new password.</Text>
      </View>
      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">New password</Text>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter a new password"
              secureTextEntry={!showPassword}
              className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 pr-12 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
            <Pressable
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPassword((previous) => !previous)}
            >
              <Text className="text-sm font-semibold text-[#005823CC]">
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Confirm new password</Text>
          <View className="relative">
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your new password"
              secureTextEntry={!showConfirmPassword}
              className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 pr-12 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
            <Pressable
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowConfirmPassword((previous) => !previous)}
            >
              <Text className="text-sm font-semibold text-[#005823CC]">
                {showConfirmPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Pressable
        className={`mt-8 rounded-md py-4 ${canContinue ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={() => router.push("/(auth)/(serviceProvider)/password-reset-success")}
        disabled={!canContinue}
      >
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>
      <Pressable className="mt-6 self-center" onPress={() => router.push("/(auth)/(serviceProvider)/login")}>
        <Text className="text-sm text-gray-600">
          Already have an account? <Text className="font-semibold text-[#005823CC]">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
