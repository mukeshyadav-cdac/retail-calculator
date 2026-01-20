"use client";

import { REGIONS } from "../lib/constants";
import { formatCurrency, formatPercent } from "../lib/utils";
import useCalculator from "../hooks/useCalculator";
import FormInput from "./ui/FormInput";
import FormSelect from "./ui/FormSelect";
import ResultRow from "./ui/ResultRow";

const regionOptions = REGIONS.map((r) => ({
  value: r.code,
  label: `${r.code} - ${r.name}`,
}));

export default function RetailCalculator() {
  const {
    quantity,
    price,
    region,
    calculations: calc,
    getError,
    handleQuantityChange,
    handlePriceChange,
    handleRegionChange,
    handleBlur,
  } = useCalculator();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">Retail Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">Calculate total with discounts & tax</p>
        </div>

        <div className="p-6 space-y-5">
          <FormInput
            id="quantity"
            label="How many items"
            type="number"
            value={quantity}
            placeholder="Enter quantity"
            min="1"
            error={getError("quantity")}
            onChange={handleQuantityChange}
            onBlur={() => handleBlur("quantity", quantity)}
          />

          <FormInput
            id="price"
            label="Price per item"
            type="number"
            value={price}
            placeholder="0.00"
            prefix="$"
            min="0"
            step="0.01"
            error={getError("price")}
            onChange={handlePriceChange}
            onBlur={() => handleBlur("price", price)}
          />

          <FormSelect
            id="region"
            label="Region code"
            value={region}
            options={regionOptions}
            placeholder="Select region"
            error={getError("region")}
            onChange={handleRegionChange}
            onBlur={() => handleBlur("region", region)}
          />
        </div>

        <div className="bg-blue-50 px-6 py-4 space-y-2">
          <ResultRow label="Quantity" value={`${quantity || 0} items`} />
          <ResultRow label="Price per item" value={formatCurrency(price || 0)} />
          <ResultRow label="Region" value={region || "—"} />
          <ResultRow label="Subtotal" value={formatCurrency(calc.subtotal)} border />
          {calc.discountRate > 0 && (
            <ResultRow
              label={`Discount (${formatPercent(calc.discountRate)})`}
              value={`-${formatCurrency(calc.discountAmount)}`}
              variant="green"
            />
          )}
          <ResultRow label="After Discount" value={formatCurrency(calc.afterDiscount)} />
          {calc.taxRate > 0 && (
            <ResultRow
              label={`Tax (${formatPercent(calc.taxRate, 2)})`}
              value={`+${formatCurrency(calc.taxAmount)}`}
            />
          )}
          <ResultRow label="Total" value={formatCurrency(calc.total)} variant="highlight" border />
        </div>
      </div>
    </div>
  );
}
