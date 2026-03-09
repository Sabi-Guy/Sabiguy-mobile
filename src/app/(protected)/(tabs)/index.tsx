import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text className="text-red-500">
        Open up App.tsx to start working on your app!
      </Text>
      <Link href="/(auth)/onboarding">
        <Text>Go to onboarding </Text>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
