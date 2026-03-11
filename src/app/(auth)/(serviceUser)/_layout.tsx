import { View, Text } from 'react-native'
import Stack from 'expo-router/stack'
import React from 'react'

export default function UserLayout() {
  return (
    <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot" options={{ headerShown: false }} /> 
        <Stack.Screen name="verify" options={{ headerShown: false }} /> 
    </Stack>
  )
}