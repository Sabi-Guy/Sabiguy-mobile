import { Stack } from "expo-router";
import BackButton from "@/components/BackButton";

export default function HomeStack() {
	return (
		<Stack initialRouteName="index">
			<Stack.Screen name="index" options={{ headerShown: false }}/>
			<Stack.Screen name="location" options={{ headerShown: false }}/>
			<Stack.Screen name="search" options={{ headerShown: false }}/>
			<Stack.Screen
				name="categories"
				options={{
					headerTitle: "Categories",
					headerTitleAlign: "center",
					headerBackTitleVisible: false,
					headerLeft: () => <BackButton variant="inline" />,
				}}
			/>
		</Stack>
	)
}
