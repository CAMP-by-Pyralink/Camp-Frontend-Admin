import { useParams } from "react-router-dom";

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

// Sample risk data array (replace with your actual data source or state)
const risks: RiskDetail[] = [
  {
    id: 1,
    riskName: "Software Development Risk",
    description: "Description here...",
    category: "Development Risk",
    strategy: "Regular backup, securing workstations and testing",
    level: "Medium",
    date: "2024-03-15",
    riskStatus: "Active",
    riskProbability: "High",
  },
  // Add other risks here
];

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
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-400";
    case "High":
      return "bg-red-500";
    default:
      return "bg-gray-200";
  }
};

const RiskDetails = () => {
  const { id } = useParams<{ id: number }>();

  // Find the selected risk based on the ID from the URL
  const selectedRisk = risks.find((risk) => risk.id === id);

  if (!selectedRisk) {
    return <div>Risk not found</div>;
  }

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-medium text-greyText mb-4">View Risk</h1>
      <p className="text-sm text-greyText mb-6">View and edit risk</p>

      {/* Risk Details Section */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Risk Details</h2>
        <hr />
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-600">Risk ID</p>
              <p className="font-medium">{selectedRisk.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Risk Name</p>
              <p className="font-medium">{selectedRisk.riskName}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Description</p>
            <p className="text-sm mt-1">{selectedRisk.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium">{selectedRisk.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mitigation Strategy</p>
              <p className="font-medium">{selectedRisk.strategy}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-600">Level</p>
              <p className="font-medium">{selectedRisk.level}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Risk Status</p>
              <p className="font-medium">{selectedRisk.riskStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Due Date</p>
              <p className="font-medium">{selectedRisk.date}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit
          </button>
          <button className="px-6 py-2 bg-white border border-red-500 text-red-500 rounded hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>

      {/* Risk Matrix Section */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">3 x 3 Matrix</h2>
        <div className="relative">
          <div className="absolute -left-20 top-1/2 -rotate-90 transform -translate-y-1/2">
            <span className="text-sm font-medium">PROBABILITY</span>
          </div>

          <div className="grid grid-cols-3 gap-1 w-72">
            {matrixData.map((cell, index) => (
              <div
                key={index}
                className={`${getLevelColor(
                  cell.level
                )} h-24 flex items-center justify-center text-white font-medium rounded`}
              >
                {cell.level}
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <span className="text-sm font-medium">IMPACT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskDetails;
