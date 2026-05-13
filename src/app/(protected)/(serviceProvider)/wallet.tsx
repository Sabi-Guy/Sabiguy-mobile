import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
  getWalletBalance,
  getWalletTransactions,
  WalletBalance,
  WalletTransaction,
} from "@/lib/wallet";

export default function WalletScreen() {
  const router = useRouter();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const formatNaira = (value?: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value ?? 0);

  useEffect(() => {
    let active = true;

    const loadWalletBalance = async () => {
      try {
        const result = await getWalletBalance();
        if (!active) return;
        setWalletBalance(result?.data ?? null);
      } catch (err) {
        if (!active) return;
        Toast.show({
          type: "error",
          text1: "Could not load wallet balance",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        if (active) {
          setLoadingBalance(false);
        }
      }
    };

    loadWalletBalance();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadTransactions = async () => {
      try {
        const result = await getWalletTransactions({ page: 1, limit: 10 });
        if (!active) return;
        setTransactions(result.transactions ?? []);
      } catch (err) {
        if (!active) return;
        Toast.show({
          type: "error",
          text1: "Could not load transactions",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        if (active) {
          setLoadingTransactions(false);
        }
      }
    };

    loadTransactions();

    return () => {
      active = false;
    };
  }, []);

  const availableBalanceText = useMemo(
    () => formatNaira(walletBalance?.available),
    [walletBalance]
  );

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Wallet</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-[12px] font-medium text-[#3D434C]">My Wallet</Text>

          <View className="mt-2 rounded-xl bg-[#2E7B4F] p-3">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-[10px] text-white/90">Available Balance</Text>
                {loadingBalance ? (
                  <ActivityIndicator size="small" color="#FFFFFF" className="mt-3" />
                ) : (
                  <Text className="mt-1 text-[34px] font-bold leading-[38px] text-white">
                    {availableBalanceText}
                  </Text>
                )}
              </View>
              <View className="mt-1 h-4 w-4 items-center justify-center rounded-sm border border-white/50">
                <Ionicons name="copy-outline" size={10} color="#FFFFFF" />
              </View>
            </View>

            <Pressable
              className="mt-3 h-8 items-center justify-center rounded-full bg-white"
              onPress={() => router.push("/(protected)/(serviceProvider)/withdraw")}
            >
              <Text className="text-[11px] font-semibold text-[#2E7B4F]">Withdraw</Text>
            </Pressable>
          </View>

          <View className="mt-2 flex-row gap-2">
            <SummaryMetric label="Withdrawn" value={formatNaira(walletBalance?.totalWithdrawals)} />
            <SummaryMetric label="Pending Earnings" value={formatNaira(walletBalance?.pending)} />
            <SummaryMetric label="Total Earnings" value={formatNaira(walletBalance?.totalEarnings)} />
          </View>

          <View className="mt-4 flex-row items-center justify-between">
            <Text className="text-[11px] font-semibold text-[#3D434C]">Transaction History</Text>
            <Pressable className="flex-row items-center" onPress={() => router.push("/(protected)/(serviceProvider)/transaction-history")}>
              <Text className="text-[10px] text-[#69707A]">See all</Text>
              <Ionicons name="chevron-forward" size={12} color="#69707A" />
            </Pressable>
          </View>

          <View className="mt-2 overflow-hidden rounded-xl border border-[#ECECEC] bg-white">
            {loadingTransactions ? (
              <View className="items-center py-6">
                <ActivityIndicator size="small" color="#2E7B4F" />
              </View>
            ) : transactions.length === 0 ? (
              <View className="px-3 py-6">
                <Text className="text-center text-[11px] text-[#8A8F99]">No transactions yet.</Text>
              </View>
            ) : (
              transactions.map((item, index) => {
                const typeLower = (item.type ?? "").toLowerCase();
                const isCredit = ["credit", "payment", "tip", "bonus"].includes(typeLower);
                const iconBg = isCredit ? "#E7F3EC" : "#FCE8E8";
                const iconColor = isCredit ? "#0F7A3A" : "#E53935";
                const amountText = `${isCredit ? "+" : "-"}${formatNaira(item.amount)}`;
                const dateText = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-NG", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "";
                const titleBase = (item.type ?? "transaction").replace(/_/g, " ");
                const title = titleBase.charAt(0).toUpperCase() + titleBase.slice(1);

                return (
                  <View
                    key={item._id ?? item.id ?? `${index}`}
                    className={`flex-row items-start px-3 py-3 ${
                      index < transactions.length - 1 ? "border-b border-[#F0F0F0]" : ""
                    }`}
                  >
                    <View
                      className="mr-2 mt-0.5 h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: iconBg }}
                    >
                      <Ionicons
                        name={isCredit ? "arrow-down" : "arrow-up"}
                        size={14}
                        color={iconColor}
                        style={{ transform: [{ rotate: "45deg" }] }}
                      />
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1 pr-3">
                          <Text className="text-[11px] font-semibold text-[#3D434C]">{title}</Text>
                          <Text className="mt-0.5 text-[9px] text-[#8A8F99]">{dateText}</Text>
                        </View>
                        <View className="items-end">
                          <Text className={`text-[11px] font-semibold ${isCredit ? "text-[#239A57]" : "text-[#D94848]"}`}>
                            {amountText}
                          </Text>
                          {item.status ? <Text className="mt-0.5 text-[9px] text-[#9BA0A9]">{item.status}</Text> : null}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </View>

        <View className="mt-auto pt-3">
          <View className="rounded-lg bg-[#EDF0EA] px-3 py-2.5">
            <Text className="text-[9px] font-semibold text-[#7D8477]">Platform service fee</Text>
            <Text className="mt-1 text-[8.5px] leading-[12px] text-[#8D9488]">
              Note: A 10% platform fee applies to completed transactions. For example, if you earn {"\u20A6"}100,000, your
              payout will be {"\u20A6"}90,000.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-lg border border-[#ECECEC] bg-[#F7F7F7] px-2 py-2">
      <Text className="text-[9px] text-[#8A8F99]">{label}</Text>
      <Text className="mt-1 text-[10px] font-semibold text-[#3D434C]">{value}</Text>
    </View>
  );
}
