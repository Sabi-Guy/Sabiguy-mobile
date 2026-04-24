import React, { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

export default function RideRating() {
	const [rating, setRating] = useState(0);
	const [tip, setTip] = useState<string>("N500");
	const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">("wallet");
	const [experience, setExperience] = useState("");
	const [showThankYou, setShowThankYou] = useState(false);
    
    const router = useRouter()

	const tips = ["N500", "N1,000", "N2,000", "Custom"];

	return (
		<View className="flex-1 bg-[#F4F4F5] px-4 pb-4 pt-11">
			<View className="flex-1 rounded-[22px] bg-white px-4 pb-4 pt-3">
				<View className="flex-row items-center">
					<View className="h-7 w-7" />
					<BackButton variant="inline"/>
					<Text className="flex-1 text-center text-[12px] font-semibold text-[#111827]">
						Rate Rider
					</Text>
					<View className="h-7 w-7" />
				</View>

				<View className="mt-6 items-center">
					<View className="h-14 w-14 rounded-full bg-[#E5E7EB]" />
					<Text className="mt-2 text-[14px] font-semibold text-[#111827]">Marcus Johnson</Text>
					<Text className="text-[11px] text-[#6B7280]">Package Delivery</Text>
				</View>

				<View className="mt-4 flex-row items-center justify-center gap-1">
					{[1, 2, 3, 4, 5].map((star) => (
						<Pressable key={star} onPress={() => setRating(star)}>
							<Ionicons
								name={rating >= star ? "star" : "star-outline"}
								size={24}
								color={rating >= star ? "#F59E0B" : "#D1D5DB"}
							/>
						</Pressable>
					))}
				</View>

				<View className="mt-6">
					<Text className="text-[12px] text-[#111827]">
						Tell us how it went <Text className="text-[#9CA3AF]">(optional)</Text>
					</Text>
					<TextInput
						value={experience}
						onChangeText={setExperience}
						placeholder="Share your experience"
						placeholderTextColor="#B6BDC8"
						className="mt-2 min-h-[68px] rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[11px] text-[#111827]"
						multiline
					/>
				</View>

				<View className="mt-5">
					<Text className="text-[12px] text-[#111827]">a
						Add a Tip <Text className="text-[#9CA3AF]">(optional)</Text>
					</Text>

					<View className="mt-2 flex-row gap-2">
						{tips.map((amount) => {
							const selected = tip === amount;
							return (
								<Pressable
									key={amount}
									onPress={() => setTip(amount)}
									className={`h-7 min-w-[48px] items-center justify-center rounded-md px-2 ${
										selected ? "bg-[#EEF2FF]" : "bg-[#F3F4F6]"
									}`}
								>
									<Text className={`text-[10px] ${selected ? "text-[#4338CA]" : "text-[#374151]"}`}>
										{amount}
									</Text>
								</Pressable>
							);
						})}
					</View>

					<View className="mt-3 flex-row gap-2">
						<Pressable
							onPress={() => setPaymentMethod("wallet")}
							className={`h-7 flex-1 flex-row items-center justify-center gap-1 rounded-md ${
								paymentMethod === "wallet" ? "bg-[#4F46E5]" : "bg-[#F3F4F6]"
							}`}
						>
							<MaterialIcons
								name="account-balance-wallet"
								size={12}
								color={paymentMethod === "wallet" ? "#FFFFFF" : "#374151"}
							/>
							<Text className={`text-[10px] ${paymentMethod === "wallet" ? "text-white" : "text-[#374151]"}`}>
								Wallet
							</Text>
						</Pressable>

						<Pressable
							onPress={() => setPaymentMethod("card")}
							className={`h-7 flex-1 flex-row items-center justify-center gap-1 rounded-md ${
								paymentMethod === "card" ? "bg-[#4F46E5]" : "bg-[#F3F4F6]"
							}`}
						>
							<MaterialIcons
								name="credit-card"
								size={12}
								color={paymentMethod === "card" ? "#FFFFFF" : "#374151"}
							/>
							<Text className={`text-[10px] ${paymentMethod === "card" ? "text-white" : "text-[#374151]"}`}>
								Card
							</Text>
						</Pressable>
					</View>
				</View>

				<View className="flex-1" />

				<Pressable
					onPress={() => setShowThankYou(true)}
					className="h-10 items-center justify-center rounded-md bg-[#2E7D45]"
				>
					<Text className="text-[12px] font-semibold text-white">Done</Text>
				</Pressable>
			</View>

			<Modal
				transparent
				visible={showThankYou}
				animationType="fade"
				onRequestClose={() => setShowThankYou(false)}
			>
				<View className="flex-1 items-center justify-center bg-black/20 px-6">
					<View className="w-full max-w-[280px] rounded-xl bg-white px-4 py-5">
						<View className="items-end">
							<Pressable onPress={() => setShowThankYou(false)}>
								<Ionicons name="close" size={15} color="#6B7280" />
							</Pressable>
						</View>

						<View className="items-center">
							<View className="h-12 w-12 items-center justify-center rounded-full bg-[#2E7D45]">
								<MaterialIcons name="check" size={30} color="#FFFFFF" />
							</View>
							<Text className="mt-4 text-[30px] font-semibold text-[#111827]">Thank you!</Text>
							<Text className="mt-1 text-center text-[11px] text-[#6B7280]">
								Your service with Phil crook is now complete.
							</Text>
							<Text className="mt-4 text-[11px] italic text-[#9CA3AF]">Help a friend get started</Text>
							<Pressable className="mt-1 flex-row items-center gap-1"
                            onPress={()=> router.push('/(profile)/referEarn')}
                            >
								<Text className="text-[12px] font-semibold text-[#2E7D45]">Refer & Earn</Text>
								<Ionicons name="open-outline" size={12} color="#2E7D45" />
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}
