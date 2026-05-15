import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";

import PopularCard from "../../../../../components/Cards/popularCard";
import ServicesCard from "@/components/Cards/servicesCard";
import { useRouter } from "expo-router";
import CategoryDetailSheet from "@/components/CategoryDetailSheet";
import { getCachedUserLocation } from "@/lib/getLocation";
import { useFocusEffect } from "@react-navigation/native";


type CategoryItem = {
  key: string;
  spacer?: boolean;
  image?: any;
  text_one?: string;
  text_two?: string;
  onPress?: () => void;
  comingSoon?: boolean;
};

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
  const [userLocation, setUserLocation] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadLocation = async () => {
        const cached = await getCachedUserLocation();
        if (active) {
          setUserLocation(cached?.address?.trim() || null);
        }
      };

      loadLocation();

      return () => {
        active = false;
      };
    }, []),
  );

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

  // 4-column grid data:
  // Row 1: 4 real cards
  // Row 2: 1 spacer + 3 real cards — spacer pushes them to center
  const categoryGridData: CategoryItem[] = [
    { key: "transport", image: truck,     text_one: "Transport",    text_two: "& Logistics", onPress: () => handleOpenCategory(categories[0]) },
    { key: "emergency", image: siren,     text_one: "Emergency",    text_two: "",            comingSoon: true },
    { key: "home",      image: tool,      text_one: "Home",         text_two: "& Repair",    comingSoon: true },
    { key: "domestic",  image: family,    text_one: "Domestic",     text_two: "& Lifestyle", comingSoon: true },

    { key: "freelance", image: freelance, text_one: "Freelance",    text_two: "Services",    comingSoon: true },
    { key: "worker",    image: worker,    text_one: "Professional", text_two: "Services",    comingSoon: true },
    { key: "creative",  image: creative,  text_one: "Creative",     text_two: "Services",    comingSoon: true },
        { key: "spacer",    spacer: true },
  ];

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
          <View className="relative flex-row items-start justify-between">
            <View className="flex-1 pr-28">
              <View className="flex-row items-center">
                <Text className="text-white text-lg font-semibold">
                  Hello, {firstName}
                </Text>
                <Text className="ml-1 text-lg">👋</Text>
              </View>
              <Pressable onPress={()=> router.push("/(protected)/(serviceUser)/location")}>
                <Text className="mt-2 text-[12px] font-bold text-white" numberOfLines={1}>
                  {userLocation ?? "Where do you live?"}
                </Text>
              </Pressable>
            </View>

            <View className="absolute right-0 top-0">
              <Pressable
                className="h-10 w-10 items-center justify-center"
                onPress={() =>
                  router.push("/(protected)/(serviceUser)/notifications")
                }
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Open notifications"
              >
                <Ionicons name="notifications-outline" size={23} color="#FFFFFF" />
              </Pressable>
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

          <FlatList
            data={categoryGridData}
            keyExtractor={(item) => item.key}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={{ marginBottom: 16 }}
            renderItem={({ item }) => {
              if (item.spacer) {
                return <View style={{ flex: 1 }} />;
              }
              return (
                <View style={{ flex: 1, alignItems: "center", paddingTop: 8 }}>
                  <PopularCard
                    image={item.image}
                    text_one={item.text_one!}
                    text_two={item.text_two!}
                    onPress={item.onPress}
                    comingSoon={item.comingSoon}
                  />
                </View>
              );
            }}
          />
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