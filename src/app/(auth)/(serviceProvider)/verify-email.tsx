import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const isComplete = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((previous) => previous - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft]);

  const handleVerify = () => {
    if (!isComplete) {
      return;
    }

    if (code === "123456") {
      router.push("/(auth)/(serviceProvider)/account-setup");
    } else {
      setHasError(true);
    }
  };

  const handleResend = () => {
    setCode("");
    setHasError(false);
    setTimeLeft(60);
  };

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);

    if (hasError) {
      setHasError(false);
    }
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
        <Text className="text-3xl font-bold text-gray-900">Verify your email address</Text>
        <Text className="mt-2 text-base text-gray-600">We have sent a verification code to your email.</Text>
      </View>
      <View className="mt-10 items-center">
        <OTP value={code} onChangeCode={handleCodeChange} isError={hasError} />
      </View>

      {hasError && <Text className="mt-8 text-red-500">Wrong code, please try again</Text>}

      <View className="mt-8">
        {timeLeft > 0 ? (
          <Text className="text-gray-500">Send code again in {formatTime(timeLeft)}</Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text className="font-semibold text-gray-600">
              I didn&apos;t receive a code
              <Text className="text-gray-700 underline"> Resend</Text>
            </Text>
          </Pressable>
        )}
      </View>

      <Pressable
        className={`mt-16 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleVerify}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Verify email</Text>
      </Pressable>
    </View>
  );
}
