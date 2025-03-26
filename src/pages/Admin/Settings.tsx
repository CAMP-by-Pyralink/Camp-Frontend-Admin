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
  // const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [adminImage, setAdminImage] = useState<string | null>(null);
  const [companyImage, setCompanyImage] = useState<string | null>(null);

  const { getCurrentAdmin, currentUser, getCompanyDetails, companyData } =
    useAdminStore();

  useEffect(() => {
    getCurrentAdmin();
    console.log(companyData, "eghjiugf");

    const fetchCompanyDetails = async () => {
      const data = await getCompanyDetails();
      if (data) {
        // setCompanyData(data);
      }
    };

    fetchCompanyDetails();
  }, [getCurrentAdmin, getCompanyDetails]);

  // Handle file selection for Admin Image
  const handleAdminImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file selection for Company Image
  const handleCompanyImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
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

      {/* Tabs */}
      {activeTab === "profile" ? (
        <AdminProfileTab currentUser={currentUser} adminImage={adminImage} />
      ) : (
        <CompanyProfileTab
          companyData={companyData}
          companyImage={companyImage}
        />
      )}
    </div>
  );
};

export default Settings;
