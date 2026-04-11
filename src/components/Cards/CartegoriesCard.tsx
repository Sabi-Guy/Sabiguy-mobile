import {
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "react-native";

type categoriesCardProps = {
  image: ImageSourcePropType;
  text_one: string;
  text_two?: string;
  onPress?: () => void;
};

export default function CartegoriesCard({
  image,
  text_one,
  text_two,
  onPress,
}: categoriesCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-24 rounded-2xl bg-white items-center justify-center shadow-sm"
    >
      <View className="h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
        <Image source={image} className="h-5 w-5" resizeMode="contain" />
      </View>

      <Text className="text-[11px] font-medium text-gray-800 text-center mt-2">
        {text_one}
      </Text>
      {!!text_two && (
        <Text className="text-[11px] font-medium text-gray-800 text-center -mt-0.5">
          {text_two}
        </Text>
      )}
    </TouchableOpacity>
  );
}
