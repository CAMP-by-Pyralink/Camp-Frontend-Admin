import { useLocation, useParams } from "react-router-dom";

interface RiskDetail {
  id: number;
  riskName: string;
  description: string;
  category: string;
  strategy: string;
  level: string;
  date: string;
  riskStatus: string;
  riskProbability: string;
}

interface MatrixCell {
  probability: string;
  impact: string;
  level: "Low" | "Medium" | "High";
}

const matrixData: MatrixCell[] = [
  { probability: "High", impact: "Low", level: "Medium" },
  { probability: "High", impact: "Medium", level: "High" },
  { probability: "High", impact: "High", level: "High" },
  { probability: "Medium", impact: "Low", level: "Low" },
  { probability: "Medium", impact: "Medium", level: "Medium" },
  { probability: "Medium", impact: "High", level: "Medium" },
  { probability: "Low", impact: "Low", level: "Low" },
  { probability: "Low", impact: "Medium", level: "Low" },
  { probability: "Low", impact: "High", level: "Low" },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Low":
      return "bg-greenCell";
    case "Medium":
      return "bg-yellowCell";
    case "High":
      return "bg-redCell";
    default:
      return "bg-gray-200";
  }
};

const RiskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const selectedRisk = location.state?.selectedRisk as Risks;
  console.log(selectedRisk);

  if (!selectedRisk || selectedRisk.id !== Number(id)) {
    return <div>Risk not found</div>;
  }
  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-medium text-greyText mb-4">View Risk</h1>
      <p className="text-sm text-greyText mb-6">View and edit risk</p>

      {/* Risk Details Section */}
      <div className=" rounded-md p-6 mb-8 shadow-custom-shadow">
        <h2 className="text-[20px] text-greyText font-semibold mb-1">
          Risk Details
        </h2>
        <hr />
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk ID:
              </p>
              <p className=" text-greyText text-sm">{selectedRisk.id}</p>
            </div>
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Name
              </p>
              <p className=" text-greyText text-sm">{selectedRisk.name}</p>
            </div>
          </div>

          <div className=" flex items-center gap-8">
            <p className="text-sm text-greyText font-semibold basis-[20%]">
              Description
            </p>
            <p className=" text-greyText text-sm">{selectedRisk.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Category:
              </p>
              <p className=" text-greyText text-sm">{selectedRisk.category}</p>
            </div>
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Mitigation Strategy
              </p>
              <p className=" text-greyText text-sm">
                {selectedRisk.mitigrationStrategy}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Note:
              </p>
              <p className=" text-greyText text-sm">{selectedRisk.note}</p>
            </div>
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Status:
              </p>
              <p
                className={`w-fit py-[2px] px-3 rounded-full ${
                  selectedRisk.status === "Mitigated"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : "bg-[#FCDEDE] text-[#B30100]"
                }`}
              >
                {selectedRisk.status}
              </p>
            </div>
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Owner:
              </p>
              <p className=" w-fit bg-blue-100 text-blue600 py-[2px] px-3 rounded-xl">
                {selectedRisk.owner}
              </p>
            </div>
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Impact:
              </p>
              <p
                className={` w-fit py-[2px] px-3 rounded-xl ${
                  selectedRisk.probability === "Low"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : selectedRisk.probability === "Medium"
                    ? "bg-[#FFF3CD] text-[#856404]"
                    : selectedRisk.probability === "High"
                    ? "bg-[#FCDEDE] text-[#B30100]"
                    : ""
                }`}
              >
                {selectedRisk.impact}
              </p>
            </div>{" "}
            <div className=" flex items-center gap-8">
              <p className="text-sm text-greyText font-semibold basis-[20%]">
                Risk Probabilty:
              </p>
              <p
                className={`w-fit py-[2px] px-3 rounded-xl ${
                  selectedRisk.probability === "Low"
                    ? "bg-[#E4FCDE] text-[#0B7B69]"
                    : selectedRisk.probability === "Medium"
                    ? "bg-[#FFF3CD] text-[#856404]"
                    : selectedRisk.probability === "High"
                    ? "bg-[#F8D7DA] text-[#721C24]"
                    : ""
                }`}
              >
                {selectedRisk.probability}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="w-[180px] px-6 py-2 bg-primary500 text-white rounded-lg">
            Edit
          </button>
          <button className="px-6 py-2 bg-white border border-[#FF0301] text-[#B30100] rounded-lg">
            Delete
          </button>
        </div>
      </div>

      {/* Risk Matrix Section */}
      <div className=" rounded-lg p-6">
        <h2 className="text-2xl text-greyText font-semibold mb-4">
          3 x 3 Matrix
        </h2>
        <div className="relative">
          {/* Probability Label */}
          <div className=" bg-blue50 py-[7px] px-[26.64px] absolute -left-28 top-1/2 -rotate-90 transform -translate-y-1/2">
            <span className=" text-greyText font-medium text-sm ">
              PROBABILITY
            </span>
          </div>

          {/* Matrix Cells */}
          <div className="grid grid-cols-3 gap-1 w-[504.58px]">
            {matrixData.map((cell, index) => (
              <div
                key={index}
                className={`${getLevelColor(
                  cell.level
                )} h-[101.66px] text-[25.24px]  flex items-center justify-center text-white font-medium rounded`}
              >
                {cell.level}
              </div>
            ))}
          </div>

          {/* Impact Label */}
          <div className="bg-blue50 py-[7px] px-[26.64px] ml-[30%] w-fit mt-4">
            <span className="text-sm font-medium text-greyText ">IMPACT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDetails;

// Route definition for RiskDetails component
{
  /* <Route path="/risk-detail/:id" element={<RiskDetails />} />; */
}
