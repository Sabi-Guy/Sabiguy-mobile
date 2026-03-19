import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import * as ImagePicker from "expo-image-picker";

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
  const [productionYear, setProductionYear] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [exteriorPhoto, setExteriorPhoto] = useState<PickedImage | null>(null);
  const [interiorPhoto, setInteriorPhoto] = useState<PickedImage | null>(null);

  const pickImage = async (setter: (image: PickedImage) => void) => {
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

    setter({
      name: asset.fileName ?? "vehicle-photo",
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
        className="mt-8 rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(auth)/(serviceProvider)/bank-account")}
      >
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </ScrollView>
  );
}
