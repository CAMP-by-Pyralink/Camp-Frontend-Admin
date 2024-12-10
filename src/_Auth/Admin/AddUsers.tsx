import scanIcon from "../../assets/svgs/scan-network-icon.svg";
import manualIcon from "../../assets/svgs/employees.svg";
import { useState } from "react";
const AddUsers = () => {
  // const [isChecked, setIsChecked] = useState(false);
  const [isManualChecked, setIsManualChecked] = useState(false);
  const [isScanChecked, setIsScanChecked] = useState(false);
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  const handleManualCheckboxChange = () => {
    setIsManualChecked(!isManualChecked);
  };

  const handleScanCheckboxChange = () => {
    setIsScanChecked(!isScanChecked);
  };

  return (
    <div>
      <h1 className=" text-[#1B1818] text-4xl font-bold mb-2 tracking-[-4%] leading-[43.2px]">
        How do you want to <br /> onboard your users?
      </h1>
      <div className=" space-y-4">
        {/* Manual */}
        <div className=" mt-8 border border-[#E3E3E3] rounded-md p-4 flex justify-between items-center ">
          <div className=" w-[58.9px]  h-[58.9px]">
            <img
              src={manualIcon}
              alt=""
              className=" w-full h-full object-cover"
            />
          </div>
          <div className=" text-textColor">
            <h1 className=" text-2xl font-medium">Manually</h1>
            <p className=" text-sm">
              Input user name or upload CSV to add user
            </p>
          </div>
          <div>
            {/* checkbox */}
            <div className="relative inline-block">
              <input
                type="checkbox"
                id="animatedCheckbox"
                checked={isManualChecked}
                onChange={handleManualCheckboxChange}
                className="sr-only peer"
              />
              <label
                htmlFor="animatedCheckbox"
                className={`w-8 h-8 border-4 border-[#B4B4B4] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue50 peer-checked:border-primary500 peer-checked:text-white peer-disabled:opacity-50 peer-disabled:cursor-not-allowed`}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isManualChecked ? "#282EFF" : "#B4B4B4"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className={`transition-all duration-300 ${
                      isManualChecked ? "animate-draw" : "opacity"
                    }`}
                    // d="M9 12.5l2.5 2.5L15 10"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
              <style>
                {`
    @keyframes draw {
      from {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
      }
      to {
        stroke-dasharray: 20;
        stroke-dashoffset: 0;
      }
    }

    .animate-draw {
      stroke-dasharray: 15;
      stroke-dashoffset: 0;
      animation: draw 0.6s ease-out forwards;
    }
    `}
              </style>
            </div>
          </div>
        </div>
        {/* Scan */}
        <div className="border border-[#E3E3E3] rounded-md p-4 flex justify-between items-center ">
          <div className=" w-[58.9px]  h-[58.9px]">
            <img
              src={scanIcon}
              alt=""
              className=" w-full h-full object-cover"
            />
          </div>
          <div className=" text-textColor">
            <h1 className=" text-2xl font-medium">Scan</h1>
            <p className=" text-sm">
              Scan through company’s network to add user
            </p>
          </div>
          <div>
            <div className="relative inline-block">
              <input
                type="checkbox"
                id="scanCheckbox"
                checked={isScanChecked}
                onChange={handleScanCheckboxChange}
                className="sr-only peer"
              />
              <label
                htmlFor="scanCheckbox"
                className={`w-8 h-8 border-4 border-[#B4B4B4] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-blue50 peer-checked:border-primary500 peer-checked:text-white peer-disabled:opacity-50 peer-disabled:cursor-not-allowed`}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isScanChecked ? "#282EFF" : "#B4B4B4"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className={`transition-all duration-300 ${
                      isScanChecked ? "animate-draw" : "opacity"
                    }`}
                    // d="M9 12.5l2.5 2.5L15 10"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </label>
              <style>
                {`
    @keyframes draw {
      from {
        stroke-dasharray: 20;
        stroke-dashoffset: 20;
      }
      to {
        stroke-dasharray: 20;
        stroke-dashoffset: 0;
      }
    }

    .animate-draw {
      stroke-dasharray: 15;
      stroke-dashoffset: 0;
      animation: draw 0.6s ease-out forwards;
    }
    `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
