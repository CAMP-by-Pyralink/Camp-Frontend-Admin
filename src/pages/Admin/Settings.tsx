import React, { useEffect, useState } from "react";
import CompanyProfileTab from "../../components/Admin/Settings/CompanyProfileTab";
import AdminProfileTab from "../../components/Admin/Settings/AdminProfileTab";
import { useAdminStore } from "../../store/useAdminStore";
import editIcon from "../../assets/svgs/editPPImg.svg";

interface CompanyData {
  _id: string;
  companyName: string;
  companyUrl: string;
  companyDepartments: string[];
  profileImage: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "company">("profile");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const { getCurrentAdmin, currentUser, getCompanyDetails } = useAdminStore();

  useEffect(() => {
    // Fetch current admin details
    getCurrentAdmin();

    // Fetch company details
    const fetchCompanyDetails = async () => {
      const data = await getCompanyDetails();
      if (data) {
        setCompanyData(data); // Store the fetched company data in state
      }
    };

    fetchCompanyDetails();
  }, [getCurrentAdmin, getCompanyDetails]);

  // Get user's initials from first and last name
  const getUserInitials = () => {
    let initials = "";

    if (currentUser?.fName) {
      initials += currentUser.fName.charAt(0).toUpperCase();
    }

    if (currentUser?.lName) {
      initials += currentUser.lName.charAt(0).toUpperCase();
    }

    // If we couldn't get any initials, return "U" as fallback
    return initials || "";
  };

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
      {/* Profile section */}
      <div>
        <div className="relative flex items-center gap-4 mb-8 w-fit">
          <div className="relative bg-[#D4CFCF] border-[3px] border-white w-28 h-28 rounded-full overflow-hidden">
            {activeTab === "profile" ? (
              <>
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-800 font-semibold text-4xl">
                    {getUserInitials()}
                  </span>
                )}
              </>
            ) : (
              <h1 className="text-red"></h1>
            )}
            <img src={editIcon} className=" absolute bottom-4 right-2" alt="" />
          </div>
          <div>
            <h2 className="text-xl font-medium">
              {activeTab === "profile"
                ? `${currentUser?.fName} ${currentUser?.lName} `
                : companyData?.companyName || "Company Name"}
            </h2>
            <p className="">
              {activeTab === "profile"
                ? currentUser?.department
                : companyData?.companyUrl || "Company URL"}
            </p>
          </div>
        </div>
        {/* Save button */}
        <div className=" flex items-center justify-between mb-4">
          <div className=" text-greyText">
            <h1 className=" text-greyText font-bold mb-2">
              {activeTab === "profile" ? "Profile" : "Company Profile"}
            </h1>
            <p className=" text-sm">
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
        <AdminProfileTab currentUser={currentUser} />
      ) : (
        <CompanyProfileTab companyData={companyData} />
      )}
    </div>
  );
};

export default Settings;
