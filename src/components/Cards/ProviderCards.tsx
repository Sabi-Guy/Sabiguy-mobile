import { View, Text, Image ,TouchableOpacity} from "react-native";
import React from "react";

import avatar from "../../../assets/avatar.png";
import heart from "../../../assets/heart.png";

export default function ProviderCards() {
  return (
    <TouchableOpacity className="bg-white rounded-2xl px-4 py-3 flex-row items-center shadow-sm relative">
      <Image source={avatar} className="h-12 w-12 rounded-md" />

      <View className="flex-1 ml-3">
        <Text className="text-sm font-semibold text-gray-900">Marcus Johnson</Text>
        <Text className="text-xs text-gray-500">Electrician</Text>
        <View className="mt-1 flex-row items-center">
          <Text className="text-xs text-yellow-500">★</Text>
          <Text className="text-xs text-gray-700 ml-1">4.5 (82 reviews)</Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1">2.3 miles away</Text>
      </View>

      <View className="items-end ">
        <TouchableOpacity>
          <Image source={heart} className="w-4 h-4 mb-6" />
        </TouchableOpacity>
        <Text className="text-[10px] text-gray-400">Starting</Text>
        <Text className="text-sm text-green-700 font-semibold">₦40,000</Text>
      </View>
    </TouchableOpacity>
  );
}

