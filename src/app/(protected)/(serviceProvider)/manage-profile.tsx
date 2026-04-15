import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { toDisplayName } from "@/lib/display-name";
import { useAuthStore } from "@/store/auth";

const chips = ["5km", "10km", "15km", "20km", "Custom"] as const;

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
          <Field label="Full Name" value={displayName} />
          <Field label="Phone number" value="+234 812 909 3873" keyboardType="phone-pad" />
          <Field label="Email Address" value={email ?? "philcrook00@gmail.com"} keyboardType="email-address" />
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

        <View className="mt-3">
          <Text className="mb-1.5 text-[10px] font-medium text-[#8A8F99]">Work coverage radius</Text>
          <View className="flex-row items-center gap-1.5">
            {chips.map((chip, index) => {
              const selected = index === 0;
              return (
                <View
                  key={chip}
                  className={`rounded-full px-2.5 py-1 ${selected ? "bg-[#0F7A3A]" : "bg-[#EEF0EC]"}`}
                >
                  <Text className={`text-[9px] font-semibold ${selected ? "text-white" : "text-[#69707A]"}`}>{chip}</Text>
                </View>
              );
            })}
          </View>

          <View className="mt-2">
            <View className="h-1 w-full rounded-full bg-[#E7E9E3]">
              <View className="h-1 rounded-full bg-[#0F7A3A]" style={{ width: "8%" }} />
            </View>
            <View className="mt-1 flex-row justify-between">
              <Text className="text-[8px] text-[#9CA3AF]">1km</Text>
              <Text className="text-[8px] text-[#0F7A3A]">3km</Text>
              <Text className="text-[8px] text-[#9CA3AF]">50km</Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-start">
            <View className="mt-[2px] h-3 w-3 rounded-[3px] border border-[#C6CBD1] bg-white" />
            <View className="ml-2 flex-1">
              <Text className="text-[10px] text-[#69707A]">Allow bookings outside my coverage area</Text>
              <Text className="mt-0.5 text-[8.5px] text-[#A0A5AE]">
                You will receive requests from clients beyond your preferred radius.
              </Text>
            </View>
          </View>
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
}: {
  label: string;
  value: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean;
  styleClassName?: string;
}) {
  return (
    <View>
      <Text className="mb-1 text-[10px] font-medium text-[#8A8F99]">{label}</Text>
      <TextInput
        defaultValue={value}
        keyboardType={keyboardType ?? "default"}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className={`h-10 rounded-md border border-[#E7E8EA] bg-[#F5F5F5] px-3 text-[12px] text-[#4A505A] ${styleClassName ?? ""}`}
        style={multiline ? { paddingTop: 8, paddingBottom: 8 } : { paddingVertical: 0 }}
      />
    </View>
  );
}
