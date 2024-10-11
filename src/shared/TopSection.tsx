import profilePic from "../assets/profilepic.png";
import settings from "../assets/svgs/settings.svg";
// import CustomizationSetting from "./CustomizationSetting";
const TopSection = ({ handleCustomizationClick }) => {
  return (
    <div className=" flex justify-between relative">
      {/* searchbox */}
      <div>
        <input
          type="text"
          className=" outline-none border-[0.5px] px-4 py-2 placeholder:text-[#898384] border-[#898384] rounded w-[593px]"
          placeholder="Search"
        />
      </div>
      {/* profile */}
      <div className=" flex gap-4 items-center">
        <img src={profilePic} alt="" className="  w-[36px] h-[36px]" />
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
