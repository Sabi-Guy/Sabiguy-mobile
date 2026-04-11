import { View, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import BackButton from "@/components/BackButton";
import siren from "../../../../../../assets/siren.png";
import tool from "../../../../../../assets/hand-tools.png";
import truck from "../../../../../../assets/truck.png";
import family from "../../../../../../assets/family.png";
import CartegoriesCard from "@/components/Cards/CartegoriesCard";
import CategoryDetailSheet from "@/components/CategoryDetailSheet";
import { useRouter } from "expo-router";

export default function categories() {
  const categories = useMemo(
    () => [
      {
        id: "emergency",
        title: "Emergency",
        text_one: "Emergency",
        image: siren,
        items: [
          { id: "ambulance", label: "Ambulance" },
          { id: "fire-service", label: "Fire service" },
          { id: "security", label: "Security" },
          { id: "first-aid", label: "First aid" },
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
          { id: "electrical", label: "Electrical" },
          { id: "cleaning", label: "Cleaning" },
          { id: "carpentry", label: "Carpentry" },
        ],
      },
      {
        id: "transport-logistics",
        title: "Transport & Logistics",
        text_one: "Transport &",
        text_two: "Logistics",
        image: truck,
        items: [
          { id: "vehicle-hire", label: "Vehicle hire" },
          { id: "package-delivery", label: "Package delivery" },
          { id: "freelance-driver", label: "Freelance driver" },
          { id: "book-a-trip", label: "Book a trip" },
        ],
      },
      {
        id: "domestic-lifestyle",
        title: "Domestic & Lifestyle",
        text_one: "Domestic &",
        text_two: "Lifestyle",
        image: family,
        items: [
          { id: "babysitting", label: "Babysitting" },
          { id: "errands", label: "Errands" },
          { id: "personal-care", label: "Personal care" },
          { id: "catering", label: "Catering" },
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
