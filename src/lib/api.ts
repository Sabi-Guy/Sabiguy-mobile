export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.nifesi.xyz/api/v1";

type ApiOptions = RequestInit & { json?: unknown };

export async function apiRequest<T = unknown>(path: string, options: ApiOptions = {}) {
  const { json, headers, ...rest } = options;
  const { getAuthToken } = await import("./token");
  const token = await getAuthToken();
  const shouldAttachAuth = !path.startsWith("/auth");
  const resolvedHeaders = new Headers(headers);
  if (json !== undefined && !resolvedHeaders.has("Content-Type")) {
    resolvedHeaders.set("Content-Type", "application/json");
  }
  if (shouldAttachAuth && token) {
    resolvedHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: resolvedHeaders,
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message ?? "Request failed.";
    throw new Error(message);
  }
  return data as T;
}
