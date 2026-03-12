import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function resetSuccess() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Image
        source={require("../../../../assets/reset.png")}
       className="h-36 w-auto "
        resizeMode="contain"
      />
      <Text className="mt-8 text-3xl font-bold text-gray-900">Password reset successful</Text>
      <Text className="mt-2 text-center text-base text-gray-600">
        You can now use your new password to login into your account.
      </Text>
      <Pressable className="mt-10 w-full rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceUser)/login")}>
        <Text className="text-center font-semibold text-white">Login</Text>
      </Pressable>
    </View>
  );
}
