import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type RequestStatus = "active" | "pending" | "completed";

type MyRequestCardProps = {
  title: string;
  name: string;
  date: string;
  pickup: string;
  dropoff: string;
  distance: string;
  price: string;
  status: RequestStatus;
  rating?: string;
  review?: string;
  onPress?: () => void;
  onCancelPress?: () => void;
};

export default function MyRequestCard({
  title,
  name,
  date,
  pickup,
  dropoff,
  distance,
  price,
  status,
  rating,
  review,
  onPress,
  onCancelPress,
}: MyRequestCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl border border-[#E5E7EB] bg-white p-3"
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xs font-semibold text-[#111827]">{title}</Text>
          <Text className="mt-1 text-[10px] text-[#6B7280]">{name}</Text>
        </View>
        <View
          className={`rounded-full px-2 py-1 ${
            status === "active"
              ? "bg-[#E6F4EC]"
              : status === "pending"
              ? "bg-[#FEF3C7]"
              : "bg-[#DCFCE7]"
          }`}
        >
          <Text
            className={`text-[10px] font-semibold ${
              status === "active"
                ? "text-[#0F7A3A]"
                : status === "pending"
                ? "text-[#B45309]"
                : "text-[#15803D]"
            }`}
          >
            {status === "active"
              ? "In Progress"
              : status === "pending"
              ? "Pending"
              : "Completed"}
          </Text>
        </View>
      </View>

      <View className="mt-3 gap-2">
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="event" size={12} color="#6B7280" />
          <Text className="text-[10px] text-[#6B7280]">{date}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="location-on" size={12} color="#6B7280" />
          <Text className="text-[10px] text-[#6B7280]">Pickup: {pickup}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="flag" size={12} color="#6B7280" />
          <Text className="text-[10px] text-[#6B7280]">Dropoff: {dropoff}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="timeline" size={12} color="#6B7280" />
          <Text className="text-[10px] text-[#6B7280]">Distance: {distance}</Text>
        </View>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-xs font-semibold text-[#0F7A3A]">{price}</Text>
        {status === "active" ? (
          <View className="rounded-md border border-[#E5E7EB] px-3 py-2">
            <Text className="text-[10px] font-semibold text-[#6B7280]">
              View Actions
            </Text>
          </View>
        ) : (
          <View className="rounded-md border border-[#E5E7EB] px-3 py-2">
            <Text className="text-[10px] font-semibold text-[#6B7280]">
              View Details
            </Text>
          </View>
        )}
      </View>

      {status === "active" && (
        <View className="mt-2 items-center justify-center rounded-md bg-[#0F7A3A] py-2">
          <Text className="text-[10px] font-semibold text-white">
            Track Provider
          </Text>
        </View>
      )}

      {(status === "active" || status === "pending") && (
        <Pressable
          onPress={onCancelPress}
          disabled={!onCancelPress}
          className="mt-2 items-center justify-center rounded-md border border-[#FCA5A5] py-2"
        >
          <Text className="text-[10px] font-semibold text-[#DC2626]">
            Cancel Request
          </Text>
        </Pressable>
      )}

      {status === "completed" && review && (
        <View className="mt-3">
          <View className="flex-row items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialIcons
                key={`${title}-star-${star}`}
                name="star"
                size={12}
                color="#F59E0B"
              />
            ))}
            {rating && (
              <Text className="text-[10px] font-semibold text-[#111827]">
                {rating}
              </Text>
            )}
          </View>
          <Text className="mt-1 text-[10px] text-[#6B7280]">{review}</Text>
          <Text className="mt-1 text-[10px] text-[#0F7A3A]">Read more</Text>
        </View>
      )}
    </Pressable>
  );
}
