import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import OnboardingSlide from "./OnboardingSlide";

type Slide = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  buttonText: string;
};

export default function ServiceProviderOnboardingCarousel() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const flatListRef = useRef<FlatList<Slide>>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "1",
        title: "Welcome, Service Pro",
        description: "Create your profile and let nearby customers discover your services.",
        image: require("../../assets/slide_one.png"),
        buttonText: "Continue",
      },
      {
        id: "2",
        title: "Get More Jobs",
        description: "Receive requests from real users looking for professionals like you.",
        image: require("../../assets/slide_two.png"),
        buttonText: "Continue",
      },
      {
        id: "3",
        title: "Build Trust Faster",
        description: "Show your skills, experience, and reviews to win more clients.",
        image: require("../../assets/slide_three.png"),
        buttonText: "Get Started",
      },
    ],
    []
  );

  const handleContinue = () => {
    const nextIndex = currentSlideIndex + 1;
    if (nextIndex < slides.length) {
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentSlideIndex(nextIndex);
    }
  };

  const handleGetStarted = () => {
    router.push("/(auth)/(serviceProvider)/account-setup");
  };

  const isLastSlide = currentSlideIndex === slides.length - 1;

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={() => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: 0, animated: true });
            setCurrentSlideIndex(0);
          }, 100);
        }}
        renderItem={({ item, index }) => (
          <OnboardingSlide
            width={width}
            title={item.title}
            description={item.description}
            image={item.image}
            isActive={index === currentSlideIndex}
            totalSlides={slides.length}
            currentIndex={currentSlideIndex}
          />
        )}
      />

      <View className="px-8 pb-10">
        {!isLastSlide ? (
          <View className="flex-row items-center justify-end">
            <Pressable
              className="h-12 w-12 items-center justify-center rounded-full bg-[#0F7A3A]"
              onPress={handleContinue}
            >
              <Feather name="arrow-right" size={36} color="white" />
            </Pressable>
          </View>
        ) : (
          <View className="items-center">
            <Pressable
              className="mt-2 w-full rounded-lg bg-[#0F7A3A] py-5"
              onPress={handleGetStarted}
            >
              <Text className="text-center text-[12px] font-semibold text-white">
                {slides[currentSlideIndex]?.buttonText ?? "Get Started"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
