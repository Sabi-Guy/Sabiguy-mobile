import React, { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import ProgressBar from "@/components/ProgressBar";

export default function FaceCapture() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      <BackButton />
      <View className="mt-8">
        <View className="mb-6">
          <ProgressBar step={3} total={5} />
        </View>
        <Text className="text-2xl font-bold text-gray-900">Face capturing</Text>
        <Text className="mt-2 text-base text-gray-600">Look directly at the camera</Text>
      </View>

      <View className="mt-10 items-center">
        <View
          className="relative w-4/5 max-w-[260px]"
          style={{ aspectRatio: 1 }}
        >
          <View className="absolute inset-0 overflow-hidden rounded-2xl border border-gray-200">
            {capturedUri ? (
              <Image source={{ uri: capturedUri }} className="h-full w-full" />
            ) : permission?.granted ? (
              <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
            ) : (
              <View className="flex-1 items-center justify-center bg-gray-100">
                <Text className="text-xs text-gray-500">Camera preview</Text>
              </View>
            )}
          </View>
          <View className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-[#005823CC]" />
          <View className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-[#005823CC]" />
          <View className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-[#005823CC]" />
          <View className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-[#005823CC]" />
        </View>
      </View>

      <View className="mt-10 items-center">
        <Pressable
          className={`h-14 w-14 items-center justify-center rounded-full ${
            capturedUri ? "bg-[#0F6B3E]" : "bg-[#005823CC]"
          }`}
          onPress={async () => {
            if (!permission?.granted) {
              await requestPermission();
              return;
            }
            const photo = await cameraRef.current?.takePictureAsync();
            if (photo?.uri) setCapturedUri(photo.uri);
          }}
        >
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </Pressable>
        <Text className="mt-3 text-xs text-gray-500">
          {permission?.granted
            ? capturedUri
              ? "Capture saved"
              : "Tap to capture"
            : "Grant camera access"}
        </Text>
        {capturedUri ? (
          <Pressable
            className="mt-4 rounded-full border border-[#005823CC] px-6 py-2"
            onPress={() => setCapturedUri(null)}
          >
            <Text className="text-sm font-semibold text-[#005823CC]">Retake</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable
        className="mt-auto mb-10 rounded-md bg-[#005823CC] py-4"
        onPress={() => router.push("/(auth)/(serviceProvider)/verify-skill")}
      >
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>
    </View>
  );
}
