import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

type AccountKind = "individual" | "business";
type UploadDoc = { title: string; subtitle: string };
type BusinessField = { label: string; placeholder: string };
type PickedDoc = { name: string; uri: string; mimeType?: string; size?: number };

const INDIVIDUAL_DOCS: UploadDoc[] = [
  {
    title: "NIN Slip",
    subtitle: "Upload a picture of your NIN slip (make sure all details are readable)",
  },
];

const BUSINESS_FIELDS: BusinessField[] = [
  { label: "Registered Business Name", placeholder: "Enter the exact name on your CAC certificate" },
  { label: "CAC Registration Number", placeholder: "e.g BN1234567" },
  { label: "Business Address", placeholder: "Enter business address" },
];

const BUSINESS_DOCS: UploadDoc[] = [
  {
    title: "CAC Certificate",
    subtitle: "Kindly upload a picture of your CAC Certificate (make sure all details are readable)",
  },
  {
    title: "NIN Slip",
    subtitle: "Upload a picture of your NIN slip (make sure all details are readable)",
  },
];

function AccountOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`flex-row items-center gap-3 rounded-lg border px-4 py-3 ${
        selected ? "border-[#005823CC] bg-[#005823CC]" : "border-gray-200 bg-gray-100"
      }`}
      onPress={onPress}
    >
      <View
        className={`h-4 w-4 items-center justify-center rounded-full border ${
          selected ? "border-white" : "border-gray-400"
        }`}
      >
        {selected ? <Ionicons name="checkmark" size={10} color="#F7E27A" /> : null}
      </View>
      <Text className={`text-sm font-medium ${selected ? "text-white" : "text-gray-700"}`}>
        {label}
      </Text>
    </Pressable>
  );
}

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

export default function AccountType() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountKind>("individual");
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, PickedDoc | undefined>>({});

  const pickDoc = async (key: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;
    const file = result.assets?.[0];
    if (!file) return;

    setUploadedDocs((prev) => ({
      ...prev,
      [key]: {
        name: file.name,
        uri: file.uri,
        mimeType: file.mimeType,
        size: file.size,
      },
    }));
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-8">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Account Type</Text>
        <Text className="mt-2 text-base text-gray-600">
          We require this to make your profile setup easier
        </Text>
      </View>

      <View className="mt-6 gap-3">
        <AccountOption
          label="Individual"
          selected={accountType === "individual"}
          onPress={() => setAccountType("individual")}
        />
        <AccountOption
          label="Business"
          selected={accountType === "business"}
          onPress={() => setAccountType("business")}
        />
      </View>

      {accountType === "individual" ? (
        <View className="mt-6">
          <Text className="text-sm font-semibold text-gray-800">Upload required documents</Text>
          {INDIVIDUAL_DOCS.map((doc) => (
            <UploadBlock
              key={doc.title}
              title={doc.title}
              subtitle={doc.subtitle}
              selected={!!uploadedDocs[`individual-${doc.title}`]}
              fileName={uploadedDocs[`individual-${doc.title}`]?.name}
              onPress={() => pickDoc(`individual-${doc.title}`)}
            />
          ))}
        </View>
      ) : (
        <View className="mt-6 gap-4">
          {BUSINESS_FIELDS.map((field) => (
            <View key={field.label}>
              <Text className="mb-2 text-sm font-medium text-gray-700">{field.label}</Text>
              <TextInput
                placeholder={field.placeholder}
                className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm"
              />
            </View>
          ))}
          <View>
            <Text className="text-sm font-semibold text-gray-800">Upload required documents</Text>
            {BUSINESS_DOCS.map((doc) => (
              <UploadBlock
                key={doc.title}
                title={doc.title}
                subtitle={doc.subtitle}
                selected={!!uploadedDocs[`business-${doc.title}`]}
                fileName={uploadedDocs[`business-${doc.title}`]?.name}
                onPress={() => pickDoc(`business-${doc.title}`)}
              />
            ))}
          </View>
        </View>
      )}

      <Pressable
        className="mt-8 rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(auth)/(serviceProvider)/face-capture")}
      >
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </ScrollView>
  );
}
