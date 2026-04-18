import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const cars = [
  { id: "car-1", source: require("../../../../assets/provider-car.png") },
  { id: "car-2", source: require("../../../../assets/provider-car.png") },
  { id: "car-3", source: require("../../../../assets/provider-car.png") },
];

export default function ServiceProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Service Profile</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionLabel text="Work Category" />
        <FieldValue text="Transport & Logistics" />

        <SectionLabel text="Joined as" />
        <FieldValue text="Car Driver" />

        <Text className="mb-2 mt-5 text-[11px] font-semibold text-[#747B86]">Vehicle Pictures</Text>
        <View className="flex-row justify-between">
          {cars.map((car, index) => (
            <View
              key={car.id}
              className="h-[91px] w-[107px] items-center justify-center rounded-[8px] border"
              style={{ backgroundColor: "#1A21271A", borderColor: "#E7E7E7" }}
            >
              <Image
                source={car.source}
                className="h-[60px] w-[95px]"
                resizeMode="contain"
                style={index === 1 ? { transform: [{ scaleX: -1 }] } : undefined}
              />
            </View>
          ))}
        </View>

        <SectionLabel text="Bank Account" />

        <SubLabel text="Bank" />
        <FieldValue text="PROVIDUS BANK" />

        <SubLabel text="Account number" />
        <FieldValue text="8749834221" />

        <SubLabel text="Account name" />
        <FieldValue text="PHIL CROOK" />
      </ScrollView>
    </View>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <Text className="mb-2 mt-5 text-[11px] font-semibold text-[#747B86]">{text}</Text>;
}

function SubLabel({ text }: { text: string }) {
  return <Text className="mb-1.5 mt-4 text-[10px] text-[#8B929D]">{text}</Text>;
}

function FieldValue({ text }: { text: string }) {
  return (
    <View className="mb-3 h-10 items-start justify-center rounded-md border border-[#E7E7E7] bg-[#EEEEEE] px-3">
      <Text className="text-[11px] text-[#707782]">{text}</Text>
    </View>
  );
}
