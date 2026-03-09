import { View, Text} from 'react-native'
import OnboardingCarousel from '@/components/onboardingCarousel'
import React from 'react'


export default function onboarding() {
  return (
    <View className='flex-1'>
      <Text className="self-end mr-4 text-right text-lg font-semibold">skip</Text>
      <OnboardingCarousel/>
    </View>
  )
}