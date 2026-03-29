import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";

const statCards = [
  { label: "New Requests", value: "3", color: "#E7F3EC", icon: "time-outline" as const, iconColor: "#0F7A3A" },
  { label: "Scheduled", value: "4", color: "#E7F3EC", icon: "calendar-outline" as const, iconColor: "#0F7A3A" },
  { label: "In Progress", value: "1", color: "#FFF2E5", icon: "briefcase-outline" as const, iconColor: "#F0810F" },
  { label: "Awaiting Payment", value: "2", color: "#F2ECFF", icon: "cash-outline" as const, iconColor: "#6C4EEA" },
];

const earnings = [
  { label: "Available", value: "₦94,000", tone: "success" as const },
  { label: "Pending", value: "₦25,000", tone: "neutral" as const },
];

const revenueBars = [28, 64, 34, 52, 40, 70];
const recentTransactions = [
  { id: "1", title: "Kitchen Renovation", subtitle: "Paid by Jimee", amount: "+₦64,000", color: "#0F7A3A" },
  { id: "2", title: "Kitchen Renovation", subtitle: "Paid by Jimee", amount: "-₦4,000", color: "#E53935" },
  { id: "3", title: "Tip from John Smith", subtitle: "Oct 28, 2025", amount: "+₦500", color: "#0F7A3A" },
];

export default function ServiceProviderHome() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [nextOnlineState, setNextOnlineState] = useState<boolean | null>(null);

  const openStatusModal = () => {
    const targetState = !isOnline;
    setNextOnlineState(targetState);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setNextOnlineState(null);
  };

  const confirmStatusChange = () => {
    if (nextOnlineState !== null) {
      setIsOnline(nextOnlineState);
    }
    closeStatusModal();
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingTop: 28, paddingBottom: 40 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-[#231F2099]">Hello</Text>
            <Text className="mt-1 text-lg font-semibold text-[#231F20]">Mistura 👋</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center rounded-full bg-white px-2 py-1 shadow-sm">
              <Text className="mr-2 text-xs text-[#231F2099]">Available</Text>
              <Switch
                value={isOnline}
                onValueChange={openStatusModal}
                trackColor={{ false: "#D7DBD1", true: "#0F7A3A" }}
                thumbColor="#FFFFFF"
              />
            </View>
            <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <Ionicons name="notifications-outline" size={16} color="#0F7A3A" />
            </Pressable>
          </View>
        </View>

        <View className="mt-5 flex-row flex-wrap gap-3">
          {statCards.map((card) => (
            <View key={card.label} className="w-[48%] rounded-2xl bg-white p-3 shadow-sm">
              <View className="flex-row items-center gap-2">
                <View className="h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: card.color }}>
                  <Ionicons name={card.icon} size={14} color={card.iconColor} />
                </View>
                <Text className="text-lg font-semibold text-[#231F20]">{card.value}</Text>
              </View>
              <Text className="mt-2 text-xs text-[#231F2099]">{card.label}</Text>
            </View>
          ))}
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="text-xs font-semibold text-[#231F2099]">Earnings</Text>
          <View className="mt-3 flex-row gap-3">
            {earnings.map((item) => (
              <View
                key={item.label}
                className={`flex-1 rounded-xl border px-3 py-3 ${
                  item.tone === "success" ? "border-[#0F7A3A]" : "border-[#E6E6E6]"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    item.tone === "success" ? "text-[#0F7A3A]" : "text-[#231F20]"
                  }`}
                >
                  {item.value}
                </Text>
                <Text className="mt-2 text-xs text-[#231F2099]">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#231F2099]">Revenue Overview</Text>
            <View className="rounded-full bg-[#F2F3EE] px-3 py-1">
              <Text className="text-[10px] text-[#231F2099]">Last 6 months</Text>
            </View>
          </View>
          <View className="mt-4 h-28 flex-row items-end justify-between">
            {revenueBars.map((height, index) => (
              <View key={`${height}-${index}`} className="w-[12%] items-center">
                <View className="w-3 rounded-full bg-[#0F7A3A]" style={{ height }} />
              </View>
            ))}
          </View>
          <View className="mt-2 flex-row justify-between px-1">
            {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((label) => (
              <Text key={label} className="text-[10px] text-[#231F2099]">
                {label}
              </Text>
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#231F2099]">Recent Transaction</Text>
            <Pressable>
              <Text className="text-[10px] font-semibold text-[#0F7A3A]">See all</Text>
            </Pressable>
          </View>
          <View className="mt-3 gap-3">
            {recentTransactions.map((item) => (
              <View key={item.id} className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
                    <Ionicons name="hammer-outline" size={14} color="#0F7A3A" />
                  </View>
                  <View>
                    <Text className="text-xs font-semibold text-[#231F20]">{item.title}</Text>
                    <Text className="text-[10px] text-[#231F2099]">{item.subtitle}</Text>
                  </View>
                </View>
                <Text className="text-xs font-semibold" style={{ color: item.color }}>
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {showStatusModal && (
        <View className="absolute inset-0 items-center justify-center bg-black/40 px-6">
          <View className="w-full rounded-2xl bg-white p-5 shadow-lg">
            <Text className="text-sm font-semibold text-[#231F20]">
              {nextOnlineState ? "Ready to Receive Orders?" : "Go Offline?"}
            </Text>
            <Text className="mt-2 text-xs text-[#231F2099]">
              {nextOnlineState
                ? "You will start receiving service requests."
                : "You won't receive new requests while offline."}
            </Text>
            <View className="mt-4 flex-row justify-end gap-3">
              <Pressable onPress={closeStatusModal} className="rounded-full bg-[#F2F3EE] px-4 py-2">
                <Text className="text-xs font-semibold text-[#231F20]">Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmStatusChange} className="rounded-full bg-[#0F7A3A] px-4 py-2">
                <Text className="text-xs font-semibold text-white">
                  {nextOnlineState ? "Go Online" : "Yes Go Offline"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
