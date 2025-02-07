import scanIcon from "../../assets/svgs/scan-network-icon.svg";
import manualIcon from "../../assets/svgs/employees.svg";
import React from "react";

interface AddUsersProps {
  onboardingType: "manual" | "scan" | "";
  updateOnboardingType: (onboardingType: "manual" | "scan") => void;
}

const AddUsers: React.FC<AddUsersProps> = ({
  onboardingType,
  updateOnboardingType,
}) => {
  // Handler for selecting the manual option.
  const handleManualChange = () => {
    updateOnboardingType("manual");
  };

  // Handler for selecting the scan option.
  const handleScanChange = () => {
    updateOnboardingType("scan");
  };

  return (
    <div>
      <h1 className="text-[#1B1818] text-4xl font-bold mb-2 tracking-[-4%] leading-[43.2px]">
        How do you want to <br /> onboard your users?
      </h1>
      <div className="space-y-4">
        {/* Manual Option */}
        <div className="mt-8 border border-[#E3E3E3] rounded-md p-4 flex justify-between items-center">
          <div className="w-[58.9px] h-[58.9px]">
            <img
              src={manualIcon}
              alt="Manual"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-textColor">
            <h1 className="text-2xl font-medium">Manually</h1>
            <p className="text-sm">Input user name or upload CSV to add user</p>
          </div>
          <div>
            <div className="relative inline-block">
              <input
                type="radio"
                name="onboardingType"
                id="manualOption"
                checked={onboardingType === "manual"}
                onChange={handleManualChange}
                className="sr-only peer"
              />
              <label
                htmlFor="manualOption"
                className="w-8 h-8 border-4 border-[#B4B4B4] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue50 peer-checked:border-primary500 peer-checked:text-white"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={onboardingType === "manual" ? "#282EFF" : "#B4B4B4"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="transition-all duration-300"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
        {/* Scan Option */}
        <div className="border border-[#E3E3E3] rounded-md p-4 flex justify-between items-center">
          <div className="w-[58.9px] h-[58.9px]">
            <img
              src={scanIcon}
              alt="Scan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-textColor">
            <h1 className="text-2xl font-medium">Scan</h1>
            <p className="text-sm">
              Scan through company’s network to add user
            </p>
          </div>
          <div>
            <div className="relative inline-block">
              <input
                type="radio"
                name="onboardingType"
                id="scanOption"
                checked={onboardingType === "scan"}
                onChange={handleScanChange}
                className="sr-only peer"
              />
              <label
                htmlFor="scanOption"
                className="w-8 h-8 border-4 border-[#B4B4B4] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue50 peer-checked:border-primary500 peer-checked:text-white"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={onboardingType === "scan" ? "#282EFF" : "#B4B4B4"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="transition-all duration-300"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
