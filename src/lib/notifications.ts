import { apiRequest } from "@/lib/api";

export type NotificationItem = {
  _id?: string;
  id?: string;
  title?: string;
  message?: string;
  body?: string;
  createdAt?: string;
  read?: boolean;
  isRead?: boolean;
  type?: string;
};

type NotificationsResponse = {
  success?: boolean;
  data?: {
    notifications?: NotificationItem[];
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      pages?: number;
    };
    unreadCount?: number;
  };
};

type MarkAllReadResponse = {
  success?: boolean;
  message?: string;
  data?: {
    updatedCount?: number;
  };
};

type UnreadCountResponse = {
  success?: boolean;
  data?: {
    unreadCount?: number;
  };
};

type NotificationChannelPreference = {
  email?: boolean;
  push?: boolean;
  types?: string[];
};

type NotificationPreferencesResponse = {
  success?: boolean;
  data?: {
    notificationPreferences?: Record<string, NotificationChannelPreference>;
  };
};

type UpdateNotificationPreferencesPayload = {
  notificationPreferences: Record<string, NotificationChannelPreference>;
};

export async function getNotifications(page = 1, limit = 20) {
  return apiRequest<NotificationsResponse>(`/notifications?page=${page}&limit=${limit}`, {
    method: "GET",
  });
}

export async function markAllNotificationsAsRead() {
  return apiRequest<MarkAllReadResponse>("/notifications/read-all", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
    },
  });
}

export async function getUnreadNotificationsCount() {
  return apiRequest<UnreadCountResponse>("/notifications/unread-count", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

export async function getNotificationPreferences() {
  return apiRequest<NotificationPreferencesResponse>("/notifications/preferences", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

export async function updateNotificationPreferences(payload: UpdateNotificationPreferencesPayload) {
  return apiRequest<NotificationPreferencesResponse>("/notifications/preferences", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
    },
    json: payload,
  });
}
