import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";

function NotificationRow({
  title,
  subtitle,
  value,
  onValueChange,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
}) {
  return (
    <View className="flex-row items-center justify-between border-b border-[#ECECEC] px-3 py-3.5">
      <View className="flex-1 pr-3">
        <Text className="text-[12px] font-semibold text-[#3F464F]">{title}</Text>
        <Text className="mt-1 text-[10px] text-[#8C94A0]">{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
        trackColor={{ false: "#E0E0E0", true: "#2E7B4F" }}
      />
    </View>
  );
}

export default function UserNotificationsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Notifications</Text>
        </View>
      </View>

      <View className="mx-4 mt-3 overflow-hidden rounded-xl border border-[#E7E7E7] bg-[#F3F3F3]">
        <NotificationRow
          title="Push Notifications"
          subtitle="Receive push notifications"
          value={pushEnabled}
          onValueChange={setPushEnabled}
        />
        <NotificationRow
          title="Email Notifications"
          subtitle="Receive email updates"
          value={emailEnabled}
          onValueChange={setEmailEnabled}
        />
      </View>
    </View>
  );
}
