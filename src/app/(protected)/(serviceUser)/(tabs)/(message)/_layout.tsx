import { Stack } from "expo-router";

export default function MessageStack() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: true, title: "Messages" }} />
			<Stack.Screen name="[id]" options={{ headerShown: false }} />
		</Stack>
	);
}