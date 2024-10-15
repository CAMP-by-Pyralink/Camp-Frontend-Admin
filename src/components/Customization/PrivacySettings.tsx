import React, { useState } from "react";

interface RetentionPeriodOption {
  label: string;
  value: string;
}

const retentionOptions: RetentionPeriodOption[] = [
  { label: "Days", value: "days" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
];

const PrivacySettings: React.FC = () => {
  const [preferences, setPreferences] = useState({
    pref1: true,
    pref2: false,
    pref3: false,
  });

  const [retentionPeriod, setRetentionPeriod] = useState("days");
  const [days, setDays] = useState(20);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className=" bg-white p-6 rounded-lg shadow-lg text-black">
      {/* Privacy Preference Section */}
      <div className="mb-6">
        <h2 className="text-[#1D1E2C]">Privacy preference</h2>
        <p className="text-xs text-textColor mb-4">
          Select your privacy preference
        </p>

        <div className="space-y-3">
          {["preference 1", "preference 2", "preference 3"].map(
            (label, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className=" text-[#747171]">{label}</span>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences[`pref${index + 1}` as keyof typeof preferences]
                      ? "bg-primary900"
                      : "bg-[#E4E8F1]"
                  }`}
                  onClick={() =>
                    handleToggle(`pref${index + 1}` as keyof typeof preferences)
                  }
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences[
                        `pref${index + 1}` as keyof typeof preferences
                      ]
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Data Retention Duration Section */}
      <div>
        <h2 className="text-textColor">Data Retention Duration</h2>

        <div className="flex items-center gap-4 mt-4">
          {/* Retention Period Dropdown */}
          <div className="w-1/2">
            <label className="block text-base text-textColor font-medium mb-1">
              Retention period
            </label>
            <select
              className="w-full  text-neutrals500 border border-[#D0D5DD] rounded-lg px-3 py-2"
              value={retentionPeriod}
              onChange={(e) => setRetentionPeriod(e.target.value)}
            >
              {retentionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Days Input */}
          <div className="w-1/2">
            <label className="block text-base text-textColor font-medium mb-1">
              Days
            </label>
            <input
              type="number"
              className="w-full text-neutrals500 border border-[#D0D5DD] rounded-lg px-3 py-2"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
