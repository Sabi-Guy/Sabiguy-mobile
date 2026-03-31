import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/auth";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated && role === "provider") {
    return <Redirect href="/(protected)/(serviceProvider)/(tabs)" />;
  }

  if (isAuthenticated && (role === "buyer" || role === "user")) {
    return <Redirect href="/(protected)/(serviceUser)/(tabs)/(home)" />;
  }

  return <Redirect href="/(auth)/onboarding" />;
}
