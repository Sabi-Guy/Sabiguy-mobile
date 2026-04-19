import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

type TxStatus = "successful" | "pending" | "failed";
type DurationKey = "30d" | "3m" | "6m" | null;
type DateTarget = "start" | "end" | null;

type TransactionItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  note: string;
  status: TxStatus;
};

const filterOptions = [
  { key: "date", label: "Date" },
  { key: "successful", label: "Successful" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "all", label: "All" },
] as const;

const transactions: TransactionItem[] = [
  { id: "1", title: "Kitchen Renovation", date: "Oct 28, 2025", amount: "+₦64,000", note: "Platform fee: ₦6,400", status: "successful" },
  { id: "2", title: "Withdrawal to Bank", date: "Nov 13, 2025", amount: "-₦50,000", note: "Completed", status: "failed" },
  { id: "3", title: "Withdrawal to Bank", date: "Nov 13, 2025", amount: "-₦50,000", note: "Completed", status: "failed" },
  { id: "4", title: "Withdrawal to Bank", date: "Nov 13, 2025", amount: "-₦50,000", note: "Completed", status: "failed" },
  { id: "5", title: "Kitchen Renovation", date: "Oct 28, 2025", amount: "+₦64,000", note: "Platform fee: ₦6,400", status: "successful" },
  { id: "6", title: "Tip from John Smith", date: "Oct 28, 2025", amount: "+₦2,000", note: "", status: "successful" },
  { id: "7", title: "Tip from John Smith", date: "Oct 28, 2025", amount: "+₦4,000", note: "", status: "successful" },
  { id: "8", title: "Withdrawal to Bank", date: "Nov 13, 2025", amount: "-₦50,000", note: "Completed", status: "failed" },
  { id: "9", title: "Withdrawal to Bank", date: "Nov 13, 2025", amount: "-₦50,000", note: "Completed", status: "failed" },
];

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

