import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";

type ChooseRoleProps = {
  title: string;
  about: string;
  description: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  isSelected?: boolean;
};

export default function Roles({
  about,
  title,
  description,
  icon,
  onPress,
  isSelected = false,
}: ChooseRoleProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`items-center rounded-lg border p-6 ${
        isSelected ? 'border-[#005823CC] border-2 bg-[#0058231A]' : 'border-[#231F2080]'
      }`}
    >
      <Image source={icon} className="h-10 w-10 mr-4" resizeMode="contain" />
      <View className="items-center">
        <Text className="text-lg font-bold text-gray-900">{title}</Text>
        <Text className="text-lg font-lg text-gray-600">{about}</Text>
        <Text className="mt-1 text-sm text-gray-600">{description}</Text>
      </View>
    </Pressable>
  );
}
