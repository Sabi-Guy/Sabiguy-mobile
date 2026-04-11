import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export type ActivityType =
  | "booking"
  | "progress"
  | "review"
  | "completed"
  | "cancellation"
  | "payment"
  | "update";

type ActivityItemProps = {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  ctaLabel?: string;
  onPress?: () => void;
};

const TYPE_STYLES: Record<ActivityType, { icon: number }> = {
  booking: { icon: require("../../assets/booking tool.png"), },
  progress: { icon: require("../../assets/greenCheckbox.png"), },
  review: { icon: require("../../assets/pending.png"), },
  completed: { icon: require("../../assets/greenCheckbox.png"), },
  cancellation: { icon: require("../../assets/cancel (2).png"), },
  payment: { icon: require("../../assets/book.png"), },
  update: { icon: require("../../assets/bell-notification.png"), },
};

export default function ActivityItem({
  type,
  title,
  description,
  time,
  ctaLabel,
  onPress,
}: ActivityItemProps) {
  const styles = TYPE_STYLES[type];

  return (
    <View className="flex-row items-start gap-3">
      <Image source={styles.icon} className="mt-0.5 h-7 w-7" resizeMode="contain" />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-gray-900">{title}</Text>
          <Text className="text-[10px] text-gray-400">{time}</Text>
        </View>
        <Text className="mt-1 text-xs leading-4 text-gray-500">{description}</Text>
        {ctaLabel && (
          <Pressable
            onPress={onPress}
            className="mt-2 self-start rounded-md border border-gray-200 bg-white px-2 py-1"
          >
            <Text className="text-[10px] font-medium text-gray-600">{ctaLabel}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
