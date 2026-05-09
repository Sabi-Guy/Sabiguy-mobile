import { API_BASE_URL } from "@/lib/api";
import { getAuthToken } from "@/lib/token";

// request type
export interface RegisterBuyerPayload {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

// register buyer
export const registerBuyer = async (data: RegisterBuyerPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/buyer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "Registration failed";
    throw new Error(message);
  }

  return result;
};

//login user
export interface loginUserPayload {
  email: string;
  password: string;
}

export const loginuser = async (data: loginUserPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message = typeof result?.message === "string" ? result.message : "Login failed";
    throw new Error(message);
  }

  return result;
};

//otp verification
export interface VerifyEmailPayload {
  otp: string;
}

export const verifyEmailOtp = async (data: VerifyEmailPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "OTP verification failed";
    throw new Error(message);
  }

  return result;
};

// resend email verification otp
export interface ResendOtpPayload {
  email: string;
}

export const resendOtp = async (data: ResendOtpPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "Resend OTP failed";
    throw new Error(message);
  }

  return result;
};

// forgot password
export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = async (data: ForgotPasswordPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "Forgot password failed";
    throw new Error(message);
  }

  return result;
};

// forgot password otp
export interface ForgotPasswordOtpPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export const resetPassword = async (data: ForgotPasswordOtpPayload) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "Password reset failed";
    throw new Error(message);
  }

  return result;
};

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordPayload, token?: string) => {
  const resolvedToken = token ?? (await getAuthToken());
  if (!resolvedToken) {
    throw new Error("Authentication required");
  }

  const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resolvedToken}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string" ? result.message : "Change password failed";
    throw new Error(message);
  }

  return result;
};