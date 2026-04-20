import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import BookingOfferCard from "@/components/BookingOfferCard";
export default function Hire() {
  const [isImmediate, setIsImmediate] = useState(true);
  const [autoAcceptNearest, setAutoAcceptNearest] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<"bike" | "car" | null>(null);

  const router = useRouter()
  return (
    <View className="flex-1 bg-[#F3F4F6]">
      <View className="px-5 pb-3 pt-5">
        <Text className="text-center text-base font-semibold text-[#111827]">Bookings</Text>
      </View>

      <View className="mx-4 flex-1 rounded-2xl bg-white p-4">
        <View className="mb-4 flex-row rounded-md bg-[#F3F4F6] p-1">
          <Pressable className="flex-1 rounded bg-[#E6F4EC] py-2">
            <Text className="text-center text-xs font-semibold text-[#0F7A3A]">Request Service</Text>
          </Pressable>
          <Pressable className="flex-1 rounded py-2">
            <Text className="text-center text-xs font-medium text-[#6B7280]">My Requests</Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          <View className="gap-3">
            <View>
              <Text className="mb-1 text-xs text-[#374151]">Work Category</Text>
              <Pressable className="h-11 flex-row items-center justify-between rounded-md border border-[#E5E7EB] px-3">
                <Text className="text-xs text-[#9CA3AF]">Transport & Logistics</Text>
                <Feather name="chevron-down" size={14} color="#6B7280" />
              </Pressable>
            </View>

            <View>
              <Text className="mb-1 text-xs text-[#374151]">Subcategory</Text>
              <Pressable className="h-11 flex-row items-center justify-between rounded-md border border-[#E5E7EB] px-3">
                <Text className="text-xs text-[#6B7280]">Package Delivery</Text>
                <Feather name="chevron-down" size={14} color="#6B7280" />
              </Pressable>
            </View>

            <View>
              <Text className="mb-1 text-xs text-[#374151]">Pickup Location</Text>
              <TextInput
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholder="24 Palm Avenue, Lekki Phase 1, Lagos"
                placeholderTextColor="#9CA3AF"
                className="h-11 rounded-md border border-[#E5E7EB] px-3 text-xs text-[#111827]"
              />
            </View>

            <View>
              <Text className="mb-1 text-xs text-[#374151]">Dropoff Location</Text>
              <TextInput
                value={dropoffLocation}
                onChangeText={setDropoffLocation}
                placeholder="24 Palm Avenue, Lekki Phase 1, Lagos"
                placeholderTextColor="#9CA3AF"
                className="h-11 rounded-md border border-[#E5E7EB] px-3 text-xs text-[#111827]"
              />
            </View>

            <View>
              <Text className="mb-2 text-xs text-[#374151]">Service Type</Text>
              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => setIsImmediate(true)}
                  className={`h-10 flex-1 flex-row items-center justify-center gap-2 rounded-md border ${
                    isImmediate ? "border-[#0F7A3A] bg-[#EAF6EF]" : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <MaterialIcons
                    name="watch-later"
                    size={14}
                    color={isImmediate ? "#0F7A3A" : "#9CA3AF"}
                  />
                  <Text
                    className={`text-xs font-medium ${isImmediate ? "text-[#0F7A3A]" : "text-[#6B7280]"}`}
                  >
                    Immediate
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setIsImmediate(false)}
                  className={`h-10 flex-1 flex-row items-center justify-center gap-2 rounded-md border ${
                    !isImmediate ? "border-[#0F7A3A] bg-[#EAF6EF]" : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <MaterialIcons
                    name="calendar-today"
                    size={14}
                    color={!isImmediate ? "#0F7A3A" : "#9CA3AF"}
                  />
                  <Text
                    className={`text-xs font-medium ${!isImmediate ? "text-[#0F7A3A]" : "text-[#6B7280]"}`}
                  >
                    Scheduled
                  </Text>
                </Pressable>
              </View>
            </View>

            <View>
              <Text className="mb-2 text-xs text-[#374151]">Choose Vehicle</Text>
              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => setSelectedVehicle("bike")}
                  className={`flex-1 rounded-md border p-3 ${
                    selectedVehicle === "bike" ? "border-[#0F7A3A] bg-[#EAF6EF]" : "border-[#E5E7EB]"
                  }`}
                >
                  <View className="mb-1 flex-row items-center gap-1">
                    <MaterialIcons name="pedal-bike" size={14} color="#374151" />
                    <Text className="text-xs font-medium text-[#374151]">Bike Delivery</Text>
                  </View>
                  <Text className="text-[10px] text-[#9CA3AF]">15 min | # 2</Text>
                  <Text className="text-[10px] text-[#9CA3AF]">Best for small packages</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelectedVehicle("car")}
                  className={`flex-1 rounded-md border p-3 ${
                    selectedVehicle === "car" ? "border-[#0F7A3A] bg-[#EAF6EF]" : "border-[#E5E7EB]"
                  }`}
                >
                  <View className="mb-1 flex-row items-center gap-1">
                    <MaterialIcons name="local-taxi" size={14} color="#374151" />
                    <Text className="text-xs font-medium text-[#374151]">Car Delivery</Text>
                  </View>
                  <Text className="text-[10px] text-[#9CA3AF]">21 min | # 4</Text>
                  <Text className="text-[10px] text-[#9CA3AF]">Medium sized delivery</Text>
                </Pressable>
              </View>
            </View>

            <View className="mt-1 flex-row items-center justify-between">
              <Text className="w-[75%] text-xs text-[#374151]">Automatically accept the nearest provider</Text>
              <Switch
                value={autoAcceptNearest}
                onValueChange={setAutoAcceptNearest}
                trackColor={{ false: "#D1D5DB", true: "#86D3A4" }}
                thumbColor="#FFFFFF"
              />
            </View>

            <Pressable className="mt-2 h-11 items-center justify-center rounded-md bg-[#2E7D45]"
            onPress={() => router.push('/booking')}>
              <Text className="text-sm font-semibold text-white">Post Request</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}