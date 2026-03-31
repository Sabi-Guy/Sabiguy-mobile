import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { apiRequest } from "@/lib/api";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 0 && !submitting, [email, submitting]);

  const handleSubmit = async () => {
    setError(null);
    if (!email.trim()) {
      setError("Please enter your email.");
      return; 
    }
    try {
      setSubmitting(true);
      await apiRequest("/auth/password", {
        method: "POST",
        json: { email },
      });
      router.push({
        pathname: "/(auth)/(serviceProvider)/forgot-password-code",
        params: { email },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Forgot password?</Text>
        <Text className="mt-2 text-base text-gray-600">
          Enter the email associated with your account to change your password.
        </Text>
      </View>
      <View className="mt-8">
        <Text className="mb-2 text-sm font-medium text-gray-700">Your Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <Pressable
        className={`mt-8 rounded-md py-4 ${canSubmit ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleSubmit}
        disabled={!canSubmit}
      >
        <Text className="text-center font-semibold text-white">
          {submitting ? "Sending..." : "Continue"}
        </Text>
      </Pressable>
      {error ? <Text className="mt-3 text-sm text-red-500">{error}</Text> : null}
      <Pressable className="mt-6 self-center" onPress={() => router.push("/(auth)/login")}>
        <Text className="text-sm text-gray-600">
          Remember password? <Text className="font-semibold text-[#005823CC]">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
