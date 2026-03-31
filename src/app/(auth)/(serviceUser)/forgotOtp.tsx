import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function ForgotOtp() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [submitting, setSubmitting] = useState(false);

  const isOtpComplete = useMemo(() => code.length === 6, [code]);

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

  const handleVerify = async () => {
    if (!isOtpComplete || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setHasError(false);

      router.push({
        pathname: "/(auth)/(serviceUser)/reset",
        params: { email, otp: code },
      });
    } catch (err) {
      setHasError(true);
      console.error(err);
    } finally {
      setSubmitting(false);
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
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-6 py-8"
    >
      <BackButton />
      <View className="pt-20">
        <View className="mt-8">
          <Text className="text-3xl font-bold text-gray-900">
            Forgot Password?
          </Text>
          <Text className="mt-2 text-base text-gray-600">
            Please enter the code sent to your email.
          </Text>
        </View>

        <View className="mt-10 items-center">
          <OTP
            value={code}
            onChangeCode={handleCodeChange}
            isError={hasError}
          />
        </View>

        {hasError && (
          <Text className="mt-8 text-red-500">
            Wrong code, please try again
          </Text>
        )}

        <View className="mt-8">
          {timeLeft > 0 ? (
            <Text className="text-gray-500">
              Send code again in {formatTime(timeLeft)}
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text className="font-semibold text-gray-600">
                I didn't receive a code
                <Text className="text-gray-700 underline"> Resend</Text>
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={handleVerify}
          disabled={!isOtpComplete || submitting}
          className={`mt-16 items-center rounded-lg py-4 ${
            isOtpComplete ? "bg-[#005823CC]" : "bg-gray-400"
          }`}
        >
          <Text className="text-lg font-semibold text-white">
            {submitting ? "Please wait..." : "Continue"}
          </Text>
        </Pressable>

        <Pressable
          className="mt-6 self-center"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-sm text-gray-600">
            Remember password?{" "}
            <Text className="font-semibold text-[#005823CC]">Login</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
