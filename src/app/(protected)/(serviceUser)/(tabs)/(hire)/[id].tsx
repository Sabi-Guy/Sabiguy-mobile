import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

export default function BookingSummary() {
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "online">(
    "wallet",
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  const JobItem = ({
    icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <View className="flex-row items-start gap-2.5">
      <Image
        source={icon}
        className="mt-0.5 h-3.5 w-3.5"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="text-[10px] font-semibold text-[#111827]">
          {label}
        </Text>
        <Text className="mt-0.5 text-[9.5px] text-[#6B7280]">{value}</Text>
      </View>
    </View>
  );

  const PriceRow = ({
    label,
    value,
    highlight,
  }: {
    label: string;
    value: string;
    highlight?: boolean;
  }) => (
    <View className="flex-row items-center justify-between">
      <Text className="text-[10px] text-[#6B7280]">{label}</Text>
      <Text
        className={`text-[10px] ${highlight ? "font-semibold text-[#1F8A4C]" : "text-[#4B5563]"}`}
      >
        {value}
      </Text>
    </View>
  );

  const PaymentRadio = ({ selected }: { selected: boolean }) => (
    <View
      className={`h-3.5 w-3.5 items-center justify-center rounded-full border ${
        selected ? "border-[#1F8A4C]" : "border-[#D1D5DB]"
      }`}
    >
      {selected ? (
        <View className="h-1.5 w-1.5 rounded-full bg-[#1F8A4C]" />
      ) : null}
    </View>
  );

  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <View className="flex-row items-center px-3 pb-2 pt-11">
        <BackButton variant="inline" />
        <Text className="flex-1 pr-7 text-center text-[11px] font-semibold text-[#111827]">
          Booking Summary
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
      >
        <View className="rounded-2xl bg-white px-3 pb-4 pt-2">
          <View className="rounded-xl p-1.5">
            <Image
              source={require("../../../../../../assets/car.png")}
              className="h-2xl w-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Image
                source={require("../../../../../../assets/avatar.png")}
                className="h-6 w-6 rounded-full"
                resizeMode="cover"
              />
              <View>
                <View className="flex-row items-center gap-1">
                  <Text className="text-[9.5px] font-semibold text-[#111827]">
                    Marcus Johnson
                  </Text>
                  <MaterialIcons name="verified" size={11} color="#1F8A4C" />
                </View>
                <Text className="text-[8.5px] text-[#6B7280]">
                  Toyota Corolla - KSF257NG
                </Text>
                <View className="mt-0.5 flex-row items-center gap-1">
                  <Ionicons name="star" size={9} color="#F59E0B" />
                  <Text className="text-[8px] text-[#6B7280]">4.5(82)</Text>
                  <Text className="text-[8px] text-[#9CA3AF]">
                    - 5 min response
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-1.5">
              <View className="h-5.5 w-5.5 items-center justify-center rounded-full border border-[#E5E7EB]">
                <Ionicons name="chatbubble-outline" size={10} color="#9CA3AF" />
              </View>
              <View className="h-5.5 w-5.5 items-center justify-center rounded-full border border-[#E5E7EB]">
                <Ionicons name="call-outline" size={10} color="#9CA3AF" />
              </View>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-[11px] font-semibold text-[#111827]">
              Job Summary
            </Text>

            <View className="mt-2.5 gap-2.5">
              <JobItem
                icon={require("../../../../../../assets/pickupLocation.png")}
                label="Pickup Location"
                value="15 Victoria Island, Lagos Ikeja"
              />
              <JobItem
                icon={require("../../../../../../assets/dropoffLocation.png")}
                label="Dropoff Location"
                value="24 Palm Avenue, Lekki Phase 1, Lagos"
              />
              <JobItem
                icon={require("../../../../../../assets/distance.png")}
                label="Distance"
                value="10.5 km"
              />
              <JobItem
                icon={require("../../../../../../assets/date.png")}
                label="Date"
                value="Oct 18, 2025 - 10 AM"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-[11px] font-semibold text-[#111827]">
              Fare Breakdown
            </Text>
            <View className="mt-2 gap-1.5">
              <PriceRow label="Service Cost" value="N5,000" />
              <PriceRow label="Service Charge" value="N100" />
              <PriceRow label="Total Amount" value="N5,100" highlight />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-[11px] font-semibold text-[#111827]">
              Payment Method
            </Text>
            <View className="mt-2 overflow-hidden rounded-lg border border-[#E5E7EB]">
              <Pressable
                onPress={() => setPaymentMethod("wallet")}
                className="flex-row items-center justify-between px-2.5 py-2"
              >
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../../../../../../assets/wallet.png")}
                    className="h-3.5 w-3.5"
                    resizeMode="contain"
                  />
                  <View>
                    <Text className="text-[10px] text-[#111827]">N60,000</Text>
                    <Text className="text-[8.5px] text-[#9CA3AF]">Wallet</Text>
                  </View>
                </View>
                <PaymentRadio selected={paymentMethod === "wallet"} />
              </Pressable>

              <View className="h-px bg-[#E5E7EB]" />

              <Pressable
                onPress={() => setPaymentMethod("online")}
                className="flex-row items-center justify-between px-2.5 py-2"
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="globe-outline" size={12} color="#4B5563" />
                  <Text className="text-[10px] text-[#111827]">Pay online</Text>
                </View>
                <PaymentRadio selected={paymentMethod === "online"} />
              </Pressable>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-[9px] text-[#6B7280]">Pickup note</Text>
            <TextInput
              placeholder="Add extra instructions for the service provider."
              placeholderTextColor="#B6BDC8"
              className="mt-1.5 min-h-[45px] rounded-md bg-[#F2F5F8] px-2.5 py-2 text-[9px] text-[#111827]"
              multiline
            />
          </View>

          <Pressable
            onPress={() => setShowSuccess(true)}
            className="mt-5 h-10 items-center justify-center rounded-md bg-[#2E7D45]"
          >
            <Text className="text-[10px] font-semibold text-white">
              Confirm & Pay N5,100
            </Text>
          </Pressable>

          <Text className="mt-2 text-center text-[8px] text-[#B1B5BD]">
            Rider will proceed once payment is confirmed
          </Text>
        </View>
      </ScrollView>

      <Modal
        transparent
        visible={showSuccess}
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/20 px-8">
          <View className="w-full max-w-[260px] rounded-xl bg-white px-4 py-5">
            <View className="items-center">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#2E7D45]">
                <MaterialIcons name="check" size={22} color="#FFFFFF" />
              </View>

              <Text className="mt-3 text-[12px] font-semibold text-[#111827]">
                Payment Successful
              </Text>
              <Text className="mt-1 text-center text-[9px] text-[#6B7280]">
                Your Booking with PNCI rook has been confirmed
              </Text>
            </View>

            <View className="mt-4 flex-row gap-2">
              <Pressable
                onPress={() => setShowSuccess(false)}
                className="h-8 flex-1 items-center justify-center rounded border border-[#E5E7EB]"
              >
                <Text className="text-[9px] text-[#6B7280]">Continue</Text>
              </Pressable>

              <Pressable
                className="h-8 flex-1 items-center justify-center rounded bg-[#2E7D45]"
                onPress={() => router.push("trackingDetails")}
              >
                <Text className="text-[9px] font-semibold text-white">
                  Track Provider
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
