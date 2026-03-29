import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";


const hireAlerts = [
  {
    id: "1",
    title: "Package Delivery",
    date: "Oct 10, 2025 • 9 AM",
    pickup: "15 Victoria Island, Lagos",
    dropoff: "24 Palm Avenue, Lekki Phase 1",
    distance: "Distance: 10.5 km",
    price: "₦5,000",
    isNew: true,
  },
  {
    id: "2",
    title: "Package Delivery",
    date: "Oct 10, 2025 • 9 AM",
    pickup: "15 Victoria Island, Lagos",
    dropoff: "24 Palm Avenue, Lekki Phase 1",
    distance: "Distance: 10.5 km",
    price: "₦5,000",
    isNew: true,
  },
  {
    id: "3",
    title: "Package Delivery",
    date: "Oct 10, 2025 • 9 AM",
    pickup: "15 Victoria Island, Lagos",
    dropoff: "24 Palm Avenue, Lekki Phase 1",
    distance: "Distance: 10.5 km",
    price: "₦5,000",
    isNew: true,
  },
];

export default function Hire() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"alerts" | "jobs">("alerts");

  return (
    <ScrollView
      className="flex-1 bg-[#F6F7F3]"
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
    >
      <Text className="text-base font-semibold text-center text-[#231F20]">Hire Alerts</Text>

      <View
        className="mt-4 flex-row bg-[#F2F3EE] p-1"
        style={{ width: 344, height: 42, borderRadius: 8, alignSelf: "center" }}
      >
        <Pressable
          onPress={() => setActiveTab("alerts")}
          className={`flex-1 rounded-full px-4 py-2 ${
            activeTab === "alerts" ? "bg-white shadow-sm" : ""
          }`}
        >
          <Text
            className={`text-center text-xs font-semibold ${
              activeTab === "alerts" ? "text-[#0F7A3A]" : "text-[#231F2099]"
            }`}
          >
            Hire Alerts
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("jobs")}
          className={`flex-1 rounded-full px-4 py-2 ${activeTab === "jobs" ? "bg-white shadow-sm" : ""}`}
        >
          <Text
            className={`text-center text-xs font-semibold ${
              activeTab === "jobs" ? "text-[#0F7A3A]" : "text-[#231F2099]"
            }`}
          >
            Jobs
          </Text>
        </Pressable>
      </View>

      {activeTab === "alerts" ? (
        <View className="mt-4" style={{ width: 345, height: 785, alignSelf: "center", gap: 16 }}>
          {hireAlerts.map((alert) => (
            <View
              key={alert.id}
              className="rounded-2xl bg-white p-4 shadow-sm"
              style={{ width: 345, alignSelf: "center" }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-[#231F20]">{alert.title}</Text>
                {alert.isNew && (
                  <View className="rounded-full bg-[#E7F3EC] px-2 py-1">
                    <Text className="text-[10px] font-semibold text-[#0F7A3A]">New</Text>
                  </View>
                )}
              </View>
              <View className="mt-3 flex-row items-center gap-2">
                <Ionicons name="time-outline" size={14} color="#0F7A3A" />
                <Text className="text-xs text-[#231F2099]">{alert.date}</Text>
              </View>
              <View className="mt-3 gap-3">
                <View className="flex-row items-start gap-2">
                  <View className="mt-1 h-2 w-2 rounded-full bg-[#0F7A3A]" />
                  <Text className="text-xs text-[#231F2099]">Pickup</Text>
                  <Text className="text-xs text-[#231F20]">{alert.pickup}</Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <View className="mt-1 h-2 w-2 rounded-full bg-[#0F7A3A]" />
                  <Text className="text-xs text-[#231F2099]">Dropoff</Text>
                  <Text className="text-xs text-[#231F20]">{alert.dropoff}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-start gap-2">
                    <View className="mt-1 h-2 w-2 rounded-full bg-[#0F7A3A]" />
                    <Text className="text-xs text-[#231F2099]">{alert.distance}</Text>
                  </View>
                  <Text className="text-xs font-semibold text-[#0F7A3A]">{alert.price}</Text>
                </View>
              </View>

              <View className="mt-3 flex-row gap-2">
                <Pressable className="flex-1 rounded-full border border-[#E6E6E6] py-2">
                  <Text className="text-center text-xs font-semibold text-[#231F20]">Decline</Text>
                </Pressable>
                <Pressable
                  className="flex-1 rounded-full bg-[#0F7A3A] py-2"
                  onPress={() => router.push("/(protected)/(serviceProvider)/(tabs)/hire/tracking")}
                >
                  <Text className="text-center text-xs font-semibold text-white">Accept</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="mt-6 items-center rounded-2xl bg-white p-6 shadow-sm">
          <Ionicons name="briefcase-outline" size={24} color="#0F7A3A" />
          <Text className="mt-2 text-sm font-semibold text-[#231F20]">No jobs yet</Text>
          <Text className="mt-1 text-xs text-[#231F2099]">Accepted jobs will appear here.</Text>
        </View>
      )}
    </ScrollView>
  );
}







