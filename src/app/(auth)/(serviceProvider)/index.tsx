import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import ServiceProviderOnboardingCarousel from "@/components/ServiceProviderOnboardingCarousel";

export default function ServiceProviderOnboarding() {
  return (
    <View className="flex-1">
      <View className="mt-20 px-5">
        <Link
          href="/(auth)/(serviceProvider)/account-setup"
          className="self-end text-right text-lg font-semibold"
        >
          <Text>Skip</Text>
        </Link>
      </View>
      <ServiceProviderOnboardingCarousel />
    </View>
  );
}
