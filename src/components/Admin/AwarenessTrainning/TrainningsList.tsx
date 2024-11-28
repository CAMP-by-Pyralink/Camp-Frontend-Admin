import { useState } from "react";
import { TabContent, TabItem, tabContent } from "./data";
import { useNavigate } from "react-router-dom";
import profilepic from "../../../assets/avatar.png";

const TrainningsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof TabContent>("browse");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2500;
  const navigate = useNavigate();

  const avatars = [profilepic, profilepic, profilepic, profilepic];

  // Navigate to training details
  // For card click
  const handleCardClick = (training: TabItem) => {
    // Navigate to the normal TrainingDetails layout
    navigate(`/training-details/${training.id}`, {
      state: {
        ...training,
        isViewMode: false, // Ensure it's not the table layout
      },
    });
  };

  //navigate to assigned training details
  // For View button click
  const handleViewClick = (training: TabItem) => {
    // Navigate to the TrainingDetails layout with the table
    navigate(`/training-details/${training.id}`, {
      state: {
        ...training,
        isViewMode: true, // Ensure it shows the table layout
      },
    });
  };

  // Calculate progress percentage
  const getProgressPercentage = (current: number, total: number) => {
    return (current / total) * 100;
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
              onClick={() => setActiveTab(tab as keyof TabContent)}
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
        {tabContent[activeTab].map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#D3D3D3] rounded-lg p-2 cursor-pointer pb-6"
            onClick={() => handleCardClick(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-medium text-[#333333]">
              {item.title.slice(0, 30)}...
            </h3>
            <p className="text-sm text-[#333333] mt-2">
              {item.description.slice(0, 100)}...
            </p>

            {activeTab === "assigned" && (
              <div>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-full bg-secondary100 rounded-md h-[9px]">
                    <div
                      className="bg-secondary600 h-[9px] rounded-md"
                      style={{
                        width: `${getProgressPercentage(
                          item.current || 0,
                          item.total || 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {item.current || 0}%
                  </span>
                </div>

                {/* Profile avatars and View All */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex -space-x-4 overflow-hidden">
                    {avatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className={`inline-block h-8 w-8 rounded-full ${
                          index === 0 ? "z-30" : `z-${20 - index}`
                        } object-cover`}
                      />
                    ))}
                  </div>
                  <button
                    className="text-primary500 text-xs underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click event
                      handleViewClick(item); // View button click for table layout
                    }}
                  >
                    View &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } rounded-md`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainningsList;
