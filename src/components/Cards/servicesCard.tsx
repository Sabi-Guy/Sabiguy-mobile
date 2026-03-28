import React from "react";
import { Image, Text, View,TouchableOpacity } from "react-native";
import rider from "../../../assets/rider.png";

type ServicesCardProps = {
  title?: string;
  subtitle?: string;
  cta?: string;
};
// 08124814441
export default function ServicesCard({
  title,
  subtitle,
  cta 
}: ServicesCardProps) {
  return ( 
    <View className="flex-row w- h-36 rounded-2xl overflow-hidden shadow-sm">
      <View
        className="flex-1 px-4 py-4"
        style={{ backgroundColor: "#28A745" }}
      >
        <Text className="text-white text-lg font-semibold">{title}</Text>
        <Text className="text-white font-light text-xs mt-2">{subtitle}</Text>
        <TouchableOpacity
          className="mt-4 self-start rounded-full px-4 py-2"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <Text className="text-white text-xs">{cta} →</Text>
        </TouchableOpacity>
      </View>

      <View
        className="w-28 h-full items-center justify-center px-5"
        style={{ backgroundColor: "rgba(35, 93, 58, 0.75)" }}
      >
        <Image source={rider} className="h-20 w-20" resizeMode="contain" />

      </View>
    </View>
  );
}