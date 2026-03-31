import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

const threads = [
  {
    id: "stephen",
    name: "Stephen Gerrad",
    preview: "Thanks for the great work!",
    time: "1h ago",
    online: true,
  },
];

export default function MessageList() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="px-5 pt-6">
        <View className="flex-row items-center justify-center">
          <Text className="text-base font-semibold text-[#231F20]">Messages</Text>
        </View>

        <View className="mt-4 flex-row items-center rounded-full border border-[#E6E6E6] bg-[#F7F7F7] px-3 py-2">
          <Ionicons name="search-outline" size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            className="ml-2 flex-1 text-sm text-[#231F20]"
          />
        </View>
      </View>

      <ScrollView className="mt-4 flex-1 px-4">
        {threads.map((thread) => (
          <Pressable
            key={thread.id}
            className="flex-row items-center justify-between rounded-lg px-4"
            style={{
              width: "100%",
              maxWidth: 345,
              height: 72,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: "#E6E6E6",
              alignSelf: "center",
            }}
            onPress={() => router.push(`/(protected)/(serviceProvider)/(tabs)/message/${thread.id}`)}
          >
            <View className="flex-row items-center gap-3">
              <View className="relative h-10 w-10 items-center justify-center rounded-full bg-[#E6F4EA]">
                <Text className="text-sm font-semibold text-[#0F7A3A]">
                  {thread.name.charAt(0)}
                </Text>
                {thread.online && (
                  <View className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#0F7A3A]" />
                )}
              </View>
              <View>
                <Text className="text-sm font-semibold text-[#231F20]">{thread.name}</Text>
                <Text className="text-xs text-[#6B7280]">{thread.preview}</Text>
              </View>
            </View>
            <Text className="text-xs text-[#9CA3AF]">{thread.time}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
