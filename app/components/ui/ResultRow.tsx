type ResultRowProps = {
  label: string;
  value: string;
  variant?: "default" | "highlight" | "green";
  border?: boolean;
};

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

export default function ResultRow({ label, value, variant = "default", border }: ResultRowProps) {
  return (
    <div className={`flex justify-between items-center ${border ? "pt-2 border-t border-blue-100" : ""}`}>
      <span className={`text-sm ${labelStyles[variant]}`}>{label}</span>
      <span className={valueStyles[variant]}>{value}</span>
    </div>
  );
}
