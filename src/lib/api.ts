export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://sabiguy-backend.onrender.com/api/v1";

type ApiOptions = RequestInit & { json?: unknown };

export async function apiRequest<T = unknown>(path: string, options: ApiOptions = {}) {
  const { json, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message ?? "Request failed.";
    throw new Error(message);
  }
  return data as T;
}
