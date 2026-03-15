import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";

const BANKS = ["Access Bank", "GTBank", "First Bank", "UBA", "Zenith Bank", "Union Bank"];

export default function BankAccount() {
  const router = useRouter();
  const [bank, setBank] = useState("");
  const [showBanks, setShowBanks] = useState(false);
  const filteredBanks = useMemo(
    () => BANKS.filter((item) => item.toLowerCase().includes(bank.toLowerCase())),
    [bank]
  );

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-10">
        <View className="mb-6">
          <ProgressBar step={5} total={5} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Bank Account</Text>
        <Text className="mt-2 text-base text-gray-600">Select the bank account for your withdrawal.</Text>
      </View>

      <View className="mt-6 gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Select bank</Text>
          <Pressable
            className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-3"
            onPress={() => setShowBanks((prev) => !prev)}
          >
            <Text className={`text-sm ${bank ? "text-gray-700" : "text-gray-500"}`}>
              {bank || "Search or select bank"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showBanks ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              <TextInput
                value={bank}
                onChangeText={setBank}
                placeholder="Search banks"
                className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700"
              />
              {filteredBanks.map((item) => (
                <Pressable
                  key={item}
                  className="px-4 py-3"
                  onPress={() => {
                    setBank(item);
                    setShowBanks(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <TextInput placeholder="Account Number" keyboardType="number-pad" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        <TextInput placeholder="Account Name" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
      </View>

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/profile-setup-complete")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </View>
  );
}
