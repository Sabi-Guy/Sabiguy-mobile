import { Image, TextInput, View } from "react-native";
import search from "../../assets/iconoir_search.png";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center">
      <Image source={search} className="h-4 w-4 mr-2" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        className="flex-1 text-gray-700"
      />
    </View>
  );
}
