import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import lockIcon from "../../../assets/svgs/lock-icon.svg";

interface RiskRegisterFormProps {
  onClose?: () => void;
  onSubmit?: (formData: FormData) => void;
  //   setRiskRegisterModal: () => void;
  setRiskRegisterModal: Dispatch<SetStateAction<boolean>>;
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

const RiskRegisterForm: React.FC<RiskRegisterFormProps> = ({
  //   onClose,
  onSubmit,
  setRiskRegisterModal,
}) => {
  const [active, setActive] = useState("manual");

  const [formData, setFormData] = useState<FormData>({
    riskId: "PY 32345",
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
          onClick={() => setRiskRegisterModal(false)}
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
              Risk ID
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

          {/* Mitigation Strategy */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Mitigation Strategy
            </label>
            {/* slider */}
            <div className="flex items-center justify-between bg-blue50 p-1 rounded-md w-full">
              <button
                className={`px-6 py-3 rounded-md w-[50%] ${
                  active === "manual"
                    ? "bg-primary500 text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActive("manual")}
              >
                Manual
              </button>
              <button
                className={`px-6 py-3 rounded-md w-[50%] ${
                  active === "ai"
                    ? "bg-primary500 text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActive("ai")}
              >
                Generate with AI
              </button>
            </div>
          </div>

          {/* Risk Name */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Risk name
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
          {/* AI box */}
          <input
            type="text"
            disabled={active !== "manual"}
            className={` w-[444px] p-2 border rounded-md ${
              active === "manual" ? "bg-transparent" : "bg-[#F0F2F5]"
            }`}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Select category
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

          {/* Risk Description */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Risk description
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

          {/* Risk Status */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Risk status
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
              Department
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
              Risk probability
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
              Risk owner
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
              Risk impact
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

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-textColor ">
              Note
            </label>
            <input
              type="text"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              className=" w-[444px] p-2 border rounded-md"
            />
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className="my-8 mr-12 flex items-center justify-end">
        <button
          type="submit"
          className=" w-[302px] bg-primary500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => setRiskRegisterModal(false)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RiskRegisterForm;
