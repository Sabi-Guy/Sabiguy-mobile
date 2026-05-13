import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  getNotifications,
  markAllNotificationsAsRead,
  NotificationItem,
} from "@/lib/notifications";

export default function NotificationsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;

    const loadNotifications = async () => {
      try {
        const result = await getNotifications(1, 20);
        if (!active) return;
        setNotifications(result?.data?.notifications ?? []);
        setUnreadCount(result?.data?.unreadCount ?? 0);
      } catch (err) {
        if (!active) return;
        Toast.show({
          type: "error",
          text1: "Could not load notifications",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadNotifications();

    return () => {
      active = false;
    };
  }, []);

  const refreshNotifications = async () => {
    const result = await getNotifications(1, 20);
    setNotifications(result?.data?.notifications ?? []);
    setUnreadCount(result?.data?.unreadCount ?? 0);
  };

  const handleMarkAllRead = async () => {
    if (markingAllRead || unreadCount === 0) return;
    try {
      setMarkingAllRead(true);
      await markAllNotificationsAsRead();
      await refreshNotifications();
      Toast.show({
        type: "success",
        text1: "All notifications marked as read",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Could not mark all as read",
        text2: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setMarkingAllRead(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-[#ECEFF3] px-5 py-4">
        <View>
          <Text className="text-[18px] font-bold text-[#111827]">Notifications</Text>
          {!loading ? (
            <Text className="mt-0.5 text-[12px] text-[#667085]">{unreadCount} unread</Text>
          ) : null}
        </View>
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={handleMarkAllRead}
            disabled={loading || markingAllRead || unreadCount === 0}
            className={`rounded-full px-2.5 py-1 ${
              loading || markingAllRead || unreadCount === 0 ? "bg-[#EEF0F3]" : "bg-[#E9F6EE]"
            }`}
          >
            <Text
              className={`text-[11px] font-semibold ${
                loading || markingAllRead || unreadCount === 0 ? "text-[#98A2B3]" : "text-[#2E7B4F]"
              }`}
            >
              {markingAllRead ? "Marking..." : "Mark all read"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            className="h-8 w-8 items-center justify-center rounded-full"
            accessibilityRole="button"
            accessibilityLabel="Close notifications"
          >
            <Ionicons name="close" size={28} color="#667085" />
          </Pressable>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center px-6">
          <ActivityIndicator size="small" color="#2E7B4F" />
        </View>
      ) : notifications.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-[#F2F4F7]">
            <Ionicons name="notifications-outline" size={42} color="#98A2B3" />
          </View>
          <Text className="mt-7 text-[14px] font-semibold text-[#111827]">All caught up!</Text>
          <Text className="mt-2 text-[12px] text-[#667085]">You have no unread notifications</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 24 }}>
          {notifications.map((item, index) => {
            const id = item._id ?? item.id ?? `${index}`;
            const isRead = item.isRead ?? item.read ?? false;
            const title = item.title ?? item.type ?? "Notification";
            const message = item.message ?? item.body ?? "You have a new update.";
            return (
              <View
                key={id}
                className={`mb-3 rounded-xl border px-3 py-3 ${isRead ? "border-[#ECECEC] bg-white" : "border-[#D6EBDD] bg-[#F5FBF7]"}`}
              >
                <Text className="text-[13px] font-semibold text-[#111827]">{title}</Text>
                <Text className="mt-1 text-[12px] text-[#667085]">{message}</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
