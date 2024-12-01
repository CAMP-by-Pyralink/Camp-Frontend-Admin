import { Link } from "react-router-dom";
import profilePic from "../assets/profilepic.png";
import settings from "../assets/svgs/settings.svg";
import searchIcon from "../assets/svgs/search.svg";

// import CustomizationSetting from "./CustomizationSetting";
const TopSection = ({
  handleCustomizationClick,
}: {
  handleCustomizationClick: () => void;
}) => {
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
          <img src={profilePic} alt="" className="  w-[36px] h-[36px]" />
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
