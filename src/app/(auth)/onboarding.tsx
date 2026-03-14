import { View, Text } from "react-native";
import OnboardingCarousel from "@/components/onboardingCarousel";
import React from "react";
import { Link } from "expo-router";

export default function onboarding() {
  return (
    <View className="flex-1 mt-20 mx-5">
      <Link className="self-end mr-4 text-right text-lg font-semibold" href="/(auth)/chooseRole">
        <Text >
          Skip
        </Text>
      </Link>
      <OnboardingCarousel />
    </View>
  );
}
