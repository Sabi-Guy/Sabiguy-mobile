import { View, Image } from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#005823CC]">
      <Image
        source={require("../../assets/logo.png")}
        className="h-44 w-44"
        resizeMode="contain"
      />
    </View>
  );
}
