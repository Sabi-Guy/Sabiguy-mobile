import { Redirect } from "expo-router";
import { getProviderOnboardingRoute } from "@/lib/provider-kyc";
import { useAuthStore } from "@/store/auth";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);
  const kycLevel = useAuthStore((state) => state.kycLevel);

  if (isAuthenticated && role === "provider") {
    const pendingOnboardingRoute = getProviderOnboardingRoute(kycLevel);
    return <Redirect href={pendingOnboardingRoute ?? "/(protected)/(serviceProvider)/(tabs)"} />;
  }

  if (isAuthenticated && (role === "buyer" || role === "user")) {
    return <Redirect href="/(protected)/(serviceUser)/(tabs)/(home)" />;
  }

  return <Redirect href="/(auth)/onboarding" />;
}
