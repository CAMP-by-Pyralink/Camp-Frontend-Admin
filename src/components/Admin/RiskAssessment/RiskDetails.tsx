import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalLayout from "../../../shared/ModalLayout";
import DeleteModal from "../../../shared/DeleteModal";
import RiskRegisterForm from "./RiskRegisterForm";
import aiIcon from "../../../assets/svgs/ai-network.svg";
import { useRiskStore } from "../../../store/useRiskStore";
import Loader from "../../../shared/Loader";

interface RiskDetail {
  _id: string;
  riskName: string;
  riskDescription: string;
  category: string;
  mitigationStrategy: string;
  isAIGenerated: boolean;
  riskStatus: string;
  riskProbability: string;
  riskImpact: string;
  department: string;
  riskOwner: string;
  note: string;
  createdAt: string;
}

interface MatrixCell {
  probability: string;
  impact: string;
  level: "Low" | "Medium" | "High";
}

const matrixData: MatrixCell[] = [
  { probability: "High", impact: "Low", level: "Low" },
  { probability: "High", impact: "Medium", level: "Medium" },
  { probability: "High", impact: "High", level: "High" },
  { probability: "Medium", impact: "Low", level: "Low" },
  { probability: "Medium", impact: "Medium", level: "Medium" },
  { probability: "Medium", impact: "High", level: "Medium" },
  { probability: "Low", impact: "Low", level: "Low" },
  { probability: "Low", impact: "Medium", level: "Low" },
  { probability: "Low", impact: "High", level: "Low" },
];

// This function is no longer used as we handle colors directly in the matrix rendering

