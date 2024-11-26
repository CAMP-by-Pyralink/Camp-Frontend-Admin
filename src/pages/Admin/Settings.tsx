import React, { useState } from "react";
// import profilePic from "../../assets/profilepic.png";
import CompanyProfileTab from "../../components/Settings/CompanyProfileTab";
import AdminProfileTab from "../../components/Settings/AdminProfileTab";
import profilePic from "../../assets/avatar.png";

interface CompanyData {
  name: string;
  website: string;
  departments: string[];
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "company">("profile");

  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "Jydex ventures",
    website: "campbypyralink.com",
    departments: ["Finance", "ICT", "Marketing"],
  });

  return (
    <div className=" ">
      {/* Tabs */}
      <div className="relative mb-6">
        <div className="flex gap-6 w-fit relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#D9D9D9]">
          <button
            className={`pb-2 px-1 w-fit relative text-xl font-medium ${
              activeTab === "profile"
                ? "line-active text-primary500 z-50"
                : "text-[#333333]"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`pb-2 px-1 w-fit relative text-xl font-medium ${
              activeTab === "company"
                ? "line-active text-primary500 z-50"
                : "text-[#333333]"
            }`}
            onClick={() => setActiveTab("company")}
          >
            Company Profile
          </button>
        </div>
      </div>
      {/* Profile section  */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className=" bg-[#FFECE5] border-[3px] border-white w-28 h-28 rounded-full overflow-hidden">
            {activeTab === "profile" ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <h1 className="text-red">C</h1>
            )}
          </div>
          <div>
            <h2 className="text-xl font-medium">
              {activeTab === "profile" ? "Sarah Brown" : "Camp by Pyralink"}
            </h2>
            <p className="">
              {activeTab === "profile" ? "Accountant" : "campbypyralink.com"}
            </p>
          </div>
          <div></div>
        </div>
        {/* Save button */}
        <div className=" flex items-center justify-between mb-4">
          <div className=" text-greyText">
            <h1 className=" text-greyText font-bold mb-2">
              {activeTab === "profile" ? "Profile" : "Company Profile"}
            </h1>
            <p className=" text-sm">
              {" "}
              Update your {activeTab === "company" ? "company" : ""} profile
            </p>
          </div>
          <div className=" flex gap-4">
            <button className="w-fit border border-[#898384] py-2 px-8 text-textColor text-sm rounded-lg font-semibold  ">
              Cancel
            </button>
            <button className="w-fit bg-primary500 rounded-lg py-2 px-5 text-white font-semibold text-sm ">
              Save changes
            </button>
          </div>
        </div>
      </div>
      {activeTab === "profile" ? (
        <AdminProfileTab />
      ) : (
        /* Company profile section */
        // <div className="mb-8">
        //   <div className="flex items-center gap-4 mb-8">
        //     <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-2xl font-semibold">
        //       C
        //     </div>
        //     <div>
        //       <h2 className="text-lg font-medium">Camp by Pyralink</h2>
        //       <p className="text-gray-500">{companyData.website}</p>
        //     </div>
        //   </div>

        //   <div>
        //     <h3 className="text-lg font-medium mb-2">Company profile</h3>
        //     <p className="text-gray-500 text-sm mb-6">
        //       Update your company profile
        //     </p>

        //     <div className="max-w-md">
        //       <div className="mb-4">
        //         <label className="block text-sm text-gray-600 mb-1">
        //           Company name
        //         </label>
        //         <input
        //           type="text"
        //           value={companyData.name}
        //           onChange={(e) =>
        //             setCompanyData({ ...companyData, name: e.target.value })
        //           }
        //           className="w-full p-2 border rounded-md"
        //         />
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <CompanyProfileTab />
      )}
    </div>
  );
};

export default Settings;
