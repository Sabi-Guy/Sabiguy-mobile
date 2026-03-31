import { API_BASE_URL } from "@/lib/api";
import { getAuthToken, getUserEmail } from "@/lib/token";

export type UploadCategory =
  | "profile_pictures"
  | "work_visuals"
  | "identity_docs"
  | "certificates";

export type UploadFile = {
  uri: string;
  name: string;
  mimeType?: string;
};

type UploadResponse = {
  success: boolean;
  file?: {
    _id: string;
    filename: string;
    url: string;
    resource_type: string;
    email: string;
    provider?: string;
    buyer?: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
};

export async function uploadFile(category: UploadCategory, file: UploadFile) {
  const email = await getUserEmail();
  if (!email) {
    throw new Error("Missing user email. Please log in again.");
  }

  const token = await getAuthToken();
  const formData = new FormData();
  formData.append(
    "file",
    {
      uri: file.uri,
      name: file.name || "upload",
      type: file.mimeType || "application/octet-stream",
    } as unknown as Blob
  );

  const response = await fetch(
    `${API_BASE_URL}/file/${encodeURIComponent(email)}/${category}`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    }
  );

  const rawText = await response.text().catch(() => "");
  let data: UploadResponse | null = null;
  if (rawText) {
    try {
      data = JSON.parse(rawText) as UploadResponse;
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message = data?.message || rawText || `Upload failed (status ${response.status}).`;
    throw new Error(message);
  }
  return (data ?? { success: true }) as UploadResponse;
}
