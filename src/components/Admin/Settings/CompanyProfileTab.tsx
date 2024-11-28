import React, { useState } from "react";
import addIcon from "../../../assets/svgs/add-halfcircle-icon.svg";

const CompanyProfileTab: React.FC = () => {
  const [companyName, setCompanyName] = useState("Camp by Pyralink");
  const [companyUrl, setCompanyUrl] = useState("pyralink.com/Camp by Pyralink");
  const [departments, setDepartments] = useState([
    "Finance",
    "ICT",
    "Marketing",
  ]);

  const handleAddDepartment = () => {
    const newDepartment = prompt("Enter new department name:");
    if (newDepartment) {
      setDepartments([...departments, newDepartment]);
    }
  };

  return (
    <div className="  border-[0.5px] rounded-lg border-[#333333] border-dotted p-10">
      {/* Header Section */}
      {/* <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-2xl font-semibold">
          C
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{companyName}</h1>
          <p className="text-sm text-gray-500">{companyUrl}</p>
        </div>
      </div> */}

      {/* Form Section */}
      <form className=" space-y-6">
        <div className=" grid grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Company name
            </label>
            <input
              type="text"
              placeholder={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-4 border border-[#D0D5DD] rounded-md  placeholder:text-[#101928] placeholder:text-sm"
            />
          </div>

          {/* Company URL */}
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Company URL
            </label>
            <input
              type="text"
              placeholder={companyUrl}
              onChange={(e) => setCompanyUrl(e.target.value)}
              className="w-full p-4 border border-[#D0D5DD] rounded-md  placeholder:text-[#101928] placeholder:text-sm"
            />
          </div>
        </div>

        {/* Departments */}
        <div className=" flex items-center gap-4">
          <div className=" basis-[80%]">
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Departments ({departments.length})
            </label>
            <div className="flex flex-wrap gap-2 mt-2 p-4 border border-[#D0D5DD] rounded-md ">
              {departments.map((dept, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary100  rounded-full text-sm"
                >
                  {dept}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddDepartment}
            className=" px-4 py-2 text-sm border border-[#333333] rounded-md flex items-center gap-2 text-[#333333] mt-4 "
          >
            <img src={addIcon} alt="" />
            Add new
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileTab;
