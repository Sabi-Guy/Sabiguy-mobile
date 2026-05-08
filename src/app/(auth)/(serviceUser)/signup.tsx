import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { registerBuyer } from "@/lib/auth";
import { apiRequest } from "@/lib/api";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

type GoogleBuyerRegisterResponse = {
  email?: string;
  data?: {
    email?: string;
    user?: { email?: string };
  };
  user?: { email?: string };
  message?: string;
};

export default function signup() {
  const [agreed, setAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const router = useRouter();

  const [googleRequest, , promptGoogleAuth] = Google.useIdTokenAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
    setPhoneNumber(digitsOnly);
  };

  const handleRegister = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmedName = fullName.trim();
    const [firstName, ...rest] = trimmedName.split(" ");
    const lastName = rest.join(" ");
    const formattedName = lastName ? `${lastName} ${firstName}` : trimmedName;

    try {
      setIsSubmitting(true);
      await registerBuyer({
        name: formattedName,
        email: email.trim(),
        password,
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
      });

      router.push({
        pathname: "/(auth)/(serviceUser)/verify",
        params: { email: email.trim() },
      });
      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "Please verify your email to continue.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error instanceof Error ? error.message : "Unable to register. Please try again.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleBuyerSignup = async () => {
    if (!googleRequest) {
      Toast.show({
        type: "error",
        text1: "Google Sign-In unavailable",
        text2: "Please try again in a few seconds.",
      });
      return;
    }

    try {
      setGoogleSubmitting(true);
      const authResult = await promptGoogleAuth();

      if (authResult.type !== "success") {
        return;
      }

      const idToken = authResult.params?.id_token;
      if (!idToken) {
        throw new Error("Google id token was not returned.");
      }

      const result = await apiRequest<GoogleBuyerRegisterResponse>("/auth/google", {
        method: "POST",
        json: { idToken },
      });

      const resolvedEmail =
        result?.email || result?.data?.email || result?.user?.email || result?.data?.user?.email;

      Toast.show({
        type: "success",
        text1: "Google registration successful",
        text2: "Please verify your email to continue.",
      });

      router.push({
        pathname: "/(auth)/(serviceUser)/verify",
        params: { email: resolvedEmail ?? "" },
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Google registration failed",
        text2: error instanceof Error ? error.message : "Unable to continue with Google.",
      });
    } finally {
      setGoogleSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 24 }}
    >
      <BackButton />
      <View className="mt-10">
        <Text className="text-3xl font-bold text-gray-900">
          Create your account
        </Text>
        <Text className="mt-2 text-base text-gray-600">
          Please enter your details and let&apos;s get you started
        </Text>
      </View>

      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">
            Full Name
          </Text>
          <TextInput
            placeholder="Enter your first and last name"
            value={fullName}
            onChangeText={setFullName}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">
            Address
          </Text>
          <TextInput
            placeholder="Enter your address"
            autoCapitalize="none"
            value={address}
            onChangeText={setAddress}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">
            Phone Number
          </Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            maxLength={11}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">
            Password
          </Text>
          <View className="relative">
            <TextInput
              placeholder="Use a minimum of 8 characters"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
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

      <Pressable
        onPress={() => setAgreed((previous) => !previous)}
        className="mt-6 flex-row items-start"
      >
        <View
          className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border ${
            agreed
              ? "border-[#005823] bg-[#005823]"
              : "border-gray-400 bg-white"
          }`}
        >
          {agreed ? (
            <Text className="text-xs font-bold text-white">?</Text>
          ) : null}
        </View>

        <Text className="flex-1 text-sm text-gray-700">
          I agree to the{" "}
          <Text className="font-semibold text-[#005823]">Privacy Policy</Text>{" "}
          and{" "}
          <Text className="font-semibold text-[#005823]">
            Terms of Services
          </Text>
        </Text>
      </Pressable>

      <Button
        buttonText={isSubmitting ? "Please wait..." : "Continue"}
        onPress={handleRegister}
        disabled={!agreed || isSubmitting}
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
        onPress={handleGoogleBuyerSignup}
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
        <Text className="text-sm text-gray-600">Already have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text className="text-sm font-semibold text-[#005823CC]">Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}


