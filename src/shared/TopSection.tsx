import { Link } from "react-router-dom";
import profilePic from "../assets/profilepic.png";
import settings from "../assets/svgs/settings.svg";
import searchIcon from "../assets/svgs/search.svg";
import { useAdminStore } from "../store/useAdminStore";
import { useEffect } from "react";

// import CustomizationSetting from "./CustomizationSetting";
const TopSection = ({
  handleCustomizationClick,
}: {
  handleCustomizationClick: () => void;
}) => {
  const { currentUser, getCurrentAdmin } = useAdminStore();

  useEffect(() => {
    getCurrentAdmin();
  }, []);

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
    <div className=" flex justify-between relative">
      {/* searchbox */}
      <div>
        <input
          type="text"
          className=" outline-none border-[0.5px] px-12 py-2 placeholder:text-[#898384] border-[#898384] rounded-md w-[593px]"
          placeholder="Search"
        />
        <img
          src={searchIcon}
          alt=""
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
        />
      </div>
      {/* profile */}
      <div className=" flex gap-4 items-center">
        <Link to="/settings">
          <div className="cursor-pointer">
            <div className="w-[40px] border-[3px] border-[#FFFFFF] bg-[#D4CFCF] aspect-square rounded-full flex items-center justify-center overflow-hidden">
              {currentUser?.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-800 font-semibold text-lg">
                  {getUserInitials()}
                </span>
              )}
            </div>
          </div>
        </Link>
        <img
          src={settings}
          alt=""
          className=" w-[24px] h-[24px]"
          onClick={handleCustomizationClick}
        />
      </div>
    </div>
  );
};

export default TopSection;
