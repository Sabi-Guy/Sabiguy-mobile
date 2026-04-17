import React from "react";
import { Image, Text, View } from "react-native";

export type TransactionItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  statusTone: "credit" | "debit";
  icon: number;
};

type TransactionProps = {
  item: TransactionItem;
};

export default function Transaction({ item }: TransactionProps) {
  const amountTone = item.statusTone === "credit" ? "text-green-600" : "text-red-500";

  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
      <Image source={item.icon} className="h-6 w-6" />
      <View className="flex-1">
        <Text className="text-xs font-semibold text-gray-900">{item.title}</Text>
        <Text className="text-[10px] text-gray-400">{item.date}</Text>
      </View>
      <View className="items-end">
        <Text className={`text-xs font-semibold ${amountTone}`}>{item.amount}</Text>
        <Image
          source={
            item.statusTone === "credit"
              ? require("../../../assets/credit.png")
              : require("../../../assets/debit.png")
          }
          className="mt-1 h-3 w-10"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}