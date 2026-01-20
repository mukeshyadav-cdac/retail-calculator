"use client";

import { useState } from "react";

const REGIONS = [
  { code: "AUK", name: "Auckland" },
  { code: "WLG", name: "Wellington" },
  { code: "WAI", name: "Waikato" },
  { code: "CHC", name: "Christchurch" },
  { code: "TAS", name: "Tasman" },
];

const DISCOUNT_TIERS = [
  { threshold: 50000, rate: 0.15 },
  { threshold: 10000, rate: 0.10 },
  { threshold: 7000, rate: 0.07 },
  { threshold: 5000, rate: 0.05 },
  { threshold: 1000, rate: 0.03 },
];

const getDiscountRate = (subtotal: number): number => {
  const tier = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold);
  return tier ? tier.rate : 0;
};

export default function RetailCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [region, setRegion] = useState<string>("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        setQuantity(numValue);
      }
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPrice("");
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setPrice(numValue);
      }
    }
  };

  const subtotal = (quantity || 0) * (price || 0);
  const discountRate = getDiscountRate(subtotal);
  const discountAmount = subtotal * discountRate;
  const discountedPrice = subtotal - discountAmount;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">Retail Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Calculate total with discounts & tax
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-blue-600"
            >
              How many items
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full px-3 py-2 bg-white border-b-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-blue-600"
            >
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
                onChange={handlePriceChange}
                className="w-full pl-4 pr-3 py-2 bg-white border-b-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="region"
              className="block text-sm font-medium text-blue-600"
            >
              Region code
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-3 py-2 bg-white border-b-2 border-gray-200 text-gray-800 focus:outline-none focus:border-blue-500 transition-colors"
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
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Quantity</span>
            <span className="text-sm font-medium text-gray-800">
              {quantity || 0} items
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Price per item</span>
            <span className="text-sm font-medium text-gray-800">
              ${(price || 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Region</span>
            <span className="text-sm font-medium text-gray-800">
              {region || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-blue-100">
            <span className="text-sm font-medium text-gray-700">Subtotal</span>
            <span className="text-sm font-medium text-gray-800">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          {discountRate > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">
                Discount ({(discountRate * 100).toFixed(0)}%)
              </span>
              <span className="text-sm font-medium text-green-600">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-blue-100">
            <span className="text-sm font-medium text-gray-700">After Discount</span>
            <span className="text-lg font-semibold text-blue-600">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
