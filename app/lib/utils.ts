import { DISCOUNT_TIERS } from "./constants";

export const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

export const formatPercent = (rate: number, decimals = 0): string => 
  `${(rate * 100).toFixed(decimals)}%`;

export const getDiscountRate = (subtotal: number): number => {
  const tier = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold);
  return tier?.rate ?? 0;
};

export const parseNumber = (value: string, type: "int" | "float" = "float"): number | "" => {
  if (value === "") return "";
  const numValue = type === "int" ? parseInt(value, 10) : parseFloat(value);
  return !isNaN(numValue) && numValue >= 0 ? numValue : "";
};
