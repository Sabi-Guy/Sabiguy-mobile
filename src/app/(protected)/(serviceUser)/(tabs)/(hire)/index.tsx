import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import MyRequestCard from "@/components/MyRequestCard";
import BottomSheet from "@/components/bottomSheet";
export default function Hire() {
  const [isImmediate, setIsImmediate] = useState(true);
  const [autoAcceptNearest, setAutoAcceptNearest] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<"bike" | "car" | null>(null);
  const [activeTab, setActiveTab] = useState<"request" | "my-requests">("request");
  const [requestFilter, setRequestFilter] = useState<"all" | "active" | "pending" | "completed">("all");
  const [isCancelVisible, setIsCancelVisible] = useState(false);
  const [cancelStep, setCancelStep] = useState<"reasons" | "other">("reasons");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    "Found a better price",
    "Provider is too far",
    "Changed my mind",
    "Other reason",
  ];

  const requests = [
    {
      id: "req-1",
      routeId: "1",
      title: "Package Delivery",
      name: "Thomas Frank",
      date: "Oct 10, 2025 - 9 AM",
      pickup: "15 Victoria Island, Lagos",
      dropoff: "24 Palm Avenue, Lekki Phase 1",
      distance: "10.5 km",
      price: "#5,000",
      status: "active",
    },
    {
      id: "req-2",
      routeId: "2",
      title: "Package Delivery",
      name: "Oscar Williams",
      date: "Oct 18, 2025 - 11 AM",
      pickup: "15 Victoria Island, Lagos",
      dropoff: "24 Palm Avenue, Lekki Phase 1",
      distance: "13 km",
      price: "#7,000",
      status: "pending",
    },
    {
      id: "req-3",
      routeId: "3",
      title: "Package Delivery",
      name: "Oscar Williams",
      date: "Oct 18, 2025 - 11 AM",
      pickup: "15 Victoria Island, Lagos",
      dropoff: "24 Palm Avenue, Lekki Phase 1",
      distance: "13 km",
      price: "#7,000",
      status: "completed",
      rating: "5.0",
      review:
        "Excellent work! Very professional and finished ahead of schedule.",
    },
  ] as const;

  const filteredRequests =
    requestFilter === "all"
      ? requests
      : requests.filter((request) => request.status === requestFilter);

  const openCancelSheet = () => {
    setIsCancelVisible(true);
    setCancelStep("reasons");
    setSelectedReasons([]);
    setOtherReason("");
  };

  const closeCancelSheet = () => {
    setIsCancelVisible(false);
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((item) => item !== reason) : [...prev, reason]
    );
  };

  const router = useRouter()
  return (
    <View className="flex-1 bg-[#F3F4F6]">
      <View className="px-5 pb-3 pt-5">
        <Text className="text-center text-base font-semibold text-[#111827]">Bookings</Text>
      </View>

      <View className="mx-4 flex-1 rounded-2xl bg-white p-4">
        <View className="mb-4 flex-row rounded-md bg-[#F3F4F6] p-1">
          <Pressable
            onPress={() => setActiveTab("request")}
            className={`flex-1 rounded py-2 ${
              activeTab === "request" ? "bg-[#E6F4EC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-xs ${
                activeTab === "request" ? "font-semibold text-[#0F7A3A]" : "font-medium text-[#6B7280]"
              }`}
            >
              Request Service
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("my-requests")}
            className={`flex-1 rounded py-2 ${
              activeTab === "my-requests" ? "bg-[#E6F4EC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-xs ${
                activeTab === "my-requests" ? "font-semibold text-[#0F7A3A]" : "font-medium text-[#6B7280]"
              }`}
            >
              My Requests
            </Text>
          </Pressable>
        </View>

        {activeTab === "request" ? (
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

              <Pressable
                className="mt-2 h-11 items-center justify-center rounded-md bg-[#2E7D45]"
                onPress={() => router.push("booking")}
              >
                <Text className="text-sm font-semibold text-white">Post Request</Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <View className="gap-3">
              <View className="flex-row rounded-md bg-[#F3F4F6] p-1">
                {[
                  { key: "all", label: "All" },
                  { key: "active", label: "Active" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Completed" },
                ].map((tab) => (
                  <Pressable
                    key={tab.key}
                    onPress={() => setRequestFilter(tab.key as typeof requestFilter)}
                    className={`flex-1 rounded py-2 ${
                      requestFilter === tab.key ? "bg-[#E6F4EC]" : "bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-center text-[10px] ${
                        requestFilter === tab.key
                          ? "font-semibold text-[#0F7A3A]"
                          : "font-medium text-[#6B7280]"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <FlatList
                data={filteredRequests}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <MyRequestCard
                    title={item.title}
                    name={item.name}
                    date={item.date}
                    pickup={item.pickup}
                    dropoff={item.dropoff}
                    distance={item.distance}
                    price={item.price}
                    status={item.status}
                    rating={"rating" in item ? item.rating : undefined}
                    review={"review" in item ? item.review : undefined}
                    onPress={() => router.push(item.routeId)}
                    onCancelPress={openCancelSheet}
                  />
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>

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
                    <Text className="text-[14px] text-[#9CA3AF]">&gt;</Text>
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