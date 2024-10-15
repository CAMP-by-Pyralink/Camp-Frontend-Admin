import { useState } from "react";
import navIcon from "../assets/svgs/navicon.svg";
import navCloseIcon from "../assets/svgs/navclose.svg";
import alertIcon from "../assets/svgs/alertsicon.svg";
import assetIcon from "../assets/svgs/asseticon.svg";
import awarenessIcon from "../assets/svgs/awarenessicon.svg";
import deepwebIcon from "../assets/svgs/deepwebicon.svg";
import overviewIcon from "../assets/svgs/overviewIcon.svg";
import pshishingIcon from "../assets/svgs/pshishingicon.svg";
import riskIcon from "../assets/svgs/riskicon.svg";
import settingsIcon from "../assets/svgs/settingsicon.svg";
import userIcon from "../assets/svgs/usericon.svg";
import signoutIcon from "../assets/svgs/signout.svg";
import onlineStatus from "../assets/svgs/onlinestatus.svg";
import profilePic from "../assets/profilepic.png";
import { Link } from "react-router-dom";
import { useCustomization } from "../contexts/CustomizationContext";

const SideNav = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { themeColor, logo } = useCustomization();
  // const { l } = useCustomization();

  const navMenus = [
    { name: "Overview", img: overviewIcon, path: "/" },
    { name: "User Management", img: userIcon, path: "/user-management" },
    {
      name: "Awareness Training",
      img: awarenessIcon,
      path: "/awareness-trainig",
    },
    {
      name: "Phishing Stimulation",
      img: pshishingIcon,
      path: "/phishing-simulation",
    },
    { name: "Asset Management", img: assetIcon, path: "/asset-management" },
    { name: "Risk Assessment", img: riskIcon, path: "/risk-assessment" },
    {
      name: "Deep Web Monitoring",
      img: deepwebIcon,
      path: "/deep-web-monitoring",
    },
    { name: "Settings", img: settingsIcon, path: "/settings" },
    { name: "Alerts", img: alertIcon, path: "/alerts" },
  ];
  // Function to convert hex code to RGB for easier manipulation
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? result.slice(1).map((x) => parseInt(x, 16)) : null;
  }

  // Function to create a fainter version of a hex color (simplified)
  function getSlightlyFainterColor(hex, opacity = 0.8) {
    const rgb = hexToRgb(hex);
    if (rgb) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }
    return hex; // Return original hex code if conversion fails
    // console.log(hex);
  }

  console.log(themeColor);
  // console.log(hex);

  return (
    <div
      className={`h-full px-4 py-6 bg-primary10 text-white flex flex-col gap-4 transition-width duration-300 ${
        isCollapsed ? "w-[87px]" : "w-[294px]"
      }`}
      style={{ background: themeColor }}
    >
      {/* Logo */}
      <div className=" flex items-center justify-center">
        <div
          className={`flex relative items-center ${
            isCollapsed ? "gap-0" : "gap-8"
          } `}
        >
          <div
            className={`text-white flex flex-col transition-all duration-300 ${
              isCollapsed ? "" : ""
            }`}
          >
            {/* Conditionally render the uploaded logo or default text */}
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className={`w-full h-[50px] object-cover ${
                  isCollapsed ? "" : ""
                }`}
              />
            ) : (
              <h1
                className={`font-semibold leading-[49.2px] tracking-[-2%] ${
                  isCollapsed ? "text-[41px] ml-4 " : "text-[41px]"
                }`}
              >
                {isCollapsed ? "C" : "CAMP"}
              </h1>
            )}
            {!isCollapsed && (
              <p className="italic text-[13px] leading-[15.6px] tracking-[-2%]">
                by Pyralink Innovation
              </p>
            )}
          </div>
          <img
            className={`cursor-pointer ${isCollapsed ? " pt-1" : "block"}`}
            src={isCollapsed ? navCloseIcon : navIcon}
            alt="Navigation Icon"
            width={24}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">
        {navMenus.map((navMenu, index) => (
          <div key={index}>
            <Link to={navMenu.path}>
              <div
                className={`flex items-center gap-4 p-2 cursor-pointer ${
                  activeMenu === navMenu.name
                    ? `bg-${getSlightlyFainterColor(themeColor)}  py-3 px-4`
                    : " py-3 px-4"
                }`}
                onClick={() => setActiveMenu(navMenu.name)}
              >
                <img
                  src={navMenu.img}
                  alt={`${navMenu.name} Icon`}
                  width={20}
                />
                {!isCollapsed && (
                  <h1
                    className={` ${
                      activeMenu === navMenu.name
                        ? " text-white text-[15px]"
                        : "text-sm text-[#C6DDF7]"
                    } `}
                  >
                    {navMenu.name}
                  </h1>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Sign out section */}
      <div
        className={`flex justify-between items-center mt-auto ${
          isCollapsed ? "flex-col gap-4" : "flex-row"
        }`}
      >
        <div className="flex items-center gap-2 relative">
          <img src={profilePic} alt="" className="rounded-full" width={35} />
          <img
            src={onlineStatus}
            alt="Online Status"
            className="absolute bottom-0 right-[60%]"
            width={10}
            height={10}
          />
          {!isCollapsed && (
            <div>
              <h1 className="text-sm font-semibold">Flutter</h1>
              <h1 className="text-sm">Admin</h1>
            </div>
          )}
        </div>
        <img src={signoutIcon} alt="Sign Out" width={20} height={20} />
      </div>
    </div>
  );
};

export default SideNav;
