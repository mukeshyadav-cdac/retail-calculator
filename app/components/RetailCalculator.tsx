"use client";

import { useState, useMemo } from "react";
import { REGIONS } from "../lib/constants";
import { formatCurrency, formatPercent, getDiscountRate, parseNumber } from "../lib/utils";
import { getTaxStrategy } from "../lib/taxStrategies";

type ResultRowProps = {
  label: string;
  value: string;
  variant?: "default" | "highlight" | "green";
  border?: boolean;
};

const ResultRow = ({ label, value, variant = "default", border }: ResultRowProps) => {
  const labelStyles = {
    default: "text-gray-600",
    highlight: "font-medium text-gray-700",
    green: "text-green-600",
  };
  const valueStyles = {
    default: "text-sm font-medium text-gray-800",
    highlight: "text-lg font-semibold text-blue-600",
    green: "text-sm font-medium text-green-600",
  };

  return (
    <div className={`flex justify-between items-center ${border ? "pt-2 border-t border-blue-100" : ""}`}>
      <span className={`text-sm ${labelStyles[variant]}`}>{label}</span>
      <span className={valueStyles[variant]}>{value}</span>
    </div>
  );
};

const inputStyles = "w-full px-3 py-2 bg-white border-b-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors";
const labelStyles = "block text-sm font-medium text-blue-600";

export default function RetailCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [region, setRegion] = useState("");

  const calc = useMemo(() => {
    const subtotal = (quantity || 0) * (price || 0);
    const discountRate = getDiscountRate(subtotal);
    const discountAmount = subtotal * discountRate;
    const afterDiscount = subtotal - discountAmount;

    // Strategy Pattern for tax calculation
    const taxStrategy = region ? getTaxStrategy(region) : null;
    const taxRate = taxStrategy?.getRate() ?? 0;
    const taxAmount = taxStrategy?.calculateTax(afterDiscount) ?? 0;
    const total = afterDiscount + taxAmount;

    return { subtotal, discountRate, discountAmount, afterDiscount, taxRate, taxAmount, total };
  }, [quantity, price, region]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">Retail Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">Calculate total with discounts & tax</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <label htmlFor="quantity" className={labelStyles}>How many items</label>
            <input
              id="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseNumber(e.target.value, "int") as number | "")}
              className={inputStyles}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="price" className={labelStyles}>Price per item</label>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(parseNumber(e.target.value) as number | "")}
                className={`${inputStyles} pl-4`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="region" className={labelStyles}>Region code</label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={inputStyles}
            >
              <option value="">Select region</option>
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>{r.code} - {r.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 px-6 py-4 space-y-2">
          <ResultRow label="Quantity" value={`${quantity || 0} items`} />
          <ResultRow label="Price per item" value={formatCurrency(price || 0)} />
          <ResultRow label="Region" value={region || "—"} />
          <ResultRow label="Subtotal" value={formatCurrency(calc.subtotal)} border />
          {calc.discountRate > 0 && (
            <ResultRow label={`Discount (${formatPercent(calc.discountRate)})`} value={`-${formatCurrency(calc.discountAmount)}`} variant="green" />
          )}
          <ResultRow label="After Discount" value={formatCurrency(calc.afterDiscount)} />
          {calc.taxRate > 0 && (
            <ResultRow label={`Tax (${formatPercent(calc.taxRate, 2)})`} value={`+${formatCurrency(calc.taxAmount)}`} />
          )}
          <ResultRow label="Total" value={formatCurrency(calc.total)} variant="highlight" border />
        </div>
      </div>
    </div>
  );
}
