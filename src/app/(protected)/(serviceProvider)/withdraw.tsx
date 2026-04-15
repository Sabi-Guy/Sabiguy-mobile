import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

const keypadRows = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export default function WithdrawScreen() {
  const router = useRouter();
  const [amountText, setAmountText] = useState("0.00");

  const numericAmount = useMemo(() => Number(amountText.replace(/,/g, "")) || 0, [amountText]);
  const canProceed = numericAmount > 0;

  const handleDigit = (digit: string) => {
    const cleaned = amountText.replace(/,/g, "");
    if (cleaned === "0.00" || cleaned === "0") {
      setAmountText(digit);
      return;
    }
    setAmountText(`${cleaned}${digit}`);
  };

  const handleZero = () => {
    const cleaned = amountText.replace(/,/g, "");
    if (cleaned === "0.00") return;
    setAmountText(`${cleaned}0`);
  };

  const handleBackspace = () => {
    const cleaned = amountText.replace(/,/g, "");
    if (cleaned.length <= 1) {
      setAmountText("0.00");
      return;
    }
    setAmountText(cleaned.slice(0, -1));
  };

  const handleNext = () => {
    if (!canProceed) return;
    router.push({
      pathname: "/(protected)/(serviceProvider)/withdraw-review",
      params: { amount: numericAmount.toString() },
    });
  };

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

      <View className="flex-1 px-4 pt-12">
        <View className="items-center">
          <View className="flex-row items-center rounded-md bg-[#F1F1F1] px-2 py-1">
            <View className="mr-1 h-3 w-3 items-center justify-center rounded-sm bg-[#D6F0DF]">
              <Ionicons name="card-outline" size={9} color="#2E7B4F" />
            </View>
            <Text className="text-[10.5px] text-[#5F6671]">****221</Text>
          </View>

          <Text className="mt-2 text-[38px] font-bold text-[#2D2F33]">{amountText}</Text>

          <View className="mt-3 w-full flex-row justify-center">
            <Text className="text-[10.5px] text-[#7C8591]">Minimum Withdrawal (NGN)</Text>
            <Text className="ml-1 text-[10.5px] text-[#666F7A]">₦1,000</Text>
          </View>
          <View className="mt-7 w-full flex-row justify-center">
            <Text className="text-[11.5px] text-[#4F5864]">Available Balance:</Text>
            <Text className="ml-1 text-[11.5px] text-[#2F3640]">₦94,000</Text>
          </View>
        </View>

        <View className="mt-auto pb-8">
          <Pressable
            className={`mb-4 h-9 items-center justify-center rounded-md ${
              canProceed ? "bg-[#2E7B4F]" : "bg-[#ECECEC]"
            }`}
            onPress={handleNext}
          >
            <Text className={`text-[12px] font-semibold ${canProceed ? "text-white" : "text-[#B0B6BF]"}`}>Next</Text>
          </Pressable>

          {keypadRows.map((row) => (
            <View key={row.join("-")} className="mb-2 flex-row justify-between">
              {row.map((digit) => (
                <Pressable
                  key={digit}
                  className="h-12 w-[31%] items-center justify-center rounded-md border border-[#D8DCE2] bg-white"
                  onPress={() => handleDigit(digit)}
                >
                  <Text className="text-[24px] text-[#2E3137]">{digit}</Text>
                </Pressable>
              ))}
            </View>
          ))}
          <View className="flex-row justify-between">
            <View className="w-[31%]" />
            <Pressable
              className="h-12 w-[31%] items-center justify-center rounded-md border border-[#D8DCE2] bg-white"
              onPress={handleZero}
            >
              <Text className="text-[24px] text-[#2E3137]">0</Text>
            </Pressable>
            <Pressable
              className="h-12 w-[31%] items-center justify-center rounded-md border border-[#D8DCE2] bg-white"
              onPress={handleBackspace}
            >
              <Ionicons name="backspace-outline" size={20} color="#69707A" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
