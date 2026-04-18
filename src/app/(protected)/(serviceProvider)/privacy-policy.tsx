import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const values = [
  "Trust & Transparency - We verify all service providers",
  "Quality First - We maintain high service standards",
  "Community Focus - We support local professionals",
  "Customer Satisfaction - Your happiness is our priority",
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Privacy Policy</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false}>
        <Text className="text-center text-[12px] font-normal leading-[17px] text-[#A0A6AE]">
          Privacy Policy Version 6.0 | June 20, 2025
        </Text>

        <View className="mt-4 h-[136px] w-[345px] self-center">
          <Text className="text-[12px] font-normal leading-[17px] text-[#56606C]">
            SabiGuy is a premier service marketplace connecting skilled professionals with customers who need quality
            services. Founded in 2025, we've grown to become one of the most trusted platforms for finding and booking
            local services.
          </Text>

          <Text className="mt-3 text-[12px] font-normal leading-[17px] text-[#56606C]">
            Our mission is to empower service providers to grow their businesses while giving customers access to
            reliable, vetted professionals in their area.
          </Text>
        </View>

        <View className="mt-5 h-[93px] w-[345px] self-center gap-2">
          <Text className="text-[12px] font-semibold leading-[17px] text-[#3C4550]">Our Values</Text>
          <View className="gap-1">
            {values.map((item) => (
              <View key={item} className="flex-row items-start">
                <View className="mr-2 mt-[5px] h-[4px] w-[4px] rounded-full bg-[#231F20]" />
                <Text className="flex-1 text-[11px] leading-[13px] text-[#56606C]">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5 mb-8 h-[76px] w-[345px] self-center gap-2">
          <Text className="text-[12px] font-semibold leading-[17px] text-[#3C4550]">Contact</Text>
          <Text className="text-[12px] font-normal leading-[17px] text-[#56606C]">
            Email: hello@SabiGuy.com{"\n"}Phone: +234 816 778 3930{"\n"}Address: 15 Victoria Island, Lagos Nigeria
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
