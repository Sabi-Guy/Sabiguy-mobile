import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import React from "react";

type popularCardProps = {
    image: ImageSourcePropType;
    text_one:string
    text_two:string
}

export default function popularCard({ image, text_one, text_two }: popularCardProps) {
  return (
    <TouchableOpacity className="items-center">
      <View className="h-12 w-12 bg-gray-300 rounded-full items-center justify-center">
        <Image source={image} className="h-6 w-6 rounded-full" />
      </View>

      <Text className="text-[10px] font-medium text-gray-700 text-center mt-2">
        {text_one}
      </Text>
      {!!text_two && (
        <Text className="text-[10px] font-medium text-gray-700 text-center">
          {text_two}
        </Text>
      )}
    </TouchableOpacity>
  );
}
