import { View, Text } from "react-native";
import OnboardingCarousel from "@/components/onboardingCarousel";
import React from "react";
import { Link } from "expo-router";

export default function onboarding() {
  return (
    <View className="flex-1 bg-white">
      <View className="pt-14" />
      <OnboardingCarousel />
    </View>
  );
}
