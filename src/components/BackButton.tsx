import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  variant?: "floating" | "inline";
}

export default function BackButton({
  onPress,
  color = "#000000",
  size = 24,
  variant = "floating",
}: BackButtonProps) {
  const router = useRouter();
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        router.replace("/(auth)/login");
      }
    }
  };

  const buttonClassName =
    variant === "inline"
      ? "rounded-full p-2"
      : "absolute top-4 left-4 z-10 rounded-full p-2 bg-[#231F200D] shadow-md";

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={buttonClassName}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </TouchableOpacity>
  );
}
