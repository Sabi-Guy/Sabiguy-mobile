import { apiRequest } from "@/lib/api";

export type ProviderDashboardStats = {
  totalBookings?: number;
  activeBookings?: number;
  completedBookings?: number;
  availableEarnings?: number;
  pendingEarnings?: number;
  totalEarnings?: number;
  totalWithdrawals?: number;
  revenueOverview?: {
    total?: number;
    last7Days?: number;
    last30Days?: number;
  };
  averageResponseTimeMinutes?: number;
  bookingsByDayOfWeek?: Array<{ day?: string; count?: number }>;
  peakHourAnalysis?: {
    peakHour?: string | null;
    peakHourCount?: number;
    buckets?: Array<{ hour?: string; count?: number }>;
  };
};

type ProviderDashboardStatsResponse = {
  success?: boolean;
  data?: ProviderDashboardStats;
};

export async function getProviderDashboardStats() {
  return apiRequest<ProviderDashboardStatsResponse>("/provider/dashboard/stats", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

