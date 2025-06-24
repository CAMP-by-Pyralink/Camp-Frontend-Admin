import filterIcon from "../../assets/svgs/filtericon.svg";
import searchIcon from "../..//assets/svgs/search.svg";
import downArricon from "../../assets/svgs/downarrAnchor.svg";
import TrainningsList from "../../components/Admin/AwarenessTrainning/TrainningsList";
import { useState, useRef, useEffect } from "react";
import CreateTrainningModal from "../../components/Admin/AwarenessTrainning/CreateTrainningModal";
import HeaderTitle from "../../shared/HeaderTitle";
import { useNavigate } from "react-router-dom";
import AssignTrainingModal from "../../components/Admin/AwarenessTrainning/AssignTrainingModal";
import { useTrainingStore } from "../../store/useAwarenessTrainingStore";

const AwarenessTraining = () => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [createTraining, setCreateTraining] = useState<boolean>(false);
  const [assignModal, setAssignModal] = useState<boolean>(false);
  const [showCheckbox, setShowCheckbox] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { fetchTrainings, trainings } = useTrainingStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    fetchTrainings("all", 1, debouncedSearch); // pass debounced search
  }, [debouncedSearch]);

  const navigate = useNavigate();
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([]);

  const { deleteSingleTraining } = useTrainingStore();

  // Reference for selection action buttons
  const selectionActionsRef = useRef<HTMLDivElement>(null);

  // Add global document click handler
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // If modal is open, don't handle clicks
      if (assignModal || createTraining) return;

      // Only proceed if we are in selection mode
      if (!selectionMode) return;

      // Check if the click is on the selection action buttons - ignore if it is
      if (
        selectionActionsRef.current &&
        selectionActionsRef.current.contains(event.target as Node)
      ) {
        return;
      }

      // Check if the click is on a training card - ignore if it is
      // We'll identify cards by their class name
      const clickedElement = event.target as HTMLElement;
      const isTrainingCard = (element: HTMLElement): boolean => {
        // Check if the element or any of its parents has the training card class
        if (!element) return false;
        if (
          element.classList &&
          (element.classList.contains("training-card") ||
            element.classList.contains("training-checkbox"))
        ) {
          return true;
        }
        return element.parentElement
          ? isTrainingCard(element.parentElement)
          : false;
      };

      // If not clicking on a training card or selection actions, disable selection mode
      if (!isTrainingCard(clickedElement)) {
        setSelectionMode(false);
        setShowCheckbox(false);
        setSelectedTrainings([]);
      }
    };

    // Add event listener only if selection mode is active
    if (selectionMode) {
      document.addEventListener("click", handleClick);
    }

    // Clean up
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [selectionMode, assignModal, createTraining]);

  const handleCreateNew = () => {
    navigate("/create-training");
  };

  const handleAssignClick = () => {
    setAssignModal(true);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-">
        <HeaderTitle
          title="Awareness Training"
          subTitle="Browse over 1000+ trainings on cybersecurity best practices curated
            to empower your organisation"
        ></HeaderTitle>
        <button
          className="bg-primary500 rounded-lg text-white py-2 px-8"
          onClick={handleCreateNew}
        >
          Create New
        </button>
      </div>

      <div className="bg-blue50 p-8 rounded-md h-full min-h-[80vh]">
        <div className="bg-white rounded-md w-full py-[10px] px-[20px] relative">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search"
                className="border-b-[0.5px] border-black outline-none px-12 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <img
                src={searchIcon}
                alt=""
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <div className="flex gap-2">
              {/* Filter button commented out */}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <TrainningsList
            trainings={trainings}
            setSelectionMode={setSelectionMode}
            setAssignModal={setAssignModal}
            setSelectedTrainings={setSelectedTrainings}
            selectedTrainings={selectedTrainings}
            showCheckbox={showCheckbox}
            setShowCheckbox={setShowCheckbox}
          />
        </div>
      </div>

      {/* Fixed Selection Mode Action Buttons */}
      {selectionMode && (
        <div
          className="fixed top-24 right-8 flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50"
          ref={selectionActionsRef}
        >
          <span className="text-sm text-gray-600 mr-2">
            {selectedTrainings.length} selected
          </span>
          <button
            className="border border-[#D0D5DD] py-2.5 px-8 rounded-lg text-greyText font-semibold hover:bg-gray-50 transition-colors"
            onClick={handleAssignClick}
          >
            Assign
          </button>
          <button
            className="border border-[#B30100] py-2.5 px-8 rounded-lg text-[#FF0301] font-semibold hover:bg-red-50 transition-colors"
            onClick={async () => {
              if (selectedTrainings.length === 0) return;

              const confirmDelete = window.confirm(
                `Are you sure you want to delete ${selectedTrainings.length} training(s)?`
              );
              if (!confirmDelete) return;

              for (const trainingId of selectedTrainings) {
                await deleteSingleTraining(trainingId);
              }

              // reset UI states
              setSelectionMode(false);
              setShowCheckbox(false);
              setSelectedTrainings([]);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {createTraining && (
        <CreateTrainningModal setCreateTraining={setCreateTraining} />
      )}

      {assignModal && (
        <AssignTrainingModal
          setAssignModal={setAssignModal}
          selectedTrainings={selectedTrainings}
          setSelectionMode={setSelectionMode}
          setShowCheckbox={setShowCheckbox}
        />
      )}
    </div>
  );
};

export default AwarenessTraining;
