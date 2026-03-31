import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { apiRequest } from "@/lib/api";
import { uploadFile } from "@/lib/upload";

type PickedImage = { name: string; uri: string; mimeType?: string; size?: number; remoteUrl?: string };

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
    <View className="mt-4">
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

export default function VehicleInformation() {
  const router = useRouter();
  const { category, role, driverLicenseNumber } = useLocalSearchParams<{
    category?: string;
    role?: string;
    driverLicenseNumber?: string;
  }>();
  const [productionYear, setProductionYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [exteriorPhoto, setExteriorPhoto] = useState<PickedImage | null>(null);
  const [interiorPhoto, setInteriorPhoto] = useState<PickedImage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const serviceName = useMemo(() => (role || category || "").toString(), [role, category]);

  const pickImage = async (setter: (image: PickedImage) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Toast.show({
        type: "error",
        text1: "Permission required",
        text2: "Please allow access to your photos.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsEditing: true,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset) return;

    const picked = {
      name: asset.fileName ?? "vehicle-photo",
      uri: asset.uri,
      mimeType: asset.mimeType,
      size: asset.fileSize,
    };
    setter(picked);

    try {
      const response = await uploadFile("work_visuals", picked);
      setter({ ...picked, remoteUrl: response?.file?.url });
      Toast.show({ type: "success", text1: "Upload complete" });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Upload failed",
        text2: err instanceof Error ? err.message : "Unable to upload image.",
      });
    }
  };

  const handleSubmit = async () => {
    if (!serviceName) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please return and select your job title.",
      });
      return;
    }
    if (!productionYear.trim() || !vehicleModel.trim() || !licensePlate.trim() || !vehicleColor.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Please complete all vehicle fields.",
      });
      return;
    }
    if (!exteriorPhoto?.remoteUrl || !interiorPhoto?.remoteUrl) {
      Toast.show({
        type: "error",
        text1: "Missing uploads",
        text2: "Please upload both exterior and interior photos.",
      });
      return;
    }

    const payload = {
      job: [
        {
          service: serviceName,
          title: category ?? serviceName,
          tagLine: role ? `${role} service` : "Experienced provider",
          startingPrice: "0",
        },
      ],
      service: [
        {
          serviceName,
          pricingModel: "fixed",
          price: "0",
        },
      ],
      ...(driverLicenseNumber ? { driverLicenseNumber } : {}),
      vehicleProductionYear: productionYear.trim(),
      vehicleColor: vehicleColor.trim(),
      vehicleRegNo: licensePlate.trim(),
      vehicleName: vehicleModel.trim(),
    };

    try {
      setSubmitting(true);
      await apiRequest("/provider/job-service", {
        method: "POST",
        json: payload,
      });
      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Vehicle information updated.",
      });
      router.push("/(auth)/(serviceProvider)/bank-account");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Unable to save vehicle details.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-8">
        <View className="mb-6">
          <ProgressBar step={4} total={5} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Vehicle Information</Text>
        <Text className="mt-2 text-base text-gray-600">
          Complete your verification to build trust with customers and access more features.
        </Text>
      </View>

      <View className="mt-6 gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Vehicle production year</Text>
          <TextInput
            value={productionYear}
            onChangeText={setProductionYear}
            placeholder="Vehicle production year"
            keyboardType="number-pad"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Vehicle model</Text>
          <TextInput
            value={vehicleModel}
            onChangeText={setVehicleModel}
            placeholder="Vehicle model"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">License plate</Text>
          <TextInput
            value={licensePlate}
            onChangeText={setLicensePlate}
            placeholder="License plate"
            autoCapitalize="characters"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Vehicle color</Text>
          <TextInput
            value={vehicleColor}
            onChangeText={setVehicleColor}
            placeholder="Vehicle color"
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <UploadBlock
        title="Exterior photo of your vehicle"
        subtitle="Upload a clear exterior photo that captures the plate number."
        selected={!!exteriorPhoto}
        fileName={exteriorPhoto?.name}
        onPress={() => pickImage(setExteriorPhoto)}
      />

      <UploadBlock
        title="Interior photo of your vehicle"
        subtitle="Provide a clear interior photo of your vehicle."
        selected={!!interiorPhoto}
        fileName={interiorPhoto?.name}
        onPress={() => pickImage(setInteriorPhoto)}
      />

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
  );
}
