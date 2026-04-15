import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const formatNaira = (value: number) => {
  return `₦${value.toLocaleString("en-NG")}`;
};

export default function WithdrawReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ amount?: string }>();
  const amount = Number(params.amount ?? 0);
  const amountLabel = formatNaira(amount);

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Withdraw</Text>
        </View>
      </View>

      <View className="flex-1 px-4 pt-4">
        <Text className="text-[12px] font-semibold text-[#3A3F47]">Withdraw Funds to</Text>

        <View className="mt-2 rounded-xl border border-[#ECECEC] bg-[#F3F3F3] p-3">
          <View>
            <LineItem label="Withdrawal Amount" value={amountLabel} />
            <LineItem label="Send fee" value="₦0.00" />
            <LineItem label="Total Amount" value={amountLabel} bold />
          </View>
        </View>

        <View className="mt-6 rounded-xl border border-[#ECECEC] bg-[#F3F3F3] p-3">
          <LineItem label="To" value="Phil Crook" />
          <LineItem label="Bank" value="Providus Bank" />
          <LineItem label="Account number" value="****221" />
        </View>

        <View className="mt-10 rounded-md bg-[#EAF0F8] px-3 py-2">
          <Text className="text-[10px] text-[#7E8C9C]">Funds typically arrive in 1-5 minutes</Text>
        </View>

        <Pressable
          className="mt-20 h-11 items-center justify-center rounded-md bg-[#2E7B4F]"
          onPress={() =>
            router.push({
              pathname: "/(protected)/(serviceProvider)/withdraw-success",
              params: { amount: amount.toString() },
            })
          }
        >
          <Text className="text-[12px] font-semibold text-white">Confirm Withdrawal</Text>
        </Pressable>
      </View>
    </View>
  );
}

function LineItem({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View className="mb-1.5 flex-row justify-between">
      <Text className={`text-[10px] ${bold ? "font-semibold text-[#5C6470]" : "text-[#77808D]"}`}>{label}</Text>
      <Text className={`text-[10px] ${bold ? "font-semibold text-[#3A3F47]" : "text-[#4D5560]"}`}>{value}</Text>
    </View>
  );
}
