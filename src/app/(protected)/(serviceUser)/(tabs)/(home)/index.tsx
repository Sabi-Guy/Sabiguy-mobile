import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useMemo, useState } from "react";
import bell from "../../../../../../assets/bell.png";
import location from "../../../../../../assets/location.png";
import bgimage from "../../../../../../assets/bgimage.png";
import SearchBar from "../../../../../components/SearchBar";
import { useAuthStore } from "@/store/auth";
import { toFirstName } from "@/lib/display-name";
import family from "../../../../../../assets/family.png";
import tool from "../../../../../../assets/hand-tools.png";
import siren from "../../../../../../assets/siren.png";
import truck from "../../../../../../assets/truck.png";
import creative from "../../../../../../assets/creative.png";
import worker from "../../../../../../assets/worker.png";
import freelance from "../../../../../../assets/freelance.png";
import Entypo from "@expo/vector-icons/Entypo";

import PopularCard from "../../../../../components/Cards/popularCard";
import ServicesCard from "@/components/Cards/servicesCard";
import { useRouter } from "expo-router";
import CategoryDetailSheet from "@/components/CategoryDetailSheet";

export default function Home() {
  const router = useRouter();
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const firstName = toFirstName(name, email);
  const categories = useMemo(
    () => [
      {
        id: "transport-logistics",
        title: "Transport & Logistics",
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
        id: "emergency-services",
        title: "Emergency Services",
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
        image: family,
        items: [
          { id: "household-support", label: "Household Support" },
          { id: "childcare-education", label: "Childcare & Education" },
          {
            id: "personal-beauty-services",
            label: "Personal & Beauty Services",
          },
        ],
      },
    ],
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number] | null
  >(null);
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
    <ScrollView>
      {/* top view */}
      <View className="rounded-b-3xl overflow-hidden">
        <ImageBackground
          source={bgimage}
          resizeMode="cover"
          className="bg-[#2E7D52] px-5 pt-12 pb-6"
        >
          {/* top */}
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-white text-lg font-semibold">
                Hello, {firstName} 👋
              </Text>
              <View className="mt-2 flex-row items-center gap-2 py-1 rounded-full self-start">
                <Entypo name="location-pin" size={20} color="white" />
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(protected)/(serviceUser)/location")
                  }
                >
                  <Text className="text-white text-sm">Add your location</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="h-10 w-10 rounded-full items-center justify-center">
              <Image source={bell} className="h-5 w-5" />
            </View>
          </View>

          {/* bottom */}
          <View className="mt-5">
            <SearchBar placeholder="What services do you need? " />
          </View>
        </ImageBackground>
      </View>

      {/* main content */}
      <View className="px-5 pb-8">
        {/* popular */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-semibold text-gray-900">
              Popular Services
            </Text>
            <Text className="text-xs font-semibold text-[#005823]">
              See more
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="mt-3 flex-row gap-5 pr-5"
          >
            <ServicesCard
              title="Package Delivery"
              subtitle="Your items delivered quickly and safely"
              cta="Book now"
              image={require("../../../../../../assets/rider.png")}
            />
            <ServicesCard
              title="Book a ride"
              subtitle="Reliable rides, ready whenever you are"
              cta="book now"
              image={require("../../../../../../assets/taxi.png")}
            />
            <ServicesCard
              title="Carpentry"
              subtitle="Expert woodwork tailored to your space and style."
              cta="coming soon"
              image={require("../../../../../../assets/capenter.png")}
            />
          </ScrollView>
        </View>
        {/* categories */}
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-base font-semibold text-gray-900">
              Categories
            </Text>
            <TouchableOpacity
              onPress={() =>
                router.push(
                  "/(protected)/(serviceUser)/(tabs)/(home)/categories",
                )
              }
            >
              <Text className="text-xs font-semibold text-[#005823]">
                See more
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between">
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={truck}
                text_one="Transport"
                text_two="& Logistics"
                onPress={() => handleOpenCategory(categories[0])}
              />
            </View>
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={siren}
                text_one="Emergency"
                text_two=""
                // onPress={() => handleOpenCategory(categories[1])}
                comingSoon
              />
            </View>
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={tool}
                text_one="Home"
                text_two="& Repair"
                // onPress={() => handleOpenCategory(categories[2])}
                comingSoon
              />
            </View>
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={family}
                text_one="Domestic "
                text_two="& Lifestyle"
                onPress={() => handleOpenCategory(categories[3])}
                comingSoon
              />
            </View>
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={freelance}
                text_one="Freelance"
                text_two="Services"
                onPress={() => handleOpenCategory(categories[3])}
                comingSoon
              />
            </View>

            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={worker}
                text_one="Professional"
                text_two="Services"
                onPress={() => handleOpenCategory(categories[3])}
                comingSoon
              />
            </View>
            <View className="mb-4" style={{ width: "23%" }}>
              <PopularCard
                image={creative}
                text_one="Creative"
                text_two="Services"
                onPress={() => handleOpenCategory(categories[3])}
                comingSoon
              />
            </View>
          </View>
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
