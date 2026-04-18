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

function MenuSection({
  title,
  items,
  onItemPress,
}: {
  title: string;
  items: MenuItem[];
  onItemPress?: (item: MenuItem) => void;
}) {
  return (
    <View className="mt-4">
      <Text className="mb-2 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#9CA3AF]">{title}</Text>
      <View className="overflow-hidden rounded-xl border border-[#F0F0F0] bg-white">
        {items.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => onItemPress?.(item)}
            className={`flex-row items-center px-3 py-3 ${
              index < items.length - 1 ? "border-b border-[#F1F1F1]" : ""
            }`}
          >
            <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-[#E9F6EE]">
              <Ionicons name={item.icon} size={11} color="#0F7A3A" />
            </View>
            <Text className="flex-1 text-[11px] text-[#60656F]">{item.label}</Text>
            <Ionicons name="chevron-forward" size={13} color="#C5C7CD" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function ProviderProfileView({
  displayName,
  onPressLogout,
  onAccountItemPress,
  onMoreItemPress,
}: {
  displayName: string;
  onPressLogout: () => void;
  onAccountItemPress: (item: MenuItem) => void;
  onMoreItemPress: (item: MenuItem) => void;
}) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 10, paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center rounded-xl border border-[#F0F0F0] bg-[#F9F9F9] px-4 py-4">
        <Image source={require("../../assets/avatar.png")} className="h-14 w-14 rounded-full" resizeMode="cover" />
        <Text className="mt-2 text-[13px] font-semibold text-[#231F20]">{displayName}</Text>
        <View className="mt-1 flex-row items-center">
          <Ionicons name="star" size={12} color="#80C342" />
          <Text className="ml-1 text-[10px] font-semibold text-[#60656F]">4.6</Text>
          <Text className="ml-1 text-[10px] text-[#9CA3AF]">(127 reviews)</Text>
        </View>
      </View>

      <MenuSection title="Account" items={accountItemsByVariant.provider} onItemPress={onAccountItemPress} />
      <MenuSection title="More" items={moreItems} onItemPress={onMoreItemPress} />

      <Pressable
        className="mt-4 flex-row items-center rounded-xl border border-[#F4F4F4] bg-white px-3 py-3"
        onPress={onPressLogout}
      >
        <View className="mr-2 h-5 w-5 items-center justify-center rounded-full bg-[#FFF2F2]">
          <Ionicons name="log-out-outline" size={11} color="#E25B5B" />
        </View>
        <Text className="text-[11px] font-medium text-[#E25B5B]">Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

function UserProfileView({
  displayName,
  items,
  onPressLogout,
}: {
  displayName: string;
  items: MenuItem[];
  onPressLogout: () => void;
}) {
  return (
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

      <MenuSection title="Account" items={items} />
      <MenuSection title="More" items={moreItems} />

      <Pressable className="mt-6 flex-row items-center rounded-2xl bg-white px-4 py-4" onPress={onPressLogout}>
        <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F1]">
          <Ionicons name="log-out-outline" size={17} color="#E25B5B" />
        </View>
        <Text className="text-sm font-semibold text-[#E25B5B]">Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

export default function ProfileScreen({ variant }: ProfileScreenProps) {
  const router = useRouter();
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const clearSession = useAuthStore((state) => state.clearSession);
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);

  const displayName = useMemo(() => {
    if (name?.trim()) return name.trim();
    return toDisplayName(email);
  }, [name, email]);
  const accountItems = accountItemsByVariant[variant];

  const handleLogout = async () => {
    setShowLogoutSheet(false);
    router.replace("/(auth)/login");
    await clearSession();
  };

  const handleAccountItemPress = (item: MenuItem) => {
    if (variant !== "provider") return;
    if (item.label === "Manage Profile") {
      router.push("/(protected)/(serviceProvider)/manage-profile");
      return;
    }
    if (item.label === "Wallet") {
      router.push("/(protected)/(serviceProvider)/wallet");
      return;
    }
    if (item.label === "Service Profile") {
      router.push("/(protected)/(serviceProvider)/service-profile");
      return;
    }
    if (item.label === "Password") {
      router.push("/(protected)/(serviceProvider)/password");
      return;
    }
    if (item.label === "Notifications") {
      router.push("/(protected)/(serviceProvider)/notifications");
    }
  };

  const handleMoreItemPress = (item: MenuItem) => {
    if (variant !== "provider") return;
    if (item.label === "Refer & Earn") {
      router.push("/(protected)/(serviceProvider)/refer-earn");
      return;
    }
    if (item.label === "About us") {
      router.push("/(protected)/(serviceProvider)/about-us");
      return;
    }
    if (item.label === "Help") {
      router.push("/(protected)/(serviceProvider)/help");
    }
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-6 pb-3 pt-6">
        <Text className="text-center text-[13px] font-semibold text-[#231F20]">Profile</Text>
      </View>

      {variant === "provider" ? (
        <ProviderProfileView
          displayName={displayName}
          onPressLogout={() => setShowLogoutSheet(true)}
          onAccountItemPress={handleAccountItemPress}
          onMoreItemPress={handleMoreItemPress}
        />
      ) : (
        <UserProfileView
          displayName={displayName}
          items={accountItems}
          onPressLogout={() => setShowLogoutSheet(true)}
        />
      )}

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
