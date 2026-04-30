import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from "@/components/BackButton";
import BottomSheet from "@/components/bottomSheet";
import Transaction, { TransactionItem } from "@/components/ui/Transaction";

const FILTERS = ["All", "Successful", "Pending", "Failed"] as const;
type FilterType = (typeof FILTERS)[number];

export default function TransactionScreen() {
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [duration, setDuration] = useState("Last 30 Days");

  const transactions = useMemo<TransactionItem[]>(
    () => [
      {
        id: "kitchen-reno",
        title: "Kitchen Renovation",
        date: "Oct 28, 2025",
        amount: "-N64,000",
        statusTone: "debit",
        icon: require("../../../../../../assets/debit.png"),
      },
      {
        id: "bathroom-upgrade",
        title: "Bathroom Upgrade",
        date: "Nov 5, 2025",
        amount: "-N45,500",
        statusTone: "debit",
        icon: require("../../../../../../assets/debit.png"),
      },
      {
        id: "living-room",
        title: "Living Room Paint",
        date: "Nov 12, 2025",
        amount: "-N12,300",
        statusTone: "debit",
        icon: require("../../../../../../assets/debit.png"),
      },
      {
        id: "wallet-topup",
        title: "Wallet top up",
        date: "Dec 12, 2025",
        amount: "+N64,000",
        statusTone: "credit",
        icon: require("../../../../../../assets/credit.png"),
      },
      {
        id: "garden",
        title: "Garden Landscaping",
        date: "Nov 20, 2025",
        amount: "-N30,000",
        statusTone: "debit",
        icon: require("../../../../../../assets/debit.png"),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (activeFilter === "All") return transactions;
    if (activeFilter === "Successful") return transactions.filter((item) => item.statusTone === "credit");
    if (activeFilter === "Pending") return transactions.filter((item) => item.statusTone === "debit");
    return [];
  }, [activeFilter, transactions]);

  const statusColor = (tone: TransactionItem["statusTone"]) =>
    tone === "credit" ? "text-green-600" : "text-red-500";

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-5 pb-3 pt-6">
        <BackButton variant="inline" />
        <Text className="ml-2 text-base font-semibold text-gray-900">Transactions</Text>
      </View>
      <View className="px-5">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center rounded-xl border border-gray-200 px-3 py-2">
            <Ionicons name="search" size={16} color="#9CA3AF" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              className="ml-2 flex-1 text-sm text-gray-900"
            />
          </View>
          <Pressable
            onPress={() => setShowFilterSheet(true)}
            className="h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
          >
          <Feather name="filter" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pb-8 pt-4">
        <View className="gap-3">
          {filtered.map((item) => (
            <Transaction key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <BottomSheet
        isVisible={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        snapPoints={[0, 46, 56]}
        initialSnapPoint={46}
        contentContainerStyle={{ flex: 0, paddingBottom: 16 }}
        showBackdropShadow={true}
      >
        <View className="px-2 pt-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-900">Filter</Text>
            <Pressable onPress={() => setShowFilterSheet(false)}>
              <Ionicons name="close" size={18} color="#111827" />
            </Pressable>
          </View>

          <Text className="mt-4 text-xs font-semibold text-gray-700">Duration</Text>
          <View className="mt-2 flex-row gap-2">
            {["Last 30 Days", "Last 3 months", "Last 6 months"].map((item) => (
              <Pressable
                key={item}
                onPress={() => setDuration(item)}
                className={
                  item === duration
                    ? "rounded-lg border border-green-700 bg-green-50 px-3 py-2"
                    : "rounded-lg border border-gray-200 px-3 py-2"
                }
              >
                <Text
                  className={
                    item === duration
                      ? "text-[10px] font-semibold text-green-700"
                      : "text-[10px] text-gray-500"
                  }
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text className="mt-4 text-xs font-semibold text-gray-700">Filter By</Text>
          {/* <View className="mt-2 gap-2">
            {FILTERS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setActiveFilter(item)}
                className="flex-row items-center gap-2"
              >
                <View
                  className={
                    item === activeFilter
                      ? "h-3 w-3 rounded-full border border-green-700 bg-green-700"
                      : "h-3 w-3 rounded-full border border-gray-300"
                  }
                />
                <Text className="text-xs text-gray-700">{item}</Text>
              </Pressable>
            ))}
          </View> */}

          <Text className="mt-4 text-xs font-semibold text-gray-700">Custom Date Range</Text>
          <View className="mt-2 gap-2">
            <View className="flex-row items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
              <Text className="text-xs text-gray-400">Start date</Text>
              <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
            </View>
            <View className="flex-row items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
              <Text className="text-xs text-gray-400">End date</Text>
              <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
            </View>
          </View>

          <Pressable className="mt-5 rounded-lg bg-[#2E7D52] py-3">
            <Text className="text-center text-sm font-semibold text-white">Apply</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
}