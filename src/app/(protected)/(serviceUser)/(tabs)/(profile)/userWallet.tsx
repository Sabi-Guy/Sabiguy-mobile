import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import BackButton from "@/components/BackButton";
import Transactions from "@/components/ui/Transactions";
import { useRouter } from "expo-router";

export default function UserWallet() {
  const [showFundSheet, setShowFundSheet] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center px-5 pb-3 pt-6">
        <BackButton variant="inline" />
        <Text className="ml-2 text-base font-semibold text-gray-900">
          Wallet
        </Text>
      </View>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-2 rounded-2xl bg-[#2E7D52] px-5 py-5">
          <Text className="text-xs text-white/80">Available Balance</Text>
          <Text className="mt-2 text-2xl font-semibold text-white">
            NGN 94,000
          </Text>
          <TouchableOpacity
            className="mt-4 rounded-full bg-white/90 px-4 py-2"
            onPress={() => setShowFundSheet(true)}
          >
            <Text className="text-center text-xs font-semibold text-[#2E7D52]">
              + Add Money
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-gray-900">
              Transaction History
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push("transactionScreen")
              }
            >
              <Text className="text-xs font-bold text-green-700">See all</Text>
            </TouchableOpacity>
          </View>
          <Transactions />
        </View>
      </ScrollView>

      {showFundSheet ? (
        <View className="absolute inset-0 z-50 items-center justify-end bg-black/45 px-5 pb-24">
          <View className="w-full max-w-[340px] rounded-2xl bg-white p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-900">Fund Wallet</Text>
              <TouchableOpacity onPress={() => setShowFundSheet(false)}>
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text className="mt-3 text-xs text-gray-500">Top-up Amount</Text>
            <View className="mt-2 flex-row items-center rounded-lg border border-gray-200 px-3 py-2">
              <Text className="text-sm text-gray-500">N</Text>
              <TextInput
                placeholder="Enter Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                className="ml-2 flex-1 text-sm text-gray-900"
              />
            </View>

            <TouchableOpacity className="mt-4 rounded-lg bg-[#2E7D52] py-3">
              <Text className="text-center text-sm font-semibold text-white">Top-up</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}
