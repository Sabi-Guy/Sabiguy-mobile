import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import map from "../../../../../../assets/map.png";
import cancel from "../../../../../../assets/cancel.png";
import { useRouter } from "expo-router";

export default function location() {
  const router = useRouter()
  return (
    <ScrollView className="p-5">
      <View className="flex-row justify-between mb-5 items-center">
        <Text>Service Location</Text>
        <TouchableOpacity onPress={router.back}>
          <Image source={cancel} className="h-5 w-5" />
        </TouchableOpacity>
      </View>
      <SearchBar placeholder="Enter new Address" />
      <TouchableOpacity>
        <View
          className="flex-row gap-2 mt-5 p-3 rounded-lg items-center"
          style={{ backgroundColor: "#231F201A" }}
        >
          <Image source={map} className="h-[100%] w-auto " />
          <Text className="text-[#005823]">Use your current location</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
