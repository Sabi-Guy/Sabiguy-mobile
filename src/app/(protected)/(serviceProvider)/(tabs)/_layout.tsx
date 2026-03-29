import { Tabs } from "expo-router";

export default function ProviderTabsLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="hire"
        options={{
          title: "Hire",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
