import React from "react";
import { ChevronDown } from "lucide-react";

export interface InfoRowProps {
  label: string;
  type?: "input" | "select" | "date";
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  options?: string[] | { label: string; value: string }[]; // Can be either a string array or an object array
  disabled?: boolean;
  readOnly?: boolean;
  extraButton?: React.ReactNode;
  required?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  type = "input",
  value,
  placeholder,
  onChange,
  options = [],
  disabled = false,
  readOnly = false,
  extraButton,
  required = false,
}) => {
  const isObjectArray =
    options && options.length > 0 && typeof options[0] === "object";

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-textColor mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "input" || type === "date" ? (
        <div className="relative">
          <input
            type={type === "date" ? "date" : "text"}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={`w-full p-4 border border-[#D0D5DD] rounded-md text-sm outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500${
              disabled || readOnly ? "bg-gray-100 text-gray-400" : ""
            }`}
          />
          {extraButton && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {extraButton}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => (onChange ?? (() => {}))(e.target.value)}
            disabled={disabled}
            required={required}
            className="w-full p-4 border bg-transparent rounded-md text-sm appearance-none outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
          >
            <option value=""></option> {/* Default 'Select' option */}
            {isObjectArray
              ? (options as { label: string; value: string }[]).map(
                  (opt, idx) => (
                    <option key={idx} value={opt.value}>
                      {opt.label} {/* Display the label (full name) */}
                    </option>
                  )
                )
              : (options as string[]).map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt} {/* Display the string as the option */}
                  </option>
                ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      )}
    </div>
  );
};

export default InfoRow;
