import React from "react";
import { Pressable, Text, View, Image, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@/components/bottomSheet";

type CategoryItem = {
  id: string;
  label: string;
  route?: string;
};

type CategoryDetail = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  items: CategoryItem[];
};

type CategoryDetailSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  category: CategoryDetail | null;
  onSelectItem?: (item: CategoryItem, category: CategoryDetail) => void;
};

export default function CategoryDetailSheet({
  isVisible,
  onClose,
  category,
  onSelectItem,
}: CategoryDetailSheetProps) {
  if (!category) {
    return null;
  }

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={[0, 35, 45]}
      initialSnapPoint={35}
      contentContainerStyle={{ flex: 0, paddingBottom: 16 }}
      showHandle={false}
      showBackdropShadow={true}
      
    >
      <View className="px-2 pt-5 ">
        <View className="flex-row items-center justify-between px-2 pb-3">
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#EAF6EF]">
              <Image source={category.image} className="h-5 w-5" resizeMode="contain" />
            </View>
            <Text className="text-base font-semibold text-gray-900">{category.title}</Text>
          </View>

          <Pressable onPress={onClose} className="h-9 w-9 items-center justify-center">
            <Ionicons name="close" size={20} color="#111827" />
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {category.items.map((item, index) => {
            const hasBorder = index < category.items.length - 1;
            return (
              <Pressable
                key={item.id}
                onPress={() => onSelectItem?.(item, category)}
                className={`flex-row items-center px-4 py-4 ${hasBorder ? "border-b border-gray-100" : ""}`}
              >
                <Text className="flex-1 text-sm font-medium text-gray-800">{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </Pressable>
            );
          })}
        </View>
      </View>
    </BottomSheet>
  );
}
