import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [invalid, setInvalid] = useState(false);

  const isComplete = useMemo(() => code.every((digit) => digit.length === 1), [code]);

  const setDigit = (index: number, value: string) => {
    const next = [...code];
    next[index] = value.slice(-1);
    setCode(next);
    if (invalid) setInvalid(false);
  };

  const handleVerify = () => {
    if (!isComplete) return;
    if (code.join("") === "123456") {
      router.push("/(auth)/(serviceProvider)/account-setup");
    } else {
      setInvalid(true);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Verify your email address</Text>
        <Text className="mt-2 text-base text-gray-600">We have sent a verification code to your email.</Text>
      </View>
      <View className="mt-8 flex-row justify-between">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(value) => setDigit(index, value)}
            keyboardType="number-pad"
            maxLength={1}
            className={`h-12 w-12 rounded-md border text-center text-lg ${
              invalid ? "border-red-400" : "border-gray-300"
            }`}
          />
        ))}
      </View>
      {invalid ? (
        <Text className="mt-3 text-sm text-red-500">Wrong code, please try again</Text>
      ) : (
        <Text className="mt-3 text-sm text-gray-500">Send code again 00:20</Text>
      )}
      <Pressable
        className={`mt-8 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleVerify}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Verify email</Text>
      </Pressable>
    </View>
  );
}
