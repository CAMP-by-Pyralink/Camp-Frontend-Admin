// import React from "react";
// import UserProfileCard from "./UserProfileCard";
// import AssignedAssets from "./AssignedAssets";
// import AssignedTraining from "./AssignedTraining";
// import PhishingSimulations from "./PhishingSimulations";
// import Permissions from "./Permissions";

import ProfileAssignedAssets from "./ProfileAssignedAssets";
import ProfileAssignedTraining from "./ProfileAssignedTraining";
import ProfilePermissions from "./ProfilePermissions";
import ProfilePhishingSimulations from "./ProfilePhishingSimulations";
import UserProfileCard from "./UserProfileCard";

const EmployeeProfile = () => {
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
  );
};

export default EmployeeProfile;
