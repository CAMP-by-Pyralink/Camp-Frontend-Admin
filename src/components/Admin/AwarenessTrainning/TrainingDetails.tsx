import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import downArrow from "../../../assets/svgs/downarrfilled.svg";
import upArrow from "../../../assets/svgs/up-arrow-filled.svg";
import ModalLayout from "../../../shared/ModalLayout";
import AssignTrainingModal from "./AssignTrainingModal";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";
import dragIcon from "../../../assets/svgs/dragIcon.svg";
import {
  Delete,
  DeleteIcon,
  Edit,
  PencilLine,
  Trash2,
  SquarePlus,
} from "lucide-react";
import { Video, FileText, Link, Image } from "lucide-react";
import ModuleManagementModal from "./ModuleManagementModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../../../store/useAuthStore";

const TrainingDetails: React.FC = () => {
  const [isAssigned, setIsAssigned] = useState(false);
  const { trainingId } = useParams<{ trainingId: string }>();
  const { fetchSingleTraining, singleTraining } = useTrainingStore();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const navigate = useNavigate();

  // State for module management
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<
    number | undefined
  >(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  // API setup for direct calls
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth token to requests
  api.interceptors.request.use(
    (config) => {
      const { authUser } = useAuthStore.getState();
      if (authUser) {
        config.headers.Authorization = `Bearer ${authUser}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (trainingId) {
      fetchSingleTraining(trainingId);
    }
  }, [trainingId, fetchSingleTraining]);

  if (!singleTraining) {
    return <div>Loading...</div>;
  }

  const toggleModule = (id: number) => {
    setExpandedModule((prev) => (prev === id ? null : id));
  };

  const handleAddModule = () => {
    setIsEditMode(false);
    setCurrentModuleIndex(undefined);
    setShowModuleModal(true);
  };

  const handleEditModule = (moduleIndex: number) => {
    setIsEditMode(true);
    setCurrentModuleIndex(moduleIndex);
    setShowModuleModal(true);
  };

  const handleDeleteModule = async (moduleIndex: number) => {
    if (!window.confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      // Create a copy of the training data without the module to delete
      const updatedTraining = { ...singleTraining };
      updatedTraining.modules = updatedTraining.modules.filter(
        (_, index) => index !== moduleIndex
      );

      // Call API to update training
      await api.patch(
        `/training/updateTraining/${trainingId}`,
        updatedTraining
      );

      // Refresh training data
      fetchSingleTraining(trainingId!);

      toast.success("Module deleted successfully");
    } catch (error) {
      console.error("Failed to delete module:", error);
      toast.error("Failed to delete module. Please try again.");
    }
  };

  const handleAddLesson = (moduleIndex: number) => {
    // Set up to edit the module with focus on adding a new lesson
    setIsEditMode(true);
    setCurrentModuleIndex(moduleIndex);
    setShowModuleModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Call API to save all changes to the training
      await api.patch(`/training/updateTraining/${trainingId}`, singleTraining);

      toast.success("Training updated successfully");
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error("Failed to save changes:", error);
      // toast.error("Failed to save changes. Please try again.");
    }
  };

  const renderLessonIcon = (lessonType: string) => {
    switch (lessonType) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      case "link":
        return <Link className="h-5 w-5" />;
      case "text & image":
        return <Image className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header Section */}
      <h1 className="text-greyText font-medium text-2xl mb-2">Modules</h1>
      <div className="flex items-center gap-2 mb-4">
        <h1
          className="text-primary500 text-sm font-medium cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Awareness training
        </h1>
        <span className="text-neutrals500 text-sm font-medium">{">"}</span>
        <h1 className="text-neutrals500 text-sm font-medium">
          View Training Details
        </h1>
      </div>

      <div className="bg-[#EBECFF] p-4 space-y-4">
        <div className="bg-white p-12 rounded-3xl flex items-center gap-12 justify-between">
          <div className="w-full space-y-3 basis-[60%]">
            <h1 className="text-[56px] font-bold">{singleTraining.title}</h1>
            <h1>Training description:</h1>
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

      {/* Modals */}
      {isAssigned && (
        <ModalLayout>
          <AssignTrainingModal />
        </ModalLayout>
      )}

      {showModuleModal && trainingId && (
        <ModuleManagementModal
          onClose={() => setShowModuleModal(false)}
          trainingId={trainingId}
          moduleToEdit={
            currentModuleIndex !== undefined
              ? singleTraining.modules[currentModuleIndex]
              : null
          }
          moduleIndex={currentModuleIndex}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default TrainingDetails;
