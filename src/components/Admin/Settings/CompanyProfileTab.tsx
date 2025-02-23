import React, { useState } from "react";
import addIcon from "../../../assets/svgs/add-halfcircle-icon.svg";
import { GetCurrentAdminData } from "../../../store/useAdminStore";

interface AdminProfileTabProps {
  currentUser: GetCurrentAdminData | null;
}

const CompanyProfileTab: React.FC = () => {
  const [companyName, setCompanyName] = useState("Camp by Pyralink");
  const [companyUrl, setCompanyUrl] = useState("pyralink.com/Camp by Pyralink");
  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState<string>("");
  const [addNewClicked, setAddNewClicked] = useState<boolean>(false);

  const handleAddDepartment = () => {
    if (newDepartment.trim() && !departments.includes(newDepartment)) {
      setDepartments([...departments, newDepartment.trim()]);
      setNewDepartment("");
      setAddNewClicked(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDepartment();
    } else if (e.key === "Escape") {
      setAddNewClicked(false);
    }
  };

  // const handleRemoveDepartment = (deptToRemove: string) => {
  //   setDepartments(departments.filter((dept) => dept !== deptToRemove));
  // };

  return (
    <div className="border-[0.5px] rounded-lg border-[#333333] border-dotted p-10">
      {/* Form Section */}
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm text-greyText font-medium mb-1">
              Company name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-greyText placeholder:text-sm"
            />
          </div>

          {/* Company URL */}
          <div>
            <label className="block text-sm text-greyText font-medium mb-1">
              Company URL
            </label>
            <input
              type="text"
              value={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-greyText placeholder:text-sm"
            />
          </div>
        </div>

        {/* Departments */}
        <div className="flex items-center gap-4 relative">
          <div className="basis-[80%]">
            <label className="block text-sm text-greyText font-medium mb-1">
              Departments ({departments.length})
            </label>
            <div className="flex flex-wrap gap-2 mt-2 px-4 py-8 border border-[#D0D5DD] rounded-md">
              {departments.map((dept, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary100 rounded-full text-sm flex items-center gap-2"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAddNewClicked(true)}
            className="px-4 py-2 text-sm border border-[#333333] rounded-md flex items-center gap-2 text-[#333333] mt-4"
          >
            <img src={addIcon} alt="" />
            Add new
          </button>

          {/* Add new input */}
          {addNewClicked && (
            <div
              className="absolute top-0 right-[25%]  bg-white z-10 p-12 shadow-lg border border-[#D0D5DD] rounded-md"
              onKeyDown={handleKeyDown}
            >
              <label
                htmlFor="custom-department"
                className="font-medium block text-sm mb-1 text-greyText"
              >
                Custom department
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  id="custom-department"
                  placeholder="Enter department name"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full px-2 py-3 border border-[#D0D5DD] rounded-md placeholder:text-greyText placeholder:text-sm outline-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddDepartment}
                  className="w-[168px] px-4 py-3 text-white bg-primary500 rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileTab;
