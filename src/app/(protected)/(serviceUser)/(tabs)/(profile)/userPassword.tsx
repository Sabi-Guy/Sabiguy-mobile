import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import BackButton from "@/components/BackButton";

export default function UserPassword() {
	return (
		<View className="flex-1 bg-white">
			<View className="flex-row items-center px-5 pb-3 pt-6">
				<BackButton variant="inline" />
				<Text className="ml-2 text-base font-semibold text-gray-900">Password</Text>
			</View>
			<ScrollView
				className="flex-1 px-5"
				contentContainerStyle={{ paddingBottom: 28 }}
				showsVerticalScrollIndicator={false}
			>
				<View className="mt-2 gap-4">
					<View>
						<Text className="text-xs font-medium text-gray-600">Current password</Text>
						<TextInput
							placeholder="Enter current password"
							placeholderTextColor="#9CA3AF"
							secureTextEntry
							className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900"
						/>
					</View>
					<View>
						<Text className="text-xs font-medium text-gray-600">New password</Text>
						<TextInput
							placeholder="Enter new password"
							placeholderTextColor="#9CA3AF"
							secureTextEntry
							className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900"
						/>
					</View>
					<View>
						<Text className="text-xs font-medium text-gray-600">Confirm new password</Text>
						<TextInput
							placeholder="Confirm new password"
							placeholderTextColor="#9CA3AF"
							secureTextEntry
							className="mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900"
						/>
					</View>
					<View className="mt-2 rounded-xl bg-[#005823CC] px-4 py-3">
						<Text className="text-center text-sm font-semibold text-white">Update Password</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
