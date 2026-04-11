import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function userTabsLayout() {
  return (
    <Tabs initialRouteName="(home)"
      screenOptions={{
        tabBarActiveTintColor: "#0F7A3A",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { backgroundColor: "#FFFFFF", borderTopColor: "#E6E6E6" },
        tabBarLabelStyle: { fontSize: 10, marginTop: -2 },
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
          headerShown: false,
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