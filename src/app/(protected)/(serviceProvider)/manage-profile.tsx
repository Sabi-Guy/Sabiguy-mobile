import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { toDisplayName } from "@/lib/display-name";
import {
  getCachedProviderProfile,
  setCachedProviderProfile,
  updateProviderProfile,
} from "@/lib/provider-profile";
import { useAuthStore } from "@/store/auth";

export default function ManageProfileScreen() {
  const router = useRouter();
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const displayName = useMemo(() => (name?.trim() ? name.trim() : toDisplayName(email)), [name, email]);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const result = await getCachedProviderProfile();
        if (!active) return;

        setGender(result?.gender?.trim() ?? "");
        setAddress(result?.address?.trim() ?? "");
        setCity(result?.city?.trim() ?? "");
        setPhoneNumber(result?.phoneNumber?.trim() ?? "");
      } catch (err) {
        if (!active) return;
        Toast.show({
          type: "error",
          text1: "Could not load profile",
          text2: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        if (active) {
          setLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    const normalizedGender = gender.trim().toLowerCase();
    const normalizedCity = city.trim();
    const normalizedAddress = address.trim();
    if (!normalizedGender || !normalizedCity || !normalizedAddress) {
      Toast.show({
        type: "error",
        text1: "Missing details",
        text2: "Gender, city, and address are required.",
      });
      return;
    }

    try {
      setSaving(true);
      const result = await updateProviderProfile({
        gender: normalizedGender,
        city: normalizedCity,
        address: normalizedAddress,
      });
      await setCachedProviderProfile({
        gender: result?.data?.gender ?? normalizedGender,
        city: result?.data?.city ?? normalizedCity,
        address: result?.data?.address ?? normalizedAddress,
        phoneNumber: result?.data?.phoneNumber ?? phoneNumber,
      });

      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile information was saved.",
      });
      router.back();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="bg-white px-4 pb-3 pt-6">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <Text className="text-[12px] font-medium text-[#0F7A3A]">Cancel</Text>
          </Pressable>
          <Pressable onPress={handleSave} disabled={saving || loadingProfile}>
            <Text className="text-[12px] font-semibold text-[#0F7A3A]">
              {saving ? "Saving..." : "Done"}
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 10, paddingBottom: 32 }}
      >
        <View className="items-center">
          <View className="relative">
            <Image source={require("../../../../assets/avatar.png")} className="h-16 w-16 rounded-full" resizeMode="cover" />
            <View className="absolute -bottom-0.5 -right-1 h-5 w-5 items-center justify-center rounded-full bg-[#27AE60]">
              <Ionicons name="camera-outline" size={10} color="#FFFFFF" />
            </View>
          </View>
          <Text className="mt-2 text-[12px] font-semibold text-[#0F7A3A]">Set new photo</Text>
        </View>

        <View className="mt-3 gap-2.5">
          <Field label="Full Name" value={displayName} />
          <Field
            label="Phone number"
            value={phoneNumber}
            keyboardType="phone-pad"
            editable={false}
          />
          <Field
            label="Email Address"
            value={email ?? "philcrook00@gmail.com"}
            keyboardType="email-address"
            editable={false}
          />
          <Field label="Gender" value={gender} onChangeText={setGender} editable={!loadingProfile} />
          <Field
            label="Address"
            value={address}
            onChangeText={setAddress}
            editable={!loadingProfile}
          />

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Field label="City" value={city} onChangeText={setCity} editable={!loadingProfile} />
            </View>
            <View className="flex-1">
              <Field label="State" value="Lagos" />
            </View>
          </View>

          <Field
            label="Bio"
            value="Professional service provider with 5+ years of experience."
            multiline
            styleClassName="h-[72px] pt-2"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Field({
  label,
  value,
  keyboardType,
  multiline,
  styleClassName,
  editable = true,
  onChangeText,
}: {
  label: string;
  value: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean;
  styleClassName?: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View>
      <Text className="mb-1 text-[10px] font-medium text-[#8A8F99]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
        editable={editable}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className={`h-10 rounded-md border border-[#E7E8EA] bg-[#F5F5F5] px-3 text-[12px] text-[#4A505A] ${styleClassName ?? ""}`}
        style={multiline ? { paddingTop: 8, paddingBottom: 8 } : { paddingVertical: 0 }}
      />
    </View>
  );
}
