import React from "react";
import { Image, Text, View,Pressable } from "react-native";
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
    <View className="flex-row w-80 h-40 rounded-3xl overflow-hidden shadow-md">
      <View
        className="w-48 px-5 py-5 justify-between"
        style={{ backgroundColor: "#28A745" }}
      >
        <View>
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Text className="text-white/85 text-xs mt-2 leading-4">{subtitle}</Text>
        </View>
        <Pressable
          className="self-start rounded-full px-3 py-1.5"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
          //  style={({ pressed }) => [
          //   { backgroundColor: pressed ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.25)" },
          //   { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, opacity: pressed ? 0.8 : 1 }
          // ]}
        >
          <Text className="text-white text-xs font-medium">{cta} →</Text>
        </Pressable>
      </View>

      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(35, 93, 58, 0.8)" }}
      >
        <Image source={rider} className="h-28 w-28" resizeMode="contain" />

      </View>
    </View>
  );
}