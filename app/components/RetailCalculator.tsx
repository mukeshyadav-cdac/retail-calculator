"use client";

import { useState } from "react";

export default function RetailCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");

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
        </div>

        <div className="bg-blue-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Quantity selected</span>
            <span className="text-lg font-medium text-blue-600">
              {quantity || 0} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
