"use client";

import { useState } from "react";

export default function RetailCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");

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
          <div className="flex justify-between items-center pt-2 border-t border-blue-100">
            <span className="text-sm font-medium text-gray-700">Subtotal</span>
            <span className="text-lg font-semibold text-blue-600">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
