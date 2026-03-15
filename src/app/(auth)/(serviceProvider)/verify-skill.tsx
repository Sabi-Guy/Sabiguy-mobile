import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";

const JOB_TITLES = ["Electrician", "Plumber", "Cleaner", "Painter", "Mechanic", "Carpenter"];
const SERVICES = ["Installation", "Repairs", "Maintenance", "Deep cleaning", "Consultation"];

export default function VerifySkill() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [service, setService] = useState("");
  const [showJobs, setShowJobs] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const filteredJobs = useMemo(
    () => JOB_TITLES.filter((item) => item.toLowerCase().includes(jobTitle.toLowerCase())),
    [jobTitle]
  );
  const filteredServices = useMemo(
    () => SERVICES.filter((item) => item.toLowerCase().includes(service.toLowerCase())),
    [service]
  );

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
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
            onPress={() => setShowJobs((prev) => !prev)}
          >
            <Text className={`text-sm ${jobTitle ? "text-gray-700" : "text-gray-500"}`}>
              {jobTitle || "Search or Select Job Title"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showJobs ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              <TextInput
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="Search job titles"
                className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700"
              />
              {filteredJobs.map((item) => (
                <Pressable
                  key={item}
                  className="px-4 py-3"
                  onPress={() => {
                    setJobTitle(item);
                    setShowJobs(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View>
          <Pressable
            className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-4"
            onPress={() => setShowServices((prev) => !prev)}
          >
            <Text className={`text-sm ${service ? "text-gray-700" : "text-gray-500"}`}>
              {service || "Search or select services"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showServices ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              <TextInput
                value={service}
                onChangeText={setService}
                placeholder="Search services"
                className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700"
              />
              {filteredServices.map((item) => (
                <Pressable
                  key={item}
                  className="px-4 py-3"
                  onPress={() => {
                    setService(item);
                    setShowServices(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </View>

      <Pressable
        className="mt-8 rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(auth)/(serviceProvider)/bank-account")}
      >
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>

    </ScrollView>
  );
}
