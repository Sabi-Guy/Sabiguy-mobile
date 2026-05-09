import { Tabs, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function userTabsLayout() {
  const segments = useSegments();
  const isMessageRoute = segments.includes("(message)") || segments.includes("message");
  const lastSegment = segments[segments.length - 1];
  const isMessageDetail = isMessageRoute && lastSegment !== "index" && lastSegment !== "(message)";
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
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
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
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
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
          tabBarStyle,
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
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
          
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
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
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
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
