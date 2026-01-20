import { useState, useMemo, useCallback } from "react";
import { getDiscountRate, parseNumber } from "../lib/utils";
import { getTaxStrategy } from "../lib/taxStrategies";

type Errors = {
  quantity?: string;
  price?: string;
  region?: string;
};

const VALIDATION_MESSAGES = {
  quantity: "Quantity must be at least 1",
  price: "Price must be greater than $0.00",
  region: "Select a region to calculate tax",
};

export default function useCalculator() {
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [region, setRegion] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: keyof Errors, value: number | string): string | undefined => {
    if (field === "quantity" && (value === "" || (typeof value === "number" && value < 1))) {
      return VALIDATION_MESSAGES.quantity;
    }
    if (field === "price" && (value === "" || (typeof value === "number" && value <= 0))) {
      return VALIDATION_MESSAGES.price;
    }
    if (field === "region" && !value) {
      return VALIDATION_MESSAGES.region;
    }
    return undefined;
  }, []);

  const handleBlur = useCallback((field: keyof Errors, value: number | string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  }, [validateField]);

  const updateField = useCallback(<T extends number | "" | string>(
    field: keyof Errors,
    value: T,
    setter: (v: T) => void
  ) => {
    setter(value);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }, [touched, validateField]);

  const handleQuantityChange = useCallback((value: string) => {
    updateField("quantity", parseNumber(value, "int") as number | "", setQuantity);
  }, [updateField]);

  const handlePriceChange = useCallback((value: string) => {
    updateField("price", parseNumber(value) as number | "", setPrice);
  }, [updateField]);

  const handleRegionChange = useCallback((value: string) => {
    updateField("region", value, setRegion);
  }, [updateField]);

  const calculations = useMemo(() => {
    const subtotal = (quantity || 0) * (price || 0);
    const discountRate = getDiscountRate(subtotal);
    const discountAmount = subtotal * discountRate;
    const afterDiscount = subtotal - discountAmount;

    const taxStrategy = region ? getTaxStrategy(region) : null;
    const taxRate = taxStrategy?.getRate() ?? 0;
    const taxAmount = taxStrategy?.calculateTax(afterDiscount) ?? 0;
    const total = afterDiscount + taxAmount;

    return { subtotal, discountRate, discountAmount, afterDiscount, taxRate, taxAmount, total };
  }, [quantity, price, region]);

  const getError = useCallback((field: keyof Errors) => {
    return touched[field] ? errors[field] : undefined;
  }, [touched, errors]);

  return {
    quantity,
    price,
    region,
    calculations,
    getError,
    handleQuantityChange,
    handlePriceChange,
    handleRegionChange,
    handleBlur,
  };
}
