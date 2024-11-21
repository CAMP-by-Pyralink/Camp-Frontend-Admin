import { useState } from "react";

const NotificationPreference = () => {
  const [preferences, setPreferences] = useState({
    email: false,
    push: false,
    sms: false,
  });

  const handleToggle = (type: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  return (
    <div className=" bg-white p-4 rounded-[15px]">
      <h1 className=" text-[#333333] pl-6">Notification preference</h1>
      <div className="mt-8 px-8 flex flex-col gap-4">
        {Object.keys(preferences).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <h1 className="text-[#747171] capitalize">{type}</h1>
            <div
              onClick={() => handleToggle(type as keyof typeof preferences)}
              className={`relative inline-flex items-center h-6 rounded-full w-12 cursor-pointer ${
                preferences[type as keyof typeof preferences]
                  ? "bg-primary900"
                  : "bg-[#E4E8F1]"
              }`}
            >
              <span
                className={`absolute left-1 w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${
                  preferences[type as keyof typeof preferences]
                    ? "transform translate-x-6 bg-white"
                    : "bg-white"
                }`}
              />
            </div>
          </div>
        ))}
        <hr />
      </div>
      {/*  */}
      <div className=" flex flex-col gap-4 mt-4 px-8">
        <div className=" flex gap-4 items-center">
          <input type="checkbox" name="" id="" />
          <h1 className=" text-[#454545]">Simulation score</h1>
        </div>
        <div className=" flex gap-4 items-center">
          <input type="checkbox" name="" id="" />
          <h1 className=" text-[#454545]">Alerts</h1>
        </div>{" "}
        <div className=" flex gap-4 items-center">
          <input type="checkbox" name="" id="" className="" />
          <h1 className=" text-[#454545]">User exit</h1>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreference;
