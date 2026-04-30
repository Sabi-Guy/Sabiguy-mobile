import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
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
  cta,
}: ServicesCardProps) {

  const router = useRouter();
  return (
    <View className="flex-row w-80 h-44 rounded-3xl overflow-hidden shadow-md">
      <View
        className="w-48 px-5 py-5 justify-between"
        style={{ backgroundColor: "#28A745" }}
      >
        <View>
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Text className="text-white/85 text-xs mt-2 leading-4">
            {subtitle}
          </Text>
        </View>
        <Pressable
        onPress={()=> router.push("/(protected)/(serviceUser)/(tabs)/(hire)")}
          className="self-start rounded-full px-3 py-1.5"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
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
