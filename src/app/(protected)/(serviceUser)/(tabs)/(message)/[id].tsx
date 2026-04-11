import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { apiRequest } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function MessageDetail() {
	const { id, name } = useLocalSearchParams<{
		id?: string;
		name?: string;
	}>();
	const email = useAuthStore((state) => state.email);
	const currentName = useAuthStore((state) => state.name);
	const [messages, setMessages] = useState<
		{
			id: string;
			text: string;
			time: string;
			fromMe: boolean;
			senderInitial: string;
		}[]
	>([]);
	const [isOnline, setIsOnline] = useState<boolean | null>(null);
	const [headerName, setHeaderName] = useState<string>(name ?? "Message");
	const [error, setError] = useState<string | null>(null);
	const bookingId = useMemo(() => (typeof id === "string" ? id : undefined), [id]);

	const getInitial = (value?: string, fallback = "U") => {
		const trimmed = value?.trim();
		if (!trimmed) return fallback;
		return trimmed.slice(0, 1).toUpperCase();
	};

	const toTime = (value?: string | number) => {
		if (!value) return "";
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return "";
		return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
	};

	useEffect(() => {
		let isActive = true;
		if (!bookingId) return undefined;

		const loadMessages = async () => {
			setError(null);
			try {
				const data = await apiRequest<any>(
					`/chats/${bookingId}/messages?page=1&limit=50`
				);
				if (!isActive) return;

				const root = data?.data ?? data ?? {};
				const rawMessages =
					root?.messages ?? root?.data ?? root?.items ?? root?.results ?? root ?? [];
				const chat = root?.chat ?? data?.chat ?? root?.conversation ?? data?.conversation;
				const participant =
					chat?.participant ??
					chat?.provider ??
					chat?.buyer ??
					chat?.user ??
					root?.participant;
				const onlineValue =
					participant?.isOnline ??
					participant?.online ??
					chat?.isOnline ??
					root?.online ??
					root?.isOnline ??
					data?.online ??
					data?.isOnline;
				const participantName =
					participant?.name ??
					participant?.fullName ??
					root?.name ??
					data?.name ??
					name ??
					"Message";

				setIsOnline(typeof onlineValue === "boolean" ? onlineValue : null);
				setHeaderName(participantName);

				const normalized = Array.isArray(rawMessages) ? rawMessages : [];
				const mapped = normalized
					.map((message) => {
						const text =
							message?.content ?? message?.message ?? message?.text ?? "";
						const senderEmail =
							message?.sender?.email ??
							message?.senderEmail ??
							message?.from?.email ??
							message?.user?.email ??
							"";
						const senderName =
							message?.sender?.name ??
							message?.senderName ??
							message?.from?.name ??
							message?.user?.name ??
							participantName;
						const fromMe =
							message?.isSender === true ||
							message?.isMine === true ||
							(Boolean(senderEmail) &&
								Boolean(email) &&
								senderEmail.toLowerCase() === email.toLowerCase());
						const timestamp =
							message?.createdAt ??
							message?.timestamp ??
							message?.time;

						return {
							id: String(message?._id ?? message?.id ?? Math.random()),
							text: String(text),
							time: toTime(timestamp),
							fromMe,
							senderInitial: fromMe
								? getInitial(currentName, "A")
								: getInitial(senderName, "W"),
						};
					})
					.filter((item) => item.text.length > 0);

				setMessages(mapped);
			} catch (err) {
				if (!isActive) return;
				const message = err instanceof Error ? err.message : "Failed to load messages.";
				setError(message);
			}
		};

		void loadMessages();
		return () => {
			isActive = false;
		};
	}, [bookingId, currentName, email, name]);

	return (
		<View className="flex-1 bg-white">
			<View className="flex-row items-center px-4 pb-3 pt-10">
				<BackButton />
				<Image
					source={require("../../../../../../assets/avatar.png")}
					className="ml-2 h-10 w-10 rounded-full"
				/>
				<View className="ml-3 flex-1">
					<Text className="text-base font-semibold text-gray-900">
						{headerName}
					</Text>
					{isOnline !== null && (
						<Text className={isOnline ? "text-xs text-green-600" : "text-xs text-gray-400"}>
							{isOnline ? "Online" : "Offline"}
						</Text>
					)}
				</View>
				<Ionicons name="call-outline" size={20} color="#6B7280" />
			</View>

			<ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 24 }}>
				{error && (
					<View className="rounded-2xl bg-red-50 px-3 py-2">
						<Text className="text-xs text-red-600">{error}</Text>
					</View>
				)}

				{messages.length === 0 && !error && (
					<View className="items-center">
						<View className="rounded-full bg-gray-100 px-3 py-1">
							<Text className="text-[10px] text-gray-500">No messages yet</Text>
						</View>
					</View>
				)}

				{messages.map((message) => (
					<View
						key={message.id}
						className={
							message.fromMe
								? "mt-4 flex-row items-end justify-end gap-2"
								: "mt-4 flex-row items-end gap-2"
						}
					>
						{message.fromMe ? (
							<Text className="text-[10px] text-gray-400">{message.time}</Text>
						) : (
							<View className="h-6 w-6 items-center justify-center rounded-full bg-pink-500">
								<Text className="text-[10px] font-semibold text-white">
									{message.senderInitial}
								</Text>
							</View>
						)}
						<View
							className={
								message.fromMe
									? "max-w-[75%] rounded-2xl bg-green-100 px-3 py-2"
									: "max-w-[75%] rounded-2xl bg-gray-100 px-3 py-2"
							}
						>
							<Text className="text-xs text-gray-800">{message.text}</Text>
						</View>
						{message.fromMe ? (
							<View className="h-6 w-6 items-center justify-center rounded-full bg-green-500">
								<Text className="text-[10px] font-semibold text-white">
									{message.senderInitial}
								</Text>
							</View>
						) : (
							<Text className="text-[10px] text-gray-400">{message.time}</Text>
						)}
					</View>
				))}
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
