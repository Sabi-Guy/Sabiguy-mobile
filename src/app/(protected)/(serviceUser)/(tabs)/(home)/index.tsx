import { Text, View, ScrollView, Image } from "react-native";
import bell from "../../../../../../assets/bell.png";
import location from "../../../../../../assets/location.png";
import SearchBar from "../../../../../components/SearchBar";

export default function App() {
  return (
    <ScrollView>
      {/* top view */}
      <View className="bg-[#2E7D52] px-5 pt-14 pb-6 rounded-b-3xl">
        {/* top */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-white text-lg font-semibold">Hello, Kuks</Text>
            <View className="mt-2 flex-row items-center py-1.5 rounded-full self-start">
              <Image source={location} className="h-5 w-5"/>
              <Text className="text-white text-xs"> 24, Ipaja, Lagos, Nigeria </Text>
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
      <View></View>
    </ScrollView>
  );
}
