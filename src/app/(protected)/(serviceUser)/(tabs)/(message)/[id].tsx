import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MessageHeader from "@/components/ui/messageHeader";

export const options = {
	headerShown: false,
};

export default function MessageDetail() {
	const { name, preview, time } = useLocalSearchParams<{
		name?: string;
		preview?: string;
		time?: string;
	}>();

	return (
		<View className="flex-1 bg-white">
			<MessageHeader
				name={name ?? "Message"}
				isOnline
				avatar={require("../../../../../../assets/avatar.png")}
			/>

			<ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 24 }}>
				<View className="items-center">
					<View className="rounded-full bg-green-50 px-3 py-1">
						<Text className="text-[10px] text-green-700">Today</Text>
					</View>
				</View>

				<View className="mt-5 flex-row items-end justify-end gap-2">
					<Text className="text-[10px] text-gray-400">4:30 AM</Text>
					<View className="max-w-[75%] rounded-2xl bg-green-100 px-3 py-2">
						<Text className="text-xs text-gray-800">
							I’d like to confirm your availability before booking
						</Text>
					</View>
					<View className="h-6 w-6 items-center justify-center rounded-full bg-green-500">
						<Text className="text-[10px] font-semibold text-white">A</Text>
					</View>
				</View>

				<View className="mt-4 flex-row items-end gap-2">
					<View className="h-6 w-6 items-center justify-center rounded-full bg-pink-500">
						<Text className="text-[10px] font-semibold text-white">W</Text>
					</View>
					<View className="max-w-[75%] rounded-2xl bg-gray-100 px-3 py-2">
						<Text className="text-xs text-gray-800">
							I’d like to confirm your availability before booking
						</Text>
					</View>
					<Text className="text-[10px] text-gray-400">4:30 AM</Text>
				</View>

				<View className="mt-4 flex-row items-end justify-end gap-2">
					<Text className="text-[10px] text-gray-400">4:30 AM</Text>
					<View className="max-w-[75%] rounded-2xl bg-green-100 px-3 py-2">
						<Text className="text-xs text-gray-800">Thanks for the great work!</Text>
					</View>
					<View className="h-6 w-6 items-center justify-center rounded-full bg-green-500">
						<Text className="text-[10px] font-semibold text-white">A</Text>
					</View>
				</View>
			</ScrollView>

			<View className="border-t border-gray-100 px-4 py-3">
				<View className="flex-row items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2">
					<Ionicons name="camera-outline" size={18} color="#6B7280" />
					<TextInput
						placeholder="Type your message"
						placeholderTextColor="#9CA3AF"
						className="flex-1 text-sm text-gray-800"
					/>
					<Ionicons name="send" size={18} color="#0F7A3A" />
				</View>
			</View>
		</View>
	);
}
