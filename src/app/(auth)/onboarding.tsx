import { View, Text} from 'react-native'
import OnboardingCarousel from '@/components/onboardingCarousel'
import React from 'react'


export default function onboarding() {
  return (
    <View className='flex-1'>
      <Text className="text-end">skip</Text>
      <OnboardingCarousel/>
    </View>
  )
}