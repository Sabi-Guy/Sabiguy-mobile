import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

type MessageHeaderProps = {
  name: string;
  isOnline?: boolean | null;
  avatar: number;
  onCallPress?: () => void;
  onMenuPress?: () => void;
};

export default function MessageHeader({
  name,
  isOnline = null,
  avatar,
  onCallPress,
  onMenuPress,
}: MessageHeaderProps) {
  return (
    <View className="flex-row items-center px-4 pb-3 pt-10">
      <BackButton />
      <Image source={avatar} className="ml-2 h-10 w-10 rounded-full" />
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-gray-900">{name}</Text>
        {isOnline !== null && (
          <Text className={isOnline ? "text-xs text-green-600" : "text-xs text-gray-400"}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        )}
      </View>
      <View className="flex-row items-center gap-4">
        <Pressable onPress={onCallPress} hitSlop={10}>
          <Ionicons name="call-outline" size={20} color="#6B7280" />
        </Pressable>
        <Pressable onPress={onMenuPress} hitSlop={10}>
          <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
        </Pressable>
      </View>
    </View>
  );
}