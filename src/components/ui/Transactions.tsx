import React, { useMemo } from "react";
import { View } from "react-native";
import Transaction, { TransactionItem } from "@/components/ui/Transaction";

export default function Transactions() {
  const data = useMemo<TransactionItem[]>(
    () => [
      {
        id: "kitchen-reno",
        title: "Kitchen Renovation",
        date: "Oct 28, 2025",
        amount: "-N64,000",
        statusTone: "debit",
        icon: require("../../../assets/debit.png"),
      },
      {
        id: "bathroom-upgrade",
        title: "Bathroom Upgrade",
        date: "Nov 5, 2025",
        amount: "-N45,000",
        statusTone: "debit",
        icon: require("../../../assets/debit.png"),
      },
      {
        id: "wallet-topup",
        title: "Wallet top up",
        date: "Dec 12, 2025",
        amount: "+N64,000",
        statusTone: "credit",
        icon: require("../../../assets/credit.png"),
      },
    ],
    []
  );

  return (
    <View className="mt-3 gap-3">
      {data.map((item) => (
        <Transaction key={item.id} item={item} />
      ))}
    </View>
  );
}