import React from "react";
import InfoRow from "./InfoRow";
import code from "../../../assets/barcode.png";
import { useNavigate } from "react-router-dom";
import Loader from "../../../shared/Loader";

// Helper function to format dates
const formatDate = (dateString: any) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    // Format as YYYY-MM-DD
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    // If there's an error parsing the date, return the original string
    return dateString;
  }
};

const GeneralTab = ({ singleAsset, id }: any) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/assets/edit-asset/${id}`);
    console.log("clicked");
  };

  if (!singleAsset) return <Loader />;

  return (
    <div>
      <div className="space-y-6" id="general">
        <div className="py-[21px] px-[43px] bg-[#EBECFF] rounded-md">
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
            <div className="flex flex-col items-center">
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
              disabled
              label="Asset name"
              value={singleAsset.assetName}
            />

            {/* Bar Code */}
            <InfoRow disabled label="Bar code" value={singleAsset.barCode} />

            {/* Purchase Date - DATE - Now Formatted */}
            <InfoRow
              disabled
              label="Purchase date"
              value={formatDate(singleAsset.purchaseDate)}
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
                `${singleAsset?.assignedTo?.fName || ""} ${
                  singleAsset?.assignedTo?.lName || ""
                }`.trim() || ""
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

            {/* Warranty Expiration - DATE - Now Formatted */}
            <InfoRow
              disabled
              label="Warranty Expiration"
              value={formatDate(singleAsset.warrantyExpiration)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
