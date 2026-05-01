import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Image, LayoutChangeEvent, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useAuthStore } from "@/store/auth";
import { toFirstName } from "@/lib/display-name";

const statCards = [
  {
    label: "New Requests",
    value: "3",
    bg: "#EAF3EE",
    icon: "briefcase-outline" as const,
    iconBg: "#0F6C37",
    iconColor: "#FFFFFF",
  },
  {
    label: "Scheduled",
    value: "4",
    bg: "#EDF6E2",
    icon: "calendar-outline" as const,
    iconBg: "#8BC63F",
    iconColor: "#FFFFFF",
  },
  {
    label: "In Progress",
    value: "1",
    bg: "#FFF6EF",
    icon: "time-outline" as const,
    iconBg: "#F28B1A",
    iconColor: "#FFFFFF",
  },
  {
    label: "Awaiting Payment",
    value: "2",
    bg: "#F8F6FF",
    icon: "information-circle-outline" as const,
    iconBg: "#7B61FF",
    iconColor: "#FFFFFF",
  },
];

const earnings = [
  { label: "Available", value: "\u20A694,000", tone: "success" as const },
  { label: "Pending", value: "\u20A625,000", tone: "neutral" as const },
];

const revenueBars = [80, 40, 20, 36, 28, 80];

const recentTransactions = [
  {
    id: "1",
    title: "Kitchen Renovation",
    subtitle: "John Smith",
    meta: "Oct 28, 2025",
    amount: "+\u20A664,000",
    subAmount: "Platform fee: \u20A64,000",
    color: "#0F7A3A",
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
  {
    id: "2",
    title: "Kitchen Renovation",
    subtitle: "****1234",
    meta: "Nov 13, 2025",
    amount: "-\u20A650,000",
    subAmount: "Completed",
    color: "#E53935",
    icon: "arrow-up" as const,
    rotate: "45deg",
    iconBg: "#FCE8E8",
    iconColor: "#E53935",
  },
  {
    id: "3",
    title: "Tip from John Smith",
    subtitle: "Kitchen Renovation",
    meta: "Oct 28, 2025",
    amount: "+\u20A6500",
    subAmount: "",
    color: "#0F7A3A",
    icon: "arrow-down" as const,
    rotate: "45deg",
    iconBg: "#E7F3EC",
    iconColor: "#0F7A3A",
  },
];

type TourTarget = "header" | "stats" | "earnings" | "revenue" | "transactions" | "none";
type TooltipPlacement = "top" | "bottom" | "center";

const tourSteps = [
  {
    id: 0,
    title: "Welcome to your dashboard",
    body: "Manage jobs, track your earnings, and\nmonitor your performance all in one place.",
    badge: "",
    cta: "Take a quick tour",
    target: "none" as TourTarget,
    placement: "center" as TooltipPlacement,
    pointer: "none" as const,
  },
  {
    id: 1,
    title: "Availability Status",
    body: "Turn this on to start receiving job requests.\nWhen off, clients won't be able to hire you.",
    badge: "1 of 6",
    cta: "Next",
    target: "header" as TourTarget,
    placement: "bottom" as TooltipPlacement,
    pointer: "top" as const,
  },
  {
    id: 2,
    title: "Welcome Phil",
    body: "Here you can track your Total revenue,\nmanage jobs, and monitor your ratings.",
    badge: "2 of 6",
    cta: "Next",
    target: "stats" as TourTarget,
    placement: "bottom" as TooltipPlacement,
    pointer: "top" as const,
  },
  {
    id: 3,
    title: "Wallet",
    body: "Track your available balance and withdraw\nyour earnings anytime.",
    badge: "3 of 6",
    cta: "Next",
    target: "earnings" as TourTarget,
    placement: "bottom" as TooltipPlacement,
    pointer: "top" as const,
  },
  {
    id: 4,
    title: "Performance Insights",
    body: "Monitor your earnings, response time, and\njob performance.",
    badge: "4 of 6",
    cta: "Next",
    target: "revenue" as TourTarget,
    placement: "top" as TooltipPlacement,
    pointer: "bottom" as const,
  },
  {
    id: 5,
    title: "Recent Transaction",
    body: "View your latest payments, tips,\nand withdrawals.",
    badge: "5 of 6",
    cta: "Next",
    target: "transactions" as TourTarget,
    placement: "top" as TooltipPlacement,
    pointer: "bottom" as const,
  },
  {
    id: 6,
    title: "Explore your tools",
    body: "Use the Nav bar to access hire alerts,\nmessages, activity, and profile settings.",
    badge: "6 of 6",
    cta: "Got it!",
    target: "none" as TourTarget,
    placement: "bottom" as TooltipPlacement,
    pointer: "bottom" as const,
  },
];

export default function ServiceProviderHome() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [nextOnlineState, setNextOnlineState] = useState<boolean | null>(null);
  const [tourStep, setTourStep] = useState<number | null>(0);
  const [showTourDoneModal, setShowTourDoneModal] = useState(false);
  const [sectionLayouts, setSectionLayouts] = useState<Partial<Record<TourTarget, { y: number; height: number }>>>({});
  const [scrollY, setScrollY] = useState(0);
  const email = useAuthStore((state) => state.email);
  const name = useAuthStore((state) => state.name);
  const displayName = useMemo(() => toFirstName(name, email), [name, email]);

  const openStatusModal = () => {
    const targetState = !isOnline;
    setNextOnlineState(targetState);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setNextOnlineState(null);
  };

  const confirmStatusChange = () => {
    if (nextOnlineState !== null) {
      setIsOnline(nextOnlineState);
    }
    closeStatusModal();
  };

  const currentTourStep = tourStep !== null ? tourSteps[tourStep] : null;

  const closeTour = () => {
    setTourStep(null);
    setShowTourDoneModal(false);
  };

  const nextTourStep = () => {
    if (tourStep === null) return;

    if (tourStep >= tourSteps.length - 1) {
      setTourStep(null);
      const earningsLayout = sectionLayouts.earnings;
      if (earningsLayout) {
        const nextScrollY = Math.max(0, earningsLayout.y - 220);
        scrollRef.current?.scrollTo({ y: nextScrollY, animated: true });
        setTimeout(() => setShowTourDoneModal(true), 180);
      } else {
        setShowTourDoneModal(true);
      }
      return;
    }

    setTourStep((prev) => (prev === null ? prev : prev + 1));
  };

  const setSectionLayout = (key: TourTarget) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setSectionLayouts((prev) => ({ ...prev, [key]: { y, height } }));
  };

  const getTooltipTop = () => {
    if (!currentTourStep) return 0;

    const screenHeight = Dimensions.get("window").height;
    const estimatedCardHeight = currentTourStep.id === 6 ? 122 : currentTourStep.id === 0 ? 132 : 116;
    const minTop = 92;
    const maxTop = screenHeight - estimatedCardHeight - 36;

    if (currentTourStep.id === 0) return 226;
    if (currentTourStep.id === 6) return Math.max(minTop, Math.min(maxTop, screenHeight - 210));

    const targetLayout = currentTourStep.target !== "none" ? sectionLayouts[currentTourStep.target] : null;
    if (!targetLayout) return Math.max(minTop, Math.min(maxTop, 320));
    const targetViewportY = targetLayout.y - scrollY;

    if (currentTourStep.placement === "bottom") {
      return Math.max(minTop, Math.min(maxTop, targetViewportY + targetLayout.height + 8));
    }

    if (currentTourStep.placement === "top") {
      return Math.max(minTop, Math.min(maxTop, targetViewportY - estimatedCardHeight - 8));
    }

    return Math.max(minTop, Math.min(maxTop, targetViewportY));
  };

  const getHighlightStyle = (target: TourTarget) => {
    if (!currentTourStep || currentTourStep.target !== target) return undefined;
    return {
      borderColor: "#0F7A3A",
      borderWidth: 1,
      borderRadius: 12,
      shadowColor: "#0F7A3A",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    } as const;
  };

  const getReadyModalStyle = () => {
    const modalWidth = 250;
    const left = 48;

    const earningsLayout = sectionLayouts.earnings;
    if (!earningsLayout) {
      return { top: 258, left, width: modalWidth, minHeight: 118 } as const;
    }

    return { top: 104, left, width: modalWidth, minHeight: 118 } as const;
  };

  useEffect(() => {
    if (!currentTourStep || currentTourStep.target === "none") return;

    const targetLayout = sectionLayouts[currentTourStep.target];
    if (!targetLayout) return;

    const desiredViewportTopByStep: Record<number, number> = {
      1: 92,
      2: 180,
      3: 320,
      4: 430,
      5: 560,
      6: 430,
    };

    const desiredViewportTop = desiredViewportTopByStep[currentTourStep.id] ?? 240;
    const nextScrollY = Math.max(0, targetLayout.y - desiredViewportTop);

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: nextScrollY, animated: true });
    }, 40);

    return () => clearTimeout(timer);
  }, [currentTourStep, sectionLayouts]);

  return (
    <View className="flex-1 bg-[#FFFFFF]">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingTop: 20, paddingBottom: 40 }}
        scrollEnabled={!currentTourStep}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <View className="flex-row items-center justify-between" onLayout={setSectionLayout("header")}>
          <View>
            <Text className="text-[13px] text-[#231F2099]">Hello</Text>
            <Text className="mt-1 text-lg font-semibold text-[#231F20]">{displayName} 👋</Text>
          </View>
          <View className="flex-row items-center gap-1" style={getHighlightStyle("header")}>
            <View className="flex-row items-center gap-0 rounded-md border border-[#E5E7EB] bg-[#F8FAF8] px-1.5 py-0.5">
              <Ionicons name="location-outline" size={12} color={isOnline ? "#22C55E" : "#9CA3AF"} />
              <Text className={`text-[10px] font-semibold ${isOnline ? "text-[#0F7A3A]" : "text-[#6B7280]"}`}>
                {isOnline ? "Available" : "Unavailable"}
              </Text>
              <Switch
                value={isOnline}
                onValueChange={openStatusModal}
                style={{ marginLeft: -8, transform: [{ scaleX: 0.88 }, { scaleY: 0.88 }] }}
                trackColor={{ false: "#D1D5DB", true: "#22C55E" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D1D5DB"
              />
            </View>
            <Pressable
              className="h-10 w-10 items-center justify-center"
              onPress={() => router.push("/(protected)/(serviceProvider)/notifications")}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Open notifications"
            >
              <Ionicons name="notifications-outline" size={23} color="#4B5563" />
            </Pressable>
          </View>
        </View>

        <View className="mt-5 flex-row flex-wrap gap-3" style={getHighlightStyle("stats")} onLayout={setSectionLayout("stats")}>
          {statCards.map((card) => (
            <View key={card.label} className="w-[48%] rounded-2xl p-3" style={{ backgroundColor: card.bg }}>
              <View className="flex-row items-center gap-2">
                <View className="h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: card.iconBg }}>
                  <Ionicons name={card.icon} size={14} color={card.iconColor} />
                </View>
                <Text className="text-lg font-semibold text-[#231F20]">{card.value}</Text>
              </View>
              <Text className="mt-2 text-xs text-[#231F2099]">{card.label}</Text>
            </View>
          ))}
        </View>

        <View
          className="mt-6 rounded-2xl bg-white p-4 shadow-sm"
          style={getHighlightStyle("earnings")}
          onLayout={setSectionLayout("earnings")}
        >
          <Text className="text-xs font-semibold text-[#231F2099]">Earnings</Text>
          <View className="mt-3 flex-row gap-3">
            {earnings.map((item) => (
              <View
                key={item.label}
                className={`flex-1 rounded-xl border px-3 py-3 ${
                  item.tone === "success" ? "border-[#0F7A3A] bg-[#0F7A3A]" : "border-[#E6E6E6] bg-[#F7F7F7]"
                }`}
              >
                <View className="flex-row items-center">
                  <View className="flex-row items-center gap-2">
                    {item.tone === "success" && (
                      <View className="h-6 w-6 items-center justify-center rounded-lg bg-white/20">
                        <Ionicons name="wallet-outline" size={14} color="#FFFFFF" />
                      </View>
                    )}
                    <Text className={`text-sm font-semibold ${item.tone === "success" ? "text-white" : "text-[#231F20]"}`}>
                      {item.value}
                    </Text>
                  </View>
                  {item.tone === "success" && (
                    <View className="ml-auto mt-4">
                      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text
                  className={`mt-2 text-xs ${item.tone === "success" ? "text-white/80 ml-8" : "text-[#231F2099]"}`}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View
          className="mt-6 rounded-2xl bg-white p-4 shadow-sm"
          style={getHighlightStyle("revenue")}
          onLayout={setSectionLayout("revenue")}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-[#231F20]">Revenue Overview</Text>
            <View className="flex-row items-center gap-1 rounded-full bg-[#F2F3EE] px-3 py-1">
              <Text className="text-[10px] text-[#231F2099]">Last 6 months</Text>
              <Ionicons name="chevron-down" size={12} color="#231F2099" />
            </View>
          </View>
          <View className="mt-4 flex-row">
            <View className="mr-3 h-[120px] justify-between">
              {["60K", "40K", "20K", "10K", "0K"].map((label) => (
                <Text key={label} className="text-[10px] font-semibold text-[#231F2099]">
                  {label}
                </Text>
              ))}
            </View>
            <View className="flex-1">
              <View className="relative h-[120px] flex-row items-end justify-between">
                <View className="absolute inset-0 z-10">
                  <View className="absolute left-0 right-0 top-0 h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 top-[40px] h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 top-[80px] h-px bg-[#ECECEC]" />
                  <View className="absolute left-0 right-0 bottom-0 h-px bg-[#ECECEC]" />
                </View>
                {revenueBars.map((height, index) => (
                  <View key={`${height}-${index}`} className="w-[12%] items-center">
                    <View className="h-[120px] w-5 bg-[#F1F2ED] opacity-70" />
                    <View
                      className="absolute bottom-0 w-5 bg-[#0F7A3A] z-20"
                      style={{ height }}
                    />
                  </View>
                ))}
              </View>
              <View className="mt-2 flex-row justify-between px-1">
                {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((label) => (
                  <Text key={label} className="text-[10px] text-[#231F2099]">
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </View>
          <View className="mt-3 flex-row items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((dot) => (
              <View
                key={dot}
                className={`h-2 w-2 rounded-full ${dot === 0 ? "bg-[#0F7A3A]" : "bg-[#D7DBD1]"}`}
              />
            ))}
          </View>
        </View>

        <View
          className="mt-6 rounded-2xl bg-white p-4 shadow-sm"
          style={getHighlightStyle("transactions")}
          onLayout={setSectionLayout("transactions")}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-xs font-semibold text-[#231F2099]">Recent Transaction</Text>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => router.push("/(protected)/(serviceProvider)/transaction-history")}
            >
              <Text className="text-[10px] font-semibold text-[#231F2099]">See all</Text>
              <Ionicons name="chevron-forward" size={12} color="#231F2099" />
            </Pressable>
          </View>
          <View className="mt-3 gap-3">
            {recentTransactions.map((item, index) => (
              <View
                key={item.id}
                className={`flex-row items-center justify-between ${index < recentTransactions.length - 1 ? "border-b border-[#ECECEC] pb-3" : ""}`}
              >
                <View className="flex-row items-center gap-2">
                  <View className="h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: item.iconBg }}>
                    <Ionicons
                      name={item.icon}
                      size={14}
                      color={item.iconColor}
                      style={item.rotate ? { transform: [{ rotate: item.rotate }] } : undefined}
                    />
                  </View>
                  <View>
                    <Text className="text-xs font-semibold text-[#231F20]">{item.title}</Text>
                    <Text className="text-[10px] text-[#231F2099]">{item.subtitle}</Text>
                    <Text className="text-[10px] text-[#231F2099]">{item.meta}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-xs font-semibold" style={{ color: item.color }}>
                    {item.amount}
                  </Text>
                  {!!item.subAmount && <Text className="text-[10px] text-[#231F2099]">{item.subAmount}</Text>}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {currentTourStep && (
        <View className="absolute inset-0 bg-black/45 px-6">
          <View
            className="absolute rounded-[8px] bg-white px-3 py-3"
            style={
              currentTourStep.id === 0
                ? { top: 144, left: 48, width: 270, minHeight: 137 }
                : currentTourStep.id === 1
                  ? { top: 80, left: 71, width: 270, minHeight: 137 }
                : currentTourStep.id === 2
                  ? { top: getTooltipTop(), left: 56, width: 250, minHeight: 122 }
                : currentTourStep.id === 3
                  ? { top: getTooltipTop() + 8, left: 56, width: 270, minHeight: 124 }
                : currentTourStep.id === 4
                  ? { top: getTooltipTop() - 8, left: 24, width: 270, minHeight: 122 }
                : currentTourStep.id === 5
                  ? { top: getTooltipTop() - 26, left: 24, width: 270, minHeight: 122 }
                : currentTourStep.id === 6
                  ? { top: getTooltipTop() - 20, left: 56, width: 250, minHeight: 114 }
                : { top: getTooltipTop(), left: 24, right: 24 }
            }
          >
            {currentTourStep.pointer === "top" && (
              <View
                className="absolute -top-2 h-0 w-0 border-b-[8px] border-l-[8px] border-r-[8px] border-b-white border-l-transparent border-r-transparent"
                style={
                  currentTourStep.id === 2 || currentTourStep.id === 3
                    ? { left: 18 }
                    : { right: currentTourStep.id === 1 ? 58 : 8 }
                }
              />
            )}
            {currentTourStep.pointer === "bottom" && (
              <View
                className="absolute -bottom-2 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"
                style={
                  currentTourStep.id === 6
                    ? { left: 18 }
                    : currentTourStep.id === 4 || currentTourStep.id === 5
                      ? { right: 18 }
                      : { left: 8 }
                }
              />
            )}

            <View className="flex-row items-start justify-between">
              <Text className="text-[14px] font-semibold text-[#2D2F33]">{currentTourStep.title}</Text>
              {!!currentTourStep.badge && <Text className="text-[12px] text-[#8D929A]">{currentTourStep.badge}</Text>}
            </View>
            <Text
              className={`${
                currentTourStep.id === 0
                  ? "mt-5"
                  : currentTourStep.id === 1
                    ? "mt-3"
                  : currentTourStep.id === 2
                    ? "mt-4"
                  : currentTourStep.id === 3
                      ? "mt-4"
                      : currentTourStep.id === 4
                        ? "mt-3"
                        : currentTourStep.id === 5
                          ? "mt-3"
                          : currentTourStep.id === 6
                            ? "mt-4"
                      : "mt-2"
              } text-[12px] leading-[17px] text-[#737881]`}
            >
              {currentTourStep.body}
            </Text>

            <View className="mt-3 flex-row items-center justify-between">
              <Pressable onPress={closeTour}>
                <Text className="text-[13px] text-[#7C8189]">Skip</Text>
              </Pressable>
              <Pressable className="rounded-[4px] bg-[#2F8A57] px-3 py-1.5" onPress={nextTourStep}>
                <Text className="text-[12px] font-medium text-white">{currentTourStep.cta}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {showTourDoneModal && (
        <View className="absolute inset-0 bg-black/45 px-6">
          <View
            className="absolute rounded-[8px] bg-white px-4 py-3"
            style={getReadyModalStyle()}
          >
            <Text className="text-[16px] font-semibold text-[#2D2F33]">You're Ready to Go!</Text>
            <View className="mt-2">
              <Text className="text-[11px] leading-[16px] text-[#737881]">You've completed the dashboard tour.</Text>
              <Text className="text-[11px] leading-[16px] text-[#737881]">Remember, you can always revisit the tour or</Text>
              <Text className="text-[11px] leading-[16px] text-[#737881]">access helpful tips from the Help section.</Text>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <Pressable onPress={closeTour}>
                <Text className="text-[13px] text-[#7C8189]">Skip</Text>
              </Pressable>
              <Pressable className="rounded-[4px] bg-[#2F8A57] px-3 py-1.5" onPress={closeTour}>
                <Text className="text-[12px] font-medium text-white">Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {showStatusModal && (
        <View className="absolute inset-0 bg-black/40">
          <View className="absolute right-1 top-[86px] w-[280px] rounded-xl bg-white p-4 shadow-lg">
            <Text className="text-sm font-semibold text-[#231F20]">
              {nextOnlineState ? "Ready to Receive Orders?" : "Go Offline?"}
            </Text>
            <Text className="mt-2 text-xs text-[#231F2099]">
              {nextOnlineState
                ? "You will start receiving service requests."
                : "You won't receive new requests while offline."}
            </Text>
            <View className="mt-4 flex-row justify-end gap-3">
              <Pressable onPress={closeStatusModal} className="rounded-full bg-[#F2F3EE] px-4 py-2">
                <Text className="text-xs font-semibold text-[#231F20]">Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmStatusChange} className="rounded-full bg-[#0F7A3A] px-4 py-2">
                <Text className="text-xs font-semibold text-white">
                  {nextOnlineState ? "Go Online" : "Yes Go Offline"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
