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
  topBadges?: ImageSourcePropType[];
  overlayCard?: ImageSourcePropType;
  topRightIcon?: ImageSourcePropType;
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
  topBadges,
  overlayCard,
  topRightIcon,
}: OnboardingSlideProps) {
  return (
    <View style={{ width }} className="relative flex-1 items-center justify-center px-8">
      {topBadges ? (
        <>
          <View
            style={{
              position: "absolute",
              top: 178,
              left: 30,
              width: 54,
              height: 54,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              opacity: 0.9,
              transform: [{ rotate: "18.98deg" }],
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image source={topBadges[0]} style={{ width: 54, height: 54, borderRadius: 8 }} resizeMode="contain" />
          </View>
          <Image
            source={topBadges[1]}
            style={{ position: "absolute", top: 132, left: 286, width: 54, height: 54 }}
            resizeMode="contain"
          />
        </>
      ) : null}
      <View className="relative h-72 w-72 items-center justify-center">
        {topRightIcon ? (
          <Image
            source={topRightIcon}
            resizeMode="contain"
            style={{ position: "absolute", top: -40, right: -2, width: 20, height: 20, zIndex: 15 }}
          />
        ) : null}
        {collageImages ? (
          <View className="h-72 w-72">
            <Image source={collageImages[0]} className="absolute left-3 top-10 h-12 w-12" />
            <Image source={collageImages[1]} className="absolute left-1/2 top-2 -ml-8 h-16 w-16" />
            <Image source={collageImages[2]} className="absolute right-4 top-10 h-12 w-12" />
            <Image source={collageImages[3]} className="absolute left-1/2 top-24 -ml-9 h-18 w-18" />
            <Image source={collageImages[4]} className="absolute left-6 bottom-10 h-14 w-14" />
            <Image source={collageImages[5]} className="absolute right-6 bottom-8 h-14 w-14" />
            {collageImages[6] ? (
              <Image source={collageImages[6]} className="absolute left-1/2 bottom-2 -ml-7 h-14 w-14" />
            ) : null}
          </View>
        ) : (
          <Image
            source={image}
            resizeMode="contain"
            className={`h-72 w-72 ${topBadges ? "mt-8" : ""}`}
          />
        )}
        {overlayCard ? (
          <Image
            source={overlayCard}
            resizeMode="contain"
            style={{
              position: "absolute",
              top: 208,
              left: -18,
              width: 301.4482727050781,
              height: 62,
              borderRadius: 17.1,
              opacity: 1,
              zIndex: 12,
            }}
          />
        ) : null}
      </View>
      <Text className="mt-8 text-center text-[20px] font-semibold text-[#005823]">
        {title}
      </Text>
      <Text className={`text-center text-[12px] leading-5 text-[#6B7280] ${topBadges ? "mt-6" : "mt-3"}`}>
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
