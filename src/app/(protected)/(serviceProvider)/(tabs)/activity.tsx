import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const filters = ["All", "Bookings", "Payments", "Updates"] as const;
type FilterKey = (typeof filters)[number];

const activities = [
  {
    id: "1",
    title: "Booking confirmed",
    description: "You have been booked for “House Wiring & Electrical Setup” by Chioma A.",
    time: "2 mins ago",
    category: "Bookings" as const,
    tone: "purple",
    icon: "build",
    iconSize: 16,
  },
  {
    id: "2",
    title: "Project Started",
    description: "You started a project on “House Wiring & Electrical Setup”.",
    time: "2h ago",
    category: "Updates" as const,
    tone: "green",
    icon: "checkmark",
    iconSize: 16,
  },
  {
    id: "3",
    title: "Pending Review",
    description: "You submitted a job for review. Awaiting\ncustomer approval.",
    time: "2h ago",
    category: "Payments" as const,
    tone: "orange",
    icon: "time",
    iconSize: 16,
  },
  {
    id: "4",
    title: "Project Completed",
    description: "Customer confirmed the job is now complete.",
    time: "Yesterday",
    category: "Updates" as const,
    tone: "green",
    icon: "checkmark",
    iconSize: 16,
    action: "View Ratings",
  },
  {
    id: "5",
    title: "Cancellation Request",
    description: "Sarah Johnson requested to cancel the service\n“Full house wiring”.",
    time: "2 days ago",
    category: "Bookings" as const,
    tone: "red",
    icon: "close",
    iconSize: 16,
    action: "View Reason",
  },
];

const toneStyles = {
  purple: { bg: "#6C4EEA", text: "#FFFFFF" },
  green: { bg: "#0F7A3A", text: "#FFFFFF" },
  orange: { bg: "#F59E0B", text: "#FFFFFF" },
  red: { bg: "#E53935", text: "#FFFFFF" },
};

export default function Activity() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return activities;
    return activities.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-6">
        <Text className="text-base font-semibold text-[#231F20] text-center">Activity</Text>

        <View
          className="mt-4 flex-row items-center"
          style={{ width: "100%", maxWidth: 300, height: 26, gap: 6 }}
        >
          {filters.map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`flex-1 items-center justify-center rounded-full border px-3 ${
                activeFilter === filter ? "bg-[#0F7A3A] border-[#0F7A3A]" : "bg-white border-[#E6E6E6]"
              }`}
              style={{ height: 22 }}
            >
              <Text
                className={`text-[10px] font-semibold ${
                  activeFilter === filter ? "text-white" : "text-[#6B7280]"
                }`}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView className="mt-4 flex-1 px-6">
        <View className="gap-5 pb-10">
          {filtered.map((item) => {
            const tone = toneStyles[item.tone as keyof typeof toneStyles];
            const rowHeight = item.id === "5" ? 80 : item.id === "4" ? 64 : 53;
            return (
              <View
                key={item.id}
                className="flex-row"
                style={{ width: "100%", maxWidth: 345, height: rowHeight, gap: 8 }}
              >
                {item.id === "1" ? (
                  <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: tone.bg }}>
                    <Ionicons name={item.icon as any} size={15} color="#FFFFFF" />
                  </View>
                ) : item.id === "3" ? (
                  <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: tone.bg }}>
                    <View
                      className="h-4 w-4 items-center justify-center rounded-full border bg-transparent"
                      style={{ borderColor: "#FFFFFF" }}
                    >
                      <Ionicons name={item.icon as any} size={9} color="#FFFFFF" />
                    </View>
                  </View>
                ) : (
                  <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: tone.bg }}>
                    <View className="h-4 w-4 items-center justify-center rounded-full border" style={{ borderColor: "#FFFFFF" }}>
                      <Ionicons name={item.icon as any} size={9} color="#FFFFFF" />
                    </View>
                  </View>
                )}
                <View className="flex-1">
                  <View className="flex-row items-start">
                    <Text className="flex-1 text-[13px] font-semibold text-[#231F20]">{item.title}</Text>
                    <Text className="ml-2 text-right text-[10px] text-[#9CA3AF]">{item.time}</Text>
                  </View>
                  <Text className="mt-1 text-[12px] text-[#6B7280]">{item.description}</Text>
                  {item.action && (
                    <Pressable className="mt-2 self-start rounded-full border border-[#E6E6E6] px-3 py-1">
                      <Text className="text-[10px] font-semibold text-[#231F20]">{item.action}</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
