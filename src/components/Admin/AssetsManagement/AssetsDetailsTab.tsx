import { useState } from "react";
import GeneralTab from "./GeneralTab";
import Warranty from "./Warranty";
import Parts from "./Parts";
import Logs from "./Logs";

const AssetsDetailsTab = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("1");
  //   const [showTabs, setShowTabs] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white py-10 font-poppins pr-40">
      <div>
        <div className="flex items-center w-full bg-white">
          {/* tab1 */}
          <div className="w-full bg-white">
            <button
              className={`w-full rounded-md border border-[#D0D5DD] py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "1"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("1")}
            >
              General
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-md border border-[#D0D5DD] py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "2"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("2")}
            >
              Warranty
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-md border border-[#D0D5DD] py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "3"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("3")}
            >
              Parts/Boms
            </button>
          </div>
          <div className="w-full">
            <button
              className={`w-full rounded-md border border-[#D0D5DD] py-[8px] text-sm font-medium flex items-center justify-center ${
                activeTab === "4"
                  ? "text-[#282EFF] bg-[#DEEFFC]"
                  : "hover:text-[#282EFF] hover:bg-[#DEEFFC]"
              }`}
              onClick={() => handleTabClick("4")}
            >
              Log
            </button>
          </div>
        </div>

        <div className="">
          {activeTab === "1" && <GeneralTab />}
          {activeTab === "2" && <Warranty />}
          {activeTab === "3" && <Parts />}
          {activeTab === "4" && <Logs />}
        </div>
      </div>
    </div>
  );
};

export default AssetsDetailsTab;
//    {
//      /* tech spec */
//    }
//    <div id="specification" className="mt-10">
//      <div className="bg-[#DEEFFC33] p-[10px]">
//        <h1 className="text-sm font-medium text-[#333333]">
//          Tech Specifications
//        </h1>
//      </div>
//      <div className="border">
//        {/* processor */}
//        <div className="flex">
//          <div className="w-[235px] py-[16px] px-[10px]">
//            <p className="text-[#333333] font-medium">Processor</p>
//          </div>
//          <div className="w-full border-l py-[16px] px-[10px]">
//            <p className="text-[#5a5555] text-sm">
//              Intel® Core™ Ultra 7 155H (24 MB cache, 16 cores, up to 4.80 GHz
//              Turbo)
//            </p>
//          </div>
//        </div>

//        {/* graphics */}
//        <div className="flex">
//          <div className="w-[235px] py-[16px] px-[10px]">
//            <p className="text-[#333333] font-medium">Graphics</p>
//          </div>
//          <div className="w-full border-l py-[16px] px-[10px]">
//            <p className="text-[#5a5555] text-sm">Intel® Arc™ Graphics</p>
//          </div>
//        </div>
//        {/* display */}
//        <div className="flex">
//          <div className="w-[235px] py-[16px] px-[10px]">
//            <p className="text-[#333333] font-medium">Display</p>
//          </div>
//          <div className="w-full border-l py-[16px] px-[10px]">
//            <p className="text-[#5a5555] text-sm">
//              13.4", Non-Touch, FHD+ 1920x1200, 30-120Hz, Anti-Glare, 500 nit,
//              InfinityEdge, Eyesafe®
//            </p>
//          </div>
//        </div>
//        {/* memory */}
//        <div className="flex">
//          <div className="w-[235px] py-[16px] px-[10px]">
//            <p className="text-[#333333] font-medium">Memory</p>
//          </div>
//          <div className="w-full border-l py-[16px] px-[10px]">
//            <p className="text-[#5a5555] text-sm">
//              8GB, LPDDR5, 6400MT/s, integrated, dual channel
//            </p>
//          </div>
//        </div>

//        {/* storage */}
//        <div className="flex">
//          <div className="w-[235px] py-[16px] px-[10px]">
//            <p className="text-[#333333] font-medium">Storage</p>
//          </div>
//          <div className="w-full border-l py-[16px] px-[10px]">
//            <p className="text-[#5a5555] text-sm">
//              8GB, LPDDR5, 6400MT/s, integrated, dual channel
//            </p>
//          </div>
//        </div>
//      </div>
//    </div>;
