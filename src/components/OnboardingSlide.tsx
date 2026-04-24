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
  collageImages?: ImageSourcePropType[];
};

export default function OnboardingSlide({
  width,
  title,
  description,
  image,
  isActive,
  totalSlides,
  currentIndex,
  collageImages,
}: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <View className="items-center justify-center">
        {collageImages ? (
          <View className="h-72 w-72">
            <Image source={collageImages[0]} className="absolute left-3 top-10 h-12 w-12" />
            <Image source={collageImages[1]} className="absolute left-1/2 top-2 -ml-8 h-16 w-16" />
            <Image source={collageImages[2]} className="absolute right-4 top-10 h-12 w-12" />
            <Image source={collageImages[3]} className="absolute left-1/2 top-24 -ml-9 h-18 w-18" />
            <Image source={collageImages[4]} className="absolute left-6 bottom-10 h-14 w-14" />
            <Image source={collageImages[5]} className="absolute right-6 bottom-8 h-14 w-14" />
          </View>
        ) : (
          <Image source={image} resizeMode="contain" className="h-72 w-72" />
        )}
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
