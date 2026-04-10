import React, { useMemo, useRef, useState } from 'react'
import { FlatList, ImageSourcePropType, Pressable, Text, useWindowDimensions, View } from 'react-native'
import { useRouter } from 'expo-router'
import OnboardingSlide from './OnboardingSlide'

type Slide = {
  id: string
  title: string
  description: string
  image: ImageSourcePropType
  buttonText: string
}

export default function OnboardingCarousel() {
  const { width } = useWindowDimensions()
  const router = useRouter()
  const flatListRef = useRef<FlatList<Slide>>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: '1',
        title: 'Welcome to SabiGuy',
        description: 'Get things done easily, connect with verified service experts near you',
        image: require('../../assets/slide_one.png'),
      buttonText: 'Continue'  
      },
      {
        id: '2',
        title: 'Browse & Book Services',
        description: 'Find professionals across home repairs, cleaning, and more, all in one place',
        image: require('../../assets/slide_two.png'),
        buttonText: 'Continue'  
      },
      {
        id: '3',
        title: 'Verified & Trusted Providers',
        description: 'Every professional is vetted and reviewed to ensure safe and reliable service',
        image: require('../../assets/slide_three.png'),
        buttonText: 'Get Started'  
      },
    ],
    []
  )

  const handleContinue = () => {
    const nextIndex = currentSlideIndex + 1
    if (nextIndex < slides.length) {
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      })
      setCurrentSlideIndex(nextIndex)
    }
  }

  const handleGetStarted = () => {
    router.push('/(auth)/chooseRole')
  }

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
            flatListRef.current?.scrollToIndex({ index: 0, animated: true })
            setCurrentSlideIndex(0)
          }, 100)
        }}
        renderItem={({ item, index }) => (
          <OnboardingSlide
            width={width}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
      />
      <View className="px-8 pb-28">
        <View className="my-6 flex-row items-center justify-center">
          {Array.from({ length: slides.length }).map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 rounded-full ${
                index === currentSlideIndex ? 'w-6 bg-[#005823CC]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </View>
        <Pressable
          className="rounded-md bg-[#005823CC] py-4"
          onPress={
            currentSlideIndex === slides.length - 1
              ? handleGetStarted
              : handleContinue
          }
        >
          <Text className="text-center text-white">
            {slides[currentSlideIndex]?.buttonText ?? 'Continue'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
