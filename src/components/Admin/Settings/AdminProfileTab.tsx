import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  GetCurrentAdminData,
  useAdminStore,
} from "../../../store/useAdminStore";
import editIcon from "../../../assets/svgs/editPPImg.svg";
import Loader from "../../../shared/Loader";
import { ClipLoader } from "react-spinners";

interface ProfileData {
  fName: string;
  lName: string;
  homeAddress: string;
  phoneNumber: string;
  profileImage?: string | null;
}

interface AdminProfileTabProps {
  currentUser: GetCurrentAdminData | null;
}

const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ currentUser }) => {
  const { updateAdminDetails, getCurrentAdmin, isLoading } = useAdminStore();
  const [profileData, setProfileData] = useState<ProfileData>({
    fName: "",
    lName: "",
    homeAddress: "",
    phoneNumber: "",
    profileImage: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        fName: currentUser.fName,
        lName: currentUser.lName,
        homeAddress: currentUser.homeAddress || "",
        phoneNumber: currentUser.phoneNumber,
        profileImage: currentUser.profileImage || "",
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className=" flex items-center justify-center">
        <div className="loading-container">
          <ClipLoader size={50} color="#123abc" />
        </div>
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setProfileData({ ...profileData, profileImage: base64String });
      };

      reader.readAsDataURL(file);
    }
  };

  // const handleSaveChanges = async () => {
  //   // Prepare payload with all existing data
  //   const payload: ProfileData = {
  //     fName: profileData.fName,
  //     lName: profileData.lName,
  //     homeAddress: profileData.homeAddress,
  //     phoneNumber: profileData.phoneNumber,
  //     ...(profileData.profileImage?.startsWith("data:image")
  //       ? { profileImage: profileData.profileImage }
  //       : {}),
  //   };

  //   const success = await updateAdminDetails(payload);
  //   return success;
  // };
  const handleSaveChanges = async () => {
    const payload: ProfileData = {
      fName: profileData.fName || currentUser?.fName || "",
      lName: profileData.lName || currentUser?.lName || "",
      homeAddress: profileData.homeAddress || currentUser?.homeAddress || "",
      phoneNumber: profileData.phoneNumber || currentUser?.phoneNumber || "",
      profileImage:
        profileData.profileImage !== undefined
          ? profileData.profileImage
          : currentUser?.profileImage || "", // Always include profileImage
    };

    console.log("Payload being sent:", payload); // Debugging log
    const success = await updateAdminDetails(payload);
    // return success;
    if (success) {
      getCurrentAdmin();
    }
  };

  return (
    <div className="mb-8">
      <div className="relative flex items-center gap-4 mb-8 w-fit">
        <div className="relative bg-[#D4CFCF] border-[3px] border-white w-28 h-28 rounded-full overflow-hidden">
          <img
            src={profileData.profileImage || ""}
            alt=""
            className="w-full h-full object-cover"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
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
          <h1 className="text-greyText font-bold mb-2">Profile</h1>
          <p className="text-sm">Update your profile information</p>
        </div>
        <div className="flex gap-4">
          <button className="w-fit border border-[#898384] py-2 px-8 text-textColor text-sm rounded-lg font-semibold">
            Cancel
          </button>
          <button
            disabled={!!isLoading}
            className={`w-fit bg-primary500 rounded-lg py-2 px-5 text-white font-semibold text-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSaveChanges}
          >
            Save changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-[0.5px] rounded-lg border-[#333333] border-dotted p-10 space-y-">
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Role
          </label>
          <input
            type="text"
            value={currentUser.role}
            disabled
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Last name
          </label>
          <input
            type="text"
            value={profileData.lName}
            onChange={(e) =>
              setProfileData({ ...profileData, lName: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            First name
          </label>
          <input
            type="text"
            value={profileData.fName}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                fName: e.target.value,
              })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Department
          </label>
          <input
            type="text"
            value={currentUser.department}
            readOnly
            disabled
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            value={currentUser.email}
            disabled
            className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Home Address
          </label>
          <input
            type="text"
            value={profileData.homeAddress}
            onChange={(e) =>
              setProfileData({ ...profileData, homeAddress: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={profileData.phoneNumber}
            onChange={(e) =>
              setProfileData({ ...profileData, phoneNumber: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileTab;
