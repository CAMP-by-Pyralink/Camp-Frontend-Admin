import React, { useState } from "react";
import InfoRow from "./InfoRow";
import lockIcon from "../../../assets/svgs/lock-icon.svg";
import laptop from "../../../assets/laptop.png";
import code from "../../../assets/barcode.png";

interface OnboardAssetsProps {
  onClose?: () => void;
  onSubmit?: (formData: FormData) => void;
  onClick: () => void;
}

interface FormData {
  riskId: string;
  riskName: string;
  category: string;
  status: string;
  probability: string;
  impact: string;
  mitigationStrategy: "Manual" | "AI";
  description: string;
  department: string;
  owner: string;
  note: string;
}
const GeneralTab = () => {
  const [formData, setFormData] = useState<FormData>({
    riskId: "AS 32345",
    riskName: "",
    category: "",
    status: "Active",
    probability: "Low",
    impact: "High",
    mitigationStrategy: "Manual",
    description: "",
    department: "",
    owner: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit?.(formData);
  };
  return (
    <div>
      <div id="general">
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
                <img src={laptop} alt="" />
              </div>
            </div>

            {/* text */}
            <h1 className="text-[#333333] font-medium text-[24px] border-[1px] pl-4 py-1 pr-24 border-[#D4D5FF]">
              Dell XPS 13 PLUS
            </h1>

            {/* barcode */}
            <div>
              <div>
                <img src={code} alt="" />
              </div>
            </div>
          </div>

          <button
            className="text-white bg-[#282EFF] rounded px-3 py-[10px] text-sm font-medium mt-5"
            onClick={() => handleScrollTo("specification")}
          >
            View Specifications
          </button>
        </div>
        {/* tech spec */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-12">
            <InfoRow
              label="Asset ID"
              value={formData.riskId}
              onChange={() => {}}
              disabled
              readOnly
              extraButton={<img src={lockIcon} width={15} alt="" />}
            />

            <InfoRow
              label="Purchase date"
              value={formData.riskName}
              onChange={(val) => setFormData({ ...formData, riskName: val })}
            />

            <InfoRow
              label="Asset name"
              value={formData.description}
              onChange={(val) => setFormData({ ...formData, description: val })}
            />

            <InfoRow
              label="Select Department (optional)"
              type="select"
              value={formData.category}
              onChange={(val) => setFormData({ ...formData, category: val })}
              options={["IT", "Management", "Security"]}
            />

            <InfoRow
              label="Select category"
              type="select"
              value={formData.status}
              onChange={(val) => setFormData({ ...formData, status: val })}
              options={["Active", "Mitigated"]}
            />

            <InfoRow
              label="Assign asset (optional)"
              type="select"
              value={formData.department}
              onChange={(val) => setFormData({ ...formData, department: val })}
              options={["", "IT", "Management"]}
            />

            <InfoRow
              label="Status"
              type="select"
              value={formData.probability}
              onChange={(val) => setFormData({ ...formData, probability: val })}
              options={["Low", "Medium", "High"]}
            />

            <InfoRow
              label="Antivirus Status"
              value={formData.owner}
              onChange={(val) => setFormData({ ...formData, owner: val })}
              placeholder="Search employee"
              extraButton={
                <button className="absolute left-0 top-0 h-full px-2 py-1 bg-[#F2F2F2] text-gray-400 border-l">
                  Filter
                </button>
              }
            />

            <InfoRow
              label="Subscription renewal"
              type="select"
              value={formData.impact}
              onChange={(val) => setFormData({ ...formData, impact: val })}
              options={["Low", "Medium", "High"]}
            />
          </div>
        </form>

        <div className="my-8 mr-12 flex items-center justify-end">
          <button
            type="submit"
            className="w-[302px] bg-primary500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            // onClick={onClick}
          >
            Save
          </button>
        </div>
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
