import { Stack } from "expo-router";

export default function AuthLayout(){
    return(
        <Stack>
            <Stack.Screen name="onboarding"  />
            <Stack.Screen name="chooseRole"  />
            <Stack.Screen name="(serviceProvider)"  />
            <Stack.Screen name="(serviceUser)"  />
        </Stack>
    )
}