import React, { useState } from "react";
import InfoRow from "./InfoRow";
import lockIcon from "../../../assets/svgs/lock-icon.svg";
import laptop from "../../../assets/laptop.png";
import code from "../../../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/Loader";

const GeneralTab = ({ singleAsset, id }: any) => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit?.(singleAsset);
  };

  const handleEditClick = () => {
    navigate(`/assets/edit-asset/${id}`);
    console.log("clicked");
  };

  console.log(id, "idd");

  if (!singleAsset) return <Loader />;
  return (
    <div>
      <div className=" space-y-6" id="general">
        {/* general info */}
        {/* <div className="bg-[#DEEFFC33] p-[10px]">
          <h1 className="text-sm font-medium text-[#333333]">
            General information and location of an Asset:
          </h1>
        </div> */}

        <div className="py-[21px] px-[43px] bg-[#EBECFF] rounded-md ">
          <div className="bg-white flex items-center justify-between px-[30px] py-5 w-full">
            {/* laptop */}
            <div>
              <div>
                <img
                  src={singleAsset.assetImage}
                  alt=""
                  className="w-[150px] h-[150px] object-cover"
                />
              </div>
            </div>

            {/* text */}
            <h1 className="text-[#333333] font-medium text-[24px] border-[1px] w-fit px-4 py-1 border-[#D4D5FF]">
              {singleAsset.assetName}
            </h1>

            {/* barcode */}
            <div className=" flex flex-col items-center">
              <div>
                <img src={code} alt="" />
              </div>
              <div className="text-[#333333] font-medium text-[16px] pl-4">
                {singleAsset.barCode || ""}
              </div>
            </div>
          </div>

          <button
            className="text-white bg-[#282EFF] rounded px-3 py-[10px] text-sm font-medium mt-5"
            onClick={handleEditClick}
          >
            Edit Asset
          </button>
        </div>
        {/* tech spec */}
        <div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
            {/* Asset Name */}
            <InfoRow
              //disabled
              disabled
              label="Asset name"
              value={singleAsset.assetName}
            />

            {/* Bar Code */}
            <InfoRow disabled label="Bar code" value={singleAsset.barCode} />

            {/* Purchase Date - DATE */}
            <InfoRow
              disabled
              label="Purchase date"
              // type="date"
              value={singleAsset.purchaseDate}
            />

            {/* Department */}
            <InfoRow
              disabled
              label="Select Department (optional)"
              value={singleAsset.department}
            />

            {/* Location */}
            <InfoRow disabled label="Location" value={singleAsset.location} />

            {/* Current Location */}
            <InfoRow
              disabled
              label="Current Location"
              value={singleAsset.currentLocation}
            />

            {/* Category */}
            <InfoRow
              disabled
              label="Select category"
              value={singleAsset.category}
            />

            {/* Assign Asset */}
            <InfoRow
              disabled
              label="Assign asset (optional)"
              value={
                `${singleAsset?.assignedTo?.fName} ${singleAsset?.assignedTo?.lName}` ||
                ""
              }
            />

            {/* Status */}
            <InfoRow disabled label="Status" value={singleAsset.status} />

            {/* Antivirus Status - SELECT */}
            <InfoRow
              disabled
              label="Antivirus Status"
              value={singleAsset.antivirusStatus}
            />

            {/* Subscription Renewal */}
            <InfoRow
              disabled
              label="Subscription renewal"
              value={singleAsset.subscriptionRenewal}
            />

            {/* Warranty Expiration - DATE */}
            <InfoRow
              disabled
              label="Warranty Expiration"
              // type="date"
              value={singleAsset.warrantyExpiration}
            />
          </div>
        </div>
        {/* 
        <div className="my-8 mr-12 flex items-center justify-end">
          <button
            type="submit"
            className="w-[302px] bg-primary500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            // onClick={onClick}
          >
            Save
          </button>
        </div> */}
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