const monthIndexByName: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseTransactionDate = (dateText: string) => {
  const match = dateText.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return null;
  const [, monthName, dayText, yearText] = match;
  const monthIndex = monthIndexByName[monthName];
  if (monthIndex === undefined) return null;
  const parsed = new Date(Number(yearText), monthIndex, Number(dayText));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toDayStart = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const toDayEnd = (value: Date) => {
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
};

const formatDate = (value: Date | null) => {
  if (!value) return "";
  return value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const isSameDay = (first: Date | null, second: Date | null) => {
  if (!first || !second) return false;
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const getCalendarCells = (monthAnchor: Date) => {
  const startOfMonth = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), 1);
  const endOfMonth = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth() + 1, 0);
  const leadBlanks = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();
  const cells: Array<Date | null> = [];

  for (let index = 0; index < leadBlanks; index += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

export default function TransactionHistoryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarTarget, setCalendarTarget] = useState<DateTarget>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2025, 10, 1));

  const [statusFilter, setStatusFilter] = useState<"all" | TxStatus>("all");
  const [durationFilter, setDurationFilter] = useState<DurationKey>(null);
  const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(null);
  const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(null);
  const [draftStartDate, setDraftStartDate] = useState<Date | null>(null);
  const [draftEndDate, setDraftEndDate] = useState<Date | null>(null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return transactions.filter((item) => {
      const statusMatch = statusFilter === "all" ? true : item.status === statusFilter;
      const textMatch =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.date.toLowerCase().includes(normalizedQuery);

      const parsedDate = parseTransactionDate(item.date);
      if (!parsedDate) return false;

      const startMatch = appliedStartDate ? parsedDate >= toDayStart(appliedStartDate) : true;
      const endMatch = appliedEndDate ? parsedDate <= toDayEnd(appliedEndDate) : true;
      return statusMatch && textMatch && startMatch && endMatch;
    });
  }, [query, statusFilter, appliedStartDate, appliedEndDate]);

  const applyQuickFilter = (key: (typeof filterOptions)[number]["key"]) => {
    setShowFilterMenu(false);
    if (key === "date") {
      setDraftStartDate(appliedStartDate);
      setDraftEndDate(appliedEndDate);
      setShowFilterModal(true);
      return;
    }
    if (key === "all") {
      setStatusFilter("all");
      setDurationFilter(null);
      setAppliedStartDate(null);
      setAppliedEndDate(null);
      setDraftStartDate(null);
      setDraftEndDate(null);
      return;
    }
    if (key === "successful" || key === "pending" || key === "failed") {
      setStatusFilter(key);
    }
  };

  const pickDuration = (duration: DurationKey) => {
    setDurationFilter(duration);
    if (!duration) return;

    const latest = transactions
      .map((item) => parseTransactionDate(item.date))
      .filter((date): date is Date => Boolean(date))
      .sort((first, second) => second.getTime() - first.getTime())[0] ?? new Date();
    const endDate = toDayEnd(latest);
    const startDate = new Date(endDate);

    if (duration === "30d") startDate.setDate(startDate.getDate() - 29);
    if (duration === "3m") startDate.setMonth(startDate.getMonth() - 3);
    if (duration === "6m") startDate.setMonth(startDate.getMonth() - 6);

    setDraftStartDate(toDayStart(startDate));
    setDraftEndDate(endDate);
  };

  const openCalendar = (target: DateTarget) => {
    if (!target) return;
    setCalendarTarget(target);
    const source = target === "start" ? draftStartDate : draftEndDate;
    setCalendarMonth(source ? new Date(source.getFullYear(), source.getMonth(), 1) : new Date(2025, 10, 1));
    setShowCalendarModal(true);
  };

  const applySelectedDate = (value: Date) => {
    if (calendarTarget === "start") {
      setDraftStartDate(toDayStart(value));
      if (draftEndDate && value > draftEndDate) setDraftEndDate(toDayEnd(value));
    }
    if (calendarTarget === "end") {
      setDraftEndDate(toDayEnd(value));
      if (draftStartDate && value < draftStartDate) setDraftStartDate(toDayStart(value));
    }
    setShowCalendarModal(false);
  };

  const applyDateFilter = () => {
    setAppliedStartDate(draftStartDate);
    setAppliedEndDate(draftEndDate);
    setShowFilterModal(false);
  };

  const monthCells = useMemo(() => getCalendarCells(calendarMonth), [calendarMonth]);

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Transactions</Text>
        </View>
      </View>

      <View className="flex-1 px-4 pt-3">
        <View className="flex-row items-center">
          <View className="mr-2 flex-1 flex-row items-center rounded-md border border-[#ECECEC] bg-[#F4F4F4] px-2">
            <Ionicons name="search-outline" size={14} color="#9CA3AF" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              className="ml-1 h-9 flex-1 text-[11px] text-[#4D5560]"
            />
          </View>

          <Pressable
            className="h-9 w-9 items-center justify-center rounded-md border border-[#ECECEC] bg-[#F4F4F4]"
            onPress={() => setShowFilterMenu((prev) => !prev)}
          >
            <Ionicons name="funnel-outline" size={14} color="#6F7783" />
          </Pressable>
        </View>

        {showFilterMenu && (
          <View className="absolute right-4 top-[54px] z-20 w-[108px] rounded-md border border-[#E3E6EA] bg-white px-2 py-2 shadow-sm">
            <Text className="mb-1 text-[9px] font-semibold text-[#6E7682]">Filter By</Text>
            {filterOptions.map((option) => (
              <Pressable key={option.key} className="mb-1 flex-row items-center" onPress={() => applyQuickFilter(option.key)}>
                <Ionicons name={statusFilter === option.key ? "radio-button-on-outline" : "ellipse-outline"} size={11} color="#8C94A0" />
                <Text className="ml-1 text-[9px] text-[#6C7480]">{option.label}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View className="mt-3 flex-1 overflow-hidden rounded-xl border border-[#ECECEC] bg-white">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
            {filteredItems.map((item, index) => {
              const positive = item.amount.startsWith("+");
              const iconBg = positive ? "#E7F3EC" : "#FCE8E8";
              const iconColor = positive ? "#0F7A3A" : "#E53935";
              const iconName = positive ? "arrow-down" : "arrow-up";
              return (
                <View
                  key={item.id}
                  className={`flex-row items-start px-3 py-2.5 ${
                    index < filteredItems.length - 1 ? "border-b border-[#F0F0F0]" : ""
                  }`}
                >
                  <View className="mr-2 mt-0.5 h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: iconBg }}>
                    <Ionicons name={iconName} size={11} color={iconColor} style={{ transform: [{ rotate: "45deg" }] }} />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 pr-3">
                        <Text className="text-[10.5px] font-semibold text-[#3D434C]">{item.title}</Text>
                        <Text className="mt-0.5 text-[9px] text-[#8A8F99]">{item.date}</Text>
                      </View>
                      <View className="items-end">
                        <Text className={`text-[10.5px] font-semibold ${positive ? "text-[#239A57]" : "text-[#D94848]"}`}>
                          {item.amount}
                        </Text>
                        {!!item.note && <Text className="mt-0.5 text-[8px] text-[#9BA0A9]">{item.note}</Text>}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <Modal visible={showFilterModal} transparent animationType="fade" onRequestClose={() => setShowFilterModal(false)}>
        <View className="flex-1 items-center justify-center bg-black/25 px-6">
          <View className="w-full max-w-[340px] rounded-lg bg-white p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-[11px] font-semibold text-[#3D434C]">Filter</Text>
              <Pressable onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={16} color="#6E7682" />
              </Pressable>
            </View>

            <Text className="mt-3 text-[9px] font-semibold text-[#6E7682]">Duration</Text>
            <View className="mt-2 flex-row gap-2">
              <DurationChip label="Last 30 Days" active={durationFilter === "30d"} onPress={() => pickDuration("30d")} />
              <DurationChip label="Last 3 months" active={durationFilter === "3m"} onPress={() => pickDuration("3m")} />
              <DurationChip label="Last 6 months" active={durationFilter === "6m"} onPress={() => pickDuration("6m")} />
            </View>

            <Text className="mt-3 text-[9px] font-semibold text-[#6E7682]">Custom Date Range</Text>
            <FieldRow label="Start date" value={formatDate(draftStartDate)} onPress={() => openCalendar("start")} />
            <FieldRow label="End date" value={formatDate(draftEndDate)} onPress={() => openCalendar("end")} />

            <Pressable className="mt-3 h-9 items-center justify-center rounded-md bg-[#2E7B4F]" onPress={applyDateFilter}>
              <Text className="text-[11px] font-semibold text-white">Apply</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showCalendarModal} transparent animationType="fade" onRequestClose={() => setShowCalendarModal(false)}>
        <View className="flex-1 items-center justify-center bg-black/25 px-6">
          <View className="w-full max-w-[340px] rounded-lg bg-white p-3">
            <View className="flex-row items-center justify-between">
              <Pressable onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}>
                <Ionicons name="chevron-back" size={16} color="#6E7682" />
              </Pressable>
              <Text className="text-[11px] font-semibold text-[#3D434C]">
                {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Text>
              <Pressable onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}>
                <Ionicons name="chevron-forward" size={16} color="#6E7682" />
              </Pressable>
            </View>

            <View className="mt-3 flex-row justify-between px-1">
              {weekdayLabels.map((label, index) => (
                <Text key={`${label}-${index}`} className="w-8 text-center text-[9px] font-semibold text-[#7D8692]">
                  {label}
                </Text>
              ))}
            </View>

            <View className="mt-2 flex-row flex-wrap">
              {monthCells.map((value, index) => {
                const selected = isSameDay(
                  calendarTarget === "start" ? draftStartDate : draftEndDate,
                  value
                );
                return (
                  <Pressable
                    key={`${value ? value.toISOString() : "blank"}-${index}`}
                    className="mb-1 w-[14.28%] items-center"
                    disabled={!value}
                    onPress={() => value && applySelectedDate(value)}
                  >
                    <View className={`h-8 w-8 items-center justify-center rounded-full ${selected ? "bg-[#2E7B4F]" : ""}`}>
                      <Text className={`text-[10px] ${selected ? "text-white font-semibold" : "text-[#4D5560]"}`}>
                        {value ? value.getDate() : ""}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              className="mt-2 h-9 items-center justify-center rounded-md border border-[#D9DEE4]"
              onPress={() => setShowCalendarModal(false)}
            >
              <Text className="text-[10px] font-semibold text-[#6E7682]">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DurationChip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      className={`rounded-md border px-2 py-1 ${active ? "border-[#2E7B4F] bg-[#EAF3EE]" : "border-[#E6E8EB] bg-[#F7F7F7]"}`}
      onPress={onPress}
    >
      <Text className={`text-[8px] ${active ? "text-[#2E7B4F] font-semibold" : "text-[#6E7682]"}`}>{label}</Text>
    </Pressable>
  );
}

function FieldRow({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
  return (
    <Pressable className="mt-2 flex-row items-center justify-between rounded-md border border-[#E5E8EC] bg-[#F6F7F8] px-2 py-2" onPress={onPress}>
      <Text className={`text-[9px] ${value ? "text-[#5B6470]" : "text-[#7D8692]"}`}>{value || label}</Text>
      <Ionicons name="calendar-clear-outline" size={13} color="#7D8692" />
    </Pressable>
  );
}
