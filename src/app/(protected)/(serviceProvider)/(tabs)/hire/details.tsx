import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const summaryItems = [
  { label: "Pickup Location", value: "15 Victoria Island, Lagos Ikeja", icon: "ellipse" as const },
  { label: "Dropoff Location", value: "24 Palm Avenue, Lekki Phase 1, Lagos", icon: "location" as const },
  { label: "Distance", value: "10.5 km", icon: "swap-horizontal-outline" as const },
  { label: "Date", value: "Oct 18, 2025 - 10 AM", icon: "calendar-outline" as const },
  { label: "Fare", value: "₦5,000", icon: "cash-outline" as const },
];

export default function HireDetails() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={16} color="#231F20" />
          </Pressable>
          <Text style={styles.headerTitle}>Service Details</Text>
          <View style={styles.back} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.providerCard}>
          <View style={styles.providerTop}>
            <View style={styles.avatar}>
              <Image source={require("../../../../../../assets/avatar.png")} style={styles.avatarImage} />
            </View>
            <View style={styles.providerMeta}>
              <View style={styles.providerNameRow}>
                <Text style={styles.providerName}>Stephen Gerrad</Text>
                <Ionicons name="checkmark-circle-outline" size={14} color="#2F8A57" />
              </View>
              <View style={styles.ratingInline}>
                <Ionicons name="star" size={12} color="#F4B400" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
              <Text style={styles.locationText}>Lekki Phase 1</Text>
            </View>
          </View>

          <View style={styles.providerActions}>
            <Pressable style={styles.providerActionBtn}>
              <Ionicons name="call-outline" size={15} color="#7A818B" />
              <Text style={styles.providerActionText}>Call</Text>
            </Pressable>
            <Pressable style={styles.providerActionBtn}>
              <Ionicons name="chatbubble-ellipses-outline" size={15} color="#7A818B" />
              <Text style={styles.providerActionText}>Message</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.summaryWrap}>
          <Text style={styles.summaryTitle}>Job Summary</Text>
          <View style={styles.summaryList}>
            {summaryItems.map((item) => (
              <View key={item.label} style={styles.summaryItem}>
                <Ionicons name={item.icon} size={15} color="#2F8A57" />
                <View style={styles.summaryTextWrap}>
                  <Text style={styles.summaryLabel}>{item.label}</Text>
                  <Text style={styles.summaryValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteLabel}>Pickup note</Text>
          <Text style={styles.noteValue}>Add extra instructions for the service provider...</Text>
        </View>

        <Text style={styles.footerHint}>Update the job status to keep the customer informed</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F7F3" },
  header: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#231F20",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  providerCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8EBE5",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  providerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  providerMeta: { flex: 1 },
  providerNameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  providerName: { fontSize: 14, color: "#2D323A", fontWeight: "600" },
  ratingInline: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 1 },
  ratingText: { fontSize: 12, color: "#7A808A" },
  locationText: { marginTop: 1, fontSize: 11, color: "#A0A6AE" },
  providerActions: { marginTop: 9, flexDirection: "row", gap: 8 },
  providerActionBtn: {
    flex: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#E3E7EC",
    backgroundColor: "#FFFFFF",
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  providerActionText: { fontSize: 12, color: "#7A818B", fontWeight: "500" },
  summaryWrap: { marginTop: 16 },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D323A",
  },
  summaryList: { marginTop: 10, gap: 10 },
  summaryItem: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  summaryTextWrap: { flex: 1 },
  summaryLabel: { fontSize: 14, color: "#3D434B", fontWeight: "600" },
  summaryValue: { marginTop: 2, fontSize: 14, color: "#6A727C" },
  noteCard: {
    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8EBF0",
    backgroundColor: "#F3F6FA",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  noteLabel: { fontSize: 13, color: "#6C7380", fontWeight: "500" },
  noteValue: { marginTop: 5, fontSize: 12, color: "#98A2B3" },
  footerHint: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 11,
    color: "#A8AFB9",
  },
});
