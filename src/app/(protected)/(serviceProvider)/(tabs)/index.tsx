import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useAuthStore } from "@/store/auth";
import { toFirstName } from "@/lib/display-name";
import bell from "../../../../../assets/bell.png";

const statCards = [
  {
    label: "New Requests",
    value: "3",
    bg: "#E7F3EC",
    icon: "briefcase-outline" as const,
    iconBg: "#DCEFE3",
    iconColor: "#0F7A3A",
  },
  {
    label: "Scheduled",
    value: "4",
    bg: "#E9F2D5",
    icon: "calendar-outline" as const,
    iconBg: "#DDEBC1",
    iconColor: "#6BA62E",
  },
  {
    label: "In Progress",
    value: "1",
    bg: "#FFF1E3",
    icon: "time-outline" as const,
    iconBg: "#FFE3C7",
    iconColor: "#F0810F",
  },
  {
    label: "Awaiting Payment",
    value: "2",
    bg: "#F2ECFF",
    icon: "card-outline" as const,
    iconBg: "#E5DBFF",
    iconColor: "#6C4EEA",
  },
];

const earnings = [
  { label: "Available", value: "?94,000", tone: "success" as const },
  { label: "Pending", value: "?25,000", tone: "neutral" as const },
];

const revenueBars = [46, 22, 32, 18, 28, 52];

const recentTransactions = [
  {
    id: "1",
    title: "Kitchen Renovation",
    subtitle: "John Smith",
    meta: "Oct 28, 2025",
    amount: "+?64,000",
    subAmount: "Platform fee: ?4,000",
    color: "#0F7A3A",
    icon: "arrow-down-outline" as const,
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
  {
    id: "2",
    title: "Kitchen Renovation",
    subtitle: "**2334",
    meta: "Nov 13, 2025",
    amount: "-?50,000",
    subAmount: "Completed",
    color: "#E53935",
    icon: "arrow-up-outline" as const,
    iconBg: "#FCE8E8",
    iconColor: "#E53935",
  },
  {
    id: "3",
    title: "Tip from John Smith",
    subtitle: "Kitchen Renovation",
    meta: "Oct 28, 2025",
    amount: "+?500",
    subAmount: "",
    color: "#0F7A3A",
    icon: "arrow-down-outline" as const,
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
            <Text className="mt-1 text-lg font-semibold text-[#231F20]">{displayName} ??</Text>
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
              <Image source={bell} className="h-4 w-4" resizeMode="contain" />
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
                <View className="flex-row items-center justify-between">
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
                  {item.tone === "success" && <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />}
                </View>
                <Text className={`mt-2 text-xs ${item.tone === "success" ? "text-white/80" : "text-[#231F2099]"}`}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#231F2099]">Revenue Overview</Text>
            <View className="flex-row items-center gap-1 rounded-full bg-[#F2F3EE] px-3 py-1">
              <Text className="text-[10px] text-[#231F2099]">Last 6 months</Text>
              <Ionicons name="chevron-down" size={12} color="#231F2099" />
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
              <Text className="text-[10px] font-semibold text-[#231F2099]">See all</Text>
            </Pressable>
          </View>
          <View className="mt-3 gap-3">
            {recentTransactions.map((item) => (
              <View key={item.id} className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: item.iconBg }}>
                    <Ionicons name={item.icon} size={14} color={item.iconColor} />
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
