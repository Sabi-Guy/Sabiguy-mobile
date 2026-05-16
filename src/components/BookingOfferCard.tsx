import React, { useRef, useState } from "react";
import { Animated, Dimensions, Image, Pressable, Text, View } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export type BookingOfferCardProps = {
  carName: string;
  price: string;
  rating: string;
  reviews: string;
  distance: string;
  imageSource?: number;
  onDecline?: () => void;
  onAccept?: () => void;
};

export default function BookingOfferCard({
  carName,
  price,
  rating,
  reviews,
  distance,
  imageSource,
  onDecline,
  onAccept,
}: BookingOfferCardProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isDismissing, setIsDismissing] = useState(false);
  const cardWidth = Dimensions.get("window").width + 40;

  const handleDecline = () => {
    if (isDismissing) {
      return;
    }
    setIsDismissing(true);
    Animated.timing(translateX, {
      toValue: cardWidth,
      duration: 260,
      useNativeDriver: true,
    }).start(() => {
      onDecline?.();
    });
  };

  return (
    <Animated.View
      className="rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm"
      style={{ transform: [{ translateX }] }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6]">
            {imageSource ? (
              <Image source={imageSource} className="h-12 w-12 rounded-full" resizeMode="cover" />
            ) : (
              <MaterialIcons name="directions-car" size={20} color="#9CA3AF" />
            )}
          </View>
          
          <View>
            <Text className="text-sm font-semibold text-[#111827]">{carName}</Text>
            <View className="flex-row items-center gap-1">
              <FontAwesome name="star" size={10} color="#F59E0B" />
              <Text className="text-[10px] text-[#6B7280]">{rating}</Text>
              <Text className="text-[10px] text-[#D1D5DB]">|</Text>
              <Text className="text-[10px] text-[#6B7280]">{reviews}</Text>
            </View>
            <Text className="text-[10px] text-[#6B7280]">{distance} away</Text>
          </View>
        </View>

        <Text className="text-sm font-semibold text-[#0F7A3A]">{price}</Text>
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          onPress={handleDecline}
          disabled={isDismissing}
          className="h-9 flex-1 items-center justify-center rounded-md border border-[#E5E7EB]"
        >
          <Text className="text-xs font-semibold text-[#6B7280]">Decline</Text>
        </Pressable>
        <Pressable
          onPress={onAccept}
          disabled={isDismissing}
          className="h-9 flex-1 flex-row items-center justify-center gap-2 rounded-md bg-[#0F7A3A]"
        >
          <MaterialIcons name="check" size={14} color="#FFFFFF" />
          <Text className="text-xs font-semibold text-white">Accept</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
