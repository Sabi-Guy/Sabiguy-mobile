import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import BackButton from "@/components/BackButton";

type ServiceItem = { id: string; name: string; price: string; model: string };

export default function VerifySkill() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("Unit");

  const saveService = () => {
    if (!serviceName || !price) return;
    setServices((prev) => [...prev, { id: Date.now().toString(), name: serviceName, price, model }]);
    setServiceName("");
    setPrice("");
    setModel("Unit");
    setShowModal(false);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 24 }}>
      <BackButton />
      <View className="mt-10">
        <View className="mb-6 h-1 w-32 rounded-full bg-[#005823CC]" />
        <Text className="text-2xl font-bold text-gray-900">Verify your skill</Text>
        <Text className="mt-2 text-base text-gray-600">Complete your verification to build trust with customers and access more features.</Text>
      </View>

      <View className="mt-6 gap-3">
        <TextInput placeholder="Search or Select Job Title" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        <TextInput placeholder="Search or select services" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
        <TextInput placeholder="Tagline" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-4" />
      </View>

      <View className="mt-6">
        <Text className="text-lg font-semibold text-gray-900">Add your Services & Pricing</Text>
        <Text className="mt-2 text-sm text-gray-600">List services you offer and set fair prices.</Text>
      </View>

      <View className="mt-4 gap-3">
        {services.map((item) => (
          <View key={item.id} className="rounded-lg border border-gray-300 p-4">
            <Text className="font-semibold text-gray-900">{item.name}</Text>
            <Text className="mt-1 text-sm text-gray-600">
              {item.price} - {item.model}
            </Text>
          </View>
        ))}
      </View>

      <Pressable className="mt-4 self-start rounded-md border border-gray-300 px-4 py-3" onPress={() => setShowModal(true)}>
        <Text className="font-semibold text-gray-700">+ Add New Service</Text>
      </Pressable>

      <Pressable className="mt-8 rounded-md bg-[#005823CC] py-4" onPress={() => router.push("/(auth)/(serviceProvider)/upload-documents")}>
        <Text className="text-center font-semibold text-white">Next</Text>
      </Pressable>

      <Modal visible={showModal} animationType="fade" transparent>
        <View className="flex-1 items-center justify-center bg-black/30 px-6">
          <View className="w-full rounded-xl bg-white p-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="font-semibold text-gray-700" onPress={() => setShowModal(false)}>
                Cancel
              </Text>
              <Text className="font-semibold text-gray-900">Add Service</Text>
              <Text className="font-semibold text-[#005823CC]" onPress={saveService}>
                Save
              </Text>
            </View>
            <View className="gap-3">
              <TextInput value={serviceName} onChangeText={setServiceName} placeholder="Service Name/Type" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-3" />
              <TextInput value={model} onChangeText={setModel} placeholder="Pricing Model" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-3" />
              <TextInput value={price} onChangeText={setPrice} placeholder="Price (N)" keyboardType="numeric" className="rounded-lg border border-gray-300 bg-[#231F200D] px-4 py-3" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
