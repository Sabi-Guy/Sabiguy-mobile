import React, { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import BottomSheet from "@/components/bottomSheet";
import Toast from "react-native-toast-message";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

type Bank = { name: string; code: string; slug?: string };

export default function BankAccount() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [bank, setBank] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [isBankSheetVisible, setIsBankSheetVisible] = useState(false);
  const [bankSearch, setBankSearch] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [resolving, setResolving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allowManualName, setAllowManualName] = useState(true);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const lastResolveKey = useRef<string>("");
  const filteredBanks = useMemo(
    () =>
      banks.filter((item) => item.name.toLowerCase().includes(bankSearch.toLowerCase())),
    [bankSearch, banks]
  );

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const result = await apiRequest<{ data?: Bank[] }>("/payment/banks", {
          method: "GET",
        });
        setBanks(result?.data ?? []);
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Unable to load banks",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);

  const resolveAccount = async (numberOverride?: string, codeOverride?: string) => {
    const numberToUse = (numberOverride ?? accountNumber).trim();
    const codeToUse = codeOverride ?? bankCode;
    if (!codeToUse || numberToUse.length < 10) {
      return;
    }
    const key = `${codeToUse}:${numberToUse}`;
    if (lastResolveKey.current === key) return;
    lastResolveKey.current = key;
    try {
      setResolving(true);
      const result = await apiRequest<{
        data?: { accountName?: string; accountNumber?: string };
        accountName?: string;
      }>("/payment/verify-bank", {
        method: "POST",
        json: {
          accountNumber: numberToUse,
          bankCode: codeToUse,
        },
      });
      const resolvedName =
        result?.data?.accountName ??
        (result?.data as { account_name?: string } | undefined)?.account_name ??
        (result as { account_name?: string } | undefined)?.account_name ??
        result?.accountName ??
        "";

      if (!resolvedName) {
        Toast.show({
          type: "error",
          text1: "Not found",
          text2: "Unable to resolve account name. Please confirm details.",
        });
        setAccountName("");
        setAllowManualName(true);
        lastResolveKey.current = "";
        return;
      }
      setAccountName(resolvedName);
      setAllowManualName(false);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Resolve failed",
        text2: err instanceof Error ? err.message : "Unable to resolve account.",
      });
      setAccountName("");
      setAllowManualName(true);
      lastResolveKey.current = "";
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
      await setSession({ kycLevel: 7 });
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
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24 }}
        keyboardShouldPersistTaps="handled"
      >
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
                Keyboard.dismiss();
                setBankSearch("");
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
            onChangeText={(value) => {
              setAccountNumber(value);
              if (value.trim().length === 10 && bankCode) {
                resolveAccount(value, bankCode);
              } else {
                setAllowManualName(true);
              }
            }}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
          <TextInput
            placeholder="Account Name"
            value={accountName}
            editable={allowManualName}
            onChangeText={setAccountName}
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-gray-700"
          />
          {resolving ? (
            <Text className="mt-1 text-xs text-gray-500">Resolving account name...</Text>
          ) : null}
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
              <Text className="text-center text-sm text-gray-500">
                {loadingBanks ? "Loading banks..." : "No results found."}
              </Text>
            ) : (
              filteredBanks.map((item) => (
                <Pressable
                  key={`${item.code}-${item.name}`}
                  className="border-b border-gray-100 px-2 py-3"
                  onPress={() => {
                    setBank(item.name);
                    setBankCode(item.code);
                    setAccountName("");
                    setAllowManualName(true);
                    lastResolveKey.current = "";
                    setIsBankSheetVisible(false);
                    setBankSearch("");
                    if (accountNumber.trim().length === 10) {
                      resolveAccount(accountNumber, item.code);
                    }
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
