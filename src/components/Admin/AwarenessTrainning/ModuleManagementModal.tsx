import { useState, useEffect } from "react";
import { X, Upload, File, Link as LinkIcon, Image } from "lucide-react";
import { useTrainingStore } from "../../../store/useAwarenessTrainingStore";
import { LessonType } from "../../../store/useAwarenessTrainingStore";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

interface ModuleManagementModalProps {
  onClose: () => void;
  trainingId: string;
  moduleToEdit?: {
    moduleTitle: string;
    lessons: {
      lessonType: LessonType;
      content: string;
      lessonTitle?: string;
    }[];
  } | null;
  moduleIndex?: number;
  isEditMode?: boolean;
}

const ModuleManagementModal = ({
  onClose,
  trainingId,
  moduleToEdit = null,
  moduleIndex,
  isEditMode = false,
}: ModuleManagementModalProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { singleTraining, fetchSingleTraining } = useTrainingStore();

  // State for module data
  const [moduleData, setModuleData] = useState({
    moduleTitle: moduleToEdit?.moduleTitle || "",
    lessons: moduleToEdit?.lessons || [
      { lessonType: "video" as LessonType, content: "", lessonTitle: "" },
    ],
  });

  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

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

  // For adding a new lesson
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Lesson type tabs
  const uploadTabs = [
    { icon: <Upload />, name: "Video", type: "video" as LessonType },
    { icon: <File />, name: "Document", type: "document" as LessonType },
    { icon: <LinkIcon />, name: "Link", type: "link" as LessonType },
    {
      icon: <Image />,
      name: "Text & Image",
      type: "text & image" as LessonType,
    },
  ];

  // Set appropriate tab when editing
  useEffect(() => {
    if (isEditMode && moduleToEdit?.lessons[currentLessonIndex]) {
      const lessonType = moduleToEdit.lessons[currentLessonIndex].lessonType;
      const tabIndex = uploadTabs.findIndex((tab) => tab.type === lessonType);
      if (tabIndex >= 0) {
        setActiveTab(tabIndex);
      }
    }
  }, [isEditMode, moduleToEdit, currentLessonIndex]);

  // Handle tab click - update lesson type
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const updatedLessons = [...moduleData.lessons];
    updatedLessons[currentLessonIndex] = {
      ...updatedLessons[currentLessonIndex],
      lessonType: uploadTabs[index].type,
      content: "",
    };
    setModuleData({
      ...moduleData,
      lessons: updatedLessons,
    });
  };

  // Handle module title input change
  const handleModuleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleData({
      ...moduleData,
      moduleTitle: e.target.value,
    });
  };

  // Handle lesson title input change
  const handleLessonTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLessons = [...moduleData.lessons];
    updatedLessons[currentLessonIndex] = {
      ...updatedLessons[currentLessonIndex],
      lessonTitle: e.target.value,
    };
    setModuleData({
      ...moduleData,
      lessons: updatedLessons,
    });
  };

  // Handle file upload for video and document
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedLessons = [...moduleData.lessons];
        updatedLessons[currentLessonIndex] = {
          ...updatedLessons[currentLessonIndex],
          content: base64String,
        };
        setModuleData({
          ...moduleData,
          lessons: updatedLessons,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle link input change
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLessons = [...moduleData.lessons];
    updatedLessons[currentLessonIndex] = {
      ...updatedLessons[currentLessonIndex],
      content: e.target.value,
    };
    setModuleData({
      ...moduleData,
      lessons: updatedLessons,
    });
  };

  // Handle text & image content change (from rich text editor)
  const handleContentChange = (content: string) => {
    const updatedLessons = [...moduleData.lessons];
    updatedLessons[currentLessonIndex] = {
      ...updatedLessons[currentLessonIndex],
      content: content,
    };
    setModuleData({
      ...moduleData,
      lessons: updatedLessons,
    });
  };

  // Add a new lesson to the module
  const addLesson = () => {
    setModuleData({
      ...moduleData,
      lessons: [
        ...moduleData.lessons,
        { lessonType: "video" as LessonType, content: "", lessonTitle: "" },
      ],
    });
    setCurrentLessonIndex(moduleData.lessons.length);
    setActiveTab(0); // Reset to video tab for new lesson
  };

  // Switch between lessons
  const switchToLesson = (index: number) => {
    setCurrentLessonIndex(index);
    const lessonType = moduleData.lessons[index].lessonType;
    const tabIndex = uploadTabs.findIndex((tab) => tab.type === lessonType);
    if (tabIndex >= 0) {
      setActiveTab(tabIndex);
    }
  };

  // Remove a lesson
  const removeLesson = (index: number) => {
    if (moduleData.lessons.length <= 1) {
      return; // Don't remove if it's the only lesson
    }
    const updatedLessons = moduleData.lessons.filter((_, i) => i !== index);
    setModuleData({
      ...moduleData,
      lessons: updatedLessons,
    });

    // Adjust current lesson index if needed
    if (currentLessonIndex >= index && currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  // Save module changes to the backend
  const saveModule = async () => {
    if (!singleTraining) return;

    try {
      // Create a copy of the current training data
      const updatedTraining = { ...singleTraining };

      // If editing an existing module
      if (isEditMode && moduleIndex !== undefined) {
        updatedTraining.modules[moduleIndex] = moduleData;
      }
      // If adding a new module
      else {
        updatedTraining.modules = [...updatedTraining.modules, moduleData];
      }

      // Call the API to update the training
      await api.patch(
        `/training/updateTraining/${trainingId}`,
        updatedTraining
      );

      // Refresh training data
      await fetchSingleTraining(trainingId);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Failed to update module:", error);
      //   toast.error("Failed to save module. Please try again.");
    }
  };

  return (
    <div
      className="fixed z-[999] inset-0 bg-[#344054B2] bg-opacity-40 flex justify-center items-center h-screen"
      style={{ backdropFilter: "blur(7.06999969482422px)" }}
    >
      <div className="bg-white w-[799px] overflow-y-auto rounded-2xl max-h-[90%] custom-scrollba h-full">
        <div className="flex items-center justify-between bg-[#DEEFFC] py-6 px-12">
          <h1 className="text-[#333333] font-medium text-xl">
            {isEditMode ? "Edit Module" : "Add Module"}
          </h1>
          <X className="text-[#454545] cursor-pointer" onClick={onClose} />
        </div>

        <div className="px-12 py-6 space-y-6">
          {/* Module Title */}
          <div>
            <label
              htmlFor="moduleTitle"
              className="block text-sm font-medium mb-2"
            >
              Module Title
            </label>
            <input
              type="text"
              id="moduleTitle"
              value={moduleData.moduleTitle}
              onChange={handleModuleTitleChange}
              placeholder="Enter module title"
              className="border border-primary100 py-4 px-3 w-full rounded-md"
            />
          </div>

          {/* Lesson Navigation */}
          {moduleData.lessons.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {moduleData.lessons.map((lesson, index) => (
                <button
                  key={index}
                  onClick={() => switchToLesson(index)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentLessonIndex === index
                      ? "bg-primary500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Lesson {index + 1}
                  {moduleData.lessons.length > 1 && (
                    <span
                      className="ml-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLesson(index);
                      }}
                    >
                      ✕
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={addLesson}
                className="px-3 py-1 rounded-md text-sm bg-primary100 text-primary500"
              >
                + Add Lesson
              </button>
            </div>
          )}

          {/* Current Lesson Form */}
          <div>
            {/* Lesson Title */}
            <div className="mb-4">
              <label
                htmlFor="lessonTitle"
                className="block text-sm font-medium mb-2"
              >
                Lesson Title
              </label>
              <input
                type="text"
                id="lessonTitle"
                value={
                  moduleData.lessons[currentLessonIndex]?.lessonTitle || ""
                }
                onChange={handleLessonTitleChange}
                placeholder="Enter lesson title"
                className="border border-primary100 py-4 px-3 w-full rounded-md"
              />
            </div>

            {/* Lesson Type Selection */}
            <h2 className="block text-sm font-medium mb-2">
              Select Lesson Type
            </h2>
            <div className="flex justify-between mb-6">
              {uploadTabs.map((tab, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center gap-4 w-[125px] h-[116px] cursor-pointer ${
                    activeTab === index
                      ? "bg-blue50 border border-primary200 rounded-md"
                      : ""
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  <div className="flex flex-col items-center gap-4">
                    {tab.icon}
                    <h1>{tab.name}</h1>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Input Based on Selected Type */}
            <div className="mb-6">
              {activeTab === 0 && (
                <div>
                  <label
                    htmlFor="videoContent"
                    className="block text-sm font-medium mb-2"
                  >
                    Upload Video
                  </label>
                  <input
                    type="file"
                    id="videoContent"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                  />
                </div>
              )}

              {activeTab === 1 && (
                <div>
                  <label
                    htmlFor="documentContent"
                    className="block text-sm font-medium mb-2"
                  >
                    Upload Document
                  </label>
                  <input
                    type="file"
                    id="documentContent"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                  />
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <label
                    htmlFor="linkContent"
                    className="block text-sm font-medium mb-2"
                  >
                    Insert Link
                  </label>
                  <input
                    type="text"
                    id="linkContent"
                    value={
                      moduleData.lessons[currentLessonIndex]?.content || ""
                    }
                    onChange={handleLinkChange}
                    placeholder="Paste link"
                    className="border border-primary100 py-4 px-3 w-full rounded-md"
                  />
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Text & Image Content
                  </label>
                  {/* Replace with your rich text editor component */}
                  <textarea
                    value={
                      moduleData.lessons[currentLessonIndex]?.content || ""
                    }
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Enter content"
                    className="border border-primary100 py-4 px-3 w-full h-48 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-primary500 text-primary500 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={saveModule}
              className="px-6 py-3 bg-primary500 text-white rounded-md"
            >
              {isEditMode ? "Update Module" : "Add Module"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleManagementModal;
