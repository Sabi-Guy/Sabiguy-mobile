import { Redirect, Stack } from "expo-router";
import { getProviderOnboardingRoute } from "@/lib/provider-kyc";
import { useAuthStore } from "@/store/auth";

export default function ServiceProviderProtectedLayout() {
  const hydrated = useAuthStore((state) => state.hydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const kycLevel = useAuthStore((state) => state.kycLevel);

  if (!hydrated) {
    return null;
  }

  if (!isAuthenticated || role !== "provider") {
    return <Redirect href="/(auth)/login" />;
  }

  const pendingOnboardingRoute = getProviderOnboardingRoute(kycLevel);
  if (pendingOnboardingRoute) {
    return <Redirect href={pendingOnboardingRoute} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="manage-profile" options={{ headerShown: false }} />
      <Stack.Screen name="service-profile" options={{ headerShown: false }} />
      <Stack.Screen name="password" options={{ headerShown: false }} />
      <Stack.Screen name="notifications" options={{ headerShown: false }} />
      <Stack.Screen name="refer-earn" options={{ headerShown: false }} />
      <Stack.Screen name="about-us" options={{ headerShown: false }} />
      <Stack.Screen name="terms-conditions" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
      <Stack.Screen name="help" options={{ headerShown: false }} />
      <Stack.Screen name="wallet" options={{ headerShown: false }} />
      <Stack.Screen name="transaction-history" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw-review" options={{ headerShown: false }} />
      <Stack.Screen name="withdraw-success" options={{ headerShown: false }} />
    </Stack>
  );
}
