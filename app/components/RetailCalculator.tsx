"use client";

import { useState, useMemo } from "react";
import { REGIONS } from "../lib/constants";
import { formatCurrency, getDiscountRate, parseNumber } from "../lib/utils";

type ResultRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
  green?: boolean;
  border?: boolean;
};

const ResultRow = ({ label, value, highlight, green, border }: ResultRowProps) => (
  <div className={`flex justify-between items-center ${border ? "pt-2 border-t border-blue-100" : ""}`}>
    <span className={`text-sm ${green ? "text-green-600" : highlight ? "font-medium text-gray-700" : "text-gray-600"}`}>
      {label}
    </span>
    <span className={`${highlight ? "text-lg font-semibold text-blue-600" : green ? "text-sm font-medium text-green-600" : "text-sm font-medium text-gray-800"}`}>
      {value}
    </span>
  </div>
);

const inputStyles = "w-full px-3 py-2 bg-white border-b-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors";

export default function RetailCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [region, setRegion] = useState<string>("");

  const calculations = useMemo(() => {
    const subtotal = (quantity || 0) * (price || 0);
    const discountRate = getDiscountRate(subtotal);
    const discountAmount = subtotal * discountRate;
    const discountedPrice = subtotal - discountAmount;
    return { subtotal, discountRate, discountAmount, discountedPrice };
  }, [quantity, price]);

  const { subtotal, discountRate, discountAmount, discountedPrice } = calculations;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">Retail Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">Calculate total with discounts & tax</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <label htmlFor="quantity" className="block text-sm font-medium text-blue-600">
              How many items
            </label>
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
            <label htmlFor="price" className="block text-sm font-medium text-blue-600">
              Price per item
            </label>
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
            <label htmlFor="region" className="block text-sm font-medium text-blue-600">
              Region code
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={inputStyles}
            >
              <option value="">Select region</option>
              {REGIONS.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code} - {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-50 px-6 py-4 space-y-2">
          <ResultRow label="Quantity" value={`${quantity || 0} items`} />
          <ResultRow label="Price per item" value={formatCurrency(price || 0)} />
          <ResultRow label="Region" value={region || "—"} />
          <ResultRow label="Subtotal" value={formatCurrency(subtotal)} border />
          {discountRate > 0 && (
            <ResultRow
              label={`Discount (${(discountRate * 100).toFixed(0)}%)`}
              value={`-${formatCurrency(discountAmount)}`}
              green
            />
          )}
          <ResultRow label="After Discount" value={formatCurrency(discountedPrice)} highlight border />
        </div>
      </div>
    </div>
  );
}
