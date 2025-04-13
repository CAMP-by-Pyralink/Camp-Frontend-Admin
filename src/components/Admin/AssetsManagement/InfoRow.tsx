import React, { ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";

export interface InfoRowProps {
  label: string;
  type?: "input" | "select";
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options?: string[];
  disabled?: boolean;
  readOnly?: boolean;
  extraButton?: React.ReactNode; // ✅ ADD THIS LINE
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
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-textColor">
        {label}
      </label>
      {type === "input" ? (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`w-[444px] p-4 border rounded-md ${
              disabled || readOnly ? "bg-[#F0F2F5] text-[#98A2B3]" : ""
            }`}
          />
          {extraButton && (
            <div className="absolute right-2 top-4">{extraButton}</div>
          )}
        </div>
      ) : (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-[444px] p-4 border rounded-md appearance-none text-[#454545] text-sm"
          >
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-3 text-gray-400"
            size={16}
          />
        </div>
      )}
    </div>
  );
};

export default InfoRow;
