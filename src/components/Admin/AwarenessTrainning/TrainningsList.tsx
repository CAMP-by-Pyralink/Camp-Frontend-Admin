import { useState, useEffect, Key, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profilepic from "../../../assets/avatar.png";
import {
  CreateTrainingData,
  useTrainingStore,
} from "../../../store/useAwarenessTrainingStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MoreVertical } from "lucide-react";

interface TrainningsListProps {
  setSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
  setAssignModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTrainings: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTrainings: string[];
  showCheckbox: boolean;
  setShowCheckbox: (value: boolean) => void;
  trainings: any[];
}

const TrainningsList: React.FC<TrainningsListProps> = ({
  setSelectionMode,
  setAssignModal,
  setSelectedTrainings,
  selectedTrainings,
  showCheckbox,
  setShowCheckbox,
  trainings,
}) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<CreateTrainingData | null>(
    null
  );
  const [optionsIndex, setOptionsIndex] = useState<number | null>(null);

  const { deleteSingleTraining } = useTrainingStore();

  const navigate = useNavigate();
  const { fetchTrainings } = useTrainingStore();

  useEffect(() => {
    setIsLoading(true);
    fetchTrainings(activeTab, currentPage).finally(() => setIsLoading(false));
  }, [activeTab, currentPage, fetchTrainings]);

  const handleOptionsClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(trainings[index]);
    setOptionsIndex(optionsIndex === index ? null : index);
  };

  const handleCloseOptionsModal = () => {
    setOptionsIndex(null);
    setSelectedCard(null);
  };

  const handleSelectClick = (trainingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectionMode(true);
    setShowCheckbox(true);
    setSelectedTrainings([trainingId]);
    handleCloseOptionsModal();
  };

  const handleCardClick = (training: any) => {
    // Navigate to the normal TrainingDetails layout
    navigate(`/training-details/${training._id}`, {
      state: {
        ...training,
        assignedView: false,
        tab: activeTab,
      },
    });
  };

  const handleViewClick = (training: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Navigate to the TrainingDetails layout with the table
    navigate(`/training-details/${training._id}`, {
      state: {
        ...training,
        assignedView: true,
        tab: activeTab,
      },
    });
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteSingleTraining(id);
    handleCloseOptionsModal();
    fetchTrainings(activeTab.toString(), currentPage);
  };

  const handleSelectTraining = (trainingId: string) => {
    setSelectedTrainings(
      (prev) =>
        prev.includes(trainingId)
          ? prev.filter((id) => id !== trainingId) // Deselect
          : [...prev, trainingId] // Select
    );
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex gap-6 mb-6 w-fit relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-primary100">
        {["browse", "custom", "assigned"].map((tab) => (
          <div key={tab} className="flex flex-col items-center">
            <div
              className={`pb-2 cursor-pointer ${
                activeTab === tab ? "text-primary900" : "text-[#5A5555]"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1); // Reset to first page when tab changes
              }}
            >
              {tab === "browse"
                ? "Browse Trainings"
                : tab === "custom"
                ? "Custom Trainings"
                : "Assigned Trainings"}
            </div>
            {/* Underline for active tab */}
            {activeTab === tab && (
              <div className="w-full relative z-50 h-[3px] bg-primary900"></div>
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-[#D3D3D3] rounded-lg p-3 cursor-pointer pb-6"
            >
              <Skeleton height={220} className="mb-8" />
              <Skeleton height={30} width="80%" className="mb-2" />
              <Skeleton height={20} width="60%" />
            </div>
          ))
        ) : Array.isArray(trainings) && trainings.length > 0 ? (
          trainings.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#D3D3D3] rounded-lg p-3 cursor-pointer pb-6 training-card"
              onClick={() => handleCardClick(item)}
            >
              <div className="relative w-full h-[220px] mb-8">
                <img
                  src={item.bannerImage}
                  alt={item.title}
                  className="w-full object-cover rounded h-full mb-8"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-black opacity-15"></div>
                <MoreVertical
                  className="absolute size-6 top-2 right-2 text-white z-[999]"
                  onClick={(e) => handleOptionsClick(index, e)}
                />
                {optionsIndex === index && (
                  <div className="absolute top-8 right-0 mt-2 w-fit bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex flex-col training-card">
                    <button
                      className="w-full text-left px-4 py-2 border-b text-textColor hover:bg-blue50"
                      onClick={(e) => handleSelectClick(item._id, e)} // Pass the training ID
                    >
                      Select
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-textColor hover:bg-blue50"
                      onClick={(e) => handleDelete(item._id, e)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                {/* checkboxes */}
                {showCheckbox && (
                  <div
                    className="absolute left-4 top-2 z-[999] training-checkbox"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="training-checkbox">
                      <input
                        type="checkbox"
                        className="training-checkbox"
                        checked={selectedTrainings.includes(item._id)}
                        onChange={() => handleSelectTraining(item._id)}
                      />
                    </label>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-medium text-[#333333]">
                {item.title.slice(0, 30)}...
              </h3>
              <p className="text-sm text-[#333333] mt-2">
                {item.description.slice(0, 30)}...
              </p>

              {activeTab === "assigned" &&
                item.assignedUsers &&
                item.assignedUsers.length > 0 && (
                  <div>
                    {/* Profile avatars and View All */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-4 overflow-hidden">
                        {item.assignedUsers.slice(0, 3).map(
                          (
                            person: {
                              _id: Key | null | undefined;
                              profileImage: string;
                              fName: string;
                              lName: string;
                            },
                            idx: number
                          ) => (
                            <img
                              key={person._id}
                              src={
                                person.profileImage ||
                                `https://ui-avatars.com/api/?name=${
                                  person.fName || ""
                                }&background=random`
                              }
                              // alt={`${person.fName} ${person.lName}`}
                              className={`inline-block h-8 w-8 rounded-full object-cover border-2 border-white ${
                                idx === 0 ? "z-30" : idx === 1 ? "z-20" : "z-10"
                              }`}
                            />
                          )
                        )}
                        {item.assignedUsers.length > 3 && (
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-sm text-gray-700 border-2 border-white z-0">
                            +{item.assignedUsers.length - 3}
                          </span>
                        )}
                      </div>
                      <button
                        className="text-primary500 text-xs underline training-card"
                        onClick={(e) => handleViewClick(item, e)}
                      >
                        View &gt;
                      </button>
                    </div>
                  </div>
                )}
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            No trainings available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainningsList;
