import { useState } from "react";
import profilePic from "../../../assets/avatar.png";
import assignedAssetIcon from "../../../assets/svgs/assignedAssets.svg";
import assignedTraining from "../../../assets/svgs/assignedtraining.svg";
import simulationScoreIcon from "../../../assets/svgs/simulationscore.svg";
import EditUserForm from "./EditUserInfo";
const UserProfileCard = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const user = {
    name: "Olawale Martins",
    img: profilePic,
    role: "Admin",
    stats: [
      {
        icon: assignedAssetIcon,
        value: 4,
        label: "Assigned asset",
      },
      {
        icon: simulationScoreIcon,
        value: 45,
        label: "Simulation Score",
      },
      {
        icon: assignedTraining,
        value: 5,
        label: "Assigned Training",
      },
    ],
    userId: "PY11234",
    department: "Human Resource",
    email: "olawalemartins@outlook.com",
    phone: "+234833462848",
    address: "House 6, Ajah, Lagos",
  };
  const {
    name,
    role,
    // assigned,
    // simulation,
    // assignedTraining,
    userId,
    department,
    email,
    phone,
    address,
  } = user;

  return (
    <div className="bg-white py-[61px] px-[17px] rounded-lg  shadow-[5px_5px_40px_rgba(107,151,255,0.3)]">
      <div className="flex flex-col gap-4 items-center mb-4">
        <img
          src={profilePic}
          alt="Profile"
          className="h-20 w-20 rounded-full bg-[#FFE7CC] border"
        />
        <div className="ml-4">
          <h2 className="text-[20px] font-medium text-black">{name}</h2>
        </div>
        <span className=" bg-secondary100 text-blue-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {role}
        </span>
      </div>

      <div className=" flex  items-center gap-2 mb-4 text-center">
        {user.stats.map((stat, index) => (
          <div key={index}>
            <div className="flex items-center">
              <img src={stat.icon} alt={stat.label} className="mr-2" />
              <div className=" ">
                <h4 className="font-bold text-[12px]">{stat.value}</h4>
                <p className="text-[8px] whitespace-break-spaces text-gray-500">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className=" py-4 text-xl font-semibold text-greyText">Details</h1>
      <div className="border-t pt-4 text-greyText flex flex-col gap-4">
        <p>
          <h1>User ID: {userId}</h1>
        </p>
        <p>
          <h1>Department: {department}</h1>
        </p>
        <p>
          <h1>Email Address: {email}</h1>
        </p>
        <p>
          <h1>Phone Number: {phone}</h1>
        </p>
        <p>
          <h1>Home Address: {address}</h1>
        </p>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => setEditModalOpen(true)}
          className="bg-primary500 text-white px-4 py-2 rounded-md w-full"
        >
          Edit
        </button>
        <button className="text-red-500 border border-red-500 px-4 py-2 rounded-md w-full">
          Delete
        </button>
      </div>
      {/*  */}
      {editModalOpen && (
        <div className=" ">
          <EditUserForm setEditModalOpen={() => setEditModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
