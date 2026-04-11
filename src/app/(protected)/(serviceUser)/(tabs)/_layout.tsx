import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function userTabsLayout() {
	const pathname = usePathname();
	const isMessageDetail = Boolean(
		pathname?.includes("/(message)/") && !pathname?.endsWith("/(message)")
	);
	const baseTabBarStyle = { backgroundColor: "#FFFFFF", borderTopColor: "#E6E6E6" };
	const tabBarStyle = isMessageDetail ? { display: "none" } : baseTabBarStyle;

  return (
    <Tabs initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: "#0F7A3A",
        tabBarInactiveTintColor: "#9CA3AF",
		tabBarStyle,
        tabBarLabelStyle: { fontSize: 10, marginTop: -2 },
        headerTitleAlign: "center",
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(hire)"
        options={{
          title: "Bookings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(message)"
        options={{
          title: "Messages",
          headerShown: !isMessageDetail,
          tabBarStyle,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"
              }
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={18}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}