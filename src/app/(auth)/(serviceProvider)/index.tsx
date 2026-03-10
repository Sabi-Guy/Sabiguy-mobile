import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import ServiceProviderOnboardingCarousel from "@/components/ServiceProviderOnboardingCarousel";

export default function ServiceProviderOnboarding() {
  return (
    <View className="flex-1">
      <Link href="/(auth)/(serviceProvider)/account-setup" className="self-end mr-4 text-right text-lg font-semibold">
        <Text>skip</Text>
      </Link>
      <ServiceProviderOnboardingCarousel />
    </View>
  );
}
