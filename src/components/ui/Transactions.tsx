import { View, Text ,Image} from 'react-native'
import React from 'react'

export default function Transactions() {
  return (
    <View className="mt-3 gap-3">
                <View className="flex-row items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                  <Image source={require("../../../assets/ready.png")} className="h-6 w-6" />
                  <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-900">Kitchen Renovation</Text>
                    <Text className="text-[10px] text-gray-400">Oct 28, 2025</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs font-semibold text-red-500">-N64,000</Text>
                    <Text className="text-[10px] text-gray-400">Successful</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                  <Image source={require("../../../assets/pending.png")} className="h-6 w-6" />
                  <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-900">Bathroom Upgrade</Text>
                    <Text className="text-[10px] text-gray-400">Nov 5, 2025</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs font-semibold text-red-500">-N45,000</Text>
                    <Text className="text-[10px] text-gray-400">Completed</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                  <Image source={require("../../../assets/greenCheckbox.png")} className="h-6 w-6" />
                  <View className="flex-1">
                    <Text className="text-xs font-semibold text-gray-900">Wallet top up</Text>
                    <Text className="text-[10px] text-gray-400">Dec 12, 2025</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs font-semibold text-green-600">+N64,000</Text>
                    <Text className="text-[10px] text-gray-400">Completed</Text>
                  </View>
                </View>
              </View>
  )
}