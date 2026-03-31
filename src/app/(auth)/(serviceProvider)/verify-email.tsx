import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import OTP from "@/components/OTP";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function VerifyEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);

  const isComplete = useMemo(() => code.length === 6, [code]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (!isComplete || submitting) return;
    setHasError(false);
    setErrorMessage(null);
    try {
      setSubmitting(true);
      const result = await apiRequest<{
        token?: string;
        refreshToken?: string;
        accessToken?: string;
        data?: { token?: string; accessToken?: string; refreshToken?: string };
      }>("/auth/email", {
        method: "POST",
        json: { otp: code },
      });
      const token =
        result?.token ||
        result?.accessToken ||
        result?.data?.token ||
        result?.data?.accessToken;
      const refresh =
        result?.refreshToken || result?.data?.refreshToken;

      if (token) {
        await setSession({
          token,
          refreshToken: refresh,
          email,
          role: "provider",
        });
        router.push("/(auth)/(serviceProvider)/account-setup");
      } else {
        router.push({
          pathname: "/(auth)/login",
          params: { email },
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid or expired OTP.";
      setHasError(true);
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || resending) return;
    setHasError(false);
    setErrorMessage(null);
    try {
      setResending(true);
      await apiRequest("/auth/resend-otp", {
        method: "POST",
        json: { email },
      });
      setCode("");
      setTimeLeft(30);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to resend OTP.";
      setHasError(true);
      setErrorMessage(message);
    } finally {
      setResending(false);
    }
  };

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
    if (hasError) {
      setHasError(false);
      setErrorMessage(null);
    }
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
        <Text className="mt-4 text-sm text-red-500">
          {errorMessage ?? "Invalid or expired OTP."}
        </Text>
      ) : (
        <Text className="mt-4 text-sm text-gray-500">Send code again {formatTime(timeLeft)}</Text>
      )}

      <View className="mt-3 flex-row items-center gap-2">
        <Text className="text-sm text-gray-500">I didn&apos;t receive a code</Text>
        <Pressable onPress={handleResend} disabled={timeLeft > 0 || resending}>
          <Text
            className={`text-sm font-semibold ${
              timeLeft > 0 || resending ? "text-gray-300" : "text-[#005823CC]"
            }`}
          >
            {resending ? "Resending..." : "Resend"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        className={`mt-10 rounded-md py-4 ${isComplete ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleVerify}
        disabled={!isComplete || submitting}
      >
        <Text className="text-center font-semibold text-white">
          {submitting ? "Verifying..." : "Verify email"}
        </Text>
      </Pressable>
    </View>
  );
}
