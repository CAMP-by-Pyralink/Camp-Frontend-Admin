import React, { useState } from "react";
import closeIcon from "../../../../assets/svgs/closeicongrey.svg";
import { useParams } from "react-router-dom";
// import { DateRange } from "react-date-range";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import departmentIcon from "../../../../assets/svgs/department.svg";
import employeeicon from "../../../../assets/svgs/employee-icon.svg";
import organizationicon from "../../../../assets/svgs/organization.svg";
import PreviewModal from "./PreviewModal";
// import CustomDatePicker from "./CustomDatePicker";

const PhishingDetails: React.FC = () => {
  const [continueClicked, setContinueClicked] = useState(false);
  const { title } = useParams<{ title: string }>();
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  const cards = [
    {
      img: organizationicon,
      title: "All",
    },
    {
      img: departmentIcon,
      title: "Specific department",
    },
    {
      img: employeeicon,
      title: "Specific employee",
    },
  ];

  return (
    <>
      <h1 className="text-primary500 mb-8 text-sm font-semibold">
        Phishing <span className=" text-neutrals500">/ Select target</span>
      </h1>
      <div className="bg-blue50 px-4 rounded-md py-8 h-full">
        <div className="bg-white shadow-lg rounded-lg w-full">
          <div className="flex justify-between gap-8 py-4 px-8 h-full">
            {/* Left Panel */}
            <div className="basis-[60%]">
              <h1 className="text-[#454545] pb-2">Work Test</h1>
              <h2 className="text-2xl font-bold text-[#454545] pb-2">
                {title}
              </h2>
              <p className="text-greyText text-xs mb-8">
                Select a department or specific employees to receive this
                phishing simulation exercise
              </p>

              {/* Target Selection */}
              <div className="grid grid-cols-3 gap-4">
                {cards.map(({ img, title }, index) => (
                  <div
                    key={index}
                    className="p-8 shadow-[5px_5px_40px_rgba(107,151,255,0.3)]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="bg-blue-50 h-[52px] w-[52px] flex items-center justify-center">
                        <img src={img} alt="" />
                      </div>
                      <input type="radio" name="target" />
                    </div>
                    <h1 className="mt-4 text-xs font-medium text-[#454545]">
                      {title}
                    </h1>
                  </div>
                ))}
              </div>

              {/* Department Selection */}
              <div className="mt-12 bg-white p-8 shadow-[5px_5px_40px_rgba(107,151,255,0.3)] rounded-md">
                <input
                  className="w-full border border-[#D0D5DD] rounded p-4 text-[#454545]"
                  value="Select a department"
                />
                <div className=" flex items-center gap-4 mt-8">
                  <div className=" flex items-center justify-between gap-4 border-[0.62px]  border-[#949494] rounded-full py-1 px-6">
                    <h1 className=" text-[#454545]">IT</h1>
                    <img src={closeIcon} alt="" className=" w-[10.22px]" />
                  </div>
                  <div className=" flex items-center justify-between gap-4 border-[0.62px]  border-[#949494] rounded-full py-1 px-6">
                    <h1 className=" text-[#454545]">Human resource</h1>
                    <img src={closeIcon} alt="" className=" w-[10.22px]" />
                  </div>
                </div>
              </div>

              {/* Simulation Duration with Date Picker */}
              <div className=" mt-8">
                <DayPicker
                  mode="range"
                  numberOfMonths={3} // Display three months
                  pagedNavigation // Ensures months are displayed in sequence
                />
              </div>
              {/* <div className="mt-4">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Select simulation duration
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    months={3}
                    direction="horizontal"
                  />
                </div>
              </div> */}
              {/* <div className="mt-4">
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Select simulation duration
                </label>
                <CustomDatePicker />
              </div> */}
            </div>

            {/* Divider */}
            <div className="w-[0.5px] h-screen bg-black"></div>

            {/* Right Panel */}
            <div className=" space-y-4">
              <div className=" flex gap-8">
                <h3 className="text-lg font-semibold text-black">
                  Recurring delivery
                </h3>

                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    isToggled ? "bg-primary900" : "bg-[#E4E8F1]"
                  }`}
                  onClick={handleToggle}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isToggled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-greyText text-xs font-medium">
                Turn this on to repeat this simulation exercise
              </p>

              <div className="flex items-center gap-4">
                <label className=" text-xs font-medium">Delivery time</label>
                <input
                  type="text"
                  value="9:00am"
                  className="border-[0.8px] w-[90px] border-[#D0D5DD] rounded-[4.79px] p-[12.78px] text-[#454545] text-xs"
                />
                <p>to</p>
                <input
                  type="text"
                  value="4:00pm"
                  className="border-[0.8px] w-[90px] border-[#D0D5DD] rounded-[4.79px] p-[12.78px] text-[#454545] text-xs"
                />
              </div>

              <div className="flex items-center gap-[16px]">
                <label className="text-xs ">Timezone</label>
                <select className="border-[0.8px] w-[90px] border-[#D0D5DD] rounded-[4.79px] p-[12.78px] text-[#454545] text-xs">
                  <option>GMT</option>
                  {/* Add timezone options here */}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-12 bg-primary500 text-white py-3 rounded-lg font-semibold  transition-colors"
          onClick={() => setContinueClicked((prev) => !prev)}
        >
          Continue
        </button>
      </div>
      {continueClicked && (
        <PreviewModal setContinueClicked={setContinueClicked} />
      )}
    </>
  );
};

export default PhishingDetails;
