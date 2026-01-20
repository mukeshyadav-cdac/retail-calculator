import { TAX_RATES } from "./constants";

export interface TaxStrategy {
  calculateTax(amount: number): number;
  getRate(): number;
  getRegionCode(): string;
}

class RegionalTaxStrategy implements TaxStrategy {
  constructor(
    private readonly regionCode: string,
    private readonly rate: number
  ) {}

  getRegionCode() { return this.regionCode; }
  getRate() { return this.rate; }
  calculateTax(amount: number) { return amount * this.rate; }
}

const TAX_STRATEGIES = Object.entries(TAX_RATES).reduce(
  (acc, [code, rate]) => ({ ...acc, [code]: new RegionalTaxStrategy(code, rate) }),
  {} as Record<string, TaxStrategy>
);

export const getTaxStrategy = (region: string): TaxStrategy | null => {
  return TAX_STRATEGIES[region] || null;
};
