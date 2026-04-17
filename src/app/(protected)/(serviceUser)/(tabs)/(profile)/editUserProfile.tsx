import React from "react";
import { Image, TouchableOpacity, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

export default function EditUserProfile() {
    const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-5 pb-3 pt-5">
        <TouchableOpacity onPress={router.back}>
          <Text className="text-sm font-semibold text-[#0F7A3A]">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-900">Manage Profile</Text>
        <TouchableOpacity>
          <Text className="text-sm font-semibold text-[#0F7A3A]">Done</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <Image
            source={require("../../../../../../assets/avatar.png")}
            className="h-16 w-16 rounded-full"
            resizeMode="cover"
          />
          <TouchableOpacity className="mt-2">
            <Text className="text-xs font-medium text-[#0F7A3A]">Set new photo</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 gap-4">
          <View>
            <Text className="text-[11px] text-gray-500">Full Name</Text>
            <TextInput
              placeholder="Phil Crook"
              placeholderTextColor="#9CA3AF"
              className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
            />
          </View>
          <View>
            <Text className="text-[11px] text-gray-500">Phone number</Text>
            <TextInput
              placeholder="+234 812 909 3873"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
            />
          </View>
          <View>
            <Text className="text-[11px] text-gray-500">Email Address</Text>
            <TextInput
              placeholder="Philcrook00@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
            />
          </View>
          <View>
            <Text className="text-[11px] text-gray-500">Address</Text>
            <TextInput
              placeholder="123, Palm Avenue"
              placeholderTextColor="#9CA3AF"
              className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
            />
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-[11px] text-gray-500">City</Text>
              <TextInput
                placeholder="Ikorodu"
                placeholderTextColor="#9CA3AF"
                className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
              />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] text-gray-500">State</Text>
              <TextInput
                placeholder="Lagos"
                placeholderTextColor="#9CA3AF"
                className="mt-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}