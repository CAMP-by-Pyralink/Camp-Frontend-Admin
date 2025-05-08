import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import InfoRow from "../AssetsManagement/InfoRow";
import toast from "react-hot-toast";
import { useRiskStore } from "../../../store/useRiskStore";

interface RiskRegisterFormProps {
  onClose?: () => void;
  onSubmit?: (formData: FormData) => void;
  setRiskRegisterModal: Dispatch<SetStateAction<boolean>>;
}

interface FormData {
  riskId: string;
  riskName: string;
  category: string;
  status: string;
  probability: string;
  impact: string;
  mitigationStrategy: string;
  description: string;
  department: string;
  owner: string;
  note: string;
  isAIGenerated: boolean;
}

const RiskRegisterForm: React.FC<RiskRegisterFormProps> = ({
  onSubmit,
  setRiskRegisterModal,
}) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { createRisk, getMitigationStrategy, isLoading, aiStrategy } =
    useRiskStore();

  const [formData, setFormData] = useState<FormData>({
    riskId: "PY 32345",
    riskName: "",
    category: "",
    status: "Active",
    probability: "Low",
    impact: "High",
    mitigationStrategy: "",
    description: "",
    department: "",
    owner: "",
    note: "",
    isAIGenerated: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const riskData = {
      riskName: formData.riskName,
      riskDescription: formData.description,
      category: formData.category,
      riskImpact: formData.impact,
      riskProbability: formData.probability,
      mitigationStrategy:
        activeTab === "manual" ? formData.mitigationStrategy : aiStrategy, // Use aiStrategy directly from the store
      isAIGenerated: activeTab === "ai",
      department: formData.department,
      riskOwner: formData.owner,
      riskStatus: formData.status,
      note: formData.note,
    };

    const result = await createRisk(riskData);
    if (result) {
      setRiskRegisterModal(false);
    }
  };

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const generateAIMitigation = async () => {
    if (!formData.riskName || !formData.category || !formData.description) {
      toast.error(
        "Please fill in risk name, category, and description to generate AI strategy"
      );
      return;
    }

    setIsLoadingAI(true);
    try {
      const data = {
        riskName: formData.riskName,
        category: formData.category,
        riskDescription: formData.description,
      };

      await getMitigationStrategy(data);
    } finally {
      setIsLoadingAI(false);
    }
  };

  // When switching to AI tab, automatically generate if fields are filled
  useEffect(() => {
    if (
      activeTab === "ai" &&
      formData.riskName &&
      formData.category &&
      formData.description
    ) {
      generateAIMitigation();
    }
  }, [activeTab, formData.riskName, formData.category, formData.description]);

  const statusOptions = ["Active", "Mitigated"];
  const probabilityOptions = ["Low", "Medium", "High"];
  const impactOptions = ["Low", "Medium", "High"];
  const departmentOptions = ["It", "Management"];

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-[80%] h-[90%] mx-auto overflow-y-auto">
      <div className="flex justify-between items-center mb-4 py-4 px-12 bg-[#DEEFFC]">
        <h2 className="text-2xl text-textColor">Risk register</h2>
        <button
          onClick={() => setRiskRegisterModal(false)}
          className="text-gray-500 hover:text-textColor"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-12">
          {/* Risk Name */}
          <InfoRow
            label="Risk name"
            value={formData.riskName}
            onChange={handleChange("riskName")}
            required
          />

          {/* Mitigation Strategy - Custom component */}
          <div>
            <label className="block text-sm font-semibold text-textColor mb-1">
              Mitigation Strategy
            </label>
            {/* Tabs */}
            <div className="flex items-center justify-between bg-blue50 p-1 rounded-md w-full">
              <button
                type="button"
                className={`px-6 py-3 rounded-md w-[50%] ${
                  activeTab === "manual"
                    ? "bg-primary500 text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActiveTab("manual")}
              >
                Manual
              </button>
              <button
                type="button"
                className={`px-6 py-3 rounded-md w-[50%] ${
                  activeTab === "ai"
                    ? "bg-primary500 text-white shadow-lg"
                    : "bg-transparent text-black"
                } transition duration-300`}
                onClick={() => setActiveTab("ai")}
              >
                Generate with AI
              </button>
            </div>
          </div>

          {/* Category */}
          <InfoRow
            label="Select category"
            type="select"
            value={formData.category}
            onChange={handleChange("category")}
            options={["advanced", "basic"]}
            required
          />

          {/* AI Mitigation Strategy Input */}
          <div className="relative">
            {activeTab === "manual" ? (
              <InfoRow
                label="Mitigation strategy"
                value={formData.mitigationStrategy}
                onChange={handleChange("mitigationStrategy")}
                placeholder="Enter mitigation strategy"
              />
            ) : (
              <div>
                <label className="block text-sm font-semibold text-textColor mb-1">
                  AI Generated Strategy
                </label>
                <div className="relative">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    value={aiStrategy}
                    readOnly
                    rows={3}
                    placeholder="AI will generate strategy based on risk details"
                  />
                  {isLoadingAI && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                      <Loader2 className="h-6 w-6 animate-spin text-primary500" />
                    </div>
                  )}
                  {!isLoadingAI && !aiStrategy && (
                    <button
                      type="button"
                      onClick={generateAIMitigation}
                      className="mt-2 bg-primary500 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700"
                      disabled={
                        !formData.riskName ||
                        !formData.category ||
                        !formData.description
                      }
                    >
                      Generate Strategy
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Risk Description */}
          <InfoRow
            label="Risk description"
            value={formData.description}
            onChange={handleChange("description")}
            required
          />

          {/* Risk Status */}
          <InfoRow
            label="Risk status"
            type="select"
            value={formData.status}
            onChange={handleChange("status")}
            options={statusOptions}
          />

          {/* Department */}
          <InfoRow
            label="Department"
            type="select"
            value={formData.department}
            onChange={handleChange("department")}
            options={departmentOptions}
            placeholder="Select department"
          />

          {/* Risk Probability */}
          <InfoRow
            label="Risk probability"
            type="select"
            value={formData.probability}
            onChange={handleChange("probability")}
            options={probabilityOptions}
          />

          {/* Risk Owner */}
          <InfoRow
            label="Risk owner"
            value={formData.owner}
            onChange={handleChange("owner")}
            placeholder="Search employee"
            extraButton={
              <button className="absolute left-0 top-0 h-full px-2 py-1 bg-[#F2F2F2] text-gray-400 border-l">
                Filter
              </button>
            }
          />

          {/* Risk Impact */}
          <InfoRow
            label="Risk impact"
            type="select"
            value={formData.impact}
            onChange={handleChange("impact")}
            options={impactOptions}
          />

          {/* Note */}
          <InfoRow
            label="Note"
            value={formData.note}
            onChange={handleChange("note")}
          />
        </div>

        {/* Submit Button */}
        <div className="my-8 mr-12 flex items-center justify-end">
          <button
            type="submit"
            className="w-[302px] bg-primary500 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiskRegisterForm;
