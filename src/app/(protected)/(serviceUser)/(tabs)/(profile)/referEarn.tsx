import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Share, Text, View } from "react-native";

const howItWorks = [
  {
    id: "1",
    title: "Refer a friend",
    subtitle: "Share your unique referral code with users like you",
    icon: "share-social-outline" as const,
  },
  {
    id: "2",
    title: "Your friend gets ₦500",
    subtitle: "Your friend gets ₦500 on their first booking",
    icon: "people-outline" as const,
  },
  {
    id: "3",
    title: "You earn ₦1,000",
    subtitle: "Your friend gets ₦500 on their first booking",
    icon: "ribbon" as const,
  },
];

export default function ReferEarnScreen() {
  const router = useRouter();
  const referralCode = "RB4821";

  const onShare = async () => {
    await Share.share({
      message: `Use my SabiGuy referral code ${referralCode} and earn rewards.`,
    });
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Refer & Earn</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        <View className="h-[195px] w-[345px] self-center rounded-[8px] border-[0.3px] border-[#E0E5E2] bg-[#EAEFEC] px-2 py-6">
          <View className="mt-5 h-11 w-11 self-center items-center justify-center rounded-full bg-[#D8E6DF]">
            <Ionicons name="gift-outline" size={20} color="#2E7B4F" />
          </View>
          <View className="mt-auto pb-1">
            <Text className="text-center text-[16px] font-semibold text-[#2F363F]">Refer & Earn Rewards</Text>
            <Text className="mt-2 text-center text-[12px] text-[#7E8792]">
              Earn wallet credits when your friends sign up and{"\n"}complete their first service.
            </Text>
          </View>
        </View>

        <View className="mt-5 h-[80px] w-[345px] self-center rounded-[8px] border-[0.3px] border-[#E5E8EC] bg-[#F4F4F4] px-3 py-2">
          <Text className="text-[10px] text-[#7F8792]">Your referral code</Text>
          <View className="mt-2 flex-row items-center">
            <View className="h-10 flex-1 items-center justify-center rounded-md bg-[#E6E8E9]">
              <Text className="text-[26px] font-semibold tracking-[0.8px] text-[#2D3239]">{referralCode}</Text>
            </View>
            <Pressable className="ml-2 h-10 w-10 items-center justify-center rounded-md border border-[#D8DFE4] bg-[#EBF0ED]">
              <Ionicons name="copy-outline" size={16} color="#2E7B4F" />
            </Pressable>
          </View>
        </View>

        <Pressable className="mt-3 h-11 flex-row items-center justify-center rounded-md bg-[#2E7B4F]" onPress={onShare}>
          <Ionicons name="share-social-outline" size={14} color="#FFFFFF" />
          <Text className="ml-2 text-[12px] font-semibold text-white">Share with friends</Text>
        </Pressable>

        <Text className="mt-4 text-[16px] font-semibold text-[#3A4048]">How it works</Text>
        <View className="mt-2 mb-8 ml-2 h-[136px] w-[330px] gap-5">
          {howItWorks.map((item) => (
            <View key={item.id} className="flex-row items-start">
              <View className="mr-2 mt-0.5 h-7 w-7 items-center justify-center rounded-full bg-[#E1ECE6]">
                <Ionicons name={item.icon} size={12} color="#2E7B4F" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-semibold text-[#2F363F]">{item.title}</Text>
                <Text className="mt-0.5 text-[11px] text-[#7F8792]">{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}



