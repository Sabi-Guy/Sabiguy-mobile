import { useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import book from "../../../../../../assets/book.png";

import PopularCard from "../../../../../components/Cards/popularCard";
import ProviderCards from "@/components/Cards/ProviderCards";
import ServicesCard from "@/components/Cards/servicesCard";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { toDisplayName } from "@/lib/display-name";

export default function Home() {
  const router = useRouter();
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const firstName = toFirstName(name, email);
  return (
    <ScrollView>
      {/* top view */}
      <View className="rounded-b-3xl overflow-hidden">
        <ImageBackground
          source={bgimage}
          resizeMode="cover"
        />
        {/* top */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-white text-lg font-semibold">
              Hello, {firstName} 👋
            </Text>
            <View className="mt-2 flex-row items-center py-1 rounded-full self-start">
              <Image source={location} className="h-5 w-5" />
              <TouchableOpacity onPress={() => router.push("/(protected)/(serviceUser)/location")}>
                <Text className="text-white text-xs">
                  {" "}
                  24, Ipaja, Lagos, Nigeria{" "}
                </Text>
              </TouchableOpacity>
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
          <View className="mt-3">
            <ServicesCard
              title="Package Delivery"
              subtitle="Your items delivered quickly and safely"
              cta="Book now"
            />
          </View>
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

          <View className="flex-row space-x-4 justify-between">
            <PopularCard image={siren} text_one="Emergency" text_two="" />

            <PopularCard
              image={truck}
              text_one="Transport"
              text_two="& Logistics"
            />
            <PopularCard image={tool} text_one="Home" text_two="& Repair" />

            <PopularCard
              image={family}
              text_one="Domestic "
              text_two="& Lifestyle"
            />
          </View>
        </View>
        {/* popular providers */}
        <View className="mt-6">
          <Text className="text-base font-semibold text-gray-900">
            Popular Providers
          </Text>
          <View className="gap-3 mt-3">
            <ProviderCards />
            <ProviderCards />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
