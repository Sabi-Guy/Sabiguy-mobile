import { View, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import siren from "../../../../../../assets/siren.png";
import tool from "../../../../../../assets/hand-tools.png";
import truck from "../../../../../../assets/truck.png";
import family from "../../../../../../assets/family.png";
import palette from "../../../../../../assets/palette.png";
import suitcase from "../../../../../../assets/suitcase.png";
import CartegoriesCard from "@/components/Cards/CartegoriesCard";
import CategoryDetailSheet from "@/components/CategoryDetailSheet";
import { useRouter } from "expo-router";

export default function categories() {
  const categories = useMemo(
    () => [
      {
        id: "professional-services",
        title: "Professional Services",
        text_one: "Professional",
        text_two: "Services",
        image: suitcase,
        items: [
          { id: "legal-financial", label: "Legal & Financial" },
          { id: "real-estate-construction", label: "Real Estate & Construction" },
          { id: "healthcare-technology", label: "Healthcare & Technology" },
        ],
      },
      {
        id: "transport-logistics",
        title: "Transport & Logistics",
        text_one: "Transport &",
        text_two: "Logistics",
        image: truck,
        items: [
          { id: "car-hire", label: "Car hire" },
          { id: "bus-hire", label: "Bus hire" },
          { id: "truck-hire", label: "Truck hire" },
          { id: "dispatch-riders", label: "Dispatch Riders" },
          { id: "freelance-driver", label: "Freelance Driver" },
          { id: "passenger-rider", label: "Passenger Rider" },
        ],
      },
      {
        id: "freelance-creative",
        title: "Freelance & Creative Services",
        text_one: "Freelance &",
        text_two: "Creative Services",
        image: palette,
        items: [
          { id: "digital-design", label: "Digital Design" },
          { id: "content-creation", label: "Content Creation" },
          { id: "media-production", label: "Media Production" },
        ],
      },
      {
        id: "emergency-services",
        title: "Emergency Services",
        text_one: "Emergency",
        text_two: "Services",
        image: siren,
        items: [
          { id: "ambulance-services", label: "Ambulance Services" },
          { id: "towing-roadside", label: "Towing & Roadside" },
          { id: "locksmiths", label: "Locksmiths" },
          { id: "security-services", label: "Security Services" },
        ],
      },
      {
        id: "home-repair",
        title: "Home & Repair",
        text_one: "Home &",
        text_two: "Repair",
        image: tool,
        items: [
          { id: "plumbing", label: "Plumbing" },
          { id: "electrical-services", label: "Electrical Services" },
          { id: "carpentry", label: "Carpentry" },
          { id: "finishing-aesthetics", label: "Finishing & Aesthetics" },
        ],
      },
      {
        id: "domestic-lifestyle",
        title: "Domestic & Lifestyle",
        text_one: "Domestic &",
        text_two: "Lifestyle",
        image: family,
        items: [
          { id: "household-support", label: "Household Support" },
          { id: "childcare-education", label: "Childcare & Education" },
          { id: "personal-beauty-services", label: "Personal & Beauty Services" },
        ],
      },
    ],
    []
  );
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number] | null>(
    null
  );
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const handleOpenCategory = (category: (typeof categories)[number]) => {
    setSelectedCategory(category);
    setIsSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setIsSheetVisible(false);
  };

  const handleSelectItem = (item: { id: string; label: string }) => {
    setIsSheetVisible(false);
    router.push({
      pathname: "/(protected)/(serviceUser)/(tabs)/(home)/categories",
      params: { category: selectedCategory?.id, item: item.id },
    });
  };
  return (
    <ScrollView className="bg-gray-50">
      <View className="mt-16 px-5 pb-10">
        <View className="flex-row flex-wrap justify-between">
          {categories.map((item, index) => (
            <View
              key={item.id}
              style={{ width: "48%" }}
              className="mb-4"
            >
              <CartegoriesCard
                text_one={item.text_one}
                text_two={item.text_two}
                image={item.image}
                onPress={() => handleOpenCategory(item)}
              />
            </View>
          ))}
        </View>
      </View>

      <CategoryDetailSheet
        isVisible={isSheetVisible}
        onClose={handleCloseSheet}
        category={selectedCategory}
        onSelectItem={handleSelectItem}
      />
    </ScrollView>
  );
}
