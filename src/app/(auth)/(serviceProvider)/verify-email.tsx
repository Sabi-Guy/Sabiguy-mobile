import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const isComplete = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    if (!isComplete) return;
    if (code === "123456") {
      router.push("/(auth)/(serviceProvider)/account-setup");
    } else {
      setHasError(true);
    }
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setCode("");
    setHasError(false);
    setTimeLeft(20);
  };

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
    if (hasError) setHasError(false);
  };

  const formatTime = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`;

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-12">
        <Text className="text-3xl font-bold text-gray-900">Verify your email address</Text>
        <Text className="mt-2 text-base text-gray-600">
          We have sent a verification code to {email ?? "your email"}.
        </Text>
      </View>

      <View className="mt-10 items-center">
        <OTP value={code} onChangeCode={handleCodeChange} isError={hasError} />
      </View>

      {hasError ? (
        <Text className="mt-4 text-sm text-red-500">Wrong code, please try again</Text>
      ) : (
        <Text className="mt-4 text-sm text-gray-500">Send code again {formatTime(timeLeft)}</Text>
      )}

      <View className="mt-3 flex-row items-center gap-2">
        <Text className="text-sm text-gray-500">I didn&apos;t receive a code</Text>
        <Pressable onPress={handleResend} disabled={timeLeft > 0}>
          <Text className={`text-sm font-semibold ${timeLeft > 0 ? "text-gray-300" : "text-[#005823CC]"}`}>
            Resend
          </Text>
        </Pressable>
      </View>

      <Pressable
        className={`mt-10 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleVerify}
        disabled={!isComplete}
      >
        <Text className="text-center font-semibold text-white">Verify email</Text>
      </Pressable>
    </View>
  );
}
