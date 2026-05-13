import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Switch, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/notifications";

function NotificationRow({
  title,
  subtitle,
  value,
  onValueChange,
  disabled,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
  disabled?: boolean;
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
        disabled={disabled}
        thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
        trackColor={{ false: "#E0E0E0", true: "#2E7B4F" }}
      />
    </View>
  );
}

export default function ProviderProfileNotificationsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [preferenceMap, setPreferenceMap] = useState<
    Record<string, { push?: boolean; email?: boolean; types?: string[] }>
  >({});

  const applyPreferenceMapToToggles = (
    map: Record<string, { push?: boolean; email?: boolean; types?: string[] }>
  ) => {
    const preferenceGroups = Object.values(map);
    setPushEnabled(preferenceGroups.some((item) => item?.push === true));
    setEmailEnabled(preferenceGroups.some((item) => item?.email === true));
  };

  const persistPreferences = async (nextPush: boolean, nextEmail: boolean) => {
    const merged: Record<string, { push?: boolean; email?: boolean; types?: string[] }> = {};
    for (const [key, value] of Object.entries(preferenceMap)) {
      merged[key] = {
        ...value,
        push: nextPush,
        email: nextEmail,
      };
    }

    setUpdating(true);
    try {
      await updateNotificationPreferences({ notificationPreferences: merged });
      setPreferenceMap(merged);
      applyPreferenceMapToToggles(merged);
      Toast.show({
        type: "success",
        text1: "Notification preferences updated",
      });
    } catch (err) {
      applyPreferenceMapToToggles(preferenceMap);
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePushToggle = async (next: boolean) => {
    if (updating) return;
    setPushEnabled(next);
    await persistPreferences(next, emailEnabled);
  };

  const handleEmailToggle = async (next: boolean) => {
    if (updating) return;
    setEmailEnabled(next);
    await persistPreferences(pushEnabled, next);
  };

  useEffect(() => {
    let active = true;

    const loadPreferences = async () => {
      try {
        const result = await getNotificationPreferences();
        if (!active) return;

        const prefs = result?.data?.notificationPreferences ?? {};
        setPreferenceMap(prefs);
        applyPreferenceMapToToggles(prefs);
      } catch (err) {
        if (!active) return;
        Toast.show({
          type: "error",
          text1: "Could not load notification settings",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPreferences();

    return () => {
      active = false;
    };
  }, []);

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

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#2E7B4F" />
        </View>
      ) : (
        <View className="mx-4 mt-3 overflow-hidden rounded-xl border border-[#E7E7E7] bg-[#F3F3F3]">
          <NotificationRow
            title="Push Notifications"
            subtitle="Receive push notifications"
            value={pushEnabled}
            onValueChange={handlePushToggle}
            disabled={updating}
          />
          <NotificationRow
            title="Email Notifications"
            subtitle="Receive email updates"
            value={emailEnabled}
            onValueChange={handleEmailToggle}
            disabled={updating}
          />
        </View>
      )}
    </View>
  );
}
