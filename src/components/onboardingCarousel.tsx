import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, ImageSourcePropType, useWindowDimensions, View } from 'react-native'
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
  const flatListRef = useRef<FlatList<Slide>>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: '1',
        title: 'Welcome to Sabiguy',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((previousIndex) => {
        const nextIndex = (previousIndex + 1) % slides.length

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        })

        return nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

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
        renderItem={({ item }) => (
          <OnboardingSlide
            width={width}
            title={item.title}
            description={item.description}
            image={item.image}
            buttonText ={item.buttonText}
          />
        )}
      />

      <View className="absolute bottom-12 left-0 right-0 flex-row items-center justify-center">
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            className={`mx-1 h-2 rounded-full ${
              index === currentSlideIndex ? 'w-6 bg-[#005823CC]' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  )
}