const RiskDetails = () => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { getSingleRisk, singleRisk, isLoading } = useRiskStore();

  useEffect(() => {
    const fetchRisk = async () => {
      if (id) {
        await getSingleRisk(id);
      }
    };
    fetchRisk();
  }, [getSingleRisk, id]);

  // Use singleRisk from the store if available, otherwise fall back to location state
  const selectedRisk = singleRisk || location.state?.selectedRisk;

  console.log("Single risk data:", selectedRisk);

  if (isLoading) {
    return <Loader />;
  }

  if (!selectedRisk) {
    return <div>Risk not found</div>;
  }

  const handleBackClick = () => {
    setIsDeleteClicked(false);
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    setIsDeleteClicked(false);
    // Implement delete functionality here
  };

  const handleEditClicked = () => {
    setIsEditClicked(true);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-medium text-greyText mb-2">View Risk</h1>
      <p className="text-sm text-greyText mb-2">View and edit risk</p>
      <div className="flex items-center gap-2 font-poppins mb-12">
        <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
          Dashboard
        </Link>
        <p className=" text-[#98A2B3] font-medium h-5">/</p>
        <Link
          to={"/risk-assessment"}
          className="text-sm font-medium text-[#282EFF]"
        >
          Risks
        </Link>
        <p className=" text-[#98A2B3] font-medium h-5">/</p>
        <p className="text-sm font-medium text-[#898384]">Assets Details</p>
      </div>

      {/* Risk Details Section */}
      <div className="rounded-md p-6 mb-8 shadow-custom-shadow">
        <h2 className="text-[20px] text-greyText font-semibold mb-1">
          Risk Details
        </h2>
        <hr />
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk ID:
              </p>
              <p className="text-greyText text-sm">{selectedRisk._id}</p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Name
              </p>
              <p className="text-greyText text-sm">{selectedRisk.riskName}</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <p className="text-sm text-greyText font-semibold basis-[20%]">
              Description
            </p>
            <p className="text-greyText text-sm">
              {selectedRisk.riskDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Category:
              </p>
              <p className="text-greyText text-sm">{selectedRisk.category}</p>
            </div>
            <div className="flex items-start gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Mitigation Strategy
              </p>
              <div className="flex flex-col w-full gap-3">
                {selectedRisk.isAIGenerated && (
                  <div className="flex items-center gap-2 bg-[#F1F2FF] w-fit text-primary500 py-1 px-3 rounded-full">
                    <img src={aiIcon} alt="AI icon" />
                    <span>AI generated</span>
                  </div>
                )}
                <p className="text-greyText text-sm">
                  {selectedRisk.mitigationStrategy}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Note:
              </p>
              <p className="text-greyText text-sm">{selectedRisk.note}</p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Status:
              </p>
              <p
                className={`w-fit py-[2px] px-3 rounded-full ${
                  selectedRisk.riskStatus === "Mitigated"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : "bg-[#FCDEDE] text-[#B30100]"
                }`}
              >
                {selectedRisk.riskStatus}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Owner:
              </p>
              <p className="w-fit bg-blue-100 text-blue600 py-[2px] px-3 rounded-xl">
                {selectedRisk.riskOwner}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Impact:
              </p>
              <p
                className={`w-fit py-[2px] px-3 rounded-xl ${
                  selectedRisk.riskImpact === "Low"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : selectedRisk.riskImpact === "Medium"
                    ? "bg-[#FFF3CD] text-[#856404]"
                    : selectedRisk.riskImpact === "High"
                    ? "bg-[#FCDEDE] text-[#B30100]"
                    : ""
                }`}
              >
                {selectedRisk.riskImpact}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Probability:
              </p>
              <p
                className={`w-fit py-[2px] px-3 rounded-xl ${
                  selectedRisk.riskProbability === "Low"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : selectedRisk.riskProbability === "Medium"
                    ? "bg-[#FFF3CD] text-[#856404]"
                    : selectedRisk.riskProbability === "High"
                    ? "bg-[#F8D7DA] text-[#721C24]"
                    : ""
                }`}
              >
                {selectedRisk.riskProbability}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Department:
              </p>
              <p className="text-greyText text-sm">{selectedRisk.department}</p>
            </div>
            <div className="flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Created At:
              </p>
              <p className="text-greyText text-sm">
                {new Date(selectedRisk.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="w-[180px] px-6 py-2 bg-primary500 text-white rounded-lg"
            onClick={handleEditClicked}
          >
            Edit
          </button>
          <button
            className="px-6 py-2 bg-white border border-[#FF0301] text-[#B30100] rounded-lg"
            onClick={() => setIsDeleteClicked(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Risk Matrix Section */}
      <div className="rounded-lg p-6">
        <h2 className="text-2xl text-greyText font-semibold mb-4">
          3 x 3 Matrix
        </h2>
        <div className="relative flex flex-col w-fit">
          {/* Probability Label */}
          <div className="bg-blue50 py-[7px] px-[26.64px] absolute -left-28 top-1/2 -rotate-90 transform -translate-y-1/2">
            <span className="text-greyText font-medium text-sm">
              PROBABILITY
            </span>
          </div>

          {/* Matrix Cells */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-1 w-[504.58px]">
              {matrixData.map((cell, index) => {
                const isActiveCell =
                  cell.probability === selectedRisk.riskProbability &&
                  cell.impact === selectedRisk.riskImpact;

                // Get base color class based on risk level
                let colorClass = "";
                if (cell.level === "Low") {
                  colorClass = isActiveCell
                    ? "bg-green-500"
                    : "bg-greenCell opacity-50";
                } else if (cell.level === "Medium") {
                  colorClass = isActiveCell
                    ? "bg-yellow-500"
                    : "bg-yellowCell opacity-50";
                } else if (cell.level === "High") {
                  colorClass = isActiveCell
                    ? "bg-red-500"
                    : "bg-redCell opacity-50";
                }

                return (
                  <div
                    key={index}
                    className={`${colorClass} h-[101.66px] text-[25.24px] flex items-center justify-center text-white font-medium rounded`}
                  >
                    {cell.level}
                  </div>
                );
              })}
            </div>
            {/* Impact Label */}
            <div className="bg-blue50 py-[7px] px-[26.64px] translate-x-1/2 w-fit mt-4">
              <span className="text-sm font-medium text-greyText">IMPACT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isDeleteClicked && (
        <ModalLayout>
          <DeleteModal
            backClick={handleBackClick}
            onDelete={handleDeleteClick}
          />
        </ModalLayout>
      )}
      {isEditClicked && (
        <ModalLayout>
          <RiskRegisterForm
            setRiskRegisterModal={setIsEditClicked}
            initialData={selectedRisk}
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default RiskDetails;
