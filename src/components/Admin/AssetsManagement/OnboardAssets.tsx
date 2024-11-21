import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import lockIcon from "../../../assets/svgs/lock-icon.svg";

interface OnboardAssetsProps {
  onClose?: () => void;
  onSubmit?: (formData: FormData) => void;
  onClick: () => void;
  //   setRiskRegisterModal: Dispatch<SetStateAction<boolean>>;
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

const OnboardAssets: React.FC<OnboardAssetsProps> = ({
  //   onClose,
  onSubmit,
  //   setRiskRegisterModal,
  onClick,
}) => {
  const [active, setActive] = useState("manual");

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
    <div className="bg-white rounded-lg shadow-lg   mx-auto">
      <div className="flex justify-between items-center mb-4 py-4 px-12 bg-[#DEEFFC]">
        <h2 className="text-2xl  text-textColor">Risk register</h2>
        <button
          //   onClick={() => setRiskRegisterModal(false)}
          onClick={onClick}
          className="text-gray-500 hover:text-textColor"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-12">
          {/* Risk ID */}
          <div className="relative">
            <label className="block text-sm font-medium text-textColor ">
              Asset ID
            </label>
            <div className="relative">
              <input
                disabled
                type="text"
                value={formData.riskId}
                readOnly
                className="w-[444px] text-[#98A2B3] text-sm p-2 border rounded-md bg-[#F0F2F5]"
              />
              <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                {/* <Copy size={18} /> */}
                <img src={lockIcon} width={15} alt="" />
              </button>
            </div>
          </div>

          {/* Risk Name */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Purchase date
            </label>
            <input
              type="text"
              value={formData.riskName}
              onChange={(e) =>
                setFormData({ ...formData, riskName: e.target.value })
              }
              className=" w-[444px] p-2 border rounded-md"
            />
          </div>

          {/* Risk Description */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Asset name
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className=" w-[444px] p-2 border rounded-md"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Select Department (optional)
            </label>
            <div className="relative">
              <select
                // value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className=" w-[444px] p-2 border rounded-md appearance-none"
              >
                {/* <option value="">Select category</option> */}
                {/* Add your categories here */}
              </select>
              <ChevronDown
                className="absolute right-2 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Risk Status */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Select category
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className=" w-[444px] text-[#454545] text-xs p-2 border rounded-md appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Mitigated">Mitigated</option>
                {/* Add other status options */}
              </select>
              <ChevronDown
                className="absolute right-2 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Assign asset (optional)
            </label>
            <div className="relative">
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className=" w-[444px] text-[#454545] text-xs p-2 border rounded-md appearance-none"
              >
                <option value="">Select department</option>
                <option value="It">It</option>
                <option value="Management">Management</option>
                {/* Add your departments here */}
              </select>
              <ChevronDown
                className="absolute right-2 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Risk Probability */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Status
            </label>
            <div className="relative">
              <select
                value={formData.probability}
                onChange={(e) =>
                  setFormData({ ...formData, probability: e.target.value })
                }
                className=" w-[444px] text-[#454545] text-xs p-2 border rounded-md appearance-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Risk Owner */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Antivirus Status
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.owner}
                onChange={(e) =>
                  setFormData({ ...formData, owner: e.target.value })
                }
                placeholder="Search employee"
                className=" w-[444px] px-20 p-2 border rounded-md"
              />
              <button className="absolute left-0 top-0 h-full px-2 py-1 bg-[#F2F2F2] text-gray-400 border-l">
                Filter
              </button>
            </div>
          </div>

          {/* Risk Impact */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Subscription renewal
            </label>
            <div className="relative">
              <select
                value={formData.impact}
                onChange={(e) =>
                  setFormData({ ...formData, impact: e.target.value })
                }
                className=" w-[444px] text-[#454545] text-xs p-2 border rounded-md appearance-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-3 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className="my-8 mr-12 flex items-center justify-end">
        <button
          type="submit"
          className=" w-[302px] bg-primary500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={onClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OnboardAssets;
