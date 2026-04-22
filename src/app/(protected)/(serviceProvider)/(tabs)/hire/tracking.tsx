import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

type TripStep =
  | "start_navigation"
  | "arrived_pickup"
  | "start_trip"
  | "arrived_destination"
  | "complete_trip";

const routeStops = [
  { label: "Pickup", value: "15 Victoria Island, Lagos..." },
  { label: "Dropoff", value: "24 Palm Avenue, Lekki P..." },
];

const deliveryTimeline = [
  { title: "En route to pickup", subtitle: "On the way to pickup" },
  { title: "Arrived at pickup location", subtitle: "At pickup point" },
  { title: "En route to delivery", subtitle: "Leaving for dropoff location" },
  { title: "Arrived at delivery location", subtitle: "At delivery location" },
  { title: "Delivery completed", subtitle: "Package delivered" },
];

const path = [
  { latitude: 6.4281, longitude: 3.4217 },
  { latitude: 6.4335, longitude: 3.4292 },
  { latitude: 6.4396, longitude: 3.4369 },
  { latitude: 6.4454, longitude: 3.4479 },
];

function getStepState(step: TripStep) {
  if (step === "start_navigation") {
    return {
      title: "",
      etaTitle: "",
      etaDistance: "",
      cta: "Start Navigation",
      activeCount: 0,
      showEta: false,
      showStatus: false,
      showHandle: true,
    };
  }
  if (step === "arrived_pickup") {
    return {
      title: "",
      etaTitle: "Arriving in 12 min",
      etaDistance: "5.1 km",
      cta: "Arrived at Pickup",
      activeCount: 1,
      showEta: true,
      showStatus: true,
      showHandle: true,
    };
  }
  if (step === "start_trip") {
    return {
      title: "Tracking Details",
      etaTitle: "",
      etaDistance: "",
      cta: "Start Trip",
      activeCount: 2,
      showEta: false,
      showStatus: true,
      showHandle: false,
    };
  }
  if (step === "arrived_destination") {
    return {
      title: "Tracking Details",
      etaTitle: "ETA 18 min",
      etaDistance: "8.3 km",
      cta: "Arrived at Destination",
      activeCount: 3,
      showEta: true,
      showStatus: true,
      showHandle: false,
    };
  }
  return {
    title: "Tracking Details",
    etaTitle: "ETA 18 min",
    etaDistance: "8.3 km",
    cta: "Complete Trip",
    activeCount: 4,
    showEta: true,
    showStatus: true,
    showHandle: false,
  };
}

