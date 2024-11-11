import { Link } from "react-router-dom";
import ProfileAssignedAssets from "./ProfileAssignedAssets";
import ProfileAssignedTraining from "./ProfileAssignedTraining";
import ProfilePermissions from "./ProfilePermissions";
import ProfilePhishingSimulations from "./ProfilePhishingSimulations";
import UserProfileCard from "./UserProfileCard";

const EmployeeProfile = () => {
  return (
    <div>
      <div className=" flex flex-col gap-2 mb-8">
        <div className=" py-  flex items-center gap-1 text-[#828690]">
          <Link to="/user-management/admin">
            <h1>User Management</h1>
          </Link>
          <span> {">"}</span>
          <span className=" font-bold underline">User details</span>
          {/* <Breadcrumb /> */}
        </div>
        <h1 className=" text-greyText font-medium text-2xl">User details</h1>
        <p className=" text-greyText text-sm">View & edit admin’s details</p>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-1">
          <UserProfileCard />
          <ProfilePermissions />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2">
          <ProfileAssignedAssets />
          <ProfileAssignedTraining />
          <ProfilePhishingSimulations />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
