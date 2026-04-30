import { View, Text, TouchableOpacity, Image, ImageSourcePropType, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import BottomSheet from "@/components/bottomSheet";

type popularCardProps = {
  image: ImageSourcePropType;
  text_one: string;
  text_two: string;
  onPress?: () => void;
  comingSoon?: boolean;
  comingSoonDescription?: string;
  onNotify?: () => void;
}

export default function popularCard({
  image,
  text_one,
  text_two,
  onPress,
  comingSoon = false,
  comingSoonDescription,
  onNotify,
}: popularCardProps) {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const title = useMemo(
    () => [text_one, text_two].filter(Boolean).join(" ").trim(),
    [text_one, text_two]
  );
  const description =
    comingSoonDescription ??
    "This service is coming soon. We will notify you once it is available.";
  const handlePress = () => {
    if (comingSoon) {
      setIsSheetVisible(true);
      return;
    }
    onPress?.();
  };
  const handleClose = () => {
    setIsSheetVisible(false);
  };
  const handleNotify = () => {
    onNotify?.();
    setIsSheetVisible(false);
  };
  return (
    <>
    <TouchableOpacity onPress={handlePress} className="relative items-center">
      <View className="h-12 w-12 bg-gray-300 rounded-full items-center justify-center">
        <Image source={image} className="h-6 w-6 rounded-full" />
      </View>

      {comingSoon && (
        <View className="absolute -top-2 -right-2 rounded-full bg-[#ffe6ccde] px-2.5 py-0.5">
          <Text className="text-[9px] font-semibold text-[#C2410C]">Coming soon</Text>
        </View>
      )}

      <Text className="text-[10px] font-medium text-gray-700 text-center mt-2">
        {text_one}
      </Text>
      {!!text_two && (
        <Text className="text-[10px] font-medium text-gray-700 text-center">
          {text_two}
        </Text>
      )}
    </TouchableOpacity>
      {comingSoon && (
        <BottomSheet
          isVisible={isSheetVisible}
          onClose={handleClose}
          snapPoints={[0, 35, 45]}
          initialSnapPoint={35}
          contentContainerStyle={{ flex: 0, paddingBottom: 16 }}
          showHandle={false}
          showBackdropShadow={true}
        >
          <View className="items-center px-5 pt-5">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#EAF6EF]">
              <Image source={image} className="h-6 w-6" resizeMode="contain" />
            </View>
            <Text className="mt-3 text-base font-semibold text-gray-900">{title}</Text>
            <View className="mt-2 rounded-full bg-[#FFE6CC] px-3 py-1">
              <Text className="text-[11px] font-semibold text-[#C2410C]">Coming soon</Text>
            </View>
            <Text className="mt-3 text-center text-xs font-medium text-gray-500">
              {description}
            </Text>

            <Pressable
              onPress={handleNotify}
              className="mt-4 w-full items-center rounded-xl bg-[#2E7D52] py-3"
            >
              <Text className="text-xs font-semibold text-white">Notify Me</Text>
            </Pressable>
            <Pressable
              onPress={handleClose}
              className="mt-3 w-full items-center rounded-xl bg-[#F3F4F6] py-3"
            >
              <Text className="text-xs font-semibold text-gray-700">Close</Text>
            </Pressable>
          </View>
        </BottomSheet>
      )}
    </>
  );
}
