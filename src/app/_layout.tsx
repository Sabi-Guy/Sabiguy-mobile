import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import SplashScreen from "@/components/SplashScreen";
import { useAuthStore } from "@/store/auth";
import "../../global.css"

export default function Rootlayout() {
  const [showSplash, setShowSplash] = useState(true);
  const hydrated = useAuthStore((state) => state.hydrated);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  if (showSplash || !hydrated) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
            <Toast />
          </SafeAreaView>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
