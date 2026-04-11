import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

type MessageItemProps = {
  name: string;
  preview: string;
  time: string;
  avatar: number;
  onPress?: () => void;
};

export default function Messages({ name, preview, time, avatar, onPress }: MessageItemProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 rounded-xl border border-gray-100 shadow-black bg-white px-3 py-2"
      onPress={onPress}
    >
      <Image source={avatar} className="h-10 w-10 rounded-full" />
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900">{name}</Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {preview}
        </Text>
      </View>
      <Text className="text-[10px] text-gray-400">{time}</Text>
    </TouchableOpacity>
  );
}