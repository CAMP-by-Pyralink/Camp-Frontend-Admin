import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  GetCurrentAdminData,
  useAdminStore,
} from "../../../store/useAdminStore";

interface ProfileData {
  // userId: string;
  role: string;
  lastName: string;
  firstName: string;
  department: string;
  email: string;
  phone: string;
  address: string;
}

interface AdminProfileTabProps {
  currentUser: GetCurrentAdminData | null;
}

const AdminProfileTab: React.FC<AdminProfileTabProps> = ({ currentUser }) => {
  const { upda } = useAdminStore();
  const [profileData, setProfileData] = useState<ProfileData>({
    // userId: "",
    role: "",
    lastName: "",
    firstName: "",
    department: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        // userId: currentUser.adminId,
        role: currentUser.role,
        lastName: currentUser.lName,
        firstName: currentUser.fName,
        department: currentUser.department,
        email: currentUser.email,
        phone: currentUser.phoneNumber,
        address: currentUser.address,
      });
    }
  }, [currentUser]);

  console.log(currentUser?.department);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // const handleUpdateProfile= async()=>{
  //   await
  // }
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-6 border-[0.5px] rounded-lg border-[#333333] border-dotted p-10 space-y-">
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Role
          </label>
          <input
            type="text"
            value={profileData.role}
            disabled
            onChange={(e) =>
              setProfileData({ ...profileData, role: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Last name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
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
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                firstName: e.target.value,
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
            value={profileData.department}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                department: e.target.value,
              })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            value={profileData.email}
            disabled
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[#101928] font-medium mb-1">
            Home Address
          </label>
          <input
            type="text"
            value={profileData.address}
            disabled
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
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
            value={profileData.phone}
            disabled
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileTab;
