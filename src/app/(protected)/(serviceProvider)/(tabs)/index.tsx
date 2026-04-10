import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useAuthStore } from "@/store/auth";
import { toFirstName } from "@/lib/display-name";
import bell from "../../../../../assets/bell-notification.png";
import availabilityToggle from "../../../../../assets/available-toggle.png";
import availabilityToggleOff from "../../../../../assets/available-toggle-off.png";

const statCards = [
  {
    label: "New Requests",
    value: "3",
    bg: "#EAF3EE",
    icon: "briefcase-outline" as const,
    iconBg: "#0F6C37",
    iconColor: "#FFFFFF",
  },
  {
    label: "Scheduled",
    value: "4",
    bg: "#EDF6E2",
    icon: "calendar-outline" as const,
    iconBg: "#8BC63F",
    iconColor: "#FFFFFF",
  },
  {
    label: "In Progress",
    value: "1",
    bg: "#FFF6EF",
    icon: "time-outline" as const,
    iconBg: "#F28B1A",
    iconColor: "#FFFFFF",
  },
  {
    label: "Awaiting Payment",
    value: "2",
    bg: "#F8F6FF",
    icon: "information-circle-outline" as const,
    iconBg: "#7B61FF",
    iconColor: "#FFFFFF",
  },
];

const earnings = [
  { label: "Available", value: "\u20A694,000", tone: "success" as const },
  { label: "Pending", value: "\u20A625,000", tone: "neutral" as const },
];

const revenueBars = [80, 40, 20, 36, 28, 80];

const recentTransactions = [
  {
    id: "1",
    title: "Kitchen Renovation",
    subtitle: "John Smith",
    meta: "Oct 28, 2025",
    amount: "+\u20A664,000",
    subAmount: "Platform fee: \u20A64,000",
    color: "#0F7A3A",
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
  {
    id: "2",
    title: "Kitchen Renovation",
    subtitle: "****1234",
    meta: "Nov 13, 2025",
    amount: "-\u20A650,000",
    subAmount: "Completed",
    color: "#E53935",
    icon: "arrow-up" as const,
    rotate: "45deg",
    iconBg: "#FCE8E8",
    iconColor: "#E53935",
  },
  {
    id: "3",
    title: "Tip from John Smith",
    subtitle: "Kitchen Renovation",
    meta: "Oct 28, 2025",
    amount: "+\u20A6500",
    subAmount: "",
    color: "#0F7A3A",
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
];

export default function ServiceProviderHome() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [nextOnlineState, setNextOnlineState] = useState<boolean | null>(null);
  const email = useAuthStore((state) => state.email);
  const name = useAuthStore((state) => state.name);
  const displayName = useMemo(() => toFirstName(name, email), [name, email]);

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
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingTop: 20, paddingBottom: 40 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-[#231F2099]">Hello</Text>
            <Text className="mt-1 text-lg font-semibold text-[#231F20]">{displayName} 👋</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable onPress={openStatusModal} className="rounded-full">
              <Image
                source={isOnline ? availabilityToggle : availabilityToggleOff}
                className="h-7 w-[86px]"
                resizeMode="contain"
              />
            </Pressable>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Image source={bell} className="h-6 w-6" resizeMode="contain" />
            </Pressable>
          </View>
        </View>

        <View className="mt-5 flex-row flex-wrap gap-3">
          {statCards.map((card) => (
            <View key={card.label} className="w-[48%] rounded-2xl p-3" style={{ backgroundColor: card.bg }}>
              <View className="flex-row items-center gap-2">
                <View className="h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: card.iconBg }}>
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
                  item.tone === "success" ? "border-[#0F7A3A] bg-[#0F7A3A]" : "border-[#E6E6E6] bg-[#F7F7F7]"
                }`}
              >
                <View className="flex-row items-center">
                  <View className="flex-row items-center gap-2">
                    {item.tone === "success" && (
                      <View className="h-6 w-6 items-center justify-center rounded-lg bg-white/20">
                        <Ionicons name="wallet-outline" size={14} color="#FFFFFF" />
                      </View>
                    )}
                    <Text className={`text-sm font-semibold ${item.tone === "success" ? "text-white" : "text-[#231F20]"}`}>
                      {item.value}
                    </Text>
                  </View>
                  {item.tone === "success" && (
                    <View className="ml-auto mt-4">
                      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text
                  className={`mt-2 text-xs ${item.tone === "success" ? "text-white/80 ml-8" : "text-[#231F2099]"}`}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-[#231F20]">Revenue Overview</Text>
            <View className="flex-row items-center gap-1 rounded-full bg-[#F2F3EE] px-3 py-1">
              <Text className="text-[10px] text-[#231F2099]">Last 6 months</Text>
              <Ionicons name="chevron-down" size={12} color="#231F2099" />
            </View>
          </View>
          <View className="mt-4 flex-row">
            <View className="mr-3 h-[120px] justify-between">
              {["60K", "40K", "20K", "10K", "0K"].map((label) => (
                <Text key={label} className="text-[10px] font-semibold text-[#231F2099]">
                  {label}
                </Text>
              ))}
            </View>
            <View className="flex-1">
              <View className="relative h-[120px] flex-row items-end justify-between">
                <View className="absolute inset-0 z-10">
                  <View className="absolute left-0 right-0 top-0 h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 top-[40px] h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 top-[80px] h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 bottom-0 h-px bg-[#ECECEC]" />
                </View>
                {revenueBars.map((height, index) => (
                  <View key={`${height}-${index}`} className="w-[12%] items-center">
                    <View className="h-[120px] w-5 bg-[#F1F2ED] opacity-70" />
                    <View
                      className="absolute bottom-0 w-5 bg-[#0F7A3A] z-20"
                      style={{ height }}
                    />
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
          </View>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((dot) => (
              <View
                key={dot}
                className={`h-2 w-2 rounded-full ${dot === 0 ? "bg-[#0F7A3A]" : "bg-[#D7DBD1]"}`}
              />
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#231F2099]">Recent Transaction</Text>
            <Pressable className="flex-row items-center gap-1">
              <Text className="text-[10px] font-semibold text-[#231F2099]">See all</Text>
              <Ionicons name="chevron-forward" size={12} color="#231F2099" />
            </Pressable>
          </View>
          <View className="mt-3 gap-3">
            {recentTransactions.map((item, index) => (
              <View
                key={item.id}
                className={`flex-row items-center justify-between ${index < recentTransactions.length - 1 ? "border-b border-[#ECECEC] pb-3" : ""}`}
              >
                <View className="flex-row items-center gap-2">
                  <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: item.iconBg }}>
                    <Ionicons
                      name={item.icon}
                      size={14}
                      color={item.iconColor}
                      style={item.rotate ? { transform: [{ rotate: item.rotate }] } : undefined}
                    />
                  </View>
                  <View>
                    <Text className="text-xs font-semibold text-[#231F20]">{item.title}</Text>
                    <Text className="text-[10px] text-[#231F2099]">{item.subtitle}</Text>
                    <Text className="text-[10px] text-[#231F2099]">{item.meta}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-xs font-semibold" style={{ color: item.color }}>
                    {item.amount}
                  </Text>
                  {!!item.subAmount && <Text className="text-[10px] text-[#231F2099]">{item.subAmount}</Text>}
                </View>
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
