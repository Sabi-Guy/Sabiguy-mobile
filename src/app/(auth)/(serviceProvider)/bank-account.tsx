import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import BottomSheet from "@/components/bottomSheet";

const BANKS = ["Access Bank", "GTBank", "First Bank", "UBA", "Zenith Bank", "Union Bank"];

export default function BankAccount() {
  const router = useRouter();
  const [bank, setBank] = useState("");
  const [isBankSheetVisible, setIsBankSheetVisible] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const filteredBanks = useMemo(
    () => BANKS.filter((item) => item.toLowerCase().includes(bankSearch.toLowerCase())),
    [bankSearch]
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24 }}>
        <BackButton />
        <View className="mt-10">
          <View className="mb-6">
            <ProgressBar step={5} total={5} />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Bank Account</Text>
          <Text className="mt-2 text-base text-gray-600">
            Select the bank account for your withdrawal.
          </Text>
        </View>

        <View className="mt-6 gap-4">
          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Select bank</Text>
            <Pressable
              className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-3"
              onPress={() => {
                setBankSearch(bank);
                setIsBankSheetVisible(true);
              }}
            >
              <Text className={`text-sm ${bank ? "text-gray-700" : "text-gray-500"}`}>
                {bank || "Search or select bank"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </Pressable>
          </View>
          <TextInput
            placeholder="Account Number"
            keyboardType="number-pad"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
          <TextInput
            placeholder="Account Name"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
        </View>

        <Pressable
          className="mt-8 rounded-md bg-[#005823CC] py-4"
          onPress={() => router.push("/(auth)/(serviceProvider)/profile-setup-complete")}
        >
          <Text className="text-center font-semibold text-white">Next</Text>
        </Pressable>
      </ScrollView>

      <BottomSheet
        isVisible={isBankSheetVisible}
        onClose={() => {
          setIsBankSheetVisible(false);
          setBankSearch("");
        }}
        snapPoints={[0, 45, 80]}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="pb-4">
            <Text className="text-center text-base font-semibold text-gray-900">Select Bank</Text>
          </View>
          <View className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
            <TextInput
              value={bankSearch}
              onChangeText={setBankSearch}
              placeholder="Search banks"
              className="text-sm text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="mt-4">
            {filteredBanks.length === 0 ? (
              <Text className="text-center text-sm text-gray-500">No results found.</Text>
            ) : (
              filteredBanks.map((item) => (
                <Pressable
                  key={item}
                  className="border-b border-gray-100 px-2 py-3"
                  onPress={() => {
                    setBank(item);
                    setIsBankSheetVisible(false);
                    setBankSearch("");
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
