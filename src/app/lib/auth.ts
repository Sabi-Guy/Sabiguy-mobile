// base API
const BASE_URL = "https://sabiguy-backend.onrender.com/api/v1";

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
  const response = await fetch(`${BASE_URL}/auth/buyer`, {
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
