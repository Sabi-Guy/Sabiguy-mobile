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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@/components/bottomSheet";
import { useRouter } from "expo-router";

type StatusItemProps = {
  title: string;
  active?: boolean;
  done?: boolean;
};

function StatusItem({ title, active = false, done = false }: StatusItemProps) {
  return (
    <View className="flex-row items-start gap-2">
      <View className="items-center">
        <View
          className={`h-2.5 w-2.5 rounded-full ${
            done || active ? "bg-[#2E7D45]" : "bg-[#D1D5DB]"
          }`}
        />
        <View className="mt-1 h-5 w-[1px] bg-[#E5E7EB]" />
      </View>
      <Text
        className={`flex-1 text-[9px] ${
          active ? "font-semibold text-[#2E7D45]" : "text-[#4B5563]"
        }`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TrackingDetails() {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      <View className="h-[44%] bg-[#DDF1E3]" />

      <View className="absolute left-0 right-0 top-10 flex-row items-center px-3">
        <TouchableOpacity className="h-7 w-7 items-center justify-center rounded-full bg-white/80">
          <Ionicons name="chevron-back" size={16} color="#111827" />
        </TouchableOpacity>
        <Text className="flex-1 pr-7 text-center text-[11px] font-semibold text-[#111827]">
          Tracking Details
        </Text>
      </View>

      <BottomSheet
        isVisible={true}
        snapPoints={[20, 50, 68, 90]}
        initialSnapPoint={60}
        showBackdropShadow={false}
        useModal={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          <View className="gap-3">
            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-[11px] font-semibold text-[#111827]">ETA 18 min</Text>

              <View className="mt-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Image
                    source={require("../../../../../../assets/avatar.png")}
                    className="h-7 w-7 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <View className="flex-row items-center gap-1">
                      <Text className="text-[9.5px] font-semibold text-[#111827]">Marcus Johnson</Text>
                      <MaterialIcons name="verified" size={10} color="#1F8A4C" />
                    </View>
                    <Text className="text-[8px] text-[#6B7280]">Toyota Corolla - KSF257NG</Text>
                    <View className="mt-0.5 flex-row items-center gap-1">
                      <Ionicons name="star" size={8} color="#F59E0B" />
                      <Text className="text-[8px] text-[#6B7280]">4.5</Text>
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
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-[11px] font-semibold text-[#111827]">Route</Text>

              <View className="mt-2 gap-2.5">
                <View className="flex-row items-start gap-2">
                  <Image
                    source={require("../../../../../../assets/pickupLocation.png")}
                    className="mt-0.5 h-3.5 w-3.5"
                    resizeMode="contain"
                  />
                  <View className="flex-1">
                    <Text className="text-[8.5px] text-[#9CA3AF]">Pickup</Text>
                    <Text className="text-[9.5px] text-[#4B5563]">15 Victoria Island, Lagos...</Text>
                  </View>
                </View>

                <View className="flex-row items-start gap-2">
                  <Image
                    source={require("../../../../../../assets/dropoffLocation.png")}
                    className="mt-0.5 h-3.5 w-3.5"
                    resizeMode="contain"
                  />
                  <View className="flex-1">
                    <Text className="text-[8.5px] text-[#9CA3AF]">Dropoff</Text>
                    <Text className="text-[9.5px] text-[#4B5563]">24 Palm Avenue, Lekki P...</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-[11px] font-semibold text-[#111827]">Pickup note</Text>
              <TextInput
                placeholder="Lorem ipsum elementum scelerisque nullam quis non nibh."
                placeholderTextColor="#A1A1AA"
                className="mt-2 min-h-[46px] rounded-md bg-[#F2F5F8] px-2.5 py-2 text-[9px] text-[#111827]"
                multiline
              />
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <Text className="text-[11px] font-semibold text-[#111827]">Fare</Text>
              <View className="mt-1.5 flex-row items-center gap-1.5">
                <Image
                  source={require("../../../../../../assets/wallet.png")}
                  className="h-3.5 w-3.5"
                  resizeMode="contain"
                />
                <Text className="text-[10px] font-semibold text-[#111827]">N5,000</Text>
              </View>
            </View>

            <View className="rounded-lg border border-[#E5E7EB] bg-white p-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[11px] font-semibold text-[#111827]">Delivery Status</Text>
                <MaterialIcons name="keyboard-arrow-up" size={16} color="#6B7280" />
              </View>

              <View className="mt-2">
                <StatusItem title="En route to pickup" done />
                <StatusItem title="Arrived at pickup location" done />
                <StatusItem title="In route to delivery" done />
                <StatusItem title="Arrived at delivery location" active />
                <StatusItem title="Delivery completed" />
              </View>

              <Pressable
                onPress={() => setShowCompleteModal(true)}
                className="mt-2 h-9 items-center justify-center rounded-md bg-[#2E7D45]"
              >
                <Text className="text-[10px] font-semibold text-white">Complete Trip</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>

      <Modal
        transparent
        visible={showCompleteModal}
        animationType="fade"
        onRequestClose={() => setShowCompleteModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/35 px-7">
          <View className="w-full max-w-[280px] rounded-lg bg-white p-4">
            <View className="items-end">
              <TouchableOpacity onPress={() => setShowCompleteModal(false)}>
                <Ionicons name="close" size={14} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text className="text-center text-[13px] font-semibold text-[#111827]">
              Complete Service?
            </Text>
            <Text className="mt-1 text-center text-[9px] text-[#6B7280]">
              Are you sure you want to mark this
            </Text>
            <Text className="text-center text-[9px] text-[#6B7280]">trip as completed?</Text>

            <View className="mt-4 flex-row gap-2">
              <Pressable
                onPress={() => setShowCompleteModal(false)}
                className="h-8 flex-1 items-center justify-center rounded border border-[#E5E7EB]"
              >
                <Text className="text-[9px] text-[#6B7280]">Cancel</Text>
              </Pressable>

              <Pressable
                className="h-8 flex-1 items-center justify-center rounded bg-[#2E7D45]"
                onPress={() => router.push("rideRating")}
              >
                <Text className="text-[9px] font-semibold text-white">Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}