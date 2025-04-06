import filterIcon from "../../assets/svgs/filtericon.svg";
import searchIcon from "../..//assets/svgs/search.svg";
import downArricon from "../../assets/svgs/downarrAnchor.svg";
import TrainningsList from "../../components/Admin/AwarenessTrainning/TrainningsList";
import { useState } from "react";
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

  const navigate = useNavigate();
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([]);

  const { deleteSingleTraining } = useTrainingStore();

  const handleCreateNew = () => {
    navigate("/create-training");
  };
  const handleAssignClick = () => {
    setAssignModal(true);
  };
  return (
    <div>
      <div className=" flex justify-between items-center mb-">
        {/* <div>
          <h1 className="text-greyText text-2xl font-medium">
            Awareness Training
          </h1>
          <h3 className="text-greyText text-sm">
            Browse over 1000+ trainings on cybersecurity best practices curated
            to empower your organisation
          </h3>
        </div> */}
        <HeaderTitle
          title="Awareness Training"
          subTitle=" Browse over 1000+ trainings on cybersecurity best practices curated
            to empower your organisation"
        ></HeaderTitle>
        <button
          className=" bg-primary500 rounded-lg text-white py-2 px-8"
          // onClick={() => setCreateTraining(true)}
          onClick={handleCreateNew}
        >
          Create New
        </button>
      </div>
      {/*  */}
      <div className="bg-blue50 p-8 rounded-md h-full min-h-[80vh]">
        <div className="bg-white rounded-md w-full py-[10px] px-[20px] relative">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search"
                className="border-b-[0.5px] border-black outline-none px-12 py-2 w-full"
              />
              <img
                src={searchIcon}
                alt=""
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <div className="flex gap-2">
              {/* <div
                className="flex items-center border border-primary500 px-3 py-[2px] rounded shadow-sm"
                // onClick={onFilterClick}
              >
                <img src={filterIcon} className="mr-2" alt="" />
                Filter
              </div> */}
            </div>
            {selectionMode && (
              <div className="flex items-center gap-4">
                <button
                  className="border border-[#D0D5DD] py-2.5 px-12 rounded-lg text-greyText font-semibold"
                  onClick={handleAssignClick}
                >
                  Assign
                </button>
                <button
                  className="border border-[#B30100] py-2.5 px-12 rounded-lg text-[#FF0301] font-semibold"
                  onClick={async () => {
                    if (selectedTrainings.length === 0) return;

                    const confirmDelete = window.confirm(
                      `Are you sure you want to delete ${selectedTrainings.length} training(s)?`
                    );
                    if (!confirmDelete) return;

                    for (const trainingId of selectedTrainings) {
                      await deleteSingleTraining(trainingId); // ✅ reuse your existing function
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
          </div>
        </div>
        <div className="mt-8">
          <TrainningsList
            setSelectionMode={setSelectionMode}
            setAssignModal={setAssignModal}
            setSelectedTrainings={setSelectedTrainings}
            selectedTrainings={selectedTrainings}
            showCheckbox={showCheckbox}
            setShowCheckbox={setShowCheckbox}
          />
        </div>
      </div>
      {/*  */}
      {createTraining && (
        <>
          <CreateTrainningModal setCreateTraining={setCreateTraining} />
        </>
      )}
      {/* assign modal */}
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
