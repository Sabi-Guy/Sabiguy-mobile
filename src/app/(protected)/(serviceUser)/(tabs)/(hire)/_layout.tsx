import { Stack } from "expo-router";

export default function HireStack() {
	return (<Stack screenOptions={{ headerShown: false }} >
		<Stack.Screen name ="index"/>
		<Stack.Screen name="bookingSummary"/>
	</Stack>);
}
