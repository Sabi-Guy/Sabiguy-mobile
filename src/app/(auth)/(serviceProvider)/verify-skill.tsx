import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import BottomSheet from "@/components/bottomSheet";

const JOB_TITLES = ["Electrician", "Plumber", "Cleaner", "Painter", "Mechanic", "Carpenter"];
const SERVICES = ["Installation", "Repairs", "Maintenance", "Deep cleaning", "Consultation"];

export default function VerifySkill() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [service, setService] = useState("");
  const [isJobSheetVisible, setIsJobSheetVisible] = useState(false);
  const [isServiceSheetVisible, setIsServiceSheetVisible] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  const filteredJobs = useMemo(
    () => JOB_TITLES.filter((item) => item.toLowerCase().includes(jobSearch.toLowerCase())),
    [jobSearch]
  );
  const filteredServices = useMemo(
    () => SERVICES.filter((item) => item.toLowerCase().includes(serviceSearch.toLowerCase())),
    [serviceSearch]
  );

  const openJobSheet = () => {
    setJobSearch(jobTitle);
    setIsJobSheetVisible(true);
  };

  const openServiceSheet = () => {
    setServiceSearch(service);
    setIsServiceSheetVisible(true);
  };

  const closeJobSheet = () => {
    setIsJobSheetVisible(false);
    setJobSearch("");
  };

  const closeServiceSheet = () => {
    setIsServiceSheetVisible(false);
    setServiceSearch("");
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <BackButton />
        <View className="mt-8">
          <View className="mb-6">
            <ProgressBar step={4} total={5} />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Verify your skill</Text>
          <Text className="mt-2 text-base text-gray-600">
            Complete your verification to build trust with customers and access more features.
          </Text>
        </View>

        <View className="mt-6 gap-3">
          <View>
            <Pressable
              className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-4"
            onPress={openJobSheet}
            >
              <Text className={`text-sm ${jobTitle ? "text-gray-700" : "text-gray-500"}`}>
                {jobTitle || "Search or Select Job Title"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </Pressable>
          </View>

          <View>
            <Pressable
              className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-4"
            onPress={openServiceSheet}
            >
              <Text className={`text-sm ${service ? "text-gray-700" : "text-gray-500"}`}>
                {service || "Search or select services"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </Pressable>
          </View>
        </View>

        <Pressable
          className="mt-8 rounded-md bg-[#005823CC] py-4"
          onPress={() => router.push("/(auth)/(serviceProvider)/bank-account")}
        >
          <Text className="text-center font-semibold text-white">Next</Text>
        </Pressable>
      </ScrollView>

      <BottomSheet isVisible={isJobSheetVisible} onClose={closeJobSheet} snapPoints={[0, 45, 80]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="pb-4">
            <Text className="text-center text-base font-semibold text-gray-900">
              Select Job Title
            </Text>
          </View>
          <View className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
            <TextInput
              value={jobSearch}
              onChangeText={setJobSearch}
              placeholder="Search job titles"
              className="text-sm text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="mt-4">
            {filteredJobs.length === 0 ? (
              <Text className="text-center text-sm text-gray-500">No results found.</Text>
            ) : (
              filteredJobs.map((item) => (
                <Pressable
                  key={item}
                  className="border-b border-gray-100 px-2 py-3"
                  onPress={() => {
                    setJobTitle(item);
                    closeJobSheet();
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </BottomSheet>

      <BottomSheet isVisible={isServiceSheetVisible} onClose={closeServiceSheet} snapPoints={[0, 45, 80]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="pb-4">
            <Text className="text-center text-base font-semibold text-gray-900">
              Select Service
            </Text>
          </View>
          <View className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
            <TextInput
              value={serviceSearch}
              onChangeText={setServiceSearch}
              placeholder="Search services"
              className="text-sm text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="mt-4">
            {filteredServices.length === 0 ? (
              <Text className="text-center text-sm text-gray-500">No results found.</Text>
            ) : (
              filteredServices.map((item) => (
                <Pressable
                  key={item}
                  className="border-b border-gray-100 px-2 py-3"
                  onPress={() => {
                    setService(item);
                    closeServiceSheet();
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
