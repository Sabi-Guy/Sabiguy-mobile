import { Alert, View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";
import React, { useMemo, useState } from "react";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "@/lib/api";
import { setUserEmail } from "@/lib/token";
import Toast from "react-native-toast-message";

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function ServiceProviderSignup() {
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const router = useRouter();

  const canSubmit = useMemo(
    () =>
      agreed &&
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      address.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      password.length > 0 &&
      !submitting,
    [agreed, name, email, address, phoneNumber, password, submitting]
  );

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !address.trim() || !phoneNumber.trim() || !password) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please fill in all fields.",
      });
      return;
    }
    if (!PASSWORD_RULE.test(password)) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2:
          "Password must be at least 8 characters long and include a letter, number, and special character.",
      });
      return;
    }

    try {
      setSubmitting(true);
      await apiRequest("/auth/provider", {
        method: "POST",
        json: { name, email, password, phoneNumber, address: address.trim() },
      });
      await setUserEmail(email.trim());

      Toast.show({
        type: "success",
        text1: "Signup successful",
        text2: "Check your email for the verification code.",
      });
      router.push({
        pathname: "/(auth)/(serviceProvider)/verify-email",
        params: { email },
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Signup failed",
        text2: err instanceof Error ? err.message : "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <Text className="text-3xl font-bold text-gray-900">Create your account</Text>
        <Text className="mt-2 text-base text-gray-600">
          Please enter your details and let&apos;s get you started
        </Text>
      </View>

      <View className="mt-8 gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Full Name</Text>
          <TextInput
            placeholder="Enter your first and last name"
            value={name}
            onChangeText={setName}
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
          <Text className="mb-2 text-sm font-medium text-gray-800">Address</Text>
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
          <Text className="mb-2 text-sm font-medium text-gray-800">Phone Number</Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-800">Password</Text>
          <View className="relative">
            <TextInput
              placeholder="Use a minimum of 8 characters"
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

      <Pressable
        onPress={() => setAgreed((previous) => !previous)}
        className="mt-6 flex-row items-start"
      >
        <View
          className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border ${
            agreed ? "border-[#005823] bg-[#005823]" : "border-gray-400 bg-white"
          }`}
        >
          {agreed ? <Text className="text-xs font-bold text-white">✓</Text> : null}
        </View>

        <Text className="flex-1 text-sm text-gray-700">
          I agree to the <Text className="font-semibold text-[#005823]">Privacy Policy</Text> and{" "}
          <Text className="font-semibold text-[#005823]">Terms of Services</Text>
        </Text>
      </Pressable>

      <Button
        buttonText={submitting ? "Creating account..." : "Continue"}
        onPress={handleSubmit}
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
        <Text className="text-sm text-gray-600">Already have an account? </Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text className="text-sm font-semibold text-[#005823CC]">Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
