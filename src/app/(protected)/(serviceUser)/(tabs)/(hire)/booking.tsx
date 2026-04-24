import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import BottomSheet from "@/components/bottomSheet";
import BookingOfferCard from "@/components/BookingOfferCard";
import BackButton from "@/components/BackButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Booking() {
  const router = useRouter();
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [cancelStep, setCancelStep] = useState<"reasons" | "other">("reasons");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");

  const reasons = useMemo(
    () => [
      "The service provider isn't responding",
      "Changed my mind",
      "I want to change the order",
      "I'm not satisfied with the vehicle",
      "Incorrect address",
      "Other reason",
    ],
    [],
  );

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason],
    );
  };

  const openCancelSheet = () => {
    setCancelStep("reasons");
    setIsCancelVisible(true);
  };

  const closeCancelSheet = () => {
    setIsCancelVisible(false);
    setCancelStep("reasons");
    setSelectedReasons([]);
    setOtherReason("");
  };

  return (
    <View className="flex-1 bg-[#EAF6EF]">
      <View className="flex-1 bg-[#D7F0DF]" />
      <View className="absolute left-4 right-4 top-12 gap-4">
        <BookingOfferCard
          carName="Toyota Corolla"
          price="N5,000"
          rating="4.5"
          reviews="82"
          distance="2.3 miles"
          onAccept={() => router.push("/(protected)/(serviceUser)/(tabs)/(hire)/1")}
        />
        <BookingOfferCard
          carName="Toyota Corolla"
          price="N5,000"
          rating="4.5"
          reviews="82"
          distance="2.3 miles"
          onAccept={() => router.push("/(protected)/(serviceUser)/(tabs)/(hire)/2")}
        />
      </View>
      <BottomSheet
        isVisible={true}
        snapPoints={[20, 35, 50]}
        initialSnapPoint={30}
        showBackdropShadow={false}
        useModal={false}
        allowClose={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          <View className="gap-3">
            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[11px] text-[#6B7280]">
                  2 drivers are viewing your request...
                </Text>
                <View className="h-6 w-6 items-center justify-center rounded-full bg-[#F3F4F6]">
                  <Image
                    source={require("../../../../../../assets/avatar.png")}
                    className="h-6 w-6 rounded-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View className="mt-2 h-1 w-full rounded-full bg-[#E5E7EB]">
                <View className="h-1 w-full rounded-full bg-[#2E7D45]" />
              </View>
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-xs font-semibold text-[#111827]">
                Route
              </Text>

              <View className="mt-3 flex-row items-start gap-3">
                <View className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2E7D45]" />
                <View className="flex-1">
                  <Text className="text-[10px] text-[#9CA3AF]">Pickup</Text>
                  <Text className="text-[11px] text-[#374151]">
                    15 Victoria Island, Lagos...
                  </Text>
                </View>
              </View>

              <View className="mt-3 flex-row items-start gap-3">
                <View className="mt-1 h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <View className="flex-1">
                  <Text className="text-[10px] text-[#9CA3AF]">Dropoff</Text>
                  <Text className="text-[11px] text-[#374151]">
                    24 Palm Avenue, Lekki P...
                  </Text>
                </View>
              </View>
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-xs font-semibold text-[#111827]">Fare</Text>
              <View className="mt-2 flex-row items-center gap-2">
                <View className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <Text className="text-[11px] font-semibold text-[#111827]">
                  N5,000
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="h-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white"
              onPress={openCancelSheet}
            >
              <Text className="text-[11px] font-semibold text-[#EF4444]">
                Cancel Request
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        isVisible={isCancelVisible}
        snapPoints={[0, 45, 60]}
        initialSnapPoint={55}
        showBackdropShadow={true}
        onClose={closeCancelSheet}
        topContent={
          <View className="flex-row items-center border-b border-[#E5E7EB] px-4 py-3">
            <View className="h-6 w-6" />
            <Text className="flex-1 text-center text-[12px] font-semibold text-[#111827]">
              Why do you want to cancel?
            </Text>
            <TouchableOpacity
              onPress={closeCancelSheet}
              className="h-6 w-6 items-center justify-center"
            >
              <MaterialIcons name="close" size={18} color="#111827" />
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 8 }}
      >
        {cancelStep === "reasons" ? (
          <View className="gap-3 px-4 pb-3 pt-2">
            {reasons.map((reason) => {
              const isOther = reason === "Other reason";
              const isSelected = selectedReasons.includes(reason);

              return (
                <TouchableOpacity
                  key={reason}
                  className="flex-row items-center justify-between"
                  onPress={() => {
                    if (isOther) {
                      setCancelStep("other");
                      return;
                    }
                    toggleReason(reason);
                  }}
                >
                  <Text className="text-[11px] text-[#111827]">{reason}</Text>
                  {isOther ? (
                    <Text className="text-[14px] text-[#9CA3AF]">›</Text>
                  ) : (
                    <View
                      className={`h-4 w-4 items-center justify-center rounded border ${
                        isSelected
                          ? "border-[#2E7D45] bg-[#2E7D45]"
                          : "border-[#D1D5DB]"
                      }`}
                    >
                      {isSelected ? (
                        <View className="h-2 w-2 rounded-sm bg-white" />
                      ) : null}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity className="mt-2 h-9 items-center justify-center rounded-md bg-[#2E7D45]">
              <Text className="text-[11px] font-semibold text-white">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3 px-4 pb-3 pt-2">
            <TouchableOpacity
              className="w-16"
              onPress={() => {
                setCancelStep("reasons");
              }}
            >
              <View className="rounded-full p-2">
                <MaterialIcons name="chevron-left" size={18} color="#111827" />
              </View>
            </TouchableOpacity>

            <TextInput
              value={otherReason}
              onChangeText={setOtherReason}
              multiline
              placeholder="Describe the problem"
              placeholderTextColor="#9CA3AF"
              className="min-h-[96px] rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[11px] text-[#111827]"
            />

            <TouchableOpacity className="h-9 items-center justify-center rounded-md bg-[#2E7D45]">
              <Text className="text-[11px] font-semibold text-white">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </BottomSheet>
    </View>
  );
}
