import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { toDisplayName } from "@/lib/display-name";
import { useAuthStore } from "@/store/auth";

export default function ManageProfileScreen() {
  const router = useRouter();
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const displayName = useMemo(() => (name?.trim() ? name.trim() : toDisplayName(email)), [name, email]);

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="bg-white px-4 pb-3 pt-6">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <Text className="text-[12px] font-medium text-[#0F7A3A]">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text className="text-[12px] font-semibold text-[#0F7A3A]">Done</Text>
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
          <Field label="Full Name" value={displayName} editable={false} />
          <Field label="Phone number" value="+234 812 909 3873" keyboardType="phone-pad" />
          <Field
            label="Email Address"
            value={email ?? "philcrook00@gmail.com"}
            keyboardType="email-address"
            editable={false}
          />
          <Field label="Gender" value="Male" />
          <Field label="Address" value="123, Palm Avenue" />

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Field label="City" value="Ikorodu" />
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
}: {
  label: string;
  value: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean;
  styleClassName?: string;
  editable?: boolean;
}) {
  return (
    <View>
      <Text className="mb-1 text-[10px] font-medium text-[#8A8F99]">{label}</Text>
      <TextInput
        defaultValue={value}
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
