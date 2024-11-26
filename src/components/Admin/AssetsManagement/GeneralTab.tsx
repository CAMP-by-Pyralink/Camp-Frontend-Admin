import React from "react";

const GeneralTab = () => {
  return (
    <div>
      <div id="general">
        {/* general info */}
        <div className="bg-[#DEEFFC33] p-[10px]">
          <h1 className="text-sm font-medium text-[#333333]">
            General information and location of an Asset:
          </h1>
        </div>

        <div className="w-full py-5 px-[10px] flex flex-col gap-6">
          {/* <div className="w-ful grid grid-cols-2 gap-4">
            <label className="text-sm font-medium text-[#333333] w-fit">
              This asset is assigned to:
            </label>
            <input type="text" className=" border-red-800 border flex-1" />
          </div>

          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-medium text-[#333333]">
              This asset is located at:
            </p>
            <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
              Finance Unit (Accounting) Py-Mf-2031
            </p>
          </div>

          <div className="w-full grid grid-cols-2">
            <p className="text-sm font-medium text-[#333333]">
              Current location:
            </p>
            <p className="bg-[#DEEFFC33] text-sm font-medium text-[#333333] p-[10px] w-full">
              CWV4+5V, 30 Oyo Rd, Ibadan 200231
            </p>
          </div> */}
          <form className="space-y-6">
            {/* Assigned To */}
            <div className=" flex items-center">
              <label
                htmlFor="employee"
                className="block text-sm font-medium text-textColor mb-1 basis-[22%]"
              >
                This asset is assigned to:
              </label>
              <select
                id="employee"
                name="employee"
                className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none max-w-[444px] text-sm"
              >
                <option value="">Select employee</option>
                {/* Add additional options here */}
              </select>
            </div>

            {/* Part Of */}
            <div className=" flex items-center">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-textColor mb-1 basis-[22%]"
              >
                This asset is part of:
              </label>
              <select
                id="department"
                name="department"
                className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none max-w-[444px] text-sm"
              >
                <option value="">Select Department</option>
                {/* Add additional options here */}
              </select>
            </div>

            {/* Located At */}
            <div className=" flex items-center">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-textColor mb-1 basis-[22%]"
              >
                This asset is located at:
              </label>
              <select
                id="location"
                name="location"
                className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none max-w-[444px] text-sm"
              >
                <option value="">Select Department</option>
                {/* Add additional options here */}
              </select>
            </div>

            {/* Current Location */}
            <div className=" flex items-center">
              <label
                htmlFor="current-location"
                className="block text-sm font-medium text-textColor mb-1 basis-[22%]"
              >
                Current location:
              </label>
              <select
                id="current-location"
                name="current-location"
                className="block w-full px-3 py-4 border border-[#D0D5DD] bg-white rounded-md shadow-sm focus:outline-none max-w-[444px] text-sm"
              >
                <option value="">Select Location</option>
                {/* Add additional options here */}
              </select>
            </div>
          </form>
        </div>

        {/* tech spec */}
      </div>
    </div>
  );
};

export default GeneralTab;
//  <div id="specification">
//    <div className="bg-[#DEEFFC33] p-[10px]">
//      <h1 className="text-sm font-medium text-[#333333]">Tech Specifications</h1>
//    </div>
//    <div className="border">
//      {/* processor */}
//      <div className="flex">
//        <div className="w-[235px] py-[16px] px-[10px]">
//          <p className="text-[#333333] font-medium">Processor</p>
//        </div>
//        <div className="w-full border-l py-[16px] px-[10px]">
//          <p className="text-[#5a5555] text-sm">
//            Intel® Core™ Ultra 7 155H (24 MB cache, 16 cores, up to 4.80 GHz
//            Turbo)
//          </p>
//        </div>
//      </div>

//      {/* graphics */}
//      <div className="flex">
//        <div className="w-[235px] py-[16px] px-[10px]">
//          <p className="text-[#333333] font-medium">Graphics</p>
//        </div>
//        <div className="w-full border-l py-[16px] px-[10px]">
//          <p className="text-[#5a5555] text-sm">Intel® Arc™ Graphics</p>
//        </div>
//      </div>
//      {/* display */}
//      <div className="flex">
//        <div className="w-[235px] py-[16px] px-[10px]">
//          <p className="text-[#333333] font-medium">Display</p>
//        </div>
//        <div className="w-full border-l py-[16px] px-[10px]">
//          <p className="text-[#5a5555] text-sm">
//            13.4", Non-Touch, FHD+ 1920x1200, 30-120Hz, Anti-Glare, 500 nit,
//            InfinityEdge, Eyesafe®
//          </p>
//        </div>
//      </div>
//      {/* memory */}
//      <div className="flex">
//        <div className="w-[235px] py-[16px] px-[10px]">
//          <p className="text-[#333333] font-medium">Memory</p>
//        </div>
//        <div className="w-full border-l py-[16px] px-[10px]">
//          <p className="text-[#5a5555] text-sm">
//            8GB, LPDDR5, 6400MT/s, integrated, dual channel
//          </p>
//        </div>
//      </div>

//      {/* storage */}
//      <div className="flex">
//        <div className="w-[235px] py-[16px] px-[10px]">
//          <p className="text-[#333333] font-medium">Storage</p>
//        </div>
//        <div className="w-full border-l py-[16px] px-[10px]">
//          <p className="text-[#5a5555] text-sm">
//            8GB, LPDDR5, 6400MT/s, integrated, dual channel
//          </p>
//        </div>
//      </div>
//    </div>
//  </div>;
