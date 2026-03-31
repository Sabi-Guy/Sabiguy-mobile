import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

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

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
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
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 18L9 12L15 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}
