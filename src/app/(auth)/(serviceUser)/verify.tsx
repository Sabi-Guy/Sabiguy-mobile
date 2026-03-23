import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";
import { resendOtp, verifyEmailOtp } from "@/lib/auth"
;
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function verify() {
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasError, setHasError] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (!isOtpComplete || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setHasError(false);
      await verifyEmailOtp({ otp });
      router.push("/(auth)/(serviceUser)/accountReady");
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      return;
    }

    try {
      await resendOtp({ email });
      setTimeLeft(60);
      setHasError(false);
      setIsOtpComplete(false);
      Toast.show({
        type: "success",
        text1: "OTP resent"
      })
    } catch (error) {
      console.error(error);
      setHasError(true);
       Toast.show({
        type: "error",
        text1: "Failed"
      })
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
          <Text className="text-3xl font-bold text-gray-900">Verify Email</Text>
          <Text className="mt-2 text-base text-gray-600">
            We've sent a verification code to
          </Text>
          <Text className="mt-2 text-base text-gray-600">{email ?? ""}</Text>
        </View>

        <View className="mt-10 items-center">
          <OTP
            isError={hasError}
            onChangeCode={(code) => {
              setOtp(code);
              setIsOtpComplete(code.length === 6);
            }}
            onComplete={(code) => {
              console.log("OTP completed:", code);
              setOtp(code);
              setIsOtpComplete(true);
            }}
          />
        </View>

        {hasError && (
          <Text className="mt-8 text-red-500">
            Wrong code, please try again
          </Text>
        )}

        <View className="mt-8">
          {timeLeft > 0 ? (
            <Text className=" text-gray-500">
              Send code again in {formatTime(timeLeft)}
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text className=" text-gray-600 font-semibold">
                I didn't receive a code
                <Text className="text-gray-700 underline"> Resend</Text>
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={handleVerify}
          disabled={!isOtpComplete || isSubmitting}
          className={` mt-16 py-4 rounded-lg items-center ${
            isOtpComplete && !isSubmitting ? "bg-[#005823CC]" : "bg-gray-400"
          }`}
        >
          <Text className="text-white font-semibold text-lg">
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
