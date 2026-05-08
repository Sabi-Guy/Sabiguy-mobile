import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/auth";

export default function serviceUserLayout() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated || (role !== "buyer" && role !== "user")) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="support-chat" options={{ headerShown: false }} />
    </Stack>
  );
}
