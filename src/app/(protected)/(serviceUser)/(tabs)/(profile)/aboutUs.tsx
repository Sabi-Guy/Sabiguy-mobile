import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AboutUsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">About Us</Text>
        </View>
      </View>

      <View className="px-4 pt-4">
        <View className="h-[153px] w-[345px] self-center items-center rounded-[16px] border-[0.3px] border-[#E0E5E2] bg-[#0058230D] px-4 pt-4">
          <View className="mt-2 h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#D6E7DD]">
            <Text className="text-[17px] font-bold text-[#0C6A33]">SG</Text>
          </View>
          <Text className="mt-5 text-[35px] font-semibold leading-[38px] text-[#2F363F]">SabiGuy</Text>
          <Text className="mt-1.5 text-[10px] text-[#8B929C]">Version 2.0.1</Text>
        </View>

        <View className="mt-4 w-[345px] self-center overflow-hidden rounded-[8px] border border-[#E6E9ED] bg-[#FFFFFF]">
          <Pressable
            className="h-[45px] flex-row items-center border-b border-[#E8EBEF] px-3"
            onPress={() => router.push("/(protected)/(serviceUser)/termsConditions")}
          >
            <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-[#E1ECE6]">
              <Ionicons name="gift-outline" size={11} color="#2E7B4F" />
            </View>
            <Text className="flex-1 text-[12px] text-[#5A626E]">Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={13} color="#9AA2AE" />
          </Pressable>

          <Pressable
            className="h-[45px] flex-row items-center px-3"
            onPress={() => router.push("/(protected)/(serviceUser)/privacyScreen")}
          >
            <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-[#E1ECE6]">
              <Ionicons name="information-circle-outline" size={11} color="#2E7B4F" />
            </View>
            <Text className="flex-1 text-[12px] text-[#5A626E]">Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={13} color="#9AA2AE" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
