import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

type TabKey = "alerts" | "jobs";
type JobFilter = "all" | "active" | "pending" | "completed";
type JobStatus = Exclude<JobFilter, "all">;

type AlertItem = {
  id: string;
  title: string;
  date: string;
  pickup: string;
  dropoff: string;
  distance: string;
  fare: string;
  isNew?: boolean;
};

type JobItem = {
  id: string;
  title: string;
  customer: string;
  date: string;
  pickup: string;
  dropoff: string;
  distance: string;
  fare: string;
  status: JobStatus;
  rating?: number;
  review?: string;
};

const filters: JobFilter[] = ["all", "active", "pending", "completed"];

const alerts: AlertItem[] = [
  {
    id: "a1",
    title: "Package Delivery",
    date: "Oct 10, 2025 - 9 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "10.5 km",
    fare: "₦5,000",
    isNew: true,
  },
  {
    id: "a2",
    title: "Package Delivery",
    date: "Oct 10, 2025 - 9 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "10.5 km",
    fare: "₦5,000",
    isNew: true,
  },
  {
    id: "a3",
    title: "Package Delivery",
    date: "Oct 10, 2025 - 9 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "10.5 km",
    fare: "₦5,000",
    isNew: true,
  },
];

const jobs: JobItem[] = [
  {
    id: "j1",
    title: "Package Delivery",
    customer: "Thomas Frank",
    date: "Oct 10, 2025 - 9 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "10.5 km",
    fare: "₦5,000",
    status: "active",
  },
  {
    id: "j2",
    title: "Package Delivery",
    customer: "Oscar Williams",
    date: "Oct 18, 2025 - 11 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "13 km",
    fare: "₦7,000",
    status: "pending",
  },
  {
    id: "j3",
    title: "Package Delivery",
    customer: "Oscar Williams",
    date: "Oct 18, 2025 - 11 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "13 km",
    fare: "₦7,000",
    status: "completed",
    rating: 5,
    review: "Excellent work! Very professional and finished ahead of schedule.",
  },
  {
    id: "j4",
    title: "Package Delivery",
    customer: "Oscar Williams",
    date: "Oct 18, 2025 - 11 AM",
    pickup: "15 Victoria Island, Lagos...",
    dropoff: "24 Palm Avenue, Lekki P...",
    distance: "13 km",
    fare: "₦7,000",
    status: "completed",
    rating: 5,
    review:
      "Excellent work! Very professional and finished ahead of schedule. The kitchen looks amazing. Highly recommend!",
  },
];

const cancelReasons = [
  "Client is unresponsive",
  "I'm no longer available",
  "Unable to reach the location",
  "Client requested cancellation",
  "Incorrect address",
];

function getStatusBadge(status: JobStatus) {
  if (status === "active") return { label: "In Progress", bg: "#E8F1FF", fg: "#2F74E2" };
  if (status === "pending") return { label: "Pending", bg: "#FEF3C7", fg: "#B45309" };
  return { label: "Completed", bg: "#E7F7EC", fg: "#0F7A3A" };
}

