import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ProfileData {
  userId: string;
  role: string;
  lastName: string;
  firstName: string;
  department: string;
  email: string;
  phone: string;
  address: string;
}

const AdminProfileTab = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    userId: "PY 11234",
    role: "Admin",
    lastName: "Sarah",
    firstName: "Brown",
    department: "Human resource",
    email: "thegirlfromphantom@gmail.com",
    phone: "+2348109394858",
    address: "House 6 Tropia street, Ajah",
  });
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-6 border-[0.5px] rounded-lg border-[#333333] border-dotted p-10">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              User ID
            </label>
            <input
              type="text"
              value={profileData.userId}
              onChange={(e) =>
                setProfileData({ ...profileData, userId: e.target.value })
              }
              className="w-full p-4 border border-[#D0D5DD] rounded-md bg-[#F0F2F5]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Role
            </label>
            <input
              type="text"
              value={profileData.role}
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
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Department
            </label>
            <div className="relative">
              <select
                value={profileData.department}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    department: e.target.value,
                  })
                }
                className="w-full p-4 border border-[#D0D5DD] rounded-md appearance-none pr-8"
              >
                <option value="Human resource">Human resource</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-3 text-gray-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#101928] font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder={profileData.email}
              disabled
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
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
              disabled
              placeholder={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
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
              disabled
              placeholder={profileData.address}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
              className="w-full p-4 border border-[#D0D5DD] rounded-md placeholder:text-[#98A2B3] placeholder:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileTab;
