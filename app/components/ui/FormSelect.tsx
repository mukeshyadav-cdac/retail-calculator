type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

const baseStyles =
  "w-full px-3 py-3 sm:py-2 min-h-[44px] bg-white border-b-2 text-base sm:text-sm text-gray-800 focus:outline-none transition-colors";

export default function FormSelect({
  id,
  label,
  value,
  options,
  placeholder,
  error,
  onChange,
  onBlur,
}: FormSelectProps) {
  const selectStyles = `${baseStyles} ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}`;

  return (
    <div className="space-y-1.5 sm:space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-blue-600">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={selectStyles}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
