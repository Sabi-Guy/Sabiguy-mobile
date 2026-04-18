import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

function ItemRow({
  title,
  subtitle,
  icon,
  isFaq = false,
  showDivider = true,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  isFaq?: boolean;
  showDivider?: boolean;
}) {
  return (
    <Pressable
      className={`flex-row items-center px-3 ${isFaq ? "h-[45px]" : "py-2"} ${showDivider ? "border-b border-[#E8EBEF]" : ""}`}
    >
      <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-[#E1ECE6]">
        <Ionicons name={icon} size={isFaq ? 12 : 11} color="#2E7B4F" />
      </View>
      <View className="flex-1 pr-2">
        <Text className={`text-[12px] text-[#4A525D] ${isFaq ? "font-normal" : "font-semibold"}`}>{title}</Text>
        {subtitle ? <Text className="mt-[1px] text-[10px] leading-[12px] text-[#8F97A2]">{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={13} color="#9AA2AE" />
    </Pressable>
  );
}

export default function HelpScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Help</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        <Text className="mb-2 text-[14px] font-semibold leading-[19px] uppercase text-[#818A95]">
          CONTACT SUPPORT
        </Text>
        <View className="mb-6 h-[135px] w-[345px] self-center overflow-hidden rounded-[8px] border border-[#E6E9ED] bg-[#FFFFFF]">
          <ItemRow title="Live Chat" subtitle="Chat with our support team" icon="chatbubble-ellipses-outline" />
          <ItemRow title="Call Us" subtitle="+234 816 778 3930" icon="call-outline" />
          <ItemRow title="Email Support" subtitle="hello@SabiGuy.com" icon="mail-outline" showDivider={false} />
        </View>

        <Text className="mb-2 text-[14px] font-semibold leading-[19px] uppercase text-[#818A95]">
          FREQUENTLY ASKED QUESTIONS
        </Text>
        <View className="mb-8 h-[135px] w-[345px] self-center overflow-hidden rounded-[8px] border border-[#E6E9ED] bg-[#FFFFFF]">
          <ItemRow title="How to book a service" subtitle="" icon="reader-outline" isFaq />
          <ItemRow title="How to book a service" subtitle="" icon="reader-outline" isFaq />
          <ItemRow title="How to book a service" subtitle="" icon="reader-outline" isFaq showDivider={false} />
        </View>
      </ScrollView>
    </View>
  );
}
