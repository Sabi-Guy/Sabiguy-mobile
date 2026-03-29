import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

const messages = [
  {
    id: "1",
    text: "I’d like to confirm your availability before booking",
    time: "4:30 AM",
    inbound: false,
    initial: "A",
  },
  {
    id: "2",
    text: "I’d like to confirm your availability before booking",
    time: "4:30 AM",
    inbound: true,
    initial: "W",
  },
  {
    id: "3",
    text: "Thanks for the great work!",
    time: "4:30 AM",
    inbound: false,
    initial: "A",
  },
];

export default function MessageThread() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-5 pt-6">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()} className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
            <Ionicons name="chevron-back" size={16} color="#231F20" />
          </Pressable>
          <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E6F4EA]">
            <Text className="text-sm font-semibold text-[#0F7A3A]">A</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold text-[#231F20]">Mistura</Text>
            <View className="mt-0.5 flex-row items-center gap-1">
              <View className="h-2 w-2 rounded-full bg-[#0F7A3A]" />
              <Text className="text-xs text-[#6B7280]">Online</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
            <Ionicons name="call-outline" size={16} color="#0F7A3A" />
          </Pressable>
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
            <Ionicons name="ellipsis-vertical" size={16} color="#0F7A3A" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingTop: 24, paddingBottom: 24 }}>
        <View className="items-center">
          <View className="rounded-full bg-[#E6F4EA] px-3 py-1">
            <Text className="text-[10px] font-semibold text-[#0F7A3A]">Today</Text>
          </View>
        </View>

        <View className="mt-6 gap-4">
          {messages.map((message) => (
            <View key={message.id} className={message.inbound ? "items-start" : "items-end"}>
              <View className={`flex-row items-center gap-2 ${message.inbound ? "" : "flex-row-reverse"}`}>
                <View
                  className={`h-5 w-5 items-center justify-center rounded-full ${
                    message.inbound ? "bg-[#F7D6E6]" : "bg-[#E6F4EA]"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-semibold ${
                      message.inbound ? "text-[#B4235A]" : "text-[#0F7A3A]"
                    }`}
                  >
                    {message.initial}
                  </Text>
                </View>
                <View
                  className={`max-w-[78%] rounded-2xl px-4 py-2 ${
                    message.inbound ? "bg-[#F2F3EE]" : "bg-[#E6F4EA]"
                  }`}
                >
                  <Text className="text-xs text-[#231F20]">{message.text}</Text>
                </View>
                <Text className="text-[10px] text-[#9CA3AF]">{message.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="border-t border-[#E6E6E6] px-5 py-3">
        <View className="flex-row items-center gap-3 rounded-full border border-[#E6E6E6] bg-white px-4 py-2">
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2F3EE]">
            <Ionicons name="camera-outline" size={16} color="#0F7A3A" />
          </Pressable>
          <TextInput
            placeholder="Type your message"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-sm text-[#231F20]"
          />
          <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#0F7A3A]">
            <Ionicons name="send" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
