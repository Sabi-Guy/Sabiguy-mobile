import { Tabs } from "expo-router";

export default function ProviderTabsLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="hire"
        options={{
          title: "Hire",
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
