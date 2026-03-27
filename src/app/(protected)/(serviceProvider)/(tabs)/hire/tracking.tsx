import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

const routeStops = [
  { label: "Pickup", value: "15 Victoria Island, Lagos" },
  { label: "Dropoff", value: "24 Palm Avenue, Lekki Phase 1" },
];

const deliverySteps = [
  "En route to pickup",
  "Arrived at pickup location",
  "En route to delivery",
  "Arrived at delivery location",
  "Delivery completed",
];

export default function TrackingDetails() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const primaryLabel = () => {
    if (currentStep === 0) return "Arrived at Pickup";
    if (currentStep === 1) return "Start Trip";
    if (currentStep === 2) return "Arrived at Destination";
    return "Complete Trip";
  };

  const handlePrimary = () => {
    if (currentStep < 3) {
      setCurrentStep((step) => step + 1);
      return;
    }
    setShowCompleteModal(true);
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="h-56 bg-[#E6E8E2]">
          <View className="absolute inset-0 items-center pt-4">
            <Text className="text-xs font-semibold text-[#231F20]">Tracking Details</Text>
          </View>
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <Ionicons name="chevron-back" size={16} color="#231F20" />
          </Pressable>
          <View className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <Ionicons name="locate-outline" size={16} color="#0F7A3A" />
          </View>
          <View className="absolute bottom-6 left-8 right-8">
            <View className="h-1 rounded-full bg-[#0F7A3A]" />
          </View>
        </View>

        <View className="mx-4 -mt-8 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="text-[10px] font-semibold text-[#231F2099]">Arriving in 12 min</Text>
          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E7F3EC]">
                <Text className="text-xs font-semibold text-[#0F7A3A]">SG</Text>
              </View>
              <View>
                <Text className="text-sm font-semibold text-[#231F20]">Stephen Gerrad</Text>
                <View className="mt-1 flex-row items-center gap-1">
                  <Ionicons name="star" size={12} color="#F4B400" />
                  <Text className="text-xs text-[#231F2099]">4.6</Text>
                </View>
              </View>
            </View>
            <View className="flex-row items-center gap-2">
              <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
                <Ionicons name="chatbubble-ellipses-outline" size={14} color="#0F7A3A" />
              </Pressable>
              <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
                <Ionicons name="call-outline" size={14} color="#0F7A3A" />
              </Pressable>
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-xs font-semibold text-[#231F2099]">Route</Text>
            <View className="mt-3 gap-3">
              {routeStops.map((stop, index) => (
                <View key={stop.label} className="flex-row items-start gap-2">
                  <View className="mt-1 h-2 w-2 rounded-full bg-[#0F7A3A]" />
                  <View>
                    <Text className="text-xs text-[#231F2099]">{stop.label}</Text>
                    <Text className="text-xs text-[#231F20]">{stop.value}</Text>
                  </View>
                  {index === 0 && <View className="ml-4 h-7 w-px bg-[#D7DBD1]" />}
                </View>
              ))}
            </View>
          </View>

          <View className="mt-4 rounded-xl bg-[#F6F7F3] p-3">
            <Text className="text-xs text-[#231F2099]">Pickup note</Text>
            <Text className="mt-2 text-xs text-[#231F20]">
              Lorem ipsum elementum scelerisque nulla quis non nibh.
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-xs font-semibold text-[#231F2099]">Fare</Text>
            <Text className="mt-2 text-sm font-semibold text-[#0F7A3A]">₦5,000</Text>
          </View>

          <View className="mt-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-semibold text-[#231F2099]">Delivery Status</Text>
              <Ionicons name="chevron-down" size={14} color="#231F2099" />
            </View>
            <View className="mt-3 gap-3">
              {deliverySteps.map((step, index) => {
                const active = index <= currentStep;
                return (
                  <View key={step} className="flex-row items-center gap-2">
                    <View className={`h-2 w-2 rounded-full ${active ? "bg-[#0F7A3A]" : "bg-[#D7DBD1]"}`} />
                    <Text className={`text-xs ${active ? "text-[#231F20]" : "text-[#231F2099]"}`}>{step}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="bg-[#F6F7F3] px-4 pb-6">
        <Pressable onPress={handlePrimary} className="rounded-full bg-[#0F7A3A] py-3">
          <Text className="text-center text-sm font-semibold text-white">{primaryLabel()}</Text>
        </Pressable>
      </View>

      {showCompleteModal && (
        <View className="absolute inset-0 items-center justify-center bg-black/40 px-6">
          <View className="w-full rounded-2xl bg-white p-5 shadow-lg">
            <Text className="text-sm font-semibold text-[#231F20]">Complete Service?</Text>
            <Text className="mt-2 text-xs text-[#231F2099]">
              Mark this trip as completed and collect payment.
            </Text>
            <View className="mt-4 flex-row justify-end gap-3">
              <Pressable onPress={() => setShowCompleteModal(false)} className="rounded-full bg-[#F2F3EE] px-4 py-2">
                <Text className="text-xs font-semibold text-[#231F20]">Cancel</Text>
              </Pressable>
              <Pressable className="rounded-full bg-[#0F7A3A] px-4 py-2">
                <Text className="text-xs font-semibold text-white">Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
