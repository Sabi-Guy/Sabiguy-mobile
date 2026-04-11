import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@/components/bottomSheet";
import { useAuthStore } from "@/store/auth";
import { toDisplayName } from "@/lib/display-name";

type MenuItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type ProfileScreenProps = {
  variant: "provider" | "user";
};

const accountItemsByVariant: Record<ProfileScreenProps["variant"], MenuItem[]> = {
  provider: [
    { label: "Manage Profile", icon: "person-outline" },
    { label: "Wallet", icon: "wallet-outline" },
    { label: "Service Profile", icon: "briefcase-outline" },
    { label: "Password", icon: "lock-closed-outline" },
    { label: "Notifications", icon: "notifications-outline" },
  ],
  user: [
    { label: "Manage Profile", icon: "person-outline" },
    { label: "Wallet", icon: "wallet-outline" },
    { label: "Bookings", icon: "calendar-outline" },
    { label: "Password", icon: "lock-closed-outline" },
    { label: "Notifications", icon: "notifications-outline" },
  ],
};

const moreItems: MenuItem[] = [
  { label: "Refer & Earn", icon: "gift-outline" },
  { label: "About us", icon: "information-circle-outline" },
  { label: "Help", icon: "help-circle-outline" },
];

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View className="mt-6">
      <Text className="mb-3 text-xs font-semibold uppercase tracking-[1.2px] text-gray-400">
        {title}
      </Text>

      <View className="overflow-hidden rounded-2xl bg-white">
        {items.map((item, index) => (
          <Pressable
            key={item.label}
            className={`flex-row items-center px-4 py-4 ${
              index < items.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#EAF6EF]">
              <Ionicons name={item.icon} size={17} color="#0F7A3A" />
            </View>

            <Text className="flex-1 text-sm font-medium text-gray-700">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#B8B8B8" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function ProfileScreen({ variant }: ProfileScreenProps) {
  const router = useRouter();
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const clearSession = useAuthStore((state) => state.clearSession);
  const email = useAuthStore((state) => state.email);

  const displayName = useMemo(() => toDisplayName(email), [email]);
  const accountItems = accountItemsByVariant[variant];

  const handleLogout = async () => {
    setShowLogoutSheet(false);
    router.replace("/(auth)/login");
    await clearSession();
  };

  return (
    <View className="flex-1 bg-[#F7F7F7]">
      <View className="border-b border-gray-100 bg-white px-6 pb-4 pt-6">
        <Text className="text-center text-lg font-semibold text-gray-900">Profile</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center rounded-3xl bg-white px-5 py-6">
          <Image
            source={require("../../assets/avatar.png")}
            className="h-20 w-20 rounded-full"
            resizeMode="cover"
          />
          <Text className="mt-4 text-xl font-semibold text-gray-900">{displayName}</Text>

          <View className="mt-2 flex-row items-center">
            <Ionicons name="star" size={16} color="#8BC34A" />
            <Text className="ml-1 text-sm font-semibold text-gray-700">4.6</Text>
            <Text className="ml-1 text-sm text-gray-400">(127 reviews)</Text>
          </View>
        </View>

        <MenuSection title="Account" items={accountItems} />
        <MenuSection title="More" items={moreItems} />

        <Pressable
          className="mt-6 flex-row items-center rounded-2xl bg-white px-4 py-4"
          onPress={() => setShowLogoutSheet(true)}
        >
          <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F1]">
            <Ionicons name="log-out-outline" size={17} color="#E25B5B" />
          </View>
          <Text className="text-sm font-semibold text-[#E25B5B]">Logout</Text>
        </Pressable>
      </ScrollView>

      <BottomSheet
        isVisible={showLogoutSheet}
        onClose={() => setShowLogoutSheet(false)}
        snapPoints={[0, 28, 34]}
        initialSnapPoint={28}
        contentContainerStyle={{ flex: 0, paddingBottom: 28 }}
        showBackdropShadow={true}
      >
        <View className="px-2 pt-2">
          <Text className="text-center text-lg font-semibold text-gray-900">Logout</Text>
          <Text className="mt-3 text-center text-sm text-gray-600">
            This will clear your current session from the device and take you back to login.
          </Text>

          <Pressable className="mt-6 rounded-md bg-[#005823CC] py-4" onPress={handleLogout}>
            <Text className="text-center font-semibold text-white">Continue</Text>
          </Pressable>

          <Pressable
            className="mt-3 rounded-md border border-gray-300 py-4"
            onPress={() => setShowLogoutSheet(false)}
          >
            <Text className="text-center font-semibold text-gray-700">Cancel</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
}
