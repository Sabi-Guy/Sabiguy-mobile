import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
<<<<<<< HEAD
import BottomSheet from "@/components/bottomSheet";
import Toast from "react-native-toast-message";
import { apiRequest } from "@/lib/api";
=======
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
>>>>>>> ef432b9 (Update service provider verify skill flow and add vehicle info)

const CATEGORIES = [
  "Emergency Services",
  "Home & Repair Services",
  "Domestic & Lifestyle Services",
  "Transport & Logistics",
  "Professional Services",
  "Freelance & Creative Services",
];
const ROLES = ["Car driver", "Motorbike driver"];
type PickedDoc = { name: string; uri: string; mimeType?: string; size?: number };
type PickedImage = { name: string; uri: string; mimeType?: string; size?: number };

function UploadBlock({
  title,
  subtitle,
  selected,
  fileName,
  onPress,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  fileName?: string;
  onPress: () => void;
}) {
  return (
    <View className="mt-3">
      <Text className="text-sm font-medium text-gray-700">{title}</Text>
      <Text className="mt-1 text-xs text-gray-500">{subtitle}</Text>
      <Pressable
        className={`mt-2 w-full flex-row items-center justify-center gap-2 rounded-full border py-3 ${
          selected ? "border-[#005823CC] bg-[#E6F4EF]" : "border-gray-200 bg-gray-100"
        }`}
        onPress={onPress}
      >
        <Ionicons name={selected ? "checkmark" : "add"} size={16} color="#6B7280" />
        <Text className="text-center text-sm font-semibold text-gray-700">
          {selected ? "Uploaded" : "Upload file"}
        </Text>
      </Pressable>
      {fileName ? (
        <Text className="mt-2 text-xs text-gray-500" numberOfLines={1}>
          {fileName}
        </Text>
      ) : null}
    </View>
  );
}

