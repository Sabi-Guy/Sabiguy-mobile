import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function ForgotPasswordCode() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);

  const isComplete = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;
    setCode("");
    setTimeLeft(20);
  };

  const formatTime = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`;

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Forgot password?</Text>
        <Text className="mt-2 text-base text-gray-600">
          Please enter the code sent to {email ?? "your email"}.
        </Text>
      </View>

      <View className="mt-10 items-center">
        <OTP value={code} onChangeCode={setCode} />
      </View>

      <Pressable
        className={`mt-6 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={() => router.push("/(auth)/(serviceProvider)/reset-password")}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>

      <Text className="mt-4 text-center text-sm text-gray-500">
        Send code again {formatTime(timeLeft)}
      </Text>

      <View className="mt-auto pb-6">
        <Pressable className="self-center" onPress={() => router.push("/(auth)/(serviceProvider)/login")}>
          <Text className="text-sm text-gray-600">
            Remember password? <Text className="font-semibold text-[#005823CC]">Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
