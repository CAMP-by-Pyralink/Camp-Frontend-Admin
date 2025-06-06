import React, { useEffect, useState } from "react";
import closeIcon from "../../../../assets/svgs/closeicongrey.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import departmentIcon from "../../../../assets/svgs/department.svg";
import employeeicon from "../../../../assets/svgs/employee-icon.svg";
import organizationicon from "../../../../assets/svgs/organization.svg";
import { useAdminStore } from "../../../../store/useAdminStore";

interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  department: string;
  profileImage?: string;
}

interface Timezone {
  name: string;
  value: string;
  offset: string;
}

const PhishingDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { id } = useParams();
  const location = useLocation();
  const { templateId, templateName, campaignName, templateData } =
    location.state || {};

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { fetchDepartments, departments, getUsers, users } = useAdminStore();

  const [timezones, setTimezones] = useState<Timezone[]>([]);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("GMT");

  useEffect(() => {
    getUsers();
    fetchDepartments();
    fetchTimezones();
  }, [getUsers, fetchDepartments]);

  const fetchTimezones = async () => {
    try {
      const defaultTimezones = [
        { name: "GMT", value: "GMT", offset: "+00:00" },
        { name: "UTC", value: "UTC", offset: "+00:00" },
        { name: "EST", value: "EST", offset: "-05:00" },
        { name: "PST", value: "PST", offset: "-08:00" },
        { name: "WAT", value: "WAT", offset: "+01:00" },
      ];
      setTimezones(defaultTimezones);
    } catch (error) {
      console.error("Error fetching timezones:", error);
      const defaultTimezones = [
        { name: "GMT", value: "GMT", offset: "+00:00" },
        { name: "UTC", value: "UTC", offset: "+00:00" },
        { name: "EST", value: "EST", offset: "-05:00" },
        { name: "PST", value: "PST", offset: "-08:00" },
        { name: "WAT", value: "WAT", offset: "+01:00" },
      ];
      setTimezones(defaultTimezones);
    }
  };

  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<User[]>([]);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("16:00");
  const [frequency, setFrequency] = useState("Monthly");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [deliveryPeriod, setDeliveryPeriod] = useState("5 days");

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const cards = [
    {
      img: organizationicon,
      title: "All Employees",
      subtitle: `${users?.length || 0} employees across all departments`,
      value: "all",
    },
    {
      img: departmentIcon,
      title: "Specific Department",
      subtitle: "Target employees from selected departments",
      value: "department",
    },
    {
      img: employeeicon,
      title: "Specific Employees",
      subtitle: "Choose individual employees to target",
      value: "employee",
    },
  ];

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setSelectedDates(dates);
    }
  };

  const handleTargetChange = (value: string) => {
    setSelectedTarget(value);
    if (value !== "department") {
      setSelectedDepartments([]);
    }
    if (value !== "employee") {
      setSelectedEmployees([]);
    }
  };

  const handleDepartmentSelect = (department: string) => {
    if (!selectedDepartments.includes(department)) {
      setSelectedDepartments((prev) => [...prev, department]);
    }
    setShowDepartmentDropdown(false);
    setDepartmentSearch("");
  };

  const removeDepartment = (departmentToRemove: string) => {
    setSelectedDepartments((prev) =>
      prev.filter((dept) => dept !== departmentToRemove)
    );
  };

  const handleEmployeeSelect = (employee: User) => {
    if (!selectedEmployees.find((emp) => emp._id === employee._id)) {
      setSelectedEmployees((prev) => [...prev, employee]);
    }
    setShowEmployeeDropdown(false);
    setEmployeeSearch("");
  };

  const removeEmployee = (employeeToRemove: User) => {
    setSelectedEmployees((prev) =>
      prev.filter((emp) => emp._id !== employeeToRemove._id)
    );
  };

  const filteredDepartments =
    departments?.filter((dept) =>
      dept.toLowerCase().includes(departmentSearch.toLowerCase())
    ) || [];

  const filteredEmployees =
    users?.filter(
      (user) =>
        `${user.fName} ${user.lName}`
          .toLowerCase()
          .includes(employeeSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        user.department.toLowerCase().includes(employeeSearch.toLowerCase())
    ) || [];

  const getTargetSummary = () => {
    switch (selectedTarget) {
      case "all":
        return `All ${users?.length || 0} employees`;
      case "department":
        const deptEmployeeCount =
          users?.filter((user) => selectedDepartments.includes(user.department))
            .length || 0;
        return `${deptEmployeeCount} employees from ${selectedDepartments.length} department(s)`;
      case "employee":
        return `${selectedEmployees.length} selected employee(s)`;
      default:
        return "No target selected";
    }
  };

  const isFormValid = () => {
    return (
      selectedTarget &&
      selectedDates.length > 0 &&
      startTime &&
      endTime &&
      selectedTimezone
    );
  };

  const handleContinue = () => {
    navigate("/phishing-simulation/preview", {
      state: {
        campaignData: {
          campaignName: campaignName || "Untitled Campaign",
          selectedTarget,
          selectedDepartments,
          selectedEmployees,
          selectedDates,
          startTime,
          endTime,
          selectedTimezone,
          isToggled,
          frequency,
          startDate,
          deliveryPeriod,
          users,
        },
        templateData: {
          templateName: templateName || "Untitled Template",
          templateImage: templateData?.img || "/default-template.png",
          templateId,
        },
      },
    });
  };

  return (
    <div>
      <h1 className="text-primary500 mb-8 text-sm font-semibold">
        Phishing <span className=" text-neutrals500">/ Select target</span>
      </h1>
      <div className="bg-blue50 px-4 rounded-md py-8 h-full">
        <div className="bg-white shadow-lg rounded-lg w-full">
          <div className="flex justify-between gap-8 py-4 px-8 h-full">
            <div className="basis-[60%]">
              <div className=" flex items-center gap-1 mb-4">
                <span className="bg-primary500 w-4 h-4 p-3 flex items-center justify-center text-white rounded-full">
                  1
                </span>
                <p className=" text-sm text-greyText">
                  Select a department or specific employees to receive this
                  phishing simulation exercise
                </p>
              </div>
              <h1 className="text-[#454545] pb-2">{campaignName}</h1>

              <h2 className="text-2xl font-bold text-[#454545] pb-2">
                {templateName}
              </h2>
              <p className="text-greyText text-xs mb-8">
                Select a department or specific employees to receive this
                phishing simulation exercise
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {cards.map(({ img, title, subtitle, value }, index) => (
                  <div
                    key={index}
                    className={`p-6 shadow-[5px_5px_40px_rgba(107,151,255,0.3)] rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedTarget === value
                        ? "ring-2 ring-primary500 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleTargetChange(value)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-blue-50 h-[52px] w-[52px] flex items-center justify-center rounded-lg">
                        <img src={img} alt="" className="w-6 h-6" />
                      </div>
                      <input
                        type="radio"
                        name="target"
                        value={value}
                        checked={selectedTarget === value}
                        onChange={() => {}}
                        className="w-4 h-4 text-primary500"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-[#454545] mb-2">
                      {title}
                    </h3>
                    <p className="text-xs text-greyText">{subtitle}</p>
                  </div>
                ))}
              </div>

              {selectedTarget && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-primary500">
                  <p className="text-sm font-medium text-[#454545]">
                    Target Summary: {getTargetSummary()}
                  </p>
                </div>
              )}

              {selectedTarget === "department" && (
                <div className="mb-8 bg-white p-6 shadow-[5px_5px_40px_rgba(107,151,255,0.3)] rounded-lg">
                  <h3 className="text-lg font-semibold text-[#454545] mb-4">
                    Select Departments
                  </h3>
                  <div className="relative">
                    <input
                      className="w-full border border-[#D0D5DD] rounded-lg p-4 text-[#454545] focus:ring-2 focus:ring-primary500 focus:border-primary500"
                      placeholder="Search and select departments..."
                      value={departmentSearch}
                      onChange={(e) => setDepartmentSearch(e.target.value)}
                      onFocus={() => setShowDepartmentDropdown(true)}
                    />

                    {showDepartmentDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredDepartments.length > 0 ? (
                          filteredDepartments.map((department, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleDepartmentSelect(department)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[#454545] font-medium">
                                  {department}
                                </span>
                                <span className="text-xs text-greyText">
                                  {users?.filter(
                                    (user) => user.department === department
                                  ).length || 0}{" "}
                                  employees
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-greyText text-center">
                            No departments found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedDepartments.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-6">
                      {selectedDepartments.map((dept, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-primary100 border border-primary300 rounded-full py-2 px-4"
                        >
                          <span className="text-sm text-primary700 font-medium">
                            {dept}
                          </span>
                          <button
                            onClick={() => removeDepartment(dept)}
                            className="text-primary500 hover:text-primary700 transition-colors"
                          >
                            <img
                              src={closeIcon}
                              alt="Remove"
                              className="w-3 h-3"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedTarget === "employee" && (
                <div className="mb-8 bg-white p-6 shadow-[5px_5px_40px_rgba(107,151,255,0.3)] rounded-lg">
                  <h3 className="text-lg font-semibold text-[#454545] mb-4">
                    Select Employees
                  </h3>
                  <div className="relative">
                    <input
                      className="w-full border border-[#D0D5DD] rounded-lg p-4 text-[#454545] focus:ring-2 focus:ring-primary500 focus:border-primary500"
                      placeholder="Search employees by name, email, or department..."
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      onFocus={() => setShowEmployeeDropdown(true)}
                    />

                    {showEmployeeDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        {filteredEmployees.length > 0 ? (
                          filteredEmployees.map((employee) => (
                            <div
                              key={employee._id}
                              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleEmployeeSelect(employee)}
                            >
                              <div className="flex items-center gap-3">
                                {employee.profileImage ? (
                                  <img
                                    src={employee.profileImage}
                                    alt={`${employee.fName} ${employee.lName}`}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-primary100 rounded-full flex items-center justify-center">
                                    <span className="text-primary600 text-sm font-medium">
                                      {employee.fName.charAt(0)}
                                      {employee.lName.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-[#454545] font-medium">
                                    {employee.fName} {employee.lName}
                                  </p>
                                  <p className="text-xs text-greyText">
                                    {employee.email} • {employee.department}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-greyText text-center">
                            No employees found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedEmployees.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {selectedEmployees.map((employee) => (
                        <div
                          key={employee._id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            {employee.profileImage ? (
                              <img
                                src={employee.profileImage}
                                alt={`${employee.fName} ${employee.lName}`}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-primary100 rounded-full flex items-center justify-center">
                                <span className="text-primary600 font-medium">
                                  {employee.fName.charAt(0)}
                                  {employee.lName.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="text-[#454545] font-medium">
                                {employee.fName} {employee.lName}
                              </p>
                              <p className="text-xs text-greyText">
                                {employee.email} • {employee.department}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeEmployee(employee)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <img
                              src={closeIcon}
                              alt="Remove"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8">
                <div className=" flex items-center gap-1 mb-4">
                  <span className="bg-primary500 w-4 h-4 p-3 flex items-center justify-center text-white rounded-full">
                    2
                  </span>
                  <p className=" text-sm text-greyText">
                    Select simulation duration
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-[#454545]">
                    Select Campaign Dates:
                  </h4>
                  <DayPicker
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={handleDateSelect}
                    numberOfMonths={3}
                    pagedNavigation
                    defaultMonth={new Date()}
                    classNames={{
                      root: "rdp",
                      months: "rdp-months flex gap-4",
                      month: "rdp-month",
                      caption: "rdp-caption text-center font-medium mb-4",
                      week: "rdp-week",
                      day: "rdp-day hover:bg-blue-100 cursor-pointer",
                      today: "border-2 border-blue-500 font-bold",
                      selected: "bg-blue-600 text-white font-bold",
                      chevron: "fill-blue-600",
                      nav_button: "hover:bg-blue-100 p-2 rounded",
                      nav_button_previous: "absolute left-2 top-2",
                      nav_button_next: "absolute right-2 top-2",
                    }}
                    styles={{
                      day: {
                        borderRadius: "4px",
                        padding: "8px",
                        margin: "2px",
                      },
                    }}
                  />
                  {selectedDates.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <p className="text-sm font-medium text-[#454545]">
                        Selected Dates ({selectedDates.length}):
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedDates.map((date, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {date.toLocaleDateString()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[1px] h-screen bg-gray-200"></div>

            <div className="basis-[35%] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="bg-primary500 w-4 h-4 p-3 flex items-center justify-center text-white rounded-full text-xs">
                    3
                  </span>
                  <h3 className="text-lg font-semibold text-black">
                    Recurring delivery
                  </h3>
                </div>

                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    isToggled ? "bg-primary500" : "bg-[#E4E8F1]"
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

              <div className="space-y-4">
                <label className="text-sm font-medium text-[#454545]">
                  Delivery time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm flex-1"
                  />
                  <span className="text-sm text-greyText">to</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#454545]">
                  Timezone
                </label>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm focus:ring-2 focus:ring-primary500 focus:border-primary500"
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.name} ({timezone.offset})
                    </option>
                  ))}
                </select>
              </div>

              {isToggled && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#454545]">
                      Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm focus:ring-2 focus:ring-primary500 focus:border-primary500"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#454545]">
                      Start date
                    </label>
                    <input
                      type="date"
                      value={startDate.toISOString().split("T")[0]}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      className="w-full border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm focus:ring-2 focus:ring-primary500 focus:border-primary500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#454545]">
                      Delivery period
                    </label>
                    <select
                      value={deliveryPeriod}
                      onChange={(e) => setDeliveryPeriod(e.target.value)}
                      className="w-full border border-[#D0D5DD] rounded p-3 text-[#454545] text-sm focus:ring-2 focus:ring-primary500 focus:border-primary500"
                    >
                      <option value="1 day">1 day</option>
                      <option value="3 days">3 days</option>
                      <option value="5 days">5 days</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-6">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    isFormValid()
                      ? "bg-primary500 text-white hover:bg-primary600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleContinue}
                  disabled={!isFormValid()}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetails;
