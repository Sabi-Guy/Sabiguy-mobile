import React from "react";
import { Image, TouchableOpacity, ScrollView, Text, View } from "react-native";
import BottomSheet from "@/components/bottomSheet";
import BookingOfferCard from "@/components/BookingOfferCard";

export default function BookingSummary() {
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
        />
        <BookingOfferCard
          carName="Toyota Corolla"
          price="N5,000"
          rating="4.5"
          reviews="82"
          distance="2.3 miles"
        />
 
      </View>
      <BottomSheet
        isVisible={true}
        snapPoints={[0, 35, 50]}
        initialSnapPoint={40}
        showBackdropShadow={false}
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
                <View className="h-1 w-[55%] rounded-full bg-[#2E7D45]" />
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

            <TouchableOpacity className="h-9 items-center justify-center rounded-md border border-[#E5E7EB] bg-white">
              <Text className="text-[11px] font-semibold text-[#EF4444]">
                Cancel Request
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
