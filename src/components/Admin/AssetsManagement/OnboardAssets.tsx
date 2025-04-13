import React, { useState } from "react";
import { X } from "lucide-react";
import InfoRow from "./InfoRow"; // adjust path as needed
import lockIcon from "../../../assets/svgs/lock-icon.svg";

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

const OnboardAssets: React.FC<OnboardAssetsProps> = ({ onSubmit, onClick }) => {
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
    onSubmit?.(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mx-auto">
      <div className="flex justify-between items-center mb-4 py-4 px-12 bg-[#DEEFFC]">
        <h2 className="text-2xl text-textColor">Onboard Assets</h2>
        <button
          onClick={onClick}
          className="text-gray-500 hover:text-textColor"
        >
          <X size={20} />
        </button>
      </div>

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
          onClick={onClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OnboardAssets;