export default function TrackingDetails() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: string }>();
  const initialStep: TripStep = params.source === "jobs" ? "arrived_pickup" : "start_navigation";
  const [step, setStep] = useState<TripStep>(initialStep);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const googleMapsApiKey =
    Constants.expoConfig?.android?.config?.googleMaps?.apiKey ??
    Constants.expoConfig?.ios?.config?.googleMapsApiKey;
  const canRenderMap = Boolean(googleMapsApiKey);
  const ui = useMemo(() => getStepState(step), [step]);
  const isStartNavigation = step === "start_navigation";
  const isArrivedPickup = step === "arrived_pickup";
  const isStartTrip = step === "start_trip";
  const isArrivedDestination = step === "arrived_destination";
  const isCompleteTrip = step === "complete_trip";
  const isTripFlowHeader = step === "start_trip" || step === "arrived_destination" || step === "complete_trip";
  const shouldShowEtaUnderline = step === "arrived_pickup" || step === "arrived_destination" || step === "complete_trip";
  const communicationEnabled = true;
  const hasTripEtaBar = ui.showEta && isTripFlowHeader;

  const handleNext = () => {
    if (step === "start_navigation") return setStep("arrived_pickup");
    if (step === "arrived_pickup") return setStep("start_trip");
    if (step === "start_trip") return setStep("arrived_destination");
    if (step === "arrived_destination") return setStep("complete_trip");
    setShowCompleteModal(true);
  };

  const confirmComplete = () => {
    setShowCompleteModal(false);
    setShowRatingModal(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.mapWrap}>
        {canRenderMap ? (
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 6.4365,
              longitude: 3.4347,
              latitudeDelta: 0.034,
              longitudeDelta: 0.028,
            }}
            showsCompass={false}
            showsTraffic={false}
          >
            <Polyline coordinates={path} strokeColor="#1D6CF2" strokeWidth={4} />
            <Marker coordinate={path[0]} pinColor="#6BB83F" />
            <Marker coordinate={path[path.length - 1]} pinColor="#6BB83F" />
          </MapView>
        ) : (
          <View style={styles.mapFallback}>
            <Text style={styles.mapFallbackTitle}>Map unavailable</Text>
            <Text style={styles.mapFallbackSub}>Configure Google Maps key and rebuild dev client.</Text>
          </View>
        )}

        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={16} color="#23262B" />
        </Pressable>

        {ui.title ? (
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{ui.title}</Text>
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.sheet,
          isArrivedPickup && styles.sheetArrivedPickup,
          isTripFlowHeader && styles.sheetTripFlow,
          isStartTrip && styles.sheetStartTrip,
          isArrivedDestination && styles.sheetArrivedDestination,
          isCompleteTrip && styles.sheetCompleteTrip,
        ]}
      >
        <View style={styles.handle} />

        {ui.showEta ? (
          <View style={isTripFlowHeader ? styles.tripTopBar : undefined}>
            <Text style={styles.etaTitle}>{ui.etaTitle}</Text>
            <Text style={styles.etaDistance}>{ui.etaDistance}</Text>
            {shouldShowEtaUnderline ? <View style={styles.etaUnderline} /> : null}
          </View>
        ) : null}

        <View
          style={[
            styles.profileRow,
            hasTripEtaBar && styles.profileRowWithEtaBar,
            isArrivedPickup && styles.profileRowArrivedPickup,
          ]}
        >
          <View style={styles.profileLeft}>
            <View style={styles.avatar}>
              <Image source={require("../../../../../../assets/avatar.png")} style={styles.avatarImage} />
            </View>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.name}>Stephen Gerrad</Text>
                <Ionicons name="checkmark-circle-outline" size={14} color="#2F8A57" />
              </View>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color="#F4B400" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </View>
          </View>
          <View style={styles.profileRight}>
            <Pressable style={[styles.iconBtn, !communicationEnabled && styles.iconBtnDisabled]}>
              <Ionicons name="chatbubble-ellipses-outline" size={14} color="#0F7A3A" />
            </Pressable>
            <Pressable style={[styles.iconBtn, !communicationEnabled && styles.iconBtnDisabled]}>
              <Ionicons name="call-outline" size={14} color="#0F7A3A" />
            </Pressable>
          </View>
        </View>

        {isStartNavigation ? (
          <View style={styles.startContent}>
            <Text style={styles.sectionTitle}>Route</Text>
            <View style={styles.routeList}>
              {routeStops.map((stop, index) => (
                <View key={stop.label} style={styles.routeItem}>
                  <View style={styles.routeIconCol}>
                    <View style={styles.routeBubble}>
                      {stop.label === "Pickup" ? (
                        <View style={styles.pickupDot} />
                      ) : (
                        <Ionicons name="location-sharp" size={12} color="#2F8A57" />
                      )}
                    </View>
                    {index < routeStops.length - 1 ? <View style={styles.routeLine} /> : null}
                  </View>
                  <View style={styles.routeTextWrap}>
                    <Text style={styles.routeLabel}>{stop.label}</Text>
                    <Text numberOfLines={1} style={styles.routeValue}>
                      {stop.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.noteLabel}>Pickup note</Text>
            <View style={styles.noteCard}>
              <Text style={styles.noteValue}>Lorem ipsum elementum scelerisque nullam quis non nibh.</Text>
            </View>

            <View style={styles.fareWrapStart}>
              <Text style={styles.sectionTitle}>Fare</Text>
              <View style={styles.fareRow}>
                <Ionicons name="cash-outline" size={14} color="#69B63E" />
                <Text style={styles.fareValue}>{"\u20A6"}5,000</Text>
              </View>
            </View>
          </View>
        ) : (
          <>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Route</Text>
              <View style={styles.routeList}>
                {routeStops.map((stop, index) => (
                  <View key={stop.label} style={styles.routeItem}>
                    <View style={styles.routeIconCol}>
                      <View style={styles.routeBubble}>
                        {stop.label === "Pickup" ? (
                          <View style={styles.pickupDot} />
                        ) : (
                          <Ionicons name="location-sharp" size={12} color="#2F8A57" />
                        )}
                      </View>
                      {index < routeStops.length - 1 ? <View style={styles.routeLine} /> : null}
                    </View>
                    <View style={styles.routeTextWrap}>
                      <Text style={styles.routeLabel}>{stop.label}</Text>
                      <Text numberOfLines={1} style={styles.routeValue}>
                        {stop.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <Text style={styles.noteLabel}>Pickup note</Text>
              <View style={styles.noteCard}>
                <Text style={styles.noteValue}>Lorem ipsum elementum scelerisque nullam quis non nibh.</Text>
              </View>

              <View style={styles.fareWrap}>
                <Text style={styles.sectionTitle}>Fare</Text>
                <View style={styles.fareRow}>
                  <Ionicons name="cash-outline" size={14} color="#69B63E" />
                  <Text style={styles.fareValue}>{"\u20A6"}5,000</Text>
                </View>
              </View>

              {ui.showStatus ? (
                <View style={styles.statusWrap}>
                  <View style={styles.statusHeader}>
                    <Text style={styles.sectionTitle}>Delivery Status</Text>
                    <Ionicons name="chevron-up" size={14} color="#333942" />
                  </View>
                  <View style={styles.statusList}>
                    {deliveryTimeline.map((item, index) => {
                      const active = index < ui.activeCount;
                      const isLast = index === deliveryTimeline.length - 1;
                      return (
                        <View key={item.title} style={styles.statusItem}>
                          <View style={styles.statusIconCol}>
                            <View style={[styles.statusDot, active ? styles.statusDotActive : styles.statusDotInactive]} />
                            {!isLast ? (
                              <View style={[styles.statusConnector, active ? styles.statusConnectorActive : styles.statusConnectorInactive]} />
                            ) : null}
                          </View>
                          <View>
                            <Text style={[styles.statusTitle, !active && styles.statusTitleInactive]}>{item.title}</Text>
                            <Text style={[styles.statusSub, !active && styles.statusSubInactive]}>{item.subtitle}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : null}
            </ScrollView>

            <Pressable style={styles.ctaBtn} onPress={handleNext}>
              <Text style={styles.ctaText}>{ui.cta}</Text>
            </Pressable>
          </>
        )}

        {isStartNavigation ? (
          <Pressable style={[styles.ctaBtn, styles.ctaStart]} onPress={handleNext}>
            <Text style={styles.ctaText}>{ui.cta}</Text>
          </Pressable>
        ) : null}
      </View>

      <Modal visible={showCompleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <Pressable style={styles.modalClose} onPress={() => setShowCompleteModal(false)}>
              <Ionicons name="close" size={14} color="#9BA1AA" />
            </Pressable>
            <Text style={styles.confirmTitle}>Complete Service?</Text>
            <Text style={styles.confirmSub}>Mark this Trip as completed and collect payment</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancelBtn} onPress={() => setShowCompleteModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalConfirmBtn} onPress={confirmComplete}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showRatingModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.ratingCard}>
            <Text style={styles.ratingTitleModal}>Rate your experience with Marcus Johnson</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Pressable key={item} onPress={() => setRating(item)}>
                  <Ionicons
                    name={rating >= item ? "star" : "star-outline"}
                    size={24}
                    color={rating >= item ? "#F4B400" : "#C7CCD3"}
                  />
                </Pressable>
              ))}
            </View>
            <Text style={styles.reviewLabel}>Tell us how it went (optional)</Text>
            <TextInput
              style={styles.reviewInput}
              value={review}
              onChangeText={setReview}
              placeholder="Share your experience"
              placeholderTextColor="#A0A6AE"
            />
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancelBtn} onPress={() => setShowRatingModal(false)}>
                <Text style={styles.modalCancelText}>Skip</Text>
              </Pressable>
              <Pressable style={styles.modalConfirmBtn} onPress={() => setShowRatingModal(false)}>
                <Text style={styles.modalConfirmText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7F3",
    width: "100%",
    maxWidth: 393,
    borderRadius: 32,
    overflow: "hidden",
    alignSelf: "center",
  },
  mapWrap: { height: "47%", overflow: "hidden", borderBottomLeftRadius: 22, borderBottomRightRadius: 22 },
  mapFallback: {
    flex: 1,
    backgroundColor: "#E9ECE6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  mapFallbackTitle: { fontSize: 14, fontWeight: "600", color: "#2F3740" },
  mapFallbackSub: { marginTop: 4, textAlign: "center", fontSize: 12, color: "#6D7480" },
  backBtn: {
    position: "absolute",
    top: 44,
    left: 16,
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  headerTitleWrap: {
    position: "absolute",
    top: 46,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#231F20" },
  sheet: {
    position: "absolute",
    width: "100%",
    maxWidth: 393,
    height: "54%",
    alignSelf: "center",
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingBottom: 16,
    paddingTop: 10,
  },
  sheetArrivedPickup: {
    top: 82,
    height: undefined,
  },
  sheetTripFlow: {
    height: "60%",
  },
  sheetStartTrip: {
    top: 112,
    bottom: 0,
    height: undefined,
  },
  sheetArrivedDestination: {
    top: 93,
    bottom: 0,
    height: undefined,
  },
  sheetCompleteTrip: {
    top: 93,
    bottom: 0,
    height: undefined,
  },
  tripTopBar: {
    height: 76,
    marginHorizontal: -18,
    paddingHorizontal: 18,
    paddingTop: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "flex-start",
    paddingBottom: 0,
  },
  handle: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D4D7D3",
    alignSelf: "center",
    marginBottom: 10,
  },
  etaTitle: { fontSize: 16, fontWeight: "600", color: "#2C3138" },
  etaDistance: { marginTop: 2, fontSize: 11, color: "#78808A" },
  etaUnderline: {
    marginTop: 1,
    marginBottom: 0,
    marginHorizontal: -18,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E5EA",
  },
  profileRow: {
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileRowWithEtaBar: {
    marginTop: -18,
  },
  profileRowArrivedPickup: {
    marginTop: 8,
  },
  profileLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: { width: "100%", height: "100%" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  name: { fontSize: 14, color: "#2D323A", fontWeight: "600" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  ratingText: { fontSize: 11, color: "#6F7680" },
  profileRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 33,
    height: 33,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6EFEA",
  },
  iconBtnDisabled: { backgroundColor: "#F1F3F1" },
  startContent: { flex: 1, marginTop: 2 },
  scroll: { marginTop: 12 },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#333942" },
  routeList: { marginTop: 4, gap: 6 },
  routeItem: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  routeIconCol: { width: 24, alignItems: "center" },
  routeBubble: {
    width: 24,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
  },
  pickupDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: "#2F8A57" },
  routeLine: { width: 1, height: 16, backgroundColor: "#D9DDD8", marginTop: 2 },
  routeTextWrap: { flex: 1 },
  routeLabel: { fontSize: 10, color: "#A0A6AE" },
  routeValue: { marginTop: 1, fontSize: 12, color: "#535B66" },
  noteCard: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: "#F3F6FA",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  noteLabel: { marginTop: 8, fontSize: 10, color: "#A0A6AE" },
  noteValue: { marginTop: 3, fontSize: 10, color: "#6A727C" },
  fareWrap: { marginTop: 12 },
  fareWrapStart: { marginTop: 2 },
  fareRow: { marginTop: 4, flexDirection: "row", alignItems: "center", gap: 4 },
  fareValue: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  ctaBtn: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#2F8A57",
    paddingVertical: 12,
    alignItems: "center",
  },
  ctaStart: {
    marginTop: 20,
  },
  ctaText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600" },
  statusWrap: { marginTop: 12 },
  statusHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  statusList: { marginTop: 8, gap: 7 },
  statusItem: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  statusIconCol: { width: 12, alignItems: "center" },
  statusDot: { width: 10, height: 10, borderRadius: 999, marginTop: 2 },
  statusConnector: { width: 1, height: 18, marginTop: 2 },
  statusConnectorActive: { backgroundColor: "#0F7A3A" },
  statusConnectorInactive: { backgroundColor: "#C8CDD3" },
  statusDotActive: { backgroundColor: "#0F7A3A" },
  statusDotInactive: { backgroundColor: "#C8CDD3" },
  statusTitle: { fontSize: 10, color: "#196B3E", fontWeight: "500" },
  statusTitleInactive: { color: "#8E959F" },
  statusSub: { fontSize: 9, color: "#6B7380", marginTop: 1 },
  statusSubInactive: { color: "#A9AFB8" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  confirmCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  modalClose: { position: "absolute", top: 10, right: 10, zIndex: 2 },
  confirmTitle: { textAlign: "center", fontSize: 16, fontWeight: "600", color: "#231F20", marginTop: 10 },
  confirmSub: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 10,
    color: "#7B8089",
    lineHeight: 18,
  },
  modalButtons: { marginTop: 16, flexDirection: "row", gap: 10 },
  modalCancelBtn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DCE1E7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  modalCancelText: { fontSize: 14, color: "#4A515B", fontWeight: "500" },
  modalConfirmBtn: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#2F8A57",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  modalConfirmText: { fontSize: 14, color: "#FFFFFF", fontWeight: "600" },
  ratingCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  ratingTitleModal: { fontSize: 13, color: "#2E333B", fontWeight: "500", textAlign: "center" },
  stars: { marginTop: 14, flexDirection: "row", justifyContent: "center", gap: 8 },
  reviewLabel: { marginTop: 14, fontSize: 13, color: "#666D77" },
  reviewInput: {
    marginTop: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E4EA",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 13,
    color: "#2B3139",
  },
});
