import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import bell from "../../../../../../assets/bell.png";
import location from "../../../../../../assets/location.png";
import bgimage from "../../../../../../assets/bgimage.png";
import SearchBar from "../../../../../components/SearchBar";
import family from "../../../../../../assets/family.png";
import tool from "../../../../../../assets/hand-tools.png";
import siren from "../../../../../../assets/siren.png";
import truck from "../../../../../../assets/truck.png";

import PopularCard from "../../../../../components/popularCard";
import ProviderCards from "@/components/ProviderCards";

export default function App() {
  return (
    <ScrollView>
      {/* top view */}
      <View className="bg-[#2E7D52] px-5 pt-12 pb-6 rounded-b-3xl overflow-hidden">
        <Image
          source={bgimage}
          className="absolute bottom-0 h-24 opacity-40"
          style={{ left: 0, right: 0, width: "100%" }}
          resizeMode="cover"
        />
        {/* top */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-white text-lg font-semibold">
              Hello, Kuks 👋
            </Text>
            <View className="mt-2 flex-row items-center py-1.5 rounded-full self-start">
              <Image source={location} className="h-5 w-5" />
              <Text className="text-white text-xs">
                {" "}
                24, Ipaja, Lagos, Nigeria{" "}
              </Text>
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
      </View>

      {/* main content */}
      <View className="m-5 ">
        {/* popular */}
        <View>
          <Text className="text-2xl font-semibold">Popular Services</Text>
        </View>
        {/* categories */}
        <View className="">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-2xl font-semibold">Categories</Text>
            <Text className="font-bold text-[#005823]">See more</Text>
          </View>

          <View className="flex-row space-x-4">
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
        <View>
          <Text className="text-2xl font-semibold">Popular Providers</Text>
          <View className="gap-3">
            <ProviderCards />
            <ProviderCards />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
