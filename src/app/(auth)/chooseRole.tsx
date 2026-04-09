import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function chooseRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole === "user") {
      router.push("/(auth)/(serviceUser)/signup");
      return;
    }
    if (selectedRole === "provider") {
      router.push("/(auth)/(serviceProvider)/signup");
      return;
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Pressable
        className="absolute right-6 top-12"
        onPress={() => router.push("/(auth)/login")}
      >
        <Text className="text-sm font-semibold text-[#005823CC]">Login</Text>
      </Pressable>
      <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
        How do you want to use SabiGuy?
      </Text>
      <View className="space-y-4">
        <Pressable
          onPress={() => {
            setSelectedRole("user");
           
          }}
          className={`items-center rounded-lg border p-6 ${
            selectedRole === "user" ? "border-[#005823CC] border-2 bg-[#0058231A]" : "border-[#231F2080]"
          }`}
        >
          <Image source={require("../../../assets/search.png")} className="h-10 w-10" resizeMode="contain" />
          <View className="items-center mt-3">
            <Text className="text-lg font-bold text-gray-900">I need a service</Text>
            <Text className="text-base text-gray-600">Find skilled professional for your needs</Text>
            <Text className="mt-1 text-center text-sm text-gray-600">
              Connect with plumbers, electricians, tutor, tech experts and more
            </Text>
          </View>
        </Pressable>

        <View className="h-10" />

        <Pressable
          onPress={() => {
            setSelectedRole("provider");
        
          }}
          className={`items-center rounded-lg border p-6 ${
            selectedRole === "provider" ? "border-[#005823CC] border-2 bg-[#0058231A]" : "border-[#231F2080]"
          }`}
        >
          <Image source={require("../../../assets/tool.png")} className="h-10 w-10" resizeMode="contain" />
          <View className="items-center mt-3">
            <Text className="text-lg font-bold text-gray-900">I provide a service</Text>
            <Text className="text-base text-gray-600">Grow your business and find new clients</Text>
            <Text className="mt-1 text-center text-sm text-gray-600">
              Showcase your skills and get hired for jobs in your area
            </Text>
          </View>
        </Pressable>
      </View>

      <Pressable
        className={`mt-8 w-full rounded-md py-4 ${selectedRole ? "bg-[#005823CC]" : "bg-gray-300"}`}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text className="text-white text-center">
          Continue
        </Text>
      </Pressable>
    </View>
  );
}
