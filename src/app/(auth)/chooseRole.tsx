import Roles from "@/components/Roles";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function chooseRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    if (selectedRole === "user") {
      router.push("/(auth)/(serviceUser)/");
    } else {
      router.push("/(auth)/(serviceProvider)/");
    }
  };

  return (
    <View className="flex-1 px-6 py-30 bg-white pt-20 ">
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        How do you want to use SabiGUY
      </Text>
      <View className="space-y-4">
        <Roles
          icon={require('../../../assets/search.png')}
          title="I need a service"
          about="Find skilled professional for your needs"
          description="Connect with plumbers, electricians, tutor, tech experts and more"
          onPress={() => setSelectedRole('user')}
          isSelected={selectedRole === 'user'}
        />
        
        <View className="h-10" />
        
        <Roles
          icon={require('../../../assets/tool.png')}
          title="I provide a service"
          about="Grow your business and find new clients"
          description="Showcase your skills and get hired for jobs in your area "
          onPress={() => setSelectedRole('provider')}
          isSelected={selectedRole === 'provider'}
        />
      </View>
      <Pressable 
        className={`mt-8 rounded-md px-36 py-4 ${selectedRole ? 'bg-[#005823CC]' : 'bg-gray-300'}`}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text className="text-white text-center">
          Continue
        </Text>
      </Pressable>
    </View>
  );
}
