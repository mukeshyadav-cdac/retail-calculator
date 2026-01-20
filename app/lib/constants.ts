export const REGIONS = [
  { code: "AUK", name: "Auckland" },
  { code: "WLG", name: "Wellington" },
  { code: "WAI", name: "Waikato" },
  { code: "CHC", name: "Christchurch" },
  { code: "TAS", name: "Tasman" },
] as const;

export const DISCOUNT_TIERS = [
  { threshold: 50000, rate: 0.15 },
  { threshold: 10000, rate: 0.10 },
  { threshold: 7000, rate: 0.07 },
  { threshold: 5000, rate: 0.05 },
  { threshold: 1000, rate: 0.03 },
] as const;

export type RegionCode = (typeof REGIONS)[number]["code"];
