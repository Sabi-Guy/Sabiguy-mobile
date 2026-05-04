import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native";

const quickReplies = [
  "How do I accept a booking?",
  "How do I manage my availability?",
  "How do I receive payments?",
  "How do I cancel a booking?",
  "How do I update my profile?",
];

const botReplies: Record<string, string> = {
  "How do I accept a booking?": "Open Hire Alerts, review request details, and tap Accept to confirm the booking.",
  "How do I manage my availability?": "Use the availability toggle on your dashboard header to go online or offline anytime.",
  "How do I receive payments?": "Completed jobs are credited to your wallet balance, and you can withdraw from the Wallet screen.",
  "How do I cancel a booking?": "Open the active job, choose Cancel Request, then provide a cancellation reason.",
  "How do I update my profile?": "Go to Profile, open Manage Profile, update your details, and save changes.",
};

type ChatMessage = {
  id: string;
  text: string;
  from: "bot" | "user";
};

export default function SupportChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showHumanCard, setShowHumanCard] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const openWhatsApp = async () => {
    const phone = "2348167783930";
    const text = encodeURIComponent("Hi SabiGuy team, I need help from a human agent.");
    await Linking.openURL(`https://wa.me/${phone}?text=${text}`);
  };

  const handleQuickReply = (question: string) => {
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      text: question,
      from: "user",
    };
    const botMessage: ChatMessage = {
      id: `${Date.now()}-bot`,
      text: botReplies[question] ?? "Thanks for your message. A support agent will assist you shortly.",
      from: "bot",
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]">
      <View className="border-b border-[#E8EBEF] bg-white">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="h-8 w-8 items-center justify-center">
            <MaterialCommunityIcons name="robot-outline" size={22} color="#243B53" />
          </View>
          <Text className="flex-1 px-2 text-center text-[15px] font-semibold text-[#243B53]">
            SabiBot (Your Friendly Chat Bot)
          </Text>
          <Pressable onPress={() => router.back()} className="h-8 w-8 items-center justify-center">
            <Ionicons name="close" size={28} color="#243B53" />
          </Pressable>
        </View>
        <View className="h-1 bg-[#10B981]" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
        <View className="flex-row items-end gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#10B981]">
            <MaterialCommunityIcons name="robot-outline" size={22} color="#FFFFFF" />
          </View>
          <View className="flex-1 rounded-3xl border border-[#E5E7EB] bg-white px-4 py-4">
            <View className="flex-row items-center gap-2">
              <Ionicons name="sparkles-outline" size={16} color="#10B981" />
              <Text className="text-[18px] font-semibold text-[#1F2937]">Hi there! I'm SabiBot 👋</Text>
            </View>
            <Text className="mt-2 text-[14px] text-[#667085]">What do you need help with?</Text>

            <View className="mt-3 gap-2.5">
              {quickReplies.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => handleQuickReply(item)}
                  className="self-start rounded-full border border-[#96E2BF] bg-[#EAF9F1] px-4 py-2.5"
                >
                  <Text className="text-[12px] font-medium text-[#0B7A56]">{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {messages.length > 0 && (
          <View className="mt-4 gap-2">
            {messages.map((item) => (
              <View key={item.id} className={item.from === "user" ? "items-end" : "items-start"}>
                <View
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    item.from === "user" ? "bg-[#EAF9F1]" : "bg-white border border-[#E5E7EB]"
                  }`}
                >
                  <Text className="text-[12px] text-[#1F2937]">{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      {showHumanCard && (
        <View className="mx-4 mb-3 rounded-2xl bg-[#1FB56B] px-4 py-4">
          <Pressable className="absolute right-3 top-3 h-6 w-6 items-center justify-center" onPress={() => setShowHumanCard(false)}>
            <Ionicons name="close" size={18} color="#D1FAE5" />
          </Pressable>
          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <View className="h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                  <Ionicons name="chatbubble-outline" size={18} color="#E9FFF2" />
                </View>
                <Text className="text-[16px] font-semibold text-white">Talk to a Human Agent</Text>
              </View>
              <Text numberOfLines={1} className="ml-11 mt-1 text-[11px] text-[#D1FAE5]">
                Our support team is ready to help you on WhatsApp.
              </Text>
              <Pressable onPress={openWhatsApp} className="ml-11 mt-3 self-start rounded-full bg-white px-4 py-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="chatbubble-outline" size={14} color="#0F7A3A" />
                  <Text className="text-[12px] font-semibold text-[#0F7A3A]">Open WhatsApp</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View className="border-t border-[#E6E9ED] bg-white px-4 pt-3">
        <View className="flex-row items-center gap-2">
          <View className="flex-1 rounded-full border border-[#D8DDE5] bg-[#F9FAFB] px-4 py-2.5">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor="#98A2B3"
              className="text-[13px] text-[#111827]"
            />
          </View>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-[#B7D6C3]">
            <Ionicons name="paper-plane-outline" size={20} color="#F8FAFC" />
          </Pressable>
        </View>
        <Pressable onPress={() => setShowHumanCard(true)} className="py-3">
          <View className="flex-row items-center justify-center gap-2">
            <Ionicons name="chatbubble-outline" size={14} color={showHumanCard ? "#0F7A3A" : "#98A2B3"} />
            <Text className={`text-center text-[13px] ${showHumanCard ? "text-[#0F7A3A]" : "text-[#98A2B3]"}`}>
              Speak to a human agent
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
