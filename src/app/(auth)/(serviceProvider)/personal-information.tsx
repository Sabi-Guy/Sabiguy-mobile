import React, { useMemo, useState } from "react";
import { PanResponder, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";

const RADIUS_OPTIONS = ["3km", "5km", "10km", "15km", "20km", "Custom"];
const GENDER_OPTIONS = ["Female", "Male", "Other", "Prefer not to say"];

export default function PersonalInformation() {
  const router = useRouter();
  const [radiusValue, setRadiusValue] = useState(3);
  const [customRadius, setCustomRadius] = useState(false);
  const [allowOutside, setAllowOutside] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  const numericOptions = useMemo(
    () => RADIUS_OPTIONS.filter((option) => option !== "Custom").map((option) => parseInt(option, 10)),
    []
  );
  const radiusLabel = useMemo(() => {
    if (customRadius) return "Custom";
    return `${radiusValue}km`;
  }, [customRadius, radiusValue]);
  const radiusPercent = useMemo(() => {
    const min = 1;
    const max = 50;
    return Math.min(100, Math.max(0, ((radiusValue - min) / (max - min)) * 100));
  }, [radiusValue]);
  const thumbLeft = useMemo(() => {
    if (!trackWidth) return 0;
    const percent = radiusPercent / 100;
    return Math.max(0, Math.min(trackWidth, trackWidth * percent));
  }, [radiusPercent, trackWidth]);

  const setRadiusFromPosition = (x: number) => {
    if (!trackWidth) return;
    const clamped = Math.max(0, Math.min(trackWidth, x));
    const value = Math.round(1 + (clamped / trackWidth) * 49);
    setRadiusValue(value);
    setCustomRadius(false);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          setRadiusFromPosition(evt.nativeEvent.locationX);
        },
        onPanResponderMove: (_, gestureState) => {
          setRadiusFromPosition(gestureState.dx + thumbLeft);
        },
      }),
    [thumbLeft, trackWidth]
  );

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-8">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Personal Information</Text>
        <Text className="mt-2 text-base text-gray-600">
          Let&apos;s know who you are, tell us a bit about yourself
        </Text>
      </View>

      <View className="mt-6 gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Gender</Text>
          <Pressable
            className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
            onPress={() => setShowGenderOptions((prev) => !prev)}
          >
            <Text className="text-sm text-gray-700">{gender || "Gender"}</Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showGenderOptions ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              {GENDER_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  className="px-4 py-3"
                  onPress={() => {
                    setGender(option);
                    setShowGenderOptions(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{option}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Address</Text>
          <TextInput
            placeholder="Your address"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
        </View>
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">City of residence</Text>
          <TextInput
            placeholder="Lagos"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4"
          />
        </View>
      </View>

      <View className="mt-6">
        <Text className="mb-3 text-sm font-medium text-gray-700">Work coverage radius</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator className="flex-row">
          {RADIUS_OPTIONS.map((option) => {
            const numeric = option === "Custom" ? null : parseInt(option, 10);
            const selected = numeric ? numeric === radiusValue && !customRadius : customRadius;
            return (
              <Pressable
                key={option}
                className={`mr-2 rounded-full border px-3 py-1 ${
                  selected ? "border-[#005823CC] bg-[#005823CC]" : "border-gray-300 bg-white"
                }`}
                onPress={() => {
                  if (numeric) {
                    setRadiusValue(numeric);
                    setCustomRadius(false);
                  } else {
                    setCustomRadius(true);
                  }
                }}
              >
                <Text className={`text-xs ${selected ? "text-white" : "text-gray-700"}`}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View className="mt-4">
          <View
            className="relative h-1 w-full rounded-full bg-gray-200"
            onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
            {...panResponder.panHandlers}
          >
            <View
              className="h-1 rounded-full bg-[#005823CC]"
              style={{ width: `${radiusPercent}%` }}
            />
            <View
              className="absolute -top-1 h-3 w-3 rounded-full bg-[#005823CC]"
              style={{ left: thumbLeft - 6 }}
            />
          </View>
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-xs text-gray-500">1km</Text>
            <Text className="text-xs text-gray-500">50km</Text>
          </View>
        </View>
        <Text className="mt-2 text-xs text-gray-500">
          {radiusLabel}
        </Text>
      </View>

      <Pressable
        className="mt-6 flex-row items-start"
        onPress={() => setAllowOutside((previous) => !previous)}
      >
        <View
          className={`mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border ${
            allowOutside ? "border-[#005823CC] bg-[#005823CC]" : "border-gray-400 bg-white"
          }`}
        >
          {allowOutside ? <Ionicons name="checkmark" size={12} color="#FFFFFF" /> : null}
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-700">Allow bookings outside my coverage area</Text>
          <Text className="mt-1 text-xs text-gray-500">
            You will receive requests from clients beyond your preferred radius
          </Text>
        </View>
      </Pressable>

      <Pressable
        className="mt-8 rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(auth)/(serviceProvider)/account-type")}
      >
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </ScrollView>
  );
}
