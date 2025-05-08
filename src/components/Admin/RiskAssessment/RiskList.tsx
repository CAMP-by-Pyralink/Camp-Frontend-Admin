import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../../shared/ModalLayout";
import DeleteModal from "../../../shared/DeleteModal";
import { useRiskStore } from "../../../store/useRiskStore";
import Loader from "../../../shared/Loader";

interface Risk {
  _id: string;
  riskId?: string;
  riskName: string;
  category: string;
  riskImpact: string;
  riskProbability: string;
  mitigationStrategy: string;
  riskOwner: string;
  riskStatus: string;
  createdAt: string;
  note: string;
  department?: string;
}

const RiskList = () => {
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // New states for tracking selected risks
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState<"single" | "multiple">("single");
  const [riskToDelete, setRiskToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const { getAllRisks, risks, deleteRisk, isLoading } = useRiskStore();

  useEffect(() => {
    const fetchRisks = async () => {
      // If your getAllRisks supports pagination, update this call
      await getAllRisks();
    };

    fetchRisks();
  }, [getAllRisks, currentPage]);

  const handleMenuClick = (riskId: string) => {
    setSelectedRiskId((prev) => (prev === riskId ? null : riskId));
  };

  const handleViewClick = (risk: Risk) => {
    navigate(`/risk-detail/${risk._id}`, { state: { selectedRisk: risk } });
  };

  // Modified to handle both single and multiple deletions
  const handleDeleteClick = async () => {
    if (deleteMode === "single" && riskToDelete) {
      console.log("Deleting single risk:", riskToDelete);
      const response = await deleteRisk(riskToDelete);
      if (response) {
        setDeleteModalVisible(false);
        setRiskToDelete(null);
      }
    } else if (deleteMode === "multiple" && selectedRisks.length > 0) {
      console.log("Deleting multiple risks:", selectedRisks);
      // You might need to implement a batch delete function in your store
      // For now, we'll delete them one by one
      let allSuccessful = true;
      for (const riskId of selectedRisks) {
        const success = await deleteRisk(riskId);
        if (!success) {
          allSuccessful = false;
        }
      }

      if (allSuccessful) {
        setDeleteModalVisible(false);
        setSelectedRisks([]);
      }
    }
  };

  // Function to initiate deletion for a single risk
  const initiateDeleteSingle = (riskId: string) => {
    setDeleteMode("single");
    setRiskToDelete(riskId);
    setDeleteModalVisible(true);
  };

  // Function to initiate deletion for multiple risks
  const initiateDeleteMultiple = () => {
    if (selectedRisks.length > 0) {
      setDeleteMode("multiple");
      setDeleteModalVisible(true);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all risks
      setSelectedRisks(risks.map((risk) => risk._id));
    } else {
      // Deselect all
      setSelectedRisks([]);
    }
  };

  // Handle individual risk selection
  const handleSelectRisk = (riskId: string, checked: boolean) => {
    if (checked) {
      setSelectedRisks((prev) => [...prev, riskId]);
    } else {
      setSelectedRisks((prev) => prev.filter((id) => id !== riskId));
    }
  };

  interface DropdownMenuProps {
    onView: () => void;
    onDelete: () => void;
    onClose: () => void;
  }

  const DropdownMenu: React.FC<DropdownMenuProps> = ({
    onView,
    onDelete,
    onClose,
  }) => (
    <div className="absolute right-2 mt-2 w-[120px] bg-white border border-[#C7C7CC] rounded-md shadow-lg z-10">
      <ul className="text-left">
        <li
          className="px-4 py-2 text-[#333333] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            onView();
            onClose();
          }}
        >
          View
        </li>
        <hr />
        <li
          className="px-4 py-2 text-[#333333] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            console.log("Edit risk");
            onClose();
          }}
        >
          Edit
        </li>
        <hr />
        <li
          className="px-4 py-2 text-[#FF0301] hover:bg-blue-50 cursor-pointer"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </li>
      </ul>
    </div>
  );

  return (
    <div className="p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Action buttons for multiple deletion */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              {selectedRisks.length > 0 && (
                <button
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                  onClick={initiateDeleteMultiple}
                >
                  Delete Selected ({selectedRisks.length})
                </button>
              )}
            </div>
            {/* You could add other actions here like export, etc. */}
          </div>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="text-[8.4px] bg-[#F0F2F5] text-left text-greyText">
                <th className="p-2 border-b font-extrabold border-gray-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    aria-label="Select all"
                    checked={
                      selectedRisks.length === risks.length && risks.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  RISK NAME
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  CATEGORY
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  RISK IMPACT
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  RISK PROBABILITY
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  MITIGATION STRATEGY
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  RISK OWNER
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  STATUS
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  REVIEW DATE
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200">
                  NOTE
                </th>
                <th className="p-2 border-b font-extrabold border-gray-200"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {risks.map((risk) => (
                <tr key={risk._id} className="text-[#101928] text-xs relative">
                  <td className="p-2 border-b border-gray-200">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedRisks.includes(risk._id)}
                      onChange={(e) =>
                        handleSelectRisk(risk._id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="p-2 border-b border-gray-200">
                    {risk.riskName}
                  </td>
                  <td className="p-2 text-greytext border-b border-gray-200">
                    {risk.category}
                  </td>
                  <td className={`p-2 border-b border-gray-200 w-fit`}>
                    <span
                      className={`py-[2px] px-3 rounded-xl ${
                        risk.riskImpact === "Low"
                          ? "bg-[#E4FCDE] text-[#0B7B69]"
                          : risk.riskImpact === "Medium"
                          ? "bg-[#FFF3CD] text-[#856404]"
                          : risk.riskImpact === "High"
                          ? "bg-[#FCDEDE] text-[#B30100]"
                          : ""
                      }`}
                    >
                      {risk.riskImpact}
                    </span>
                  </td>
                  <td className={`p-2 border-b border-gray-200 w-fit`}>
                    <span
                      className={`py-[2px] px-3 rounded-xl ${
                        risk.riskProbability === "Low"
                          ? "bg-[#E4FCDE] text-[#0B7B69]"
                          : risk.riskProbability === "Medium"
                          ? "bg-[#FFF3CD] text-[#856404]"
                          : risk.riskProbability === "High"
                          ? "bg-[#F8D7DA] text-[#721C24]"
                          : ""
                      }`}
                    >
                      {risk.riskProbability}
                    </span>
                  </td>
                  <td className="p-2 border-b max-w-[20px] border-gray-200">
                    {risk.mitigationStrategy?.slice(0, 12) || "N/A"}
                  </td>
                  <td className="p-2 border-b border-gray-200">
                    <span className="bg-blue-100 text-blue600 py-[2px] px-3 rounded-xl">
                      {risk.riskOwner}
                    </span>
                  </td>
                  <td className="p-2 border-b border-gray-200">
                    <span
                      className={`py-[2px] px-3 rounded-full ${
                        risk.riskStatus === "Mitigated"
                          ? "bg-[#E4FCDE] text-[#0B7B69]"
                          : "bg-[#FCDEDE] text-[#B30100]"
                      }`}
                    >
                      {risk.riskStatus}
                    </span>
                  </td>
                  <td className="p-2 border-b border-gray-200">
                    {new Date(risk.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-2 border-b max-w-[120px] border-gray-200">
                    {risk.note}
                  </td>
                  <td className="p-2 border-b border-gray-200 text-center relative">
                    <div
                      className="cursor-pointer flex items-center justify-center border border-[#E4E7EC] rounded-lg w-8 h-8"
                      onClick={() => handleMenuClick(risk._id)}
                    >
                      ⋮
                    </div>
                    {selectedRiskId === risk._id && (
                      <DropdownMenu
                        onView={() => handleViewClick(risk)}
                        onDelete={() => initiateDeleteSingle(risk._id)}
                        onClose={() => setSelectedRiskId(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-[#070707]">
              Page {currentPage} of {useRiskStore.getState().totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="px-4 py-2 text-sm text-gray-500 border rounded-lg bg-white"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, useRiskStore.getState().totalPages || 1)
                  )
                }
                disabled={currentPage === useRiskStore.getState().totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {deleteModalVisible && (
        <ModalLayout>
          <DeleteModal
            backClick={() => setDeleteModalVisible(false)}
            onDelete={handleDeleteClick}
            itemCount={deleteMode === "multiple" ? selectedRisks.length : 1}
            title={
              deleteMode === "multiple"
                ? "Delete Multiple Risks"
                : "Delete Risk"
            }
            message={
              deleteMode === "multiple"
                ? `Are you sure you want to delete these ${selectedRisks.length} selected risks?`
                : "Are you sure you want to delete this risk?"
            }
          />
        </ModalLayout>
      )}
    </div>
  );
};

export default RiskList;
