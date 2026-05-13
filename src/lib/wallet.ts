import { apiRequest } from "@/lib/api";

export type WalletBalance = {
  available?: number;
  pending?: number;
  total?: number;
  totalEarnings?: number;
  totalWithdrawals?: number;
};

type WalletBalanceResponse = {
  success?: boolean;
  data?: WalletBalance;
};

export type WalletTransaction = {
  _id?: string;
  id?: string;
  type?: string;
  amount?: number;
  status?: string;
  reference?: string;
  createdAt?: string;
  description?: string;
};

type WalletTransactionsResponse = {
  success?: boolean;
  data?:
    | WalletTransaction[]
    | {
        transactions?: WalletTransaction[];
        pagination?: {
          page?: number;
          limit?: number;
          total?: number;
          pages?: number;
        };
      };
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    pages?: number;
  };
};

export async function getWalletBalance() {
  return apiRequest<WalletBalanceResponse>("/wallet/balance", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
}

export async function getWalletTransactions(params?: {
  page?: number;
  limit?: number;
  type?: string;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (params?.type) {
    searchParams.set("type", params.type);
  }

  const result = await apiRequest<WalletTransactionsResponse>(
    `/wallet/transactions?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = result?.data;
  const transactions = Array.isArray(data) ? data : data?.transactions ?? [];
  const pagination = Array.isArray(data) ? result?.pagination : data?.pagination ?? result?.pagination;

  return {
    success: result?.success ?? false,
    transactions,
    pagination,
  };
}
