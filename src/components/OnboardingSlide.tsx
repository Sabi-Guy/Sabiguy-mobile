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
  isActive: boolean;
  totalSlides: number;
  currentIndex: number;
};

export default function OnboardingSlide({
  width,
  title,
  description,
  image,
  isActive,
  totalSlides,
  currentIndex,
}: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <View className="items-center justify-center">
        <Image source={image} resizeMode="contain" className="h-72 w-72" />
      </View>
      <Text className="mt-8 text-center text-[20px] font-semibold text-[#005823]">
        {title}
      </Text>
      <Text className="mt-3 text-center text-[12px] leading-5 text-[#6B7280]">
        {description}
      </Text>
      {isActive && (
        <View className="mt-6 flex-row items-center justify-center">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-1.5 rounded-full ${
                index === currentIndex ? "w-6 bg-[#0F7A3A]" : "w-1.5 bg-[#D1D5DB]"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
