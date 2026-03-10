import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";

export default function verify() {
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleVerify = () => {
    if (isOtpComplete) {
      console.log("Verifying email...");
      // Simulate error for demo - remove this in production
      setHasError(true);
    }
  };

  const handleResend = () => {
    console.log("Resending code...");
    setTimeLeft(60);
    setHasError(false);
    setIsOtpComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <ScrollView className="flex-1 mt-20 bg-white" contentContainerClassName="px-6 py-8">
      <BackButton />
      <View className="mt-8">
        <Text className="text-3xl font-bold text-gray-900">Verify Email</Text>
        <Text className="mt-2 text-base text-gray-600">
          We've sent a verification code to
        </Text>
        <Text className="mt-2 text-base text-gray-600">
          xyz.gmail.com
        </Text>
      </View>

      <View className="mt-10 items-center">
        <OTP 
          isError={hasError}
          onComplete={(code) => {
            console.log("OTP completed:", code);
            setIsOtpComplete(true);
          }} 
        />
      </View>

      {hasError && (
        <Text className="mt-4 text-center text-red-500">
          Wrong code, please try again
        </Text>
      )}

      <View className="mt-6">
        {timeLeft > 0 ? (
          <Text className="text-center text-gray-500">
            Send code again in {formatTime(timeLeft)}
          </Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text className="text-center text-blue-600 font-semibold">
              I didn't receive a code{" "}
              <Text className="text-blue-700 underline">Resend</Text>
            </Text>
          </Pressable>
        )}
      </View>



      <Pressable
        onPress={handleVerify}
        disabled={!isOtpComplete}
        className={`py-4 rounded-lg items-center ${
          isOtpComplete ? "bg-[#005823CC]" : "bg-gray-400"
        }`}
      >
        <Text className="text-white font-semibold text-lg">
          Verify email
        </Text>
      </Pressable>
    </ScrollView>
  );
}
