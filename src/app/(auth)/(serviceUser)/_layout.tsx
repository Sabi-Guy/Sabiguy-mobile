import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgot" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
      <Stack.Screen name="forgotOtp" options={{ headerShown: false }} />
      <Stack.Screen name="reset" options={{ headerShown: false }} />
      <Stack.Screen name="resetSuccess" options={{ headerShown: false }} />
    </Stack>
  );
}