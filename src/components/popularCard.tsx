import { View, Text, TouchableOpacity,Image, ImageSourcePropType,  } from "react-native";
import React from "react";

type popularCardProps = {
    image: ImageSourcePropType;
    text_one:string
    text_two:string
}

export default function popularCard({ image, text_one, text_two }: popularCardProps) {
  return (
    <TouchableOpacity>
      <View className="h-12 w-12 bg-gray-300 rounded-full items-center justify-center">
        <Image source={image} className="h-6 w-6 rounded-full" />
      </View>

      <Text>{text_one}</Text>
      <Text>{text_two}</Text>
    </TouchableOpacity>
  );
}
