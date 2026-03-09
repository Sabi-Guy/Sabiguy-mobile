import { Text, Pressable } from 'react-native'
import React from 'react'

type buttonProps ={
    buttonText: string
    onPress: () => void
    disabled?: boolean
}

export default function Button({buttonText, onPress, disabled = false}: buttonProps) {
  return (
      <Pressable
        className={`mt-8 w-full rounded-md py-4 ${disabled ? 'bg-gray-300' : 'bg-[#005823CC]'}`}
        onPress={onPress}
        disabled={disabled}
      >
        <Text className="text-center font-semibold text-white">{buttonText}</Text>
      </Pressable>
  )
}