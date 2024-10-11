import { Outlet } from "react-router-dom";
import SideNav from "../shared/SideNav";
import TopSection from "../shared/TopSection";
import ClipLoader from "react-spinners/ClipLoader"; // Example spinner
import DelayedSuspense from "../shared/DelayedSuspense";
import { useCustomization } from "../contexts/CustomizationContext";
import { useState } from "react";
import CustomizationSetting from "../shared/CustomizationSetting";

const AdminLayout = () => {
  const { font, fontSize, themeColor } = useCustomization();

  const [openCustomizationSetting, setOpenCustomizationSetting] =
    useState(false);

  const handleCustomizationClick = () => {
    setOpenCustomizationSetting((prev) => !prev);
  };
  return (
    <div
      className="flex h-screen"
      style={{ fontFamily: font, fontSize: `${fontSize}px`, color: themeColor }}
    >
      {/* SideNav */}
      <div className=" h-full bg-gray-100">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full ">
        {/* TopSection */}
        <div className="bg-white px-8 py-4">
          <TopSection handleCustomizationClick={handleCustomizationClick} />
        </div>

        {/* Content with scroll */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {/* Use DelayedSuspense for a minimum loading duration */}
          <DelayedSuspense
            fallback={
              <div className="loading-container">
                <ClipLoader size={50} color="#123abc" />
              </div>
            }
            delay={1500}
          >
            <Outlet />
          </DelayedSuspense>
        </div>
        {/* Conditionally render CustomizationSetting */}
        {openCustomizationSetting && (
          <CustomizationSetting
            handleCustomizationClick={handleCustomizationClick}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;
