import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function ForgotPasswordCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const isComplete = useMemo(() => code.every((digit) => digit.length === 1), [code]);

  const setDigit = (index: number, value: string) => {
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Forgot password?</Text>
        <Text className="mt-2 text-base text-gray-600">Please enter the code sent to your email.</Text>
      </View>
      <View className="mt-8 flex-row justify-between">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(value) => setDigit(index, value)}
            keyboardType="number-pad"
            maxLength={1}
            className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg"
          />
        ))}
      </View>
      <Pressable
        className={`mt-8 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={() => router.push("/(auth)/(serviceProvider)/reset-password")}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>
      <Text className="mt-6 text-center text-sm text-gray-500">Send code again 00:20</Text>
      <Pressable className="mt-6 self-center" onPress={() => router.push("/(auth)/(serviceProvider)/login")}>
        <Text className="text-sm text-gray-600">
          Remember password? <Text className="font-semibold text-[#005823CC]">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
