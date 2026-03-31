import { Stack } from "expo-router";

export default function ServiceProviderLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="account-setup" options={{ headerShown: false }} />
      <Stack.Screen name="personal-information" options={{ headerShown: false }} />
      <Stack.Screen name="account-type" options={{ headerShown: false }} />
      <Stack.Screen name="face-capture" options={{ headerShown: false }} />
      <Stack.Screen name="verify-skill" options={{ headerShown: false }} />
      <Stack.Screen name="vehicle-information" options={{ headerShown: false }} />
      <Stack.Screen name="bank-account" options={{ headerShown: false }} />
      <Stack.Screen name="profile-setup-complete" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password-code" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
      <Stack.Screen name="password-reset-success" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
