import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import BackButton from "@/components/BackButton";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { changePassword } from "@/lib/auth";
import { useAuthStore } from "@/store/auth";

export default function UserPassword() {
	const token = useAuthStore((state) => state.token);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleChangePassword = async () => {
		if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
			Toast.show({ type: "error", text1: "Please fill in all fields" });
			return;
		}

		if (newPassword !== confirmPassword) {
			Toast.show({ type: "error", text1: "Passwords do not match" });
			return;
		}

		if (!token) {
			Toast.show({ type: "error", text1: "Please log in again" });
			return;
		}

		setIsSubmitting(true);
		try {
			await changePassword(
				{ oldPassword: currentPassword.trim(), newPassword: newPassword.trim() },
				token
			);
			Toast.show({ type: "success", text1: "Password updated" });
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Change password failed";
			Toast.show({ type: "error", text1: message });
		} finally {
			setIsSubmitting(false);
		}
	};

	const canSubmit =
		!isSubmitting &&
		currentPassword.trim().length > 0 &&
		newPassword.trim().length > 0 &&
		confirmPassword.trim().length > 0;

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
						<View className="relative">
							<TextInput
								placeholder="Enter current password"
								placeholderTextColor="#9CA3AF"
								secureTextEntry={!showCurrentPassword}
								value={currentPassword}
								onChangeText={setCurrentPassword}
								className="mt-2 rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900"
							/>
							<Pressable
								className="absolute right-4 top-1/2 -translate-y-1/2"
								onPress={() => setShowCurrentPassword((previous) => !previous)}
							>
								<Ionicons
									name={showCurrentPassword ? "eye-off" : "eye"}
									size={20}
									color="#005823CC"
								/>
							</Pressable>
						</View>
					</View>
					<View>
						<Text className="text-xs font-medium text-gray-600">New password</Text>
						<View className="relative">
							<TextInput
								placeholder="Enter new password"
								placeholderTextColor="#9CA3AF"
								secureTextEntry={!showNewPassword}
								value={newPassword}
								onChangeText={setNewPassword}
								className="mt-2 rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900"
							/>
							<Pressable
								className="absolute right-4 top-1/2 -translate-y-1/2"
								onPress={() => setShowNewPassword((previous) => !previous)}
							>
								<Ionicons
									name={showNewPassword ? "eye-off" : "eye"}
									size={20}
									color="#005823CC"
								/>
							</Pressable>
						</View>
					</View>
					<View>
						<Text className="text-xs font-medium text-gray-600">Confirm new password</Text>
						<View className="relative">
							<TextInput
								placeholder="Confirm new password"
								placeholderTextColor="#9CA3AF"
								secureTextEntry={!showConfirmPassword}
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								className="mt-2 rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900"
							/>
							<Pressable
								className="absolute right-4 top-1/2 -translate-y-1/2"
								onPress={() => setShowConfirmPassword((previous) => !previous)}
							>
								<Ionicons
									name={showConfirmPassword ? "eye-off" : "eye"}
									size={20}
									color="#005823CC"
								/>
							</Pressable>
						</View>
					</View>
					<Pressable
						className={`mt-2 rounded-xl px-4 py-3 ${canSubmit ? "bg-[#005823CC]" : "bg-[#9CA3AF]"}`}
						disabled={!canSubmit}
						onPress={handleChangePassword}
					>
						{isSubmitting ? (
							<ActivityIndicator color="#FFFFFF" size="small" />
						) : (
							<Text className="text-center text-sm font-semibold text-white">Update Password</Text>
						)}
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
}
