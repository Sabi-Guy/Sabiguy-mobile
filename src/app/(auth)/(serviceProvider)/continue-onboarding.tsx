import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { getProviderOnboardingRoute } from "@/lib/provider-kyc";
import { useAuthStore } from "@/store/auth";

export default function ContinueOnboarding() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const kycLevel = useAuthStore((state) => state.kycLevel);
  const clearSession = useAuthStore((state) => state.clearSession);

  const pendingRoute = useMemo(() => getProviderOnboardingRoute(kycLevel), [kycLevel]);

  if (!isAuthenticated || role !== "provider") {
    return <Redirect href="/(auth)/login" />;
  }

  if (!pendingRoute) {
    return <Redirect href="/(protected)/(serviceProvider)/(tabs)" />;
  }

  const handleContinue = () => {
    router.replace(pendingRoute);
  };

  const handleBackToLogin = async () => {
    await clearSession();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white">
      <View className="h-[40%] items-center justify-center bg-[#005823] px-8">
        <Text className="text-4xl font-extrabold text-white">Welcome Back!</Text>
        <Text className="mt-4 text-center text-base text-white">
          Join us to discover reliable professionals anytime, anywhere.
        </Text>
      </View>

      <View className="flex-1 items-center px-8 pt-14">
        <Text className="text-4xl font-bold text-[#1F2A37]">Let&apos;s get you started!</Text>
        <Text className="mt-4 text-center text-lg text-[#6B7280]">
          Continue your onboarding to finish setting up your provider account.
        </Text>

        <Pressable
          onPress={handleContinue}
          className="mt-12 min-w-[180px] rounded-xl bg-[#2E8B57] px-10 py-4"
        >
          <Text className="text-center text-2xl font-semibold text-white">Continue</Text>
        </Pressable>

        <Pressable onPress={handleBackToLogin} className="mt-10">
          <Text className="text-lg font-semibold text-[#005823]">Back to sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}
