import React, { useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "@/lib/api";
import { setAuthToken, setRefreshToken, setUserEmail } from "@/lib/token";
import Toast from "react-native-toast-message";

export default function ServiceProviderLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0 && !submitting,
    [email, password, submitting]
  );

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please enter your email and password.",
      });
      return;
    }

    try {
      setSubmitting(true);
      const result = await apiRequest<{
        token?: string;
        refreshToken?: string;
      }>("/auth", {
        method: "POST",
        json: { email, password },
      });
      if (result?.token) {
        await setAuthToken(result.token);
      }
      if (result?.refreshToken) {
        await setRefreshToken(result.refreshToken);
      }
      await setUserEmail(email.trim());
      Toast.show({
        type: "success",
        text1: "Login successful",
      });
      router.push("/(protected)/(tabs)");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: err instanceof Error ? err.message : "Unable to login. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <Text className="text-3xl font-bold text-gray-900">Welcome back</Text>
        <Text className="mt-2 text-base text-gray-600">
          Kindly provide your email address and password to continue
        </Text>
      </View>

      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Email or phone</Text>
          <TextInput
            placeholder="Enter your email or phone"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Password</Text>
          <View className="relative">
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 pr-12 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
            />

            <Pressable
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPassword((previous) => !previous)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#005823CC"
              />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable className="mt-4" onPress={() => router.push("/(auth)/(serviceProvider)/forgot-password")}>
        <Text className="text-sm font-semibold text-[#231F20]">Forgot Password?</Text>
      </Pressable>

      <Button
        buttonText={submitting ? "Signing in..." : "Continue"}
        onPress={handleLogin}
        disabled={!canSubmit}
      />

      <View className="mt-6 flex-row items-center">
        <View className="h-px flex-1 bg-gray-300" />
        <Text className="mx-3 text-sm text-gray-500">or</Text>
        <View className="h-px flex-1 bg-gray-300" />
      </View>

      <Pressable
        className={`mt-4 w-full flex-row items-center justify-center rounded-md py-4 ${
          googleSubmitting ? "opacity-60" : ""
        }`}
        style={{ backgroundColor: "#231F200D" }}
        disabled={googleSubmitting}
        onPress={() => {
          const hasClientId =
            !!process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ||
            !!process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ||
            !!process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

          if (!hasClientId) {
            Alert.alert(
              "Google Sign-In not configured",
              "Ask your admin for Google OAuth client IDs, then we'll enable this."
            );
            return;
          }

          setGoogleSubmitting(true);
          setTimeout(() => {
            setGoogleSubmitting(false);
            Alert.alert("Google Sign-In", "OAuth will be enabled once client IDs are added.");
          }, 800);
        }}
      >
        <Image
          source={require("../../../../assets/google.png")}
          className="mr-2 h-5 w-5"
          resizeMode="contain"
        />
        <Text className="font-semibold text-[#231F20]">
          {googleSubmitting ? "Connecting..." : "Continue with Google"}
        </Text>
      </Pressable>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-sm text-gray-600">Don&apos;t have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/(serviceProvider)/signup")}>
          <Text className="text-sm font-semibold text-[#005823CC]">Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
