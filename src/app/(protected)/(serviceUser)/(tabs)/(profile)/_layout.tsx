import { Stack } from "expo-router";

export default function ProfileStack() {
	return (<Stack screenOptions={{ headerShown: false }} >
		<Stack.Screen name="index" />
		<Stack.Screen name="editUserProfile" />
		<Stack.Screen name="userPassword" />
		<Stack.Screen name="userWallet" />
		<Stack.Screen name="transactionScreen" />

	</Stack>);
}
