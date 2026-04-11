import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import SearchBar from "@/components/SearchBar";
import Messages from "@/components/messages";
import { useRouter } from "expo-router";

export default function Message() {
  const router = useRouter();
  const data = useMemo(
    () => [
      {
        id: "phil-crook",
        name: "Phil Crook",
        preview: "Thanks for the great work!",
        time: "1h ago",
        avatar: require("../../../../../../assets/avatar.png"),
      },
      {
        id: "john-doe",
        name: "John Doe",
        preview: "Hey, how are you doing?",
        time: "10:30 AM",
        avatar: require("../../../../../../assets/avatar.png"),
      },
      {
        id: "sarah-jones",
        name: "Sarah Jones",
        preview: "Got it, I will follow up shortly.",
        time: "Yesterday",
        avatar: require("../../../../../../assets/avatar.png"),
      },
    ],
    []
  );

  return (
    <ScrollView className="flex-1 p-5 bg-white ">
      <SearchBar placeholder="Search " />
      <View className="mt-10 gap-2">
        {data.map((item) => (
          <Messages
            key={item.id}
            name={item.name}
            preview={item.preview}
            time={item.time}
            avatar={item.avatar}
            onPress={() =>
              router.push({
                pathname: "/(protected)/(serviceUser)/(tabs)/(message)/" + item.id,
                params: {
                  name: item.name,
                  preview: item.preview,
                  time: item.time,
                },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}