import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";

type OnboardingSlideProps = {
  width: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  buttonText: string;
  currentSlideIndex: number;
  totalSlides: number;
};

export default function OnboardingSlide({
  width,
  title,
  description,
  image,
  buttonText,
  currentSlideIndex,
  totalSlides,
}: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <Image source={image} resizeMode="contain" className="mb-10 h-64 w-64" />
      <Text className="text-center text-3xl font-bold text-gray-900">
        {title}
      </Text>
      <Text className="mt-4 text-center text-base leading-6 text-gray-600">
        {description}
      </Text>
      <View className="my-6 flex-row items-center justify-center">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <View
            key={index}
            className={`mx-1 h-2 rounded-full ${
              index === currentSlideIndex ? 'w-6 bg-[#005823CC]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </View>
      <Pressable className="mt-8 rounded-md bg-[#005823CC] px-36 py-4">
        <Text className="text-white">{buttonText}</Text>
      </Pressable>
    </View>
  );
}
