import React, { useState, useEffect } from "react";
import addIcon from "../../../assets/svgs/add-halfcircle-icon.svg";
import { useAdminStore } from "../../../store/useAdminStore";
import editIcon from "../../../assets/svgs/editPPImg.svg";
// import { toast } from "react-toastify";
// import api from "../../../utils/api"; // Ensure this is correctly imported for API calls

interface CompanyProfileTabProps {
  companyData: {
    companyName: string;
    companyUrl: string;
    companyDepartments: string[];
    profileImage?: string;
  } | null;
}

const CompanyProfileTab: React.FC<CompanyProfileTabProps> = ({
  companyData,
}) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyUrl, setCompanyUrl] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [newDepartment, setNewDepartment] = useState<string>("");
  const [addNewClicked, setAddNewClicked] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const { getCompanyDetails, updateCompanyDetails, isLoading } =
    useAdminStore();

  useEffect(() => {
    if (companyData) {
      setCompanyName(companyData.companyName || "");
      setCompanyUrl(companyData.companyUrl || "");
      setDepartments(companyData.companyDepartments || []);
      setProfileImage(companyData.profileImage || "");
    }
  }, [companyData]);

  // Convert image to Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
    }
  };

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

  // API call to update company details
  const handleSaveChanges = async () => {
    const payload = {
      companyName,
      companyUrl,
      companyDepartments: departments,
      profileImage, // Send Base64 image
    };

    const response = await updateCompanyDetails(payload);
    if (response) {
      // Update company data in state
      // getCompanyDetails();
    }
  };

  return (
    <div>
      {/* Profile Image */}
      <div className="relative flex items-center gap-4 mb-8 w-fit">
        <div className="relative bg-[#D4CFCF] border-[3px] border-white w-28 h-28 rounded-full overflow-hidden">
          <img
            src={profileImage || ""}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <img
            src={editIcon}
            className="absolute bottom-4 right-2"
            alt="Edit"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-greyText">
          <h1 className="text-greyText font-bold mb-2">Company Profile</h1>
          <p className="text-sm">Update your profile information</p>
        </div>
        <div className="flex gap-4">
          <button className="w-fit border border-[#898384] py-2 px-8 text-textColor text-sm rounded-lg font-semibold">
            Cancel
          </button>
          <button
            disabled={!!isLoading}
            onClick={handleSaveChanges}
            className={`w-fit bg-primary500 rounded-lg py-2 px-5 text-white font-semibold text-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save changes
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="border-[0.5px] rounded-lg border-[#333333] border-dotted p-10">
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
                className="absolute top-0 right-[25%] bg-white z-10 p-12 shadow-lg border border-[#D0D5DD] rounded-md"
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
    </div>
  );
};

export default CompanyProfileTab;
