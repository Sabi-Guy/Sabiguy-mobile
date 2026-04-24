export const providerKycMap: Record<number, number> = {
  0: 1, // Register
  1: 4, // PersonalInfoForm
  2: 5, // AccountTypeForm
  3: 6, // FacialCapture
  4: 8, // SkillsVerification
  5: 9, // UploadAutoMobile
  6: 10, // BankAccountForm
};

export const PROVIDER_KYC_COMPLETE_LEVEL = 7;

const providerKycRouteByLevel: Record<number, string> = {
  0: "/(auth)/(serviceProvider)/signup",
  1: "/(auth)/(serviceProvider)/personal-information",
  2: "/(auth)/(serviceProvider)/account-type",
  3: "/(auth)/(serviceProvider)/face-capture",
  4: "/(auth)/(serviceProvider)/verify-skill",
  5: "/(auth)/(serviceProvider)/vehicle-information",
  6: "/(auth)/(serviceProvider)/bank-account",
};

export function parseKycLevel(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function getProviderOnboardingRoute(kycLevel: number | null): string | null {
  const level = parseKycLevel(kycLevel);
  if (level === null) return null;
  if (level >= PROVIDER_KYC_COMPLETE_LEVEL) return null;
  return providerKycRouteByLevel[level] ?? providerKycRouteByLevel[0];
}

