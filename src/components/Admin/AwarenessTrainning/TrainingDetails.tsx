import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import downArrow from "../../../assets/svgs/downarrfilled.svg";
import upArrow from "../../../assets/svgs/up-arrow-filled.svg";
import ModalLayout from "../../../shared/ModalLayout";
import AssignTrainingModal from "./AssignTrainingModal";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";
import dragIcon from "../../../assets/svgs/dragIcon.svg";
import { ArrowDownIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Video, FileText, Link, Image } from "lucide-react";
import ModuleManagementModal from "./ModuleManagementModal";
import Button from "../../../shared/Button";
// import { useAuthStore } from "../../../store/useAuthStore";

const TrainingDetails: React.FC = () => {
  const [isAssigned, setIsAssigned] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const { trainingId } = useParams<{ trainingId: string }>();
  const { fetchSingleTraining, singleTraining } = useTrainingStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { assignedView } = location.state || { assignedView: false };

  useEffect(() => {
    if (trainingId) fetchSingleTraining(trainingId);
  }, [trainingId, fetchSingleTraining]);

  if (!singleTraining)
    return <div className="text-center py-10">Loading...</div>;

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const renderLessonIcon = (lessonType: string) => {
    const icons: Record<string, JSX.Element> = {
      video: <Video className=" size-[14px] text-blue-500" />,
      document: <FileText className=" size-[14px] text-green-500" />,
      link: <Link className=" size-[14px] text-yellow-500" />,
      "text & image": <Image className=" size-[14px] text-purple-500" />,
    };
    return icons[lessonType] || null;
  };
  // Function to get progress percentage from progress array
  const getProgressPercentage = (email: string) => {
    if (!singleTraining.progress) return 0;
    const userProgress = singleTraining.progress.find(
      (p: any) => p.email === email
    );
    return userProgress ? userProgress.percentage : 0;
  };
  return (
    <div>
      {/* Header Section */}
      {/* <h1 className="text-greyText font-medium text-2xl mb-2">Modules</h1> */}
      <div className=" flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h1
            className="text-primary500 text-sm font-medium cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Awareness training
          </h1>
          <span className="text-neutrals500 text-sm font-medium">{">"}</span>
          <h1 className="text-neutrals500 text-sm font-medium">
            View {assignedView && "Assigned"} Training Details
          </h1>
        </div>
        {/*  */}
        <button
          onClick={() => navigate(`/edit-training/${singleTraining._id}`)}
          className="border border-[#D0D5DD] py-2.5 px-5 rounded-lg text-[#344054]"
        >
          Edit Training
        </button>
      </div>

      <div className="bg-[#EBECFF] p-4 space-y-4 rounded-3xl">
        <div className=" p-12  flex items-center gap-12 justify-between">
          <div className="w-full space-y-3 basis-[60%]">
            <h1 className="text-[56px] font-bold">{singleTraining.title}</h1>
            <p className="text-greyText text-[12px]">
              {singleTraining.modules.length} modules
            </p>
          </div>
          <div className="h-[228px] basis-[60%]">
            <img
              src={singleTraining.bannerImage}
              alt={singleTraining.title}
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>
        </div>
      </div>
      {/* DEtails  */}
      {!assignedView ? (
        <div className=" flex gap-32 mt-12">
          {/* description */}
          <div className=" flex-1">
            <h1 className=" text-2xl font-semibold">Training description</h1>
            <p className=" mt-4 text-base text-[#1B1B1B99] leading-[152%] w-[100%]">
              {singleTraining.description}
            </p>
          </div>
          {/* modules */}
          <div className=" basis-[30%]">
            <h1 className=" text-2xl font-semibold mb-6">Modules</h1>
            <div className=" space-y-4">
              {singleTraining.modules.map((module, index) => (
                <div
                  key={index}
                  className="module-item border border-neutral-300 py-4 px-4"
                >
                  <div className=" flex items-center justify-between">
                    <h1
                      className={`${
                        expandedModule === index ? " font-semibold" : ""
                      }`}
                    >
                      Module {index + 1}
                    </h1>
                    {/* <h2 className="text-xs font-medium">{module.moduleTitle}</h2> */}
                    <button onClick={() => toggleModule(index)}>
                      {expandedModule === index ? (
                        <img src={upArrow} alt="" />
                      ) : (
                        <ChevronDown />
                      )}
                    </button>
                  </div>
                  {/*  */}
                  {expandedModule === index && (
                    <div className="mt-3 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center gap- pt-2"
                        >
                          {renderLessonIcon(lesson.lessonType)}
                          <span className=" ml-2 text-[10px]">
                            {lesson.lessonTitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Assigned table
        <div className="mt-8">
          {/* <h1 className="text-2xl font-semibold mb-4">Assigned Employees</h1> */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EAECF0] text-greyText">
                  {/* <th className="p-4 text-left">
                    EMPLOYEE ID
                  </th> */}
                  <th className="p-6 text-left">EMPLOYEE</th>
                  <th className="p-6 text-left">PROGRESS</th>
                </tr>
              </thead>
              <tbody>
                {singleTraining.assignedTo &&
                  singleTraining.assignedTo.individuals &&
                  singleTraining.assignedTo.individuals.map(
                    (individual: any, index: number) => {
                      const progressPercentage = getProgressPercentage(
                        individual.email
                      );
                      return (
                        <tr
                          key={individual._id}
                          className="border-b border-[#E8E8E8]"
                        >
                          {/* <td className=" p-4">
                            Py 2234
                          </td> */}
                          <td className=" p-4 text-[#101928]">
                            {individual.email}
                          </td>
                          <td className=" p-6">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-secondary100 rounded-full h-3">
                                <div
                                  className="bg-secondary600 h-3 rounded-full"
                                  style={{ width: `${progressPercentage}%` }}
                                ></div>
                              </div>
                              <span>{progressPercentage}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* {isAssigned && (
        <ModalLayout>
          <AssignTrainingModal />
        </ModalLayout>
      )} */}

      {showModuleModal && trainingId && (
        <ModuleManagementModal
          onClose={() => setShowModuleModal(false)}
          trainingId={trainingId}
          moduleToEdit={
            currentModuleIndex !== undefined
              ? singleTraining.modules[currentModuleIndex!]
              : null
          }
          moduleIndex={currentModuleIndex ?? undefined}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default TrainingDetails;
