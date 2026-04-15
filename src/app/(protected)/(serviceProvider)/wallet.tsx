import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const transactions = [
  {
    id: "1",
    title: "Kitchen Renovation",
    date: "Oct 28, 2025",
    note: "Platform fee: ₦6,400",
    amount: "+₦64,000",
    positive: true,
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
  {
    id: "2",
    title: "Withdrawal to Bank",
    date: "Nov 13, 2025",
    note: "Completed",
    amount: "-₦50,000",
    positive: false,
    icon: "arrow-up" as const,
    rotate: "45deg",
    iconBg: "#FCE8E8",
    iconColor: "#E53935",
  },
  {
    id: "3",
    title: "Tip from John Smith",
    date: "Oct 28, 2025",
    note: "",
    amount: "+₦500",
    positive: true,
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
];

export default function WalletScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Wallet</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-[12px] font-medium text-[#3D434C]">My Wallet</Text>

          <View className="mt-2 rounded-xl bg-[#2E7B4F] p-3">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-[10px] text-white/90">Available Balance</Text>
                <Text className="mt-1 text-[34px] font-bold leading-[38px] text-white">₦94,000</Text>
              </View>
              <View className="mt-1 h-4 w-4 items-center justify-center rounded-sm border border-white/50">
                <Ionicons name="copy-outline" size={10} color="#FFFFFF" />
              </View>
            </View>

            <Pressable
              className="mt-3 h-8 items-center justify-center rounded-full bg-white"
              onPress={() => router.push("/(protected)/(serviceProvider)/withdraw")}
            >
              <Text className="text-[11px] font-semibold text-[#2E7B4F]">Withdraw</Text>
            </Pressable>
          </View>

          <View className="mt-2 flex-row gap-2">
            <SummaryMetric label="Withdrawn" value="₦150,000" />
            <SummaryMetric label="Pending Earnings" value="₦25,000" />
            <SummaryMetric label="Total Earnings" value="₦94,000" />
          </View>

          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-[11px] font-semibold text-[#3D434C]">Transaction History</Text>
            <Pressable className="flex-row items-center">
              <Text className="text-[10px] text-[#69707A]">See all</Text>
              <Ionicons name="chevron-forward" size={12} color="#69707A" />
            </Pressable>
          </View>

          <View className="mt-2 overflow-hidden rounded-xl border border-[#ECECEC] bg-white">
            {transactions.map((item, index) => (
              <View
                key={item.id}
                className={`flex-row items-start px-3 py-3 ${
                  index < transactions.length - 1 ? "border-b border-[#F0F0F0]" : ""
                }`}
              >
                <View
                  className="mr-2 mt-0.5 h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Ionicons
                    name={item.icon}
                    size={14}
                    color={item.iconColor}
                    style={item.rotate ? { transform: [{ rotate: item.rotate }] } : undefined}
                  />
                </View>

                <View className="flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[11px] font-semibold text-[#3D434C]">{item.title}</Text>
                      <Text className="mt-0.5 text-[9px] text-[#8A8F99]">{item.date}</Text>
                    </View>
                    <View className="items-end">
                      <Text className={`text-[11px] font-semibold ${item.positive ? "text-[#239A57]" : "text-[#D94848]"}`}>
                        {item.amount}
                      </Text>
                      {item.note ? <Text className="mt-0.5 text-[9px] text-[#9BA0A9]">{item.note}</Text> : null}
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-auto pt-3">
          <View className="rounded-lg bg-[#EDF0EA] px-3 py-2.5">
            <Text className="text-[9px] font-semibold text-[#7D8477]">Platform service fee</Text>
            <Text className="mt-1 text-[8.5px] leading-[12px] text-[#8D9488]">
              Note: A 10% platform fee applies to completed transactions. For example, if you earn ₦100,000, your
              payout will be ₦90,000.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-lg border border-[#ECECEC] bg-[#F7F7F7] px-2 py-2">
      <Text className="text-[9px] text-[#8A8F99]">{label}</Text>
      <Text className="mt-1 text-[10px] font-semibold text-[#3D434C]">{value}</Text>
    </View>
  );
}
