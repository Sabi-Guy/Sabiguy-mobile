import { Stack } from "expo-router";

export default function AuthLayout(){
    return(
        <Stack >
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="chooseRole"  options={{ headerShown: false }} />
            <Stack.Screen name="(serviceProvider)"  options={{ headerShown: false }} />
            <Stack.Screen name="(serviceUser)" options={{ headerShown: false }}  />
        </Stack>
    )
}