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

const TAX_RATES: Record<string, number> = {
  AUK: 0.0685,
  WLG: 0.08,
  WAI: 0.0625,
  CHC: 0.04,
  TAS: 0.0825,
};

const TAX_STRATEGIES = Object.entries(TAX_RATES).reduce(
  (acc, [code, rate]) => ({ ...acc, [code]: new RegionalTaxStrategy(code, rate) }),
  {} as Record<string, TaxStrategy>
);

export const getTaxStrategy = (region: string): TaxStrategy | null => {
  return TAX_STRATEGIES[region] || null;
};
