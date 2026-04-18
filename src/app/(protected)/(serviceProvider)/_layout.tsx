import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/auth";

export default function ServiceProviderProtectedLayout() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated || role !== "provider") {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="manage-profile" options={{ headerShown: false }} />
      <Stack.Screen name="service-profile" options={{ headerShown: false }} />
      <Stack.Screen name="wallet" options={{ headerShown: false }} />
      <Stack.Screen name="transaction-history" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw-review" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw-success" options={{ headerShown: false }} />
    </Stack>
  );
}