export default function VerifySkill() {
  const router = useRouter();
<<<<<<< HEAD
  const [jobTitle, setJobTitle] = useState("");
  const [service, setService] = useState("");
  const [isJobSheetVisible, setIsJobSheetVisible] = useState(false);
  const [isServiceSheetVisible, setIsServiceSheetVisible] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsJobSheetVisible(false);
      setIsServiceSheetVisible(false);
      return () => {
        setIsJobSheetVisible(false);
        setIsServiceSheetVisible(false);
      };
    }, [])
  );

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

  const handleSubmit = async () => {
    if (!jobTitle || !service) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please select a job title and a service.",
      });
      return;
    }

    try {
      setSubmitting(true);
      await apiRequest("/provider/job-service", {
        method: "POST",
        json: {
          job: [
            {
              service,
              title: jobTitle,
              tagLine: "Experienced provider",
              startingPrice: "0",
            },
          ],
          service: [
            {
              serviceName: service,
              pricingModel: "fixed",
              price: "0",
            },
          ],
        },
      });
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Job and service details updated.",
      });
      router.push("/(auth)/(serviceProvider)/bank-account");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Unable to save job/service details.",
      });
    } finally {
      setSubmitting(false);
    }
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
        className={`mt-8 rounded-md bg-[#005823CC] py-4 ${submitting ? "opacity-70" : ""}`}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text className="text-center font-semibold text-white">
          {submitting ? "Saving..." : "Next"}
        </Text>
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
=======
  const [category, setCategory] = useState("");
  const [role, setRole] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [roleQuery, setRoleQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<PickedImage | null>(null);
  const [driverLicense, setDriverLicense] = useState<PickedDoc | null>(null);
  const [ninSlip, setNinSlip] = useState<PickedDoc | null>(null);

  const filteredCategories = useMemo(
    () => CATEGORIES.filter((item) => item.toLowerCase().includes(categoryQuery.toLowerCase())),
    [categoryQuery]
  );
  const filteredRoles = useMemo(
    () => ROLES.filter((item) => item.toLowerCase().includes(roleQuery.toLowerCase())),
    [roleQuery]
  );

  const pickDoc = async (setter: (doc: PickedDoc) => void) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;
    const file = result.assets?.[0];
    if (!file) return;

    setter({
      name: file.name,
      uri: file.uri,
      mimeType: file.mimeType,
      size: file.size,
    });
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset) return;

    setProfilePhoto({
      name: asset.fileName ?? "profile-photo",
      uri: asset.uri,
      mimeType: asset.mimeType,
      size: asset.fileSize,
    });
  };

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

      <View className="mt-6 gap-4">
        <View>
          <Pressable
            className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-4"
            onPress={() => {
              setShowCategories((prev) => !prev);
              setShowRoles(false);
            }}
          >
            <Text className={`text-sm ${category ? "text-gray-700" : "text-gray-500"}`}>
              {category || "Search or Select Job Title"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#6B7280" />
          </Pressable>
          {showCategories ? (
            <View className="mt-2 rounded-lg border border-gray-200 bg-white">
              <TextInput
                value={categoryQuery}
                onChangeText={setCategoryQuery}
                placeholder="Search job titles"
                className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700"
              />
              {filteredCategories.map((item) => (
                <Pressable
                  key={item}
                  className="px-4 py-3"
                  onPress={() => {
                    setCategory(item);
                    if (item !== "Transport & Logistics") {
                      setRole("");
                      setRoleQuery("");
                      setShowRoles(false);
                    }
                    setShowCategories(false);
                  }}
                >
                  <Text className="text-sm text-gray-700">{item}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        {category === "Transport & Logistics" ? (
          <View>
            <Pressable
              className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-gray-100 px-4 py-4"
              onPress={() => {
                setShowRoles((prev) => !prev);
                setShowCategories(false);
              }}
            >
              <Text className={`text-sm ${role ? "text-gray-700" : "text-gray-500"}`}>
                {role || "I want to join as"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" />
            </Pressable>
            {showRoles ? (
              <View className="mt-2 rounded-lg border border-gray-200 bg-white">
                <TextInput
                  value={roleQuery}
                  onChangeText={setRoleQuery}
                  placeholder="Search or select role"
                  className="border-b border-gray-200 px-4 py-3 text-sm text-gray-700"
                />
                {filteredRoles.map((item) => (
                  <Pressable
                    key={item}
                    className="px-4 py-3"
                    onPress={() => {
                      setRole(item);
                      setShowRoles(false);
                    }}
                  >
                    <Text className="text-sm text-gray-700">{item}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        <View className="mt-4">
          <Text className="text-sm font-semibold text-gray-900">Driver Information</Text>
          <Text className="mt-1 text-xs text-gray-500">
            Your information and license will be kept private
          </Text>
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Driver&apos;s license number</Text>
          <TextInput
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            placeholder="Driver's license number"
            className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <UploadBlock
          title="Driver's profile photo"
          subtitle="Please provide a clear portrait picture of yourself. It should show your full face, front view, with eyes open. No filters, sunglasses or masks."
          selected={!!profilePhoto}
          fileName={profilePhoto?.name}
          onPress={pickImage}
        />

        <UploadBlock
          title="Driver's license"
          subtitle="Please provide a clear driver's license showing the license number, your name, and date of birth."
          selected={!!driverLicense}
          fileName={driverLicense?.name}
          onPress={() => pickDoc(setDriverLicense)}
        />

        <UploadBlock
          title="NIN Slip"
          subtitle="Kindly upload a picture of your NIN slip. Ensure all details are readable."
          selected={!!ninSlip}
          fileName={ninSlip?.name}
          onPress={() => pickDoc(setNinSlip)}
        />
      </View>

        <Pressable
          className="mt-8 rounded-md bg-[#005823CC] py-4"
          onPress={() => {
            if (category === "Transport & Logistics") {
              router.push("/(auth)/(serviceProvider)/vehicle-information");
              return;
            }
            router.push("/(auth)/(serviceProvider)/bank-account");
          }}
        >
          <Text className="text-center font-semibold text-white">Next</Text>
        </Pressable>
    </ScrollView>
>>>>>>> ef432b9 (Update service provider verify skill flow and add vehicle info)
  );
}
