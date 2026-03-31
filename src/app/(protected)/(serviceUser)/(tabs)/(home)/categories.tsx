import { View, Text, ScrollView } from "react-native";
import React from "react";
import BackButton from "@/components/BackButton";
import siren from "../../../../../../assets/siren.png";
import CartegoriesCard from "@/components/Cards/CartegoriesCard";
import { useRouter } from "expo-router";

export default function categories() {
  const categories = [
    { text_one: "Emergency" },
    { text_one: "Home &", text_two: "Repair" },
    { text_one: "Transport &", text_two: "Logistics" },
    { text_one: "Domestic &", text_two: "Lifestyle" },
    { text_one: "Emergency" },
    { text_one: "Emergency" },
    { text_one: "Emergency" },
    { text_one: "Emergency" },
  ];
  const router = useRouter();
  return (
    <ScrollView className="bg-gray-50">
      <View className="mt-16 px-5 pb-10">
        <View className="flex-row flex-wrap justify-between">
          {categories.map((item, index) => (
            <View
              key={`${item.text_one}-${index}`}
              style={{ width: "48%" }}
              className="mb-4"
            >
              <CartegoriesCard
                text_one={item.text_one}
                text_two={item.text_two}
                image={siren}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
