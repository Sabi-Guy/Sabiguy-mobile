import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function UserNotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-[#ECEFF3] px-5 py-4">
        <Text className="text-[18px] font-bold text-[#111827]">Notifications</Text>
        <Pressable
          onPress={() => router.back()}
          className="h-8 w-8 items-center justify-center rounded-full"
          accessibilityRole="button"
          accessibilityLabel="Close notifications"
        >
          <Ionicons name="close" size={28} color="#667085" />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-[#F2F4F7]">
          <Ionicons name="notifications-outline" size={42} color="#98A2B3" />
        </View>
        <Text className="mt-7 text-[14px] font-semibold text-[#111827]">All caught up!</Text>
        <Text className="mt-2 text-[12px] text-[#667085]">You have no unread notifications</Text>
      </View>
    </SafeAreaView>
  );
}
