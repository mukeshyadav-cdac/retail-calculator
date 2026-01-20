type FormInputProps = {
  id: string;
  label: string;
  type?: "number" | "text";
  value: string | number;
  placeholder?: string;
  prefix?: string;
  error?: string;
  min?: string;
  step?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

const baseStyles =
  "w-full px-3 py-3 sm:py-2 min-h-[44px] bg-white border-b-2 text-base sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-colors";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  placeholder,
  prefix,
  error,
  min,
  step,
  onChange,
  onBlur,
}: FormInputProps) {
  const inputStyles = `${baseStyles} ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500"} ${prefix ? "pl-5 sm:pl-4" : ""}`;

  return (
    <div className="space-y-1.5 sm:space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-blue-600">
        {label}
      </label>
      <div className={prefix ? "relative" : ""}>
        {prefix && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-sm">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          min={min}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputStyles}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
