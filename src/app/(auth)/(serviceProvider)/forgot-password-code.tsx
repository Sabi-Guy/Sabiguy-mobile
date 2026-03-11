import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function ForgotPasswordCode() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const isComplete = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft]);

  const handleResend = () => {
    setCode("");
    setTimeLeft(60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Forgot password?</Text>
        <Text className="mt-2 text-base text-gray-600">Please enter the code sent to your email.</Text>
      </View>
      <View className="mt-10 items-center">
        <OTP value={code} onChangeCode={setCode} />
      </View>
      <Pressable
        className={`mt-8 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={() => router.push("/(auth)/(serviceProvider)/reset-password")}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Continue</Text>
      </Pressable>
      <View className="mt-6 items-center">
        {timeLeft > 0 ? (
          <Text className="text-sm text-gray-500">Send code again in {formatTime(timeLeft)}</Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text className="text-sm font-semibold text-gray-600">I didn't receive a code. Resend</Text>
          </Pressable>
        )}
      </View>
      <Pressable className="mt-6 self-center" onPress={() => router.push("/(auth)/(serviceProvider)/login")}>
        <Text className="text-sm text-gray-600">
          Remember password? <Text className="font-semibold text-[#005823CC]">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