export default function HireScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("alerts");
  const [jobFilter, setJobFilter] = useState<JobFilter>("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>("j1");
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [cancelJobId, setCancelJobId] = useState<string | null>(null);
  const [otherReasonMode, setOtherReasonMode] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReasonText, setOtherReasonText] = useState("");

  const filteredJobs = useMemo(() => {
    if (jobFilter === "all") return jobs;
    return jobs.filter((item) => item.status === jobFilter);
  }, [jobFilter]);

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason) ? prev.filter((entry) => entry !== reason) : [...prev, reason]
    );
  };

  const closeCancelModal = () => {
    setCancelJobId(null);
    setOtherReasonMode(false);
    setSelectedReasons([]);
    setOtherReasonText("");
  };

  const renderRouteRows = (pickup: string, dropoff: string, distance: string, fare: string) => (
    <View style={styles.routeBlock}>
      <View style={styles.routeRow}>
        <View style={styles.iconBubble}>
          <View style={styles.pickupDot} />
        </View>
        <View style={styles.routeTextWrap}>
          <Text style={styles.routeLabel}>Pickup</Text>
          <Text style={styles.routeValue} numberOfLines={1}>
            {pickup}
          </Text>
        </View>
      </View>
      <View style={styles.routeRow}>
        <View style={styles.iconBubble}>
          <Ionicons name="location-sharp" size={14} color="#2F8A57" />
        </View>
        <View style={styles.routeTextWrap}>
          <Text style={styles.routeLabel}>Dropoff</Text>
          <Text style={styles.routeValue} numberOfLines={1}>
            {dropoff}
          </Text>
        </View>
      </View>
      <View style={styles.rowBetween}>
        <View style={styles.distanceRow}>
          <Ionicons name="location-sharp" size={11} color="#2F8A57" />
          <Ionicons name="swap-horizontal-outline" size={11} color="#2F8A57" />
          <Ionicons name="location-sharp" size={11} color="#2F8A57" />
          <Text style={styles.metaText}>Distance: {distance}</Text>
        </View>
        <Text style={styles.fareText}>{fare}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Hire Alerts</Text>

        <View style={styles.tabSwitch}>
          <Pressable
            style={[styles.tabButton, activeTab === "alerts" && styles.tabButtonActive]}
            onPress={() => setActiveTab("alerts")}
          >
            <Text style={[styles.tabButtonText, activeTab === "alerts" && styles.tabButtonTextActive]}>
              Hire Alerts
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tabButton, activeTab === "jobs" && styles.tabButtonActive]}
            onPress={() => setActiveTab("jobs")}
          >
            <Text style={[styles.tabButtonText, activeTab === "jobs" && styles.tabButtonTextActive]}>Jobs</Text>
          </Pressable>
        </View>

        {activeTab === "alerts" ? (
          <View style={styles.stack}>
            {alerts.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </View>
                  {item.isNew ? (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>New</Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={14} color="#2F8A57" />
                  <Text style={styles.metaText}>{item.date}</Text>
                </View>

                {renderRouteRows(item.pickup, item.dropoff, item.distance, item.fare)}

                <View style={styles.buttonRow}>
                  <Pressable style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Decline</Text>
                  </Pressable>
                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => router.push("/(protected)/(serviceProvider)/(tabs)/hire/tracking?source=alerts")}
                  >
                    <Text style={styles.primaryButtonText}>Accept</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.jobsWrap}>
            <View style={styles.filterRow}>
              {filters.map((filter) => {
                const selected = jobFilter === filter;
                return (
                  <Pressable
                    key={filter}
                    style={[styles.filterChip, selected && styles.filterChipActive]}
                    onPress={() => setJobFilter(filter)}
                  >
                    <Text style={[styles.filterChipText, selected && styles.filterChipTextActive]}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.stack}>
              {filteredJobs.map((job) => {
                const badge = getStatusBadge(job.status);
                const expanded = expandedJobId === job.id;
                const reviewExpanded = expandedReviewId === job.id;
                const reviewText = job.review ?? "";
                const reviewPreview =
                  reviewExpanded || reviewText.length <= 74 ? reviewText : `${reviewText.slice(0, 74)}...`;

                return (
                  <View key={job.id} style={styles.card}>
                    <View style={styles.rowBetween}>
                      <View>
                        <Text style={styles.cardTitle}>{job.title}</Text>
                        <Text style={styles.customerText}>{job.customer}</Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                        <Text style={[styles.statusBadgeText, { color: badge.fg }]}>{badge.label}</Text>
                      </View>
                    </View>

                    <View style={styles.metaRow}>
                      <Ionicons name="calendar-outline" size={14} color="#2F8A57" />
                      <Text style={styles.metaText}>{job.date}</Text>
                    </View>

                    {renderRouteRows(job.pickup, job.dropoff, job.distance, job.fare)}

                    {job.status !== "completed" ? (
                      <View style={styles.actionsBlock}>
                        <Pressable
                          style={styles.viewActionRow}
                          onPress={() => setExpandedJobId((prev) => (prev === job.id ? null : job.id))}
                        >
                          <Text style={styles.viewActionText}>View Actions</Text>
                          <Ionicons
                            name={expanded ? "chevron-up" : "chevron-down"}
                            size={14}
                            color="#3D434B"
                          />
                        </Pressable>

                        {expanded ? (
                          <View style={styles.expandedActions}>
                            {job.status === "active" ? (
                              <>
                                <Pressable
                                  style={styles.primaryButton}
                                  onPress={() =>
                                    router.push(
                                      "/(protected)/(serviceProvider)/(tabs)/hire/tracking?source=jobs"
                                    )
                                  }
                                >
                                  <View style={styles.inlineCenter}>
                                    <Ionicons name="navigate-outline" size={14} color="#FFFFFF" />
                                    <Text style={styles.primaryButtonText}>Show Direction</Text>
                                  </View>
                                </Pressable>
                                <Pressable onPress={() => setCancelJobId(job.id)}>
                                  <Text style={styles.cancelLink}>Cancel Request</Text>
                                </Pressable>
                              </>
                            ) : (
                              <>
                                <Pressable
                                  style={styles.primaryButton}
                                  onPress={() =>
                                    router.push(
                                      "/(protected)/(serviceProvider)/(tabs)/hire/tracking?source=jobs"
                                    )
                                  }
                                >
                                  <Text style={styles.primaryButtonText}>En Route</Text>
                                </Pressable>
                                <View style={styles.buttonRow}>
                                  <Pressable
                                    style={styles.secondaryButton}
                                    onPress={() =>
                                      router.push("/(protected)/(serviceProvider)/(tabs)/hire/details")
                                    }
                                  >
                                    <Text style={styles.secondaryButtonText}>View Details</Text>
                                  </Pressable>
                                  <Pressable style={styles.secondaryButton}>
                                    <Text style={styles.secondaryButtonText}>Message</Text>
                                  </Pressable>
                                </View>
                                <Pressable onPress={() => setCancelJobId(job.id)}>
                                  <Text style={styles.cancelLink}>Cancel Request</Text>
                                </Pressable>
                              </>
                            )}
                          </View>
                        ) : null}
                      </View>
                    ) : (
                      <View style={styles.completedWrap}>
                        <View style={styles.ratingRow}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons key={star} name="star" size={16} color="#F4B400" />
                          ))}
                          <Text style={styles.ratingValue}>{job.rating?.toFixed(1) ?? "5.0"}</Text>
                        </View>
                        <Text style={styles.reviewText}>{reviewPreview}</Text>
                        <Pressable onPress={() => setExpandedReviewId((prev) => (prev === job.id ? null : job.id))}>
                          <Text style={styles.readMoreText}>{reviewExpanded ? "Read less" : "Read more"}</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={Boolean(cancelJobId)} transparent animationType="fade" onRequestClose={closeCancelModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.cancelModal}>
            <View style={styles.rowBetween}>
              {otherReasonMode ? (
                <Pressable onPress={() => setOtherReasonMode(false)}>
                  <Ionicons name="chevron-back" size={16} color="#3D434B" />
                </Pressable>
              ) : (
                <View style={{ width: 16 }} />
              )}
              <Text style={styles.cancelTitle}>Why do you want to cancel?</Text>
              <Pressable onPress={closeCancelModal}>
                <Ionicons name="close" size={16} color="#6B7280" />
              </Pressable>
            </View>

            {otherReasonMode ? (
              <TextInput
                multiline
                value={otherReasonText}
                onChangeText={setOtherReasonText}
                placeholder="Describe the problem"
                placeholderTextColor="#A0A6AE"
                style={styles.otherReasonInput}
              />
            ) : (
              <View style={styles.reasonList}>
                {cancelReasons.map((reason) => {
                  const selected = selectedReasons.includes(reason);
                  return (
                    <Pressable key={reason} style={styles.reasonItem} onPress={() => toggleReason(reason)}>
                      <Text style={styles.reasonText}>{reason}</Text>
                      <Ionicons
                        name={selected ? "checkbox" : "square-outline"}
                        size={16}
                        color={selected ? "#0F7A3A" : "#A0A6AE"}
                      />
                    </Pressable>
                  );
                })}
                <Pressable style={styles.reasonItem} onPress={() => setOtherReasonMode(true)}>
                  <Text style={styles.reasonText}>Other reason</Text>
                  <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                </Pressable>
              </View>
            )}

            <Pressable
              style={[
                styles.primaryButton,
                {
                  marginTop: 16,
                  opacity: selectedReasons.length > 0 || otherReasonText.trim().length > 0 ? 1 : 0.55,
                },
              ]}
              onPress={closeCancelModal}
            >
              <Text style={styles.primaryButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F6F7F3" },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#231F20",
    marginTop: 2,
  },
  tabSwitch: {
    width: 344,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 12,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ECEEE8",
    padding: 4,
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: "#E6EFEA",
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#616973",
  },
  tabButtonTextActive: {
    color: "#0F7A3A",
    fontWeight: "600",
  },
  jobsWrap: {
    marginTop: 28,
    width: 345,
    alignSelf: "center",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 22,
  },
  filterChip: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  filterChipActive: {
    backgroundColor: "#2F8A57",
    borderColor: "#2F8A57",
  },
  filterChipText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  stack: {
    width: 345,
    alignSelf: "center",
    gap: 14,
    marginTop: 16,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECEEE8",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#231F20",
  },
  customerText: {
    marginTop: 2,
    fontSize: 12,
    color: "#616973",
  },
  newBadge: {
    borderRadius: 999,
    backgroundColor: "#0F7A3A",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6E757F",
  },
  routeBlock: {
    marginTop: 10,
    gap: 8,
  },
  routeRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  iconBubble: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#E6EFEA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  pickupDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: "#2F8A57",
  },
  routeTextWrap: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: "#A0A6AE",
  },
  routeValue: {
    marginTop: 1,
    fontSize: 12,
    color: "#535B66",
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  fareText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "700",
    color: "#0F7A3A",
  },
  buttonRow: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DBDEE4",
    backgroundColor: "#FFFFFF",
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555D67",
  },
  primaryButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#2F8A57",
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  actionsBlock: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ECEEE8",
    paddingTop: 10,
  },
  viewActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewActionText: {
    fontSize: 12,
    color: "#3D434B",
    fontWeight: "500",
  },
  expandedActions: {
    marginTop: 10,
    gap: 10,
  },
  inlineCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cancelLink: {
    textAlign: "center",
    color: "#E11D48",
    fontSize: 12,
    fontWeight: "600",
    paddingTop: 4,
  },
  completedWrap: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ECEEE8",
    paddingTop: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingValue: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#2D3138",
  },
  reviewText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: "#5C636D",
  },
  readMoreText: {
    marginTop: 8,
    fontSize: 12,
    color: "#3D434B",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  cancelModal: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cancelTitle: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "600",
  },
  reasonList: {
    marginTop: 14,
    gap: 2,
  },
  reasonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  reasonText: {
    fontSize: 13,
    color: "#4A4F57",
  },
  otherReasonInput: {
    marginTop: 14,
    minHeight: 92,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
    fontSize: 13,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
  },
});
