import React, { useMemo, useRef, useState } from "react";
import { FlatList, ImageSourcePropType, useWindowDimensions, View } from "react-native";
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
            buttonText={item.buttonText}
            currentSlideIndex={currentSlideIndex}
            totalSlides={slides.length}
            isLastSlide={index === slides.length - 1}
            onPress={index === slides.length - 1 ? handleGetStarted : handleContinue}
          />
        )}
      />
    </View>
  );
}
