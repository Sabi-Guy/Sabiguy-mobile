import React from "react";
import { View } from "react-native";

export default function ProgressBar({ step, total }: { step: number; total: number }) {
  const safeTotal = total > 0 ? total : 1;
  const percent = Math.min(1, Math.max(0, step / safeTotal));

  return (
    <View className="h-1 w-full rounded-full bg-gray-200">
      <View className="h-1 rounded-full bg-[#005823CC]" style={{ width: `${percent * 100}%` }} />
    </View>
  );
}
