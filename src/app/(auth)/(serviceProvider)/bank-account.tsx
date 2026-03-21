import React, { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import BottomSheet from "@/components/bottomSheet";
import Toast from "react-native-toast-message";
import { apiRequest } from "@/lib/api";

const BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "GTBank", code: "058" },
  { name: "First Bank", code: "011" },
  { name: "UBA", code: "033" },
  { name: "Zenith Bank", code: "057" },
  { name: "Union Bank", code: "032" },
];

export default function BankAccount() {
  const router = useRouter();
  const [bank, setBank] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [isBankSheetVisible, setIsBankSheetVisible] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [resolving, setResolving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allowManualName, setAllowManualName] = useState(true);
  const lastResolveKey = useRef<string>("");
  const filteredBanks = useMemo(
    () =>
      BANKS.filter((item) => item.name.toLowerCase().includes(bankSearch.toLowerCase())),
    [bankSearch]
  );

  const resolveAccount = async (numberOverride?: string, codeOverride?: string) => {
    const numberToUse = (numberOverride ?? accountNumber).trim();
    const codeToUse = codeOverride ?? bankCode;
    if (!bankCode || accountNumber.trim().length < 10) {
      return;
    }
    const key = `${codeToUse}:${numberToUse}`;
    if (lastResolveKey.current === key) return;
    lastResolveKey.current = key;
    try {
      setResolving(true);
      const result = await apiRequest<{
        data?: { account_name?: string; account_number?: string; bank_name?: string };
        account_name?: string;
      }>("/provider/bank-account/verify", {
        method: "POST",
        json: {
          accountNumber: numberToUse,
          bankCode: codeToUse,
        },
      });
      const resolvedName = result?.data?.account_name ?? result?.account_name ?? "";
      if (!resolvedName) {
        Toast.show({
          type: "error",
          text1: "Not found",
          text2: "Unable to resolve account name. Please confirm details.",
        });
        setAllowManualName(true);
        return;
      }
      setAccountName(resolvedName);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Resolve failed",
        text2: err instanceof Error ? err.message : "Unable to resolve account.",
      });
      setAllowManualName(true);
    } finally {
      setResolving(false);
    }
  };

  const handleSubmit = async () => {
    if (!bank || !bankCode || !accountNumber.trim() || !accountName.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please complete your bank details.",
      });
      return;
    }
    try {
      setSubmitting(true);
      await apiRequest("/provider/bank-info", {
        method: "PUT",
        json: {
          accountName: accountName.trim(),
          accountNumber: accountNumber.trim(),
          bankName: bank,
          bankCode,
        },
      });
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Bank details updated.",
      });
      router.push("/(auth)/(serviceProvider)/profile-setup-complete");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Unable to save bank details.",
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              value={accountNumber}
              onChangeText={setAccountNumber}
              className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
            />
          <TextInput
            placeholder="Account Name"
            value={accountName}
            editable={allowManualName}
            onChangeText={setAccountName}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-gray-700"
          />
          <Text className="text-xs text-gray-500">
            Enter account name manually for now.
          </Text>
        </View>

        <Pressable
          className={`mt-8 rounded-md bg-[#005823CC] py-4 ${submitting ? "opacity-70" : ""}`}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text className="text-center font-semibold text-white">
            {submitting ? "Saving..." : "Next"}
          </Text>
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
                  key={item.code}
                  className="border-b border-gray-100 px-2 py-3"
                  onPress={() => {
                    setBank(item.name);
                    setBankCode(item.code);
                    setIsBankSheetVisible(false);
                    setBankSearch("");
                  }}
                >
                  <Text className="text-sm text-gray-700">{item.name}</Text>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
