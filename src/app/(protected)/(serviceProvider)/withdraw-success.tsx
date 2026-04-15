import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const formatNaira = (value: number) => {
  return `₦${value.toLocaleString("en-NG")}`;
};

export default function WithdrawSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ amount?: string }>();
  const amount = Number(params.amount ?? 0);

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

      <View className="flex-1 px-4 pt-8">
        <View className="items-center">
          <Text className="text-[28px] font-semibold text-[#33363C]">Withdrawal Successful</Text>
          <View className="mt-6 h-20 w-20 items-center justify-center rounded-full bg-[#2E7B4F]">
            <Ionicons name="checkmark" size={42} color="#FFFFFF" />
          </View>
          <Text className="mt-6 text-[30px] font-semibold text-[#2D2F33]">{formatNaira(amount)}</Text>
          <Text className="mt-2 text-[12px] text-[#80858F]">Withdrawal Initiated Successfully</Text>
        </View>

        <View className="mt-8 rounded-xl border border-[#ECECEC] bg-[#F3F3F3] p-3">
          <LineItem label="To" value="Phil Crook" />
          <LineItem label="Bank" value="Providus Bank" />
          <LineItem label="Account number" value="****221" />
        </View>

        <View className="mt-9 rounded-md bg-[#EAF0F8] px-3 py-2">
          <Text className="text-[8.5px] text-[#8A97A6]">
            You will receive a confirmation email shortly. You can track your withdrawal in Transactions.
          </Text>
        </View>

        <Pressable
          className="mt-auto mb-8 h-11 items-center justify-center rounded-md bg-[#2E7B4F]"
          onPress={() => router.replace("/(protected)/(serviceProvider)/wallet")}
        >
          <Text className="text-[12px] font-semibold text-white">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-1 flex-row justify-between">
      <Text className="text-[10px] text-[#707A87]">{label}</Text>
      <Text className="text-[10px] text-[#4A525D]">{value}</Text>
    </View>
  );
}
