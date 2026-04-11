import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ActivityItem, { ActivityType } from "@/components/ActivityItem";

const FILTERS = ["All", "Bookings", "Payments", "Updates"] as const;
type FilterType = (typeof FILTERS)[number];

type ActivityEntry = {
  id: string;
  type: ActivityType;
  category: Exclude<FilterType, "All">;
  title: string;
  description: string;
  time: string;
  ctaLabel?: string;
};

const Activity = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const data = useMemo<ActivityEntry[]>(
    () => [
      {
        id: "booking-confirmed",
        type: "booking",
        category: "Bookings",
        title: "Booking confirmed",
        description:
          "You have been booked for \"House Wiring & Electrical Setup\" by Chioma A.",
        time: "2 mins ago",
      },
      {
        id: "project-started",
        type: "progress",
        category: "Updates",
        title: "Project Started",
        description:
          "You started a project on \"House Wiring & Electrical Setup\".",
        time: "2 hours ago",
      },
      {
        id: "pending-review",
        type: "review",
        category: "Updates",
        title: "Pending Review",
        description:
          "You submitted a job for review. Awaiting customer approval.",
        time: "2 hours ago",
      },
      {
        id: "project-completed",
        type: "completed",
        category: "Updates",
        title: "Project Completed",
        description: "Customer confirm the job is now complete.",
        time: "Yesterday",
        ctaLabel: "View Ratings",
      },
      {
        id: "cancellation-request",
        type: "cancellation",
        category: "Updates",
        title: "Cancellation Request",
        description:
          "Sarah Johnson requested to cancel the service \"Full house wiring\".",
        time: "2 days ago",
        ctaLabel: "View Reason",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (activeFilter === "All") return data;
    return data.filter((item) => item.category === activeFilter);
  }, [activeFilter, data]);

  return (
    <View className="flex-1 bg-white pt-4">
      <View className="mt-3 flex-row gap-2 px-5">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={
                isActive
                  ? "rounded-md bg-green-700 px-3 py-1"
                  : "rounded-md border border-gray-200 px-3 py-1"
              }
            >
              <Text className={isActive ? "text-ssm font-semibold text-white" : "text-sm font-medium text-black"}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView className="flex-1 px-5 pb-6 pt-4">
        <View className="gap-5">
          {filtered.map((item) => (
            <ActivityItem
              key={item.id}
              type={item.type}
              title={item.title}
              description={item.description}
              time={item.time}
              ctaLabel={item.ctaLabel}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Activity